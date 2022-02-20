import { lazy, createResource } from 'solid-js'
import { useRegisterSW } from 'virtual:pwa-register/solid'

const Header = lazy(() => import('./components/Header'))
const Footer = lazy(() => import('./components/Footer'))
const GameModel = lazy(() => import('./components/GameModel'))

function App() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
        console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
        console.log('SW registration error', error)
    },
  })


  const [wordTodayJson] = createResource(() => {
    return fetch(`https://dictry-serverless.vercel.app/api/v1/word/today`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Dictry': new Date().valueOf()
      }
    }).then((e) => e.json())
  })

  return (
    <div>
      <Header/>
        { wordTodayJson.loading ?
          <div style={{ 'text-align': 'center', 'font-size': '7.57vh' }}>Dancing with the cat...</div>
          : <GameModel word={wordTodayJson().word} meaning={wordTodayJson().glossary}/> }
      <Footer/>
    </div>
  );
}

export default App;