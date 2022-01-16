import "@/assets/style.pcss";
import "@/assets/spinner.pcss";

import { logger } from "@loadelayed/utils";

export interface ShowLoaderOptions {
  full: boolean;
  hideContent: boolean;
  spinnerPosition:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}

export interface HideLoaderOptions {
  removeLoadingData: boolean;
  removeDatasets: boolean;
}

const loadelayed = {
  /**
   * Show loader
   */
  show(
    el: HTMLElement = document.body,
    options: Partial<ShowLoaderOptions> = {
      full: false,
      spinnerPosition: "center",
      hideContent: true,
    }
  ) {
    // TODO: el null check
    let { width, height } = el.getBoundingClientRect();
    width = Math.round(width);
    height = Math.round(height);
    logger.debug("loadelayed/open", `w: ${width}px, h: ${height}px.`);

    el.setAttribute("id", "loadelayed");
    el.style.setProperty("--loadelayed-container-width", ` ${width}px`);
    el.style.setProperty("--loadelayed-container-height", ` ${height}px`);

    el.dataset.loadelayedSpinnerPosition = options?.spinnerPosition ?? "center";
    logger.debug(
      "loadelayed/open",
      `spinner position: ${options?.spinnerPosition ?? "center"}`
    );
    el.dataset.loadelayedLoading = "true";

    el.dataset.loadelayedHideContent =
      (options?.hideContent ? "true" : "") ?? "true";
    logger.debug(
      "loadelayed/open",
      `is content hide? ${options?.hideContent ?? false}`
    );

    /**
     * This looks like this:
     * @example
     * ```html
     * <span id="loadelayed-spinner base"></span>
     * ```
     */
    const spinner = document.createElement("span");
    spinner.setAttribute("id", "loadelayed-spinner");

    if (height <= 20 || width <= 20) {
      spinner.dataset.loadelayedSpinnerSize = "3xs";
    } else if (height <= 30 || width <= 30) {
      spinner.dataset.loadelayedSpinnerSize = "2xs";
    } else if (height <= 40 || width <= 40) {
      spinner.dataset.loadelayedSpinnerSize = "xs";
    } else if (height <= 50 || width <= 50) {
      spinner.dataset.loadelayedSpinnerSize = "sm";
    } else {
      spinner.dataset.loadelayedSpinnerSize = "base";
    }
    logger.debug(
      "loadelayed/open",
      `spinner size: ${spinner.dataset.loadelayedSpinnerSize}`
    );

    el.appendChild(spinner);

    if (options?.full ?? false) el.classList.add("loadelayed-full");
    logger.debug("loadelayed/open", `is full? ${options?.full ?? false}`);
  },

  /**
   * Hide loader
   */
  hide(
    el: HTMLElement = document.body,
    options: HideLoaderOptions = {
      removeLoadingData: false,
      removeDatasets: false,
    }
  ) {
    // TODO: el null check

    // Remove loading dataset. Optionally remove dataset attribute.
    el.dataset.loadelayedLoading = "false";
    if (options?.removeLoadingData ?? false)
      el.removeAttribute("data-loadelayed-loading");

    // Remove loader datasets. Optionally remove dataset attribute.
    Object.entries(el.dataset).map(([key, value]) => {
      if (key.startsWith("loadelayed") && !!value) {
        if (options?.removeDatasets ?? false) {
          delete el.dataset[key];
        } else {
          el.dataset[key] = "";
        }
      }
    });

    // Remove loader's id attribute
    el.removeAttribute("id");

    // Remove css variables
    el.style.removeProperty("--loadelayed-container-width");
    el.style.removeProperty("--loadelayed-container-height");

    // Remove spinner from container.
    const spinner = el.querySelector("#loadelayed-spinner");
    if (!!spinner) el.removeChild(spinner);

    // Remove loader classes
    Array.from(el.classList).map((className) => {
      if (className.startsWith("loadelayed-")) {
        el.classList.remove(className);
      }
    });
  },

  /**
   * Show and hide loader via async functions.
   * @throws if the {@link callback} is rejected together with the reason, the reason is thrown as an {@link Error error}.
   */
  asyncShow(
    el: HTMLElement = document.body,
    callback: () => Promise<any>,
    options: { show: ShowLoaderOptions; hide: HideLoaderOptions } = {
      show: {
        full: false,
        hideContent: true,
        spinnerPosition: "center",
      },
      hide: {
        removeDatasets: false,
        removeLoadingData: false,
      },
    }
  ): void {
    this.show(el, options.show);

    callback()
      .then(() => {
        this.hide(el, options.hide);
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  },
};

declare global {
  interface Window {
    loadelayed: typeof loadelayed;
  }
}

window.loadelayed = loadelayed;
export default loadelayed;
