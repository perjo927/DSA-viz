import "./Code.css";

export function Code({
  code,
  highlightedLine,
}: {
  code: string;
  highlightedLine: string | null;
}) {
  const codeArray = code.split("\n");
  // Regular expression to capture content within double curly braces
  const variableInjection = /{{(.*?)}}/;

  return (
    <code id="code">
      {codeArray.map((line, i) => {
        let lineOfCode = line;
        let dynamicVariable;

        const matches = line.match(variableInjection);
        // If a match is found, capture the text within the braces
        // and remove it (but save the value)
        if (matches) {
          const subString = matches[0];
          dynamicVariable = matches[1];
          lineOfCode = line.replace(subString, "");
        }

        return (
          <div
            key={i}
            className={
              lineOfCode.includes(highlightedLine ?? "-1") ? "highlight" : ""
            }
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
