// useAnimation.js
import { useEffect, useState } from "react";

const useAnimation = ({triggerAnimation, setTriggerAnimation}) => {
  const [showAnimation, setShowAnimation] = useState(triggerAnimation);

  useEffect(() => {
    if (triggerAnimation) {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
        setTriggerAnimation(false);
      }, 400); // Adjust the duration of the animation to match the keyframes

      return () => clearTimeout(timer);
    }
  }, [triggerAnimation,setTriggerAnimation]);

  return showAnimation;
};

export default useAnimation;
