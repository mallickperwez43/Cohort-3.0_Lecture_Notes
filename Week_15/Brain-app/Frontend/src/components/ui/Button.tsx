import type { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
};

const variantStyles = {
    "primary": "bg-btn-primary-bg text-btn-primary-text hover:bg-opacity-90",
    "secondary": "bg-btn-secondary-bg text-btn-secondary-text hover:bg-opacity-90"
};

const sizeStyles = {
    "sm": "px-2 py-1 text-sm",
    "md": "px-4 py-2 text-md",
    "lg": "px-6 py-3 text-lg"
};

const defaultStyles = "rounded-md m-1.5 gap-2 cursor-pointer flex items-center";

export const Button = ({ variant, size, text, startIcon, endIcon, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${variantStyles[variant]} ${defaultStyles} ${sizeStyles[size]}`}
        >
            {startIcon && <span>{startIcon}</span>}
            {text}
            {endIcon && <span>{endIcon}</span>}
        </button >
    );
}