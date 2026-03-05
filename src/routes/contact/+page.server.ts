import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { HttpStatus } from '$lib/constants/error';
import { ApiError } from '$lib/utils/api-error';
import { ApiResponse } from '$lib/utils/api-response';
import { contactMessageSchema, contactNameSchema, emailSchema } from '$lib/utils/validators';

import type { Actions } from './$types';

interface TurnstileResponse {
    'success': boolean;
    'error-codes'?: string[];
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            secret: env.TURNSTILE_SECRET_KEY,
            response: token,
        }),
    });

    const data: TurnstileResponse = await response.json();
    return data.success;
}

export const actions: Actions = {
    default: async ({ request }) => {
        const errors: ApiError[] = [];

        const data = await request.formData();
        const name = data.get('name')! as string;
        const email = data.get('email')! as string;
        const message = data.get('message')! as string;
        const turnstileToken = data.get('cf-turnstile-response') as string;

        try {
            // Verify Turnstile token first
            if (!turnstileToken) {
                errors.push(new ApiError('Please complete the captcha', HttpStatus.UNPROCESSABLE, 'captcha'));
            } else {
                const isValidToken = await verifyTurnstileToken(turnstileToken);
                if (!isValidToken) {
                    errors.push(new ApiError('Captcha verification failed. Please try again.', HttpStatus.UNPROCESSABLE, 'captcha'));
                }
            }

            const nameValidation = contactNameSchema.safeParse(name);

            if (!nameValidation.success) {
                nameValidation.error.issues.forEach((issue) => {
                    errors.push(new ApiError(issue.message, HttpStatus.UNPROCESSABLE, 'name'));
                });
            }

            const emailValidation = emailSchema.safeParse(email);

            if (!emailValidation.success) {
                emailValidation.error.issues.forEach((issue) => {
                    errors.push(new ApiError(issue.message, HttpStatus.UNPROCESSABLE, 'email'));
                });
            }

            const messageValidation = contactMessageSchema.safeParse(message);

            if (!messageValidation.success) {
                messageValidation.error.issues.forEach((issue) => {
                    errors.push(new ApiError(issue.message, HttpStatus.UNPROCESSABLE, 'message'));
                });
            }

            if (errors.length)
                throw errors;

            const res = await fetch('https://wraith-contact.web.val.run', {
                method: 'POST',
                body: JSON.stringify({ name, email, message }),
                headers: { Authorization: `Bearer ${env.VALTOWN_AUTH_TOKEN}` },
            });

            const data = await res.json();

            if (data.ok) {
                return {
                    status: 200,
                    body: { success: true },
                };
            } else {
                throw new ApiError(data.message, data.statusCode);
            }
        } catch (err) {
            const response = new ApiResponse({ errors: ApiError.parse(err) });

            return fail(response.statusCode, { errors: response.errors });
        }
    },
};