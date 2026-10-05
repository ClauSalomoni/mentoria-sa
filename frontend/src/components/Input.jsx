import styles from './Input.module.css'

export default function Input({
    label, type, value, onChange, placeholder, required = false }) {
        return (
            <div className={styles.inputContainer}>
                <label className={styles.label}></label>
                <input
                className={styles.inputField}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required} 
                label={label}               
                
                />
            </div>
    );
}