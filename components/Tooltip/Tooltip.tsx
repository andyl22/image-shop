import React, { ReactNode, useState } from "react";
import styles from "./Tooltip.module.scss";

interface Props {
  children: ReactNode | ReactNode[];
  tooltipContent: string;
  enableTooltip?: boolean;
}

export default function Tooltip(props: Props) {
  const { children, tooltipContent, enableTooltip } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    if (!enableTooltip) return;
    setShowTooltip(!showTooltip);
  }

  return (
    <div
      onMouseEnter={toggleTooltip}
      onMouseLeave={toggleTooltip}
      onFocus={toggleTooltip}
      onBlur={toggleTooltip}
      className={styles.tooltipContainer}
      aria-describedby="tooltip"
    >
      {showTooltip ? <p className={styles.tooltip} role="tooltip" id="tooltip">{tooltipContent}</p> : null}
      {children}
    </div>
  )
}