import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export const Tooltip = ({ id, content }) => {
  if (!content) return null;

  return <ReactTooltip id={id} content={content} variant="error" />;
};
