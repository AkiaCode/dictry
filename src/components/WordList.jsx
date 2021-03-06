import { lazy, For, Match } from 'solid-js'
import styles from '../App.module.css'

const Box = lazy(() => import('./Box'))
const Fallback = lazy(() => import('./Fallback'))

export default function WordList(props /** lists: Array<Array<String>>, word: Array<String> */) {

    return (
        <div>
            {props.lists.map((list, _) => {
                return <div className={styles.wordList}>
                    <For each={list} fallback={<Fallback/>}>
                        {(word, index) => {
                            return <Switch fallback={<Fallback/>}>
                                <Match when={word === props.word[index()]}>
                                    <Box answer={true} />
                                </Match>
                                <Match when={word === null}>
                                    <Box answer={null} />
                                </Match>
                                <Match when={word !== props.word[index()] && word !== null}>
                                    <Box answer={false} />
                                </Match>
                            </Switch>
                        }}
                    </For>
                </div>
            })}
        </div>
    )
}