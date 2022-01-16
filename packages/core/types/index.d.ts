import "@/assets/style.pcss";
import "@/assets/spinner.pcss";
export interface ShowLoaderOptions {
    full: boolean;
    hideContent: boolean;
    spinnerPosition: "top" | "bottom" | "left" | "right" | "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
export interface HideLoaderOptions {
    removeLoadingData: boolean;
    removeDatasets: boolean;
}
declare const loadelayed: {
    /**
     * Show loader
     */
    show(el?: HTMLElement, options?: Partial<ShowLoaderOptions>): void;
    /**
     * Hide loader
     */
    hide(el?: HTMLElement, options?: HideLoaderOptions): void;
    /**
     * Show and hide loader via async functions.
     * @throws if the {@link callback} is rejected together with the reason, the reason is thrown as an {@link Error error}.
     */
    asyncShow(el: HTMLElement | undefined, callback: () => Promise<any>, options?: {
        show: ShowLoaderOptions;
        hide: HideLoaderOptions;
    }): void;
};
declare global {
    interface Window {
        loadelayed: typeof loadelayed;
    }
}
export default loadelayed;
