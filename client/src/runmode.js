import { highlightTree } from "@lezer/highlight";
import { languages } from "@codemirror/language-data";
import { oneDarkHighlightStyle } from "@codemirror/theme-one-dark";

function runmode(textContent, language, callback) {
    const tree = language.parser.parse(textContent);
    let pos = 0;
    highlightTree(tree, oneDarkHighlightStyle.match, (from, to, classes) => {
        if (from > pos) {
            callback(textContent.slice(pos, from), null, pos, from);
        }
        callback(textContent.slice(from, to), classes, from, to);
        pos = to;
    });
    if (pos !== tree.length) {
        callback(textContent.slice(pos, tree.length), null, pos, tree.length);
    }
}

export function findLanguage(langName) {
    const i = languages.findIndex((lang) => {
        if (lang.alias.indexOf(langName) >= 0) {
            return true;
        }
    });
    if (i >= 0) {
        return languages[i];
    } else {
        return null;
    }
}

export async function getLanguage(langName) {
    const desc = findLanguage(langName);
    if (desc) {
        const langSupport = await desc.load();
        return langSupport.language;
    } else {
        return null;
    }
}

export default runmode;
