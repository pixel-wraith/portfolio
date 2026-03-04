import { fail } from '@sveltejs/kit';
import { VALTOWN_AUTH_TOKEN } from '$env/static/private';
import { HttpStatus } from '$lib/constants/error';
import { ApiError } from '$lib/utils/api-error';
import { ApiResponse } from '$lib/utils/api-response';
import { contactMessageSchema, contactNameSchema, emailSchema } from '$lib/utils/validators';

import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request }) => {
        const errors: ApiError[] = [];

        const data = await request.formData();
        const name = data.get('name')! as string;
        const email = data.get('email')! as string;
        const message = data.get('message')! as string;

        try {
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
                headers: { Authorization: `Bearer ${VALTOWN_AUTH_TOKEN}` },
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