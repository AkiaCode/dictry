import styles from '../App.module.css'

export default function InputModel(props /** wordLength: number, input: function, setInput: function, isGameOver: boolean */) {
    return (
        <input className={styles.input} value={props.input()} placeholder="Write down the answer."  type={ props.isGameOver ? 'hidden' : 'text' } maxlength={props.wordLength} onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim().length === props.wordLength) return props.setInput(e.currentTarget.value)
        }}/>
    )
}