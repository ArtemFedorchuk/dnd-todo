import { Button } from '@mui/base/Button';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const MyButton = ({ onClick, variant = 'primary', text }) => {
  if (variant === 'error') {
    return (
      <Button className={`${styles.baseButton} ${styles.error}`} onClick={onClick}>
        {text}
      </Button>
    );
  }

  if (variant === 'secondary') {
    return (
      <Button className={`${styles.baseButton} ${styles.secondary}`} onClick={onClick}>
        {text}
      </Button>
    );
  }

  return (
    <Button className={`${styles.baseButton} ${styles.primary}`} onClick={onClick}>
      {text}
    </Button>
  );
};

MyButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
};
