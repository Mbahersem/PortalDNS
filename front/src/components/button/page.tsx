import React, { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ to, children, className, icon }) => {
  return (
    <Link href={to}>
      <button
        className={`flex items-center bg-custom-color hover:bg-custom-color-dark text-white font-bold py-2 px-4 rounded ${className}`}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </button>
    </Link>
  );
};

export default Button;