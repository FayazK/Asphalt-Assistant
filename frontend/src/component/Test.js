import React, { useState } from 'react';

const ClickableComponent = () => {
  // Step 1: Define state
  const [isVisible, setIsVisible] = useState(false);

  // Step 2: Toggle function
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {/* Step 3: Render content conditionally */}
      <button onClick={toggleVisibility}>Toggle Content</button>
      {isVisible && <p>This content appears when the button is clicked!</p>}
    </div>
  );
};

export default ClickableComponent;
