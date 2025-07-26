import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'default' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'default', className, ...props }) => {
    const baseStyle = "font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:brightness-95 active:brightness-90 tracking-wide";

    const styles = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-400 bg-transparent text-gray-700 hover:bg-gray-900 hover:text-white dark:border-gray-600 dark:text-gray-300 dark:hover:bg-white dark:hover:text-black"
    };

    return (
        <button
            className={`${baseStyle} ${styles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button; 