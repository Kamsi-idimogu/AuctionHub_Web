import React, { useState, useEffect } from 'react';
import default_style from '../styles/Button.module.css';
import LoadingIndicator from './LoadingIndicator';

interface ButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    style?: React.CSSProperties;
}

const AsyncButton = ({children, className, style, onClick, isLoading }:ButtonProps) => {
    return (
        <nav onClick={onClick} style={style} className={`${default_style.btn} ${className}`}>
            {isLoading ? <LoadingIndicator width={30} height={30}/> : children}
        </nav>
    )
}

export default AsyncButton;
