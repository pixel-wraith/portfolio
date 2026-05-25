<script lang="ts">
    interface ILogoProps {
        hoverable?: boolean;
        size?: 'small' | 'medium' | 'large';
    }

    const { hoverable = false, size = 'small' }: ILogoProps = $props();
    const imgSrc = $derived(`https://images.wraithcode.io/2026-05/pixel-white-${size === 'small' ? '400' : size === 'medium' ? '800' : '1600'}.webp`);
</script>

<div
    class="logo"
    class:hoverable={hoverable}
>
    <img src={imgSrc} alt="A cute, pixelated ghost" />
</div>

<style>
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        &.hoverable:hover {
            opacity: 0.8;
        }

        & img {
            display: block;
            width: 100%;
            height: auto;
        }
    }
</style>
