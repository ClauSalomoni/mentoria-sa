import styles from './Button.module.css'

export default function Button({children, type= "button", disabled = false, loading = false, onClick, variant= 'default'}){
    const estiloBtn = variant === 'link' ? styles.linkButton : styles.btn

    return(
        <button
            className={estiloBtn}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? <span className={styles.loader}></span> : children}
        </button>
    );
}

