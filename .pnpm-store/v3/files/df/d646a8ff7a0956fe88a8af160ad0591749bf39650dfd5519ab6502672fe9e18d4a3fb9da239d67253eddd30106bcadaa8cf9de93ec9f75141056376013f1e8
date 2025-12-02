var stylesheets = {},
  injectStyles = function (param) {
    var {
        filePath,
        css
      } = param,
      stylesheet = stylesheets[filePath];
    if (!stylesheet) {
      var styleEl = document.createElement("style");
      styleEl.setAttribute("data-file", filePath), styleEl.setAttribute("type", "text/css"), stylesheet = stylesheets[filePath] = styleEl, document.head.appendChild(styleEl);
    }
    stylesheet.innerHTML = css;
  };
export { injectStyles };
//# sourceMappingURL=inject-styles.native.js.map
