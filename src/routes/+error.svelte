<script>
    import { page } from "$app/state";

</script>

{#if page.error}
    {#if page.status === 404}
        <div class="error-container">
            <h1>😕 Page Not Found</h1>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <a href="/" class="home-link">Go back to homepage</a>
        </div>
    {:else}
        <!-- Default error message for other statuses (we’ll expand this later) -->
        <div class="error-container">
            <h1>Oops! Something went wrong</h1>
            <p>Status: {page.status}</p>
            <p>Message: {page.error.message}</p>
        </div>
    {/if}
{/if}

<style>
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 4rem;
    }

    .home-link {
        color: var(--primary-500);
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 600;
        margin-top: 1rem;
    }
</style>