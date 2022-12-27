export interface IAudioItem {
    id: string;
    name: string;
    src: string;
}

export interface CHTMLAudioElement extends HTMLAudioElement {
    onended: (callBack: (...any) => unknown) => ((this: GlobalEventHandlers, ev: Event) => any) | null;
}
