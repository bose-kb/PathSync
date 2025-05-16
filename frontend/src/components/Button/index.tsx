import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  primary = false, 
  className = '',
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded transition-colors duration-200 cursor-pointer
        ${primary 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;