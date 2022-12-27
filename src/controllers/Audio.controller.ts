export class AudioController {
    private SRC: string;
    private ID: string;
    private AUDIO: HTMLAudioElement | null;

    constructor(url: string, id: string) {
        this.SRC = url;
        this.ID = `audio-${id}`;
        this.AUDIO = document.querySelector<HTMLAudioElement>(`#${this.ID}`);

        if (!this.AUDIO) this.CREATE();
    }

    private CREATE() {
        const audio = new Audio(this.SRC);
        audio.id = this.ID;

        this.DEFAULT_EVENTS();

        document.body.appendChild(audio);
        this.AUDIO = audio;
    }

    private REMOVE() {
        if (!this.AUDIO) return;
        this.AUDIO.remove();
        this.AUDIO = null;
    }

    private ON_ENDED(callback?: () => void) {
        if (!this.AUDIO) return;
        this.REMOVE();
        if (callback) callback();
    }

    private ON_PAUSE(callback?: () => void) {
        if (!this.AUDIO) return;
        this.ON_ENDED();
        if (callback) callback();
    }

    private DEFAULT_EVENTS() {
        if (!this.AUDIO) return;
        this.AUDIO.onended = () => this.ON_ENDED();
        this.AUDIO.onpause = () => this.ON_PAUSE();
    }

    set onEnded(callback: () => void) {
        if (!this.AUDIO) return;
        this.AUDIO.onended = () => this.ON_ENDED(callback);
    }

    set onPlay(callback: () => void) {
        if (!this.AUDIO) return;
        this.AUDIO.onplay = callback;
    }

    set onPause(callback: () => void) {
        if (!this.AUDIO) return;
        this.AUDIO.onpause = () => this.ON_PAUSE(callback);
    }

    get audio() {
        if (!this.AUDIO) throw new Error("Audio not found");
        return this.AUDIO;
    }
}