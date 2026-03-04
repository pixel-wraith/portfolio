<script lang="ts">
    import type { ActionResult } from "@sveltejs/kit";
    import type { IApiError } from "$lib/utils/api-error";

    import { browser } from "$app/environment";
    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import Textarea from "$lib/components/Textarea.svelte";
    import TextInput from "$lib/components/TextInput.svelte";
    import { toast } from "$lib/state/toast.svelte";
    import { contactMessageSchema, contactNameSchema, emailSchema } from "$lib/utils/validators";

    type IField = 'name' | 'email' | 'message';

    let name = '';
    let email = '';
    let message = '';

    let nameError = '';
    let emailError = '';
    let messageError = '';
    let genError = '';

    let processing = false;
    let disabled = true;

    let timer: number;

    $: disabled = !name || !email || !message || !!nameError || !!emailError || !!messageError;

    $: {
        if (browser) {
            window.clearTimeout(timer);

            timer = window.setTimeout(() => {
                if (name) {
                    const nameValidation = contactNameSchema.safeParse(name);

                    nameError = nameValidation.success
                        ? ''
                        : nameValidation.error.issues[0].message;
                }

                if (email) {
                    const emailValidation = emailSchema.safeParse(email);

                    emailError = emailValidation.success
                        ? ''
                        : emailValidation.error.issues[0].message;
                }

                if (message) {
                    const messageValidation = contactMessageSchema.safeParse(message);

                    messageError = messageValidation.success
                        ? ''
                        : messageValidation.error.issues[0].message;
                }
            }, 300);
        }
    }

    const onBlur = (field: IField) => () => {
        if (field === 'name') {
            const nameValidation = contactNameSchema.safeParse(name);

            nameError = nameValidation.success
                ? ''
                : nameValidation.error.issues[0].message;
        } else if (field === 'email') {
            const emailValidation = emailSchema.safeParse(email);

            emailError = emailValidation.success
                ? ''
                : emailValidation.error.issues[0].message;
        } else if (field === 'message') {
            const messageValidation = contactMessageSchema.safeParse(message);

            messageError = messageValidation.success
                ? ''
                : messageValidation.error.issues[0].message;
        }
    }

    const onSubmit = () => {
        processing = true;

        return ({ result }: { result: ActionResult<{ message: string }> }) => {
            if (result.type === 'failure') {
                if (result.data?.errors) {
                    result.data.errors.foreach((e: IApiError) => {
                        switch (e.field) {
                            case 'name':
                                nameError = e.message;
                                break;
                            case 'email':
                                emailError = e.message;
                                break;
                            case 'message':
                                messageError = e.message;
                                break;
                            default:
                                genError = e.message;
                                break;
                        }
                    })
                } else {
                    genError = 'Something went wrong. Please try again later.';
                }
            }

            if (result.type === 'success') {
                reset();
                toast.add({ message: 'Thanks for reaching out! I\'ll be in touch soon!' });
            }

            processing = false;
        }
    };

    function reset() {
        name = '';
        email = '';
        message = '';

        nameError = '';
        emailError = '';
        messageError = '';
    }
</script>

<div class="container">
    <h1>Get in Touch</h1>

    <p>
        You can contact me at <a href="mailto:jlundberg@pm.me">jlundberg@pm.me</a>, or just fill out the
        form below and I'll get back to you as soon as possible.
    </p>

    <p class="center">
        I look forward to hearing from you!
    </p>

    <form
        method="POST"
        use:enhance={onSubmit}
    >
        <div class="field-wrapper">
            <TextInput
                required
                id="name"
                name="name"
                label="Your Name"
                placeholder="Name"
                error={nameError}
                maxLength={255}
                bind:value={name}
                onblur={onBlur('name')}
            />
        </div>

        <div class="field-wrapper">
            <TextInput
                required
                id="email"
                name="email"
                type="email"
                label="Your Email"
                placeholder="Email"
                error={emailError}
                maxLength={255}
                bind:value={email}
                onblur={onBlur('email')}
            />
        </div>

        <div class="field-wrapper message-wrapper">
            <Textarea
                required
                id="message"
                name="message"
                label="Message"
                placeholder="Message"
                error={messageError}
                maxLength={2000}
                bind:value={message}
                onblur={onBlur('message')}
            />
        </div>

        {#if genError}
            <div class="field-wrapper">
                <p class="error center">{genError}</p>
            </div>
        {/if}

        <div class="buttons-container">
            <Button
                type="submit"
                kind="primary"
                {disabled}
                {processing}
            >
                Send
            </Button>

            <Button
                type="button"
                kind="neutral"
                disabled={processing}
                onclick={reset}
            >
                Cancel
            </Button>
        </div>
    </form>
</div>

<style>
    .container {
		width: 96%;
		max-width: 50rem;
		margin: 0 auto;
		padding-top: 2rem;

		& p {
			&.center {
				text-align: center;
			}

			& a {
				color: var(--accent1-500);
			}
		}
	}

	form {
		width: 100%;
		max-width: 40rem;
		margin: 0 auto;
	}

	.field-wrapper {
		margin-bottom: 0.5rem;
	}

	.message-wrapper {
		--textarea-height: 10rem;
	}

	.error {
		margin: 0;
	}

	.buttons-container {
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		padding: var(--outline-offset);
	}
</style>