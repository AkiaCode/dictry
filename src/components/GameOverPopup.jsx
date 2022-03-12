import { lazy, createSignal, onCleanup, createEffect } from 'solid-js'

const Popup = lazy(() => import('../components/Popup'))

export default function GameOverPopup(props /** nextday: Number, isGameOver: 'win' or 'lose' */) {
    const [CountDown, setCountDown] = createSignal(props.nextday - new Date().getTime())

    const timer = setInterval(() => setCountDown(CountDown() - 1000), 1000)
    onCleanup(() => { clearInterval(timer) })

    createEffect(() => {
        if (CountDown() <= 0) {
            if (localStorage.getItem('dictry-game') !== null) {
                localStorage.setItem(`${Date.now()}-dictry`, localStorage.getItem('dictry-game'))
                localStorage.removeItem('dictry-game')
            }
            location.reload()
        }
    })

    return (
        <Popup
            header="Game Over"
            message={ <>
                Next day: {new Date(CountDown()).getHours()}:{new Date(CountDown()).getMinutes()}:{new Date(CountDown()).getSeconds()}
                <br/>
                {props.isGameOver === 'win' ? 'You win!' : 'You lose!'}
                <br/>
                {/**<div style={{  padding: '8px', border: '3px dashed #ee7f2d', 'border-radius': '16px' }}>Shrae your score!</div>*/}
            </> }
            footer="Okay"
            isOpen={true}
        />
    )
}
