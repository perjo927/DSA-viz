import "./Code.css";

export function Code({
  code,
  highlightedLine,
}: {
  code: string;
  highlightedLine: string | null;
}) {
  const codeArray = code.split("\n"); //.filter(Boolean);

  return (
    <code>
      {codeArray.map((line, i) => {
        let lineOfCode = line;
        let dynamicVariable;

        // Regular expression to capture content within double curly braces
        const regex = /{{(.*?)}}/;
        const matches = line.match(regex);
        // If a match is found, capture the text within the braces
        if (matches) {
          const subString = matches[0];
          dynamicVariable = matches[1];
          lineOfCode = line.replace(subString, "");
        }

        return (
          <div
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
