import React, { useState, useEffect } from 'react';

const AnimatedTransition = ({
  children,
  type = 'fade',
  duration = 300,
  show = true,
  onExited = () => {},
}) => {
  const [isVisible, setIsVisible] = useState(show);
  const [isAnimating, setIsAnimating] = useState(false);

  const getAnimationClasses = (animationType, visible, animating) => {
    const baseClasses = 'transition-all duration-300 ease-in-out';
    
    if (!visible) return 'opacity-0 scale-95';
    
    switch (animationType) {
      case 'fade':
        return `${baseClasses} opacity-100`;
      case 'slide-up':
        return `${baseClasses} opacity-100 translate-y-0`;
      case 'slide-down':
        return `${baseClasses} opacity-100 translate-y-0`;
      case 'slide-left':
        return `${baseClasses} opacity-100 translate-x-0`;
      case 'slide-right':
        return `${baseClasses} opacity-100 translate-x-0`;
      case 'scale':
        return `${baseClasses} opacity-100 scale-100`;
      default:
        return `${baseClasses} opacity-100`;
    }
  };

  useEffect(() => {
    let timeoutId;
    
    if (show && !isVisible) {
      setIsVisible(true);
      setIsAnimating(true);
      
      timeoutId = setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    } else if (!show && isVisible) {
      setIsAnimating(true);
      
      timeoutId = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        onExited();
      }, duration);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [show, isVisible, duration, onExited]);

  if (!isVisible && !show) return null;

  const animationClasses = getAnimationClasses(type, show, isAnimating);

  return (
    <div className={animationClasses}>
      {children}
    </div>
  );
};

export default AnimatedTransition;