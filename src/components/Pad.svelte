<script lang="ts">
    import { AudioController } from '../controllers/Audio.controller';
    import type { IAudioItem } from '../routes/page';

    export let item: IAudioItem;
    let loop = false;
    let audio: HTMLAudioElement;

    const playStop = (e: MouseEvent, item: IAudioItem) => {
        const { src } = item;
        const button = document.querySelector<HTMLButtonElement>(`#${item.id}`);
        const audioCtrl = new AudioController(src, item.id);
        audio = audioCtrl.audio;

        if (!button) throw new Error(`Button with id ${item.id} not found`);

        const _default = () => {
            button.style.borderColor = '';
            audio.currentTime = 0;
        };

        audioCtrl.onEnded = _default;
        audioCtrl.onPause = _default;

        audioCtrl.onPlay = () => {
            button.style.borderColor = 'red';
        };

        audio.loop = loop;
        audio.currentTime = 0;

        if (loop) {
            if (audio.paused) return audio.play();
            audio.pause();
            audio.currentTime = 0;
            return;
        }

        if (!audio.paused) return (audio.currentTime = 0);

        return audio.play();
    };

    const loopButton = (e: MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        loop = !loop;
        target.style.backgroundColor = !loop ? '' : 'red';

        if (audio) audio.loop = loop;
    };
</script>

<div class="button" id={item.id}>
    <span class="clicker" on:mousedown={(e) => playStop(e, item)} />
    <p>{item.name}</p>
    <span class="loop" title="loop" on:mousedown={(e) => loopButton(e)} />
</div>

<style>
    .button {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: 1px solid #ccc;
        border-radius: 10px;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .button p {
        padding: 0;
        max-width: 90%;
        text-align: center;
    }

    .button .clicker {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
    }

    .button .loop {
        width: 20px;
        height: 20px;
        background-color: #ccc;
        border-radius: 50%;
        position: absolute;
        bottom: 10px;
        left: 10px;
        z-index: 2;
    }
</style>
