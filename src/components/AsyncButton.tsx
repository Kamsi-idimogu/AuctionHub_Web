import React, { useState, useEffect } from 'react';
import default_style from '../styles/Button.module.css';
import LoadingIndicator from './LoadingIndicator';

interface ButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    style?: React.CSSProperties;
    loadingSize?: number;
}

const AsyncButton = ({children, className, style, onClick, isLoading, loadingSize }:ButtonProps) => {
    return (
        <nav onClick={onClick} style={style} className={`${default_style.btn} ${className}`}>
            {isLoading ? <LoadingIndicator width={loadingSize || 30} height={loadingSize || 30}/> : children}
        </nav>
    )
}

export default AsyncButton;
