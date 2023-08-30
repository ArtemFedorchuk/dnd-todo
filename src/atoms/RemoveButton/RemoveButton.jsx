import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const RemoveButton = ({ onClick }) => (
  <button className={styles.removeButton} onClick={() => onClick?.()}>
    Remove
  </button>
);

RemoveButton.propTypes = {
  onClick: PropTypes.func,
};
