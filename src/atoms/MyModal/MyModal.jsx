import { Modal } from '@mui/base/Modal';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import styles from './styles.module.scss';

import { MyButton } from '../MyButton/MyButton';

const Backdrop = forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

Backdrop.displayName = 'Backdrop';

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

export const MyModal = ({ children, open, onClose, onConfirm, title }) => {
  return (
    <>
      {open && (
        <Backdrop className={styles.backdrop}>
          <Modal
            id={'Modal'}
            className={styles.modal}
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={onClose}
          >
            <div className={styles.modalContentWrapper}>
              <div>
                <div className={styles.modalHeader}>
                  <h3>{title}</h3>
                  <MyButton variant="secondary" text="x" onClick={onClose} />
                </div>
                {children}
              </div>
              <div className={styles.modalFooter}>
                <MyButton variant="secondary" text="Cancel" onClick={onClose} />
                <MyButton
                  variant="error"
                  text="Confirm"
                  onClick={() => {
                    onConfirm?.();
                    onClose?.();
                  }}
                />
              </div>
            </div>
          </Modal>
        </Backdrop>
      )}
    </>
  );
};

MyModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string.isRequired,
};
