import styles from '../App.module.css'

export default function Box(props /** answer: boolean | (undefined or null) */) {
    return <div className={props.answer == null ? styles.question : props.answer ? styles.yes : styles.no}>
        { props.answer == null ? 'Q' : props.answer ? 'O' : 'X' }
    </div>
}