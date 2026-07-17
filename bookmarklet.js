/* Text Express 25.0 — carregador compacto */
(async () => {
  "use strict";

  const documentRef = document;
  const currentScript = documentRef.currentScript;
  const baseUrl = currentScript?.src
    ? new URL("./", currentScript.src).href
    : "https://king-programador.github.io/text-express/";
  const version = Date.now();
  const existingRoot = documentRef.getElementById("text-express-app");

  if (existingRoot && window.textExpressApp) {
    window.textExpressApp.toggleApp();
    return;
  }

  const openSeparateWindow = () => {
    if (
      window.confirm(
        "Esta página bloqueou a integração. Abrir o Text Express em uma janela separada?"
      )
    ) {
      window.open(baseUrl, "textExpress", "width=1100,height=760");
    }
  };

  try {
    if (!documentRef.getElementById("te-bookmarklet-style")) {
      const stylesheet = documentRef.createElement("link");
      stylesheet.id = "te-bookmarklet-style";
      stylesheet.rel = "stylesheet";
      stylesheet.href = `${baseUrl}styles.css?v=${version}`;
      (documentRef.head || documentRef.documentElement).appendChild(stylesheet);
    }

    if (!existingRoot) {
      const response = await fetch(`${baseUrl}index.html?v=${version}`, {
        cache: "no-store"
      });

      if (!response.ok) throw new Error(`HTML ${response.status}`);

      const parsed = new DOMParser().parseFromString(
        await response.text(),
        "text/html"
      );
      const interfaceRoot = parsed.getElementById("text-express-app");

      if (!interfaceRoot) throw new Error("Interface não encontrada");

      documentRef.body.insertAdjacentHTML(
        "beforeend",
        interfaceRoot.outerHTML
      );
    }

    if (window.TextExpressApp) {
      window.textExpressApp = new window.TextExpressApp(
        documentRef.getElementById("text-express-app")
      );
      window.textExpressApp.init();
      return;
    }

    const script = documentRef.createElement("script");
    script.src = `${baseUrl}app.js?v=${version}`;
    script.onerror = openSeparateWindow;
    (documentRef.head || documentRef.documentElement).appendChild(script);
  } catch (error) {
    console.error("Text Express:", error);
    openSeparateWindow();
  }
})();
