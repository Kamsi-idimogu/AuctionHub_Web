import React from 'react';
import default_style from '../styles/Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    style?: React.CSSProperties;
}

const Button = ({children, className, style, onClick }:ButtonProps) => {
    return (
        <nav onClick={onClick} style={style} className={`${default_style.btn} ${className}`}>
            {children}
        </nav>
    )
}

export default Button
