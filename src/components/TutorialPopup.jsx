import { lazy } from 'solid-js'
import styles from '../App.module.css'

const Popup = lazy(() => import('../components/Popup'))

export default function TutorialPopup() {
    return (
        <Popup
            header="Tutorial"
            message="You have to guess the word according to the given meaning.\nIf you guess one word, you will be given a new word in 24 hours.The total chance is 3 times."
            footer="Good luck!"
            isOpen={Boolean(localStorage.getItem('tutorialIsOpen')) ? false : true}
            onClick={() => { localStorage.setItem('tutorialIsOpen', false) }}
        />
    )
}