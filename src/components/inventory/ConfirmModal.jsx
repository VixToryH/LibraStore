import styles from './ConfirmModal.module.css'


function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className={styles.overlay}>
        <div className={styles.modal}>
          <p className={styles.message}>{message}</p>
          <div className={styles.actions}>
            <button className={styles.btnConfirm} onClick={onConfirm}>Так, видалити</button>
            <button className={styles.btnCancel} onClick={onCancel}>Скасувати</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default ConfirmModal