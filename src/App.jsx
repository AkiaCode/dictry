import { lazy } from 'solid-js'
import { createWordTodayResource } from './libs/create'

const Header = lazy(() => import('./components/Header'))
const Footer = lazy(() => import('./components/Footer'))
const GameModel = lazy(() => import('./components/GameModel'))
const TutorialPopup = lazy(() => import('./components/TutorialPopup'))
const Loading = lazy(() => import('./components/Loading'))

function App() {
  const wordTodayJson = createWordTodayResource()

  return (
    <>
      <Header/>
      <TutorialPopup/>
        { wordTodayJson.loading ? <Loading/>
        : <GameModel game={localStorage.getItem('dictry-game') !== null ? JSON.parse(localStorage.getItem('dictry-game')).game : wordTodayJson()}/> }
      <Footer/>
    </>
  );
}

export default App;