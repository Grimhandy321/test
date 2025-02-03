import React, { useState } from 'react';

export const BgColor: React.FC = () => {
  const [buttonColor, setButtonColor] = useState<string>('blue');
  const [bodyColor, setBodyColor] = useState<string>('white');

  const changeColor = () => {
    const newButtonColor = buttonColor === 'blue' ? 'green' : 'blue';
    const newBodyColor = bodyColor === 'white' ? 'lightgray' : 'white';
    
    setButtonColor(newButtonColor);
    setBodyColor(newBodyColor);
    document.body.style.backgroundColor = newBodyColor;
  };

  return (
    <div>
      <button
        style={{ backgroundColor: buttonColor, color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}
        onClick={changeColor}
      >
        Změnit barvu
      </button>
      <p>Aktuální barva tlačítka: {buttonColor}</p>
      <p>Aktuální barva pozadí stránky: {bodyColor}</p>
    </div>
  );
};

