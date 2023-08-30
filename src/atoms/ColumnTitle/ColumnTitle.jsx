import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const ColumnTitle = ({ column }) => (
  <h3 className={styles.columnTitle}>
    {column.title}
    {column.tasks.length > 0 && <span>: {column.tasks.length}</span>}
  </h3>
);

ColumnTitle.propTypes = {
  column: PropTypes.object,
};
