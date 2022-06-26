import { LanguageSupport, LanguageDescription } from "@codemirror/language";
import { markdown } from "@codemirror/lang-markdown";

const markdownLanguage = markdown({
  codeLanguages: [
    LanguageDescription.of({
      name: "javascript",
      alias: ["js", "jsx"],
      async load() {
        const { javascriptLanguage } = await import(
          "@codemirror/lang-javascript"
        );
        return new LanguageSupport(javascriptLanguage);
      }
    }),
    LanguageDescription.of({
      name: "css",
      async load() {
        const { cssLanguage } = await import("@codemirror/lang-css");
        return new LanguageSupport(cssLanguage);
      }
    }),
    LanguageDescription.of({
      name: "json",
      async load() {
        const { jsonLanguage } = await import("@codemirror/lang-json");
        return new LanguageSupport(jsonLanguage);
      }
    }),
    LanguageDescription.of({
      name: "html",
      alias: ["htm"],
      async load() {
        const { jsxLanguage } = await import("@codemirror/lang-javascript");
        const javascript = new LanguageSupport(jsxLanguage);
        const { cssLanguage } = await import("@codemirror/lang-css");
        const css = new LanguageSupport(cssLanguage);
        const { htmlLanguage } = await import("@codemirror/lang-html");

        return new LanguageSupport(htmlLanguage, [css, javascript]);
      }
    })
  ]
});

export default markdownLanguage;
