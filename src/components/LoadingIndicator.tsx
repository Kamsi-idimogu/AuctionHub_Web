import React from 'react';
import styles from '../styles/LoadingIndicator.module.css';
import Image from 'next/image';

interface Props {
    width?: number;
    height?: number;
}

const LoadingIndicator = ({ width, height }:Props) => {
  return (
    <div className={styles.spinner}>
      <Image src={"/svgs/loading.svg"} width={width || 25} height={height || 25} alt="loading..."/>
    </div>
  );
};

export default LoadingIndicator;
