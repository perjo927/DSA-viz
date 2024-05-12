import { JSX } from "react";

export const DetailsWrapper = ({
  summary,
  children,
  open = false,
}: {
  summary: string;
  open: boolean;
  children?: JSX.Element;
}) => {
  return (
    <details open={open}>
      <summary>{summary}</summary>
      {children}
    </details>
  );
};
