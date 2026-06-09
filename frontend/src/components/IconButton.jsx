import styles from './IconButton.module.css'

export default function IconButton({
    titulo, 
    icon: Icon,
    onClick,
    type = "button",
    disabled = false
})  {
    //se icone sem texto:
    const isIconOnly = !titulo;

    return (
        <button 
        type={type}
        className={`${styles.button} ${isIconOnly ? styles.isIconOnly : ''}
        `}
        onClick={onClick}
        disabled={disabled}
        aria-label={isIconOnly ? "Ação do botão" : undefined}
        >

        {Icon && <Icon className={styles.iconElement} />}
        {titulo && <span className={styles.btnText}>{titulo}</span>}
        </button>
    );

}