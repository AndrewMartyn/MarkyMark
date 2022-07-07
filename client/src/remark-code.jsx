import React, { useEffect, useState } from "react";
import runmode, { getLanguage } from "./runmode";

const RemarkCode = (props) => {
    const [spans, setSpans] = useState([]);
    const { className } = props;
    const langName = (className || "").substr(9);

    useEffect(() => {
        getLanguage(langName).then((language) => {
            if (language) {
                const body =
                    props.children instanceof Array ? props.children[0] : null;
                const tokens = [];
                runmode(body, language, (text, style, _from, _to) => {
                    tokens.push({ text, style });
                });
                setSpans(tokens);
            }
        });
    }, [props.children]);

    if (spans.length > 0) {
        return (
            <code>
                {spans.map((span, i) => (
                    <span key={i} className={span.style || ""}>
                        {span.text}
                    </span>
                ))}
            </code>
        );
    } else {
        return <code>{props.children}</code>;
    }
};

export default RemarkCode;
