import { lazy, createResource } from 'solid-js'

const Header = lazy(() => import('./components/Header'))
const Footer = lazy(() => import('./components/Footer'))
const GameModel = lazy(() => import('./components/GameModel'))

function App() {
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