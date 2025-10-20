(function () {
  "use strict";

  const words = ["northern", "eastern", "southern", "western"];

  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.nodeValue;
      let modified = false;

      words.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        if (regex.test(text)) {
          text = text.replace(regex, (match) => {
            // Preserve capitalization
            if (match[0] === match[0].toUpperCase()) {
              return "Fucking";
            }
            return "fucking";
          });
          modified = true;
        }
      });

      if (modified) {
        node.nodeValue = text;
      }
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.nodeName !== "SCRIPT" &&
      node.nodeName !== "STYLE"
    ) {
      node.childNodes.forEach((child) => replaceText(child));
    }
  }

  replaceText(document.body);

  // Watch for dynamic content changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE ||
          node.nodeType === Node.TEXT_NODE
        ) {
          replaceText(node);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
