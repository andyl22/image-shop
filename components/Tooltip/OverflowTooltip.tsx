import React, { ReactNode, useEffect, useState, useRef } from "react";
import styles from "./OverflowTooltip.module.scss";
import Tooltip from "./Tooltip";

interface Props {
  children: ReactNode | ReactNode[];
  tooltipContent: string;
}

export default function OverflowToolTip(props: Props) {
  const { children, tooltipContent } = props;
  const [isOverflowed, setOverflowed] = useState(false);

  const containerRef = useRef(null);

  const mappedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const props = { ...child.props, className: styles.overFlowContainer, ref: containerRef }
      return React.cloneElement(child, props)
    }
  })

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current as HTMLDivElement;
      setOverflowed(container.scrollWidth > container.clientWidth)
    }
  }, [])

  return (
    <Tooltip tooltipContent={tooltipContent} enableTooltip={isOverflowed}>
      {mappedChildren}
    </Tooltip>
  )
}