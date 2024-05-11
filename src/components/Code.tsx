import clsx from "clsx";
import "./Code.css";

export function Code({
  code,
  highlightedLine,
}: Readonly<{
  code: string;
  highlightedLine: string;
}>) {
  const codeArray = code.split("\n");
  // Regular expression to capture content within double curly braces
  const variableInjectionRegex = /{{(.*?)}}/;
  const commentRegex = /\/\*(.*?)\*\//;

  return (
    <code id="code">
      {codeArray.map((line, i) => {
        let lineOfCode = line;
        let dynamicVariable;
        let comment = "";

        const commentMatches = line.match(commentRegex);
        // If a match is found, capture the text within the braces
        // and remove it (but save the value)
        if (commentMatches) {
          comment = commentMatches[0];
          lineOfCode = line.replace(comment, "");
        }

        const variableMatches = line.match(variableInjectionRegex);
        // If a match is found, capture the text within the braces
        // and remove it (but save the value)
        if (variableMatches) {
          const subString = variableMatches[0];
          dynamicVariable = variableMatches[1];
          lineOfCode = lineOfCode.replace(subString, "");
        }

        return (
          <div
            key={i}
            className={clsx({ highlight: comment.includes(highlightedLine) })}
          >
            {i !== 0 && <span className="line-number">{i}</span>}
            <span className="loc">{lineOfCode}</span>
            {dynamicVariable && (
              <span className="dynamic">{dynamicVariable}</span>
            )}
          </div>
        );
      })}
    </code>
  );
}
