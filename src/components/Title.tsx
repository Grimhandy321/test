
import React from 'react';

interface TitleProps {
  text: string;  
  color?: string; 

}
export const Title: React.FC<TitleProps> = ({ text, color }) => {
  return (
    <h2 style={{ color: color || 'black' }}>
      {text}
    </h2>
  );
};
