import { Unit } from "@loadelayed/utils";
export declare type LoadelayedOptionSpinnerPosition = "top" | "bottom" | "left" | "right" | "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
export declare type LoadelayedOptionSpinnerSize = "3xs" | "2xs" | "xs" | "sm" | "base";
export interface LoadelayedSpinnerOptions<S = LoadelayedOptionSpinnerSize, P = LoadelayedOptionSpinnerPosition> {
    getSpinnerSize?: (width: number, height: number) => {
        size: S;
        spinnerWidth: Unit;
        spinnerHeight: Unit;
        borderWidth: Unit;
    };
    position?: P;
}
export interface LoadelayedShowLoaderOptions {
    /**
     * default: `false`
     */
    full: boolean;
    spinner: LoadelayedSpinnerOptions;
}
export declare class Loadelayed<E extends HTMLElement> {
    element: E;
    static defaultOptions: {
        show: Partial<LoadelayedShowLoaderOptions>;
    };
    constructor(element: E | null);
    static setDefaultShowOptions(options: Partial<LoadelayedShowLoaderOptions>): void;
    /**
     * Show loader
     */
    show(options?: Partial<LoadelayedShowLoaderOptions>): void;
    /**
     * Hide loader
     */
    hide(): void;
    /**
     * Show and hide loader via async functions.
     * @throws if the {@link callback} is rejected together with the reason, the reason is thrown as an {@link Error error}.
     */
    asyncShow(callback: () => Promise<any>, options?: Partial<{
        show: Partial<LoadelayedShowLoaderOptions>;
    }>): void;
}
declare global {
    interface Window {
        loadelayed: typeof Loadelayed;
    }
}
export default Loadelayed;
