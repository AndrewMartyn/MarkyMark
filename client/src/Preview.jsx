import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkReact from "remark-react";
import RemarkCode from "./remark-code";
import { defaultSchema } from "hast-util-sanitize";
import "github-markdown-css/github-markdown.css";
import "./Preview.css";

const schema = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema.attributes?.code || []), "className"],
    },
};

const Preview = ({ doc }) => {
    const md = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkReact, {
            createElement: React.createElement,
            sanitize: schema,
            remarkReactComponents: {
                code: RemarkCode,
            },
        })
        .processSync(doc).result;

    return <div className="preview markdown-body">{md}</div>;
};

export default Preview;
