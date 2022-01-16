/**
 *
 */
function _msgTypeToStr(message: unknown): string {
  if (typeof message === "string") {
    return `%s`;
  } else if (typeof message === "number") {
    return `%d`;
  } else {
    return `%o`;
  }
}

export default {
  /**
   *
   */
  debug(topic: string, message: unknown): void {
    console.debug(
      `%cDEBUG%c %c${topic}%c: ${_msgTypeToStr(message)}`,
      "background-color: #333; color: #EEE; border-radius: 5px; padding-left: 6px; padding-right: 6px",
      "",
      "background-color: #475fff; color: #DDD; border-radius: 5px; padding-left: 6px; padding-right: 6px",
      "",
      message
    );
  },

  /**
   *
   * @param {string} topic
   * @param {unknown} message
   */
  info(topic: string, message: unknown): void {
    console.info(
      `%cINFO%c %c${topic}%c: ${_msgTypeToStr(message)}`,
      "background-color: #02d0ff; color: #EEE; border-radius: 5px; padding-left: 6px; padding-right: 6px",
      "",
      "background-color: #475fff; color: #DDD; border-radius: 5px; padding-left: 6px; padding-right: 6px",
      "",
      message
    );
  },

  /**
   *
   * @param {string} topic
   * @param {unknown} message
   */
  warn(topic: string, message: unknown): void {
    console.warn(
      `%cWARN%c %c${topic}%c: ${_msgTypeToStr(message)}`,
      "background-color: #ffa602; color: #EEE; border-radius: 5px; padding-left: 6px; padding-right: 6px",
      "",
      "background-color: #475fff; color: #DDD; border-radius: 5px; padding-left: 6px; padding-right: 6px",
      "",
      message
    );
  },

  /**
   *
   * @param {string} topic
   * @param {unknown} message
   */
  error(topic: string, message: unknown): void {
    console.error(
      `%cERROR%c %c${topic}%c: ${_msgTypeToStr(message)}`,
      "background-color: #fc2d53; color: #EEE; border-radius: 5px; padding-left: 6px; padding-right: 6px",
      "",
      "background-color: #475fff; color: #DDD; border-radius: 5px; padding-left: 6px; padding-right: 6px",
      "",
      message
    );
  },
};
