import React from "react";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeReact from "rehype-react";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeReact, {
    createElement: React.createElement,
    components: {
    }
  });

const View = ({ value }) => (
  <div>{processor.processSync(value).result}</div>
);

export default View;
