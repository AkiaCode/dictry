import { lazy, ErrorBoundary, createSignal, createEffect  } from 'solid-js'
import styles from '../App.module.css'

const WordList = lazy(() => import('../components/WordList'))
const InputModel = lazy(() => import('../components/InputModel'))
const GameOverPopup = lazy(() => import('../components/GameOverPopup'))
const Fallback = lazy(() => import('../components/Fallback'))


export default function GameModel(props /** game { meaning: String, word: String, lists: Array<Array<String> } */) {
    const [input, setInput] = createSignal(null)
    const [lists, setLists] = createSignal(props.game.lists ? props.game.lists : [Array(props.game.word.length).fill(null), Array(props.game.word.length).fill(null), Array(props.game.word.length).fill(null)])
    const [currentNumber, setCurrentNumber] = createSignal(1)
    const [isGameOver, setIsGameOver] = createSignal(localStorage.getItem('dictry-game') !== null ? props.game.isGameOver : null)

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
                setIsGameOver('lose')
                setCurrentNumber(1)
            }
            if (input() === props.game.word) {
                setIsGameOver('win')
                setCurrentNumber(1)
            }
            setInput(null)
        } else if (isGameOver() && localStorage.getItem('dictry-game') === null) {
            localStorage.setItem('dictry-game',  JSON.stringify({ game: { ...props.game, lists: lists(), isGameOver: isGameOver(), lastPlayed: new Date().valueOf() }}))
        }
    })

    return (
        <section className={styles.section}>
            <ErrorBoundary fallback={(err, reset) => <Fallback onClick={reset}><br/>{err.toString()}</Fallback>}>
                <div className={styles.meaning}>{props.game.meaning}</div>
                <WordList lists={lists()} word={props.game.word.split('')}/>
                <InputModel wordLength={props.game.word.length} input={input} setInput={setInput} isGameOver={isGameOver()}/>
                {(isGameOver() === 'lose' || isGameOver() === 'win') && <div style={{ 'font-size': '4.75vh', padding: '16px' }}>Word: {props.game.word}</div> }
                {(isGameOver() === 'lose' || isGameOver() === 'win') && <GameOverPopup nextday={props.game.nextday} isGameOver={isGameOver()}/> }
            </ErrorBoundary>
        </section>
    )
}