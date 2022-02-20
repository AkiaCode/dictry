import { lazy, ErrorBoundary, createSignal, createEffect, createResource  } from 'solid-js'
import styles from '../App.module.css'

const WordList = lazy(() => import('../components/WordList'))
const InputModel = lazy(() => import('../components/InputModel'))


export default function GameModel(props /** meaning: String, word: String */) {
    const [input, setInput] = createSignal(null)
    const [lists, setLists] = createSignal([Array(props.word.length).fill(null), Array(props.word.length).fill(null), Array(props.word.length).fill(null)])
    const [currentNumber, setCurrentNumber] = createSignal(1)
    const [isGameOver, setIsGameOver] = createSignal(false)

    createEffect(() => {
        if (input() !== null) {
            if (currentNumber() === 1) {
                setLists([input().split(''), lists()[1], lists()[2]])
                setCurrentNumber(2)
            } else if (currentNumber() === 2) {
                setLists([lists()[0], input().split(''), lists()[2]])
                setCurrentNumber(3)
            } else {
                setLists([lists()[0], lists()[1], input().split('')])
                setIsGameOver(true)
            }
            if (input() === props.word) {
                setIsGameOver(true)
            }
            setInput(null)
        }
    })

    return (
        <section className={styles.section}>
            <ErrorBoundary fallback={(err, reset) => <div onClick={reset}>The cat touched the wire.<br/>{err.toString()}</div>}>
                <div style={{ 'font-size': '3.75vh', margin: '18.5px', overflow: 'auto', 'text-overflow': 'ellipsis', 'text-align': 'center', 'font-size': '3.75vh' }}>{props.meaning}</div>
                <WordList lists={lists()} word={props.word.split('')}/>
                <InputModel wordLength={props.word.length} input={input} setInput={setInput} isGameOver={isGameOver()}/>
                {isGameOver() ? <p style={{ 'margin': '25px', 'font-size': '3.65vh' }} onClick={(_) => { setIsGameOver(false); setLists([Array(props.word.length).fill(null), Array(props.word.length).fill(null), Array(props.word.length).fill(null)]); setCurrentNumber(1) }}>Game Over</p> : null}
            </ErrorBoundary>
        </section>
    )
}