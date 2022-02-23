import { createResource } from 'solid-js'

export function createWordTodayResource() {
  const [wordTodayJson, { refetch }] = createResource(() => {
    return localStorage.getItem('dictry-game') !== null
    ? JSON.parse(localStorage.getItem('dictry-game'))
    : fetch(`https://dictry-serverless.vercel.app/api/v1/word/today`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Dictry': new Date().valueOf()
      }
    }).then((e) => e.json()).catch(_=>refetch())
  })

  return wordTodayJson
}