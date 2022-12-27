<script lang="ts">
    import Pad from '../components/Pad.svelte';
    import { onMount } from 'svelte';
    import type { IAudioItem } from './page';

    let items: IAudioItem[] = [];

    onMount(() => {
        const input = document.querySelector<HTMLInputElement>('#audioInput');
        if (!input) return;

        input.addEventListener('change', () => {
            if (!input.files?.length) return;
            const { name } = input.files[0];
            const id = `${name.replaceAll(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}`;
            const src = URL.createObjectURL(input.files[0]);

            items.push({ id, src, name });
            items = [...items];
        });
    });
</script>

<svelte:head>
    <title>I'm all hears</title>
</svelte:head>

<section>
    <input type="file" accept="audio/*" id="audioInput" />

    <ul class="leads">
        {#each items as item}
            <li>
                <Pad {item} />
            </li>
        {/each}
    </ul>
</section>

<style>
    .leads {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        list-style-type: none;
        margin: 0 auto;
        margin-block: 50px;
        max-width: 700px;
        padding: 0;
    }

    .leads li {
        width: 100%;
        height: 120px;
    }
</style>
