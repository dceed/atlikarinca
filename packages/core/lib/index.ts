import { logger, Unit } from "@loadelayed/utils";

export type LoadelayedOptionSpinnerPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type LoadelayedOptionSpinnerSize = "3xs" | "2xs" | "xs" | "sm" | "base";

export interface LoadelayedSpinnerOptions<
  S = LoadelayedOptionSpinnerSize,
  P = LoadelayedOptionSpinnerPosition
> {
  getSpinnerSize?: (
    width: number,
    height: number
  ) => { size: S; spinnerWidth: Unit; spinnerHeight: Unit; borderWidth: Unit };
  position?: P;
}

export interface LoadelayedShowLoaderOptions {
  /**
   * default: `false`
   */
  full: boolean;
  spinner: LoadelayedSpinnerOptions;
}

export class Loadelayed<E extends HTMLElement> {
  element: E;

  static defaultOptions: { show: Partial<LoadelayedShowLoaderOptions> } = {
    show: {
      full: false,
      spinner: {
        position: "center",
        getSpinnerSize: (width, height) => {
          if (height <= 20 || width <= 20) {
            return {
              size: "3xs",
              spinnerWidth: "1rem",
              spinnerHeight: "1rem",
              borderWidth: "0.2rem",
            };
          } else if (height <= 30 || width <= 30) {
            return {
              size: "2xs",
              spinnerWidth: "1.5rem",
              spinnerHeight: "1.5rem",
              borderWidth: "0.375rem",
            };
          } else if (height <= 40 || width <= 40) {
            return {
              size: "xs",
              spinnerWidth: "2rem",
              spinnerHeight: "2rem",
              borderWidth: "0.5rem",
            };
          } else if (height <= 50 || width <= 50) {
            return {
              size: "sm",
              spinnerWidth: "2.5rem",
              spinnerHeight: "2.5rem",
              borderWidth: "0.5rem",
            };
          } else {
            return {
              size: "base",
              spinnerWidth: "3rem",
              spinnerHeight: "3rem",
              borderWidth: "0.5rem",
            };
          }
        },
      },
    },
  };

  constructor(element: E | null) {
    if (!element || !document.body.contains(element)) {
      throw new Error(
        "The element is not in the DOM. Please provide a valid element."
      );
    }
    this.element = element;
  }

  static setDefaultShowOptions(options: Partial<LoadelayedShowLoaderOptions>) {
    this.defaultOptions.show = options;
  }

  /**
   * Show loader
   */
  show(
    options: Partial<LoadelayedShowLoaderOptions> = Loadelayed.defaultOptions
      .show
  ) {
    this.hide();
    logger.debug("loadelayed/show", options);

    /**
     * This looks like this:
     * ```html
     * <div data-loadelayed-loader>
     *    <span class="loadelayed-spinner"></span>
     * </div>
     * ```
     */
    const container = document.createElement("div");

    let { width, height } = this.element.getBoundingClientRect();
    width = Math.round(width);
    height = Math.round(height);

    container.dataset.loadelayedLoader = "";
    container.dataset.loadelayedLoaderSpinnerPosition =
      options?.spinner?.position ?? "center";
    container.style.setProperty("--loadelayed-loader-width", ` ${width}px`);
    container.style.setProperty("--loadelayed-loader-height", ` ${height}px`);

    if (options?.full ?? false) {
      container.dataset.loadelayedLoaderFullscreen = "";
      container.style.setProperty("--loadelayed-loader-width", ` 100vw`);
      container.style.setProperty("--loadelayed-loader-height", ` 100vh`);
    }

    /**
     * This looks like this:
     * ```html
     * <span data-loadelayed-loader-spinner data-loadelayed-loader-spinner-size="base"></span>
     * ```
     */
    const spinner = document.createElement("span");
    spinner.dataset.loadelayedLoaderSpinner = "";

    const spinnerSize = options?.spinner?.getSpinnerSize?.(width, height);
    if (spinnerSize) {
      spinner.style.setProperty(
        "--loadelayed-loader-spinner-width",
        ` ${spinnerSize.spinnerWidth}`
      );
      spinner.style.setProperty(
        "--loadelayed-loader-spinner-height",
        ` ${spinnerSize.spinnerHeight}`
      );
      spinner.style.setProperty(
        "--loadelayed-loader-spinner-border-width",
        ` ${spinnerSize.borderWidth}`
      );
    }

    container.appendChild(spinner);
    this.element.appendChild(container);
  }

  /**
   * Hide loader
   */
  hide() {
    if (document.body.dataset.loadelayedLoaderFullscreen) {
      document.body.removeAttribute("data-loadelayed-loader-fullscreen");
    }

    const loader = this.element.querySelector("[data-loadelayed-loader]");
    if (loader) {
      this.element.removeChild(loader);
      logger.debug("loadelayed/hide", "Loader removed.");
    }
  }

  /**
   * Show and hide loader via async functions.
   * @throws if the {@link callback} is rejected together with the reason, the reason is thrown as an {@link Error error}.
   */
  asyncShow(
    callback: () => Promise<any>,
    options: Partial<{ show: Partial<LoadelayedShowLoaderOptions> }> = {
      show: Loadelayed.defaultOptions.show,
    }
  ): void {
    this.show(options.show);

    callback()
      .then(() => {
        this.hide();
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
}

declare global {
  interface Window {
    loadelayed: typeof Loadelayed;
  }
}

export default Loadelayed;
