import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

const SlideTransition = ({ animation, children, duration }) => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  const defaultStyle = {
    transition: `all ${duration}ms`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const transformStyles = {
    "slide-left": {
      entering: { transform: "translateX(30px)" },
      entered: { transform: "translateX(0)" },
      exiting: { transform: "translateX(-30px)" },
      exited: { transform: "translateX(-30px)" },
    },
    "slide-right": {
      entering: { transform: "translateX(-30px)" },
      entered: { transform: "translateX(0)" },
      exiting: { transform: "translateX(30px)" },
      exited: { transform: "translateX(30px)" },
    },
    "slide-up": {
      entering: { transform: "translateY(-30px)" },
      entered: { transform: "translateY(0)" },
      exiting: { transform: "translateY(-30px)" },
      exited: { transform: "translateY(-30px)" },
    },
    "slide-down": {
      entering: { transform: "translateY(-50px)" },
      entered: { transform: "translateY(0)" },
      exiting: { transform: "translateY(-50px)" },
      exited: { transform: "translateY(-50px)" },
    },
    "shelf-up": {
      entering: { transform: "translateY(30px)" },
      entered: { transform: "translateY(0)" },
      exiting: { transform: "translateY(30px)" },
      exited: { transform: "translateY(30px)" },
    },
    "shelf-down": {
      entering: { transform: "translateY(-30px)" },
      entered: { transform: "translateY(0)" },
      exiting: { transform: "translateY(-30px)" },
      exited: { transform: "translateY(-30px)" },
    },
  };

  return (
    <Transition in={inProp} timeout={duration} appear>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
            ...transformStyles[animation][state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export default SlideTransition;
