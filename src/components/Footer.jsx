import styles from '../App.module.css'

export default function Footer() {
    return (
    <footer className={styles.footer} role="contentinfo">
        { /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? null :<div className={styles.license}>
            Inspired by <a className={styles.licenseLink} href='https://www.nytimes.com/games/wordle/index.html'>Wordle</a>
            <br/>
            There is no age, race, or gender in <a className={styles.licenseLink} href='https://www.khanacademy.org/'>learning</a>.
            <br/>
            Princeton University "About WordNet." <a className={styles.licenseLink} href='https://wordnet.princeton.edu/'>WordNet</a>. Princeton University. 2010.
        </div>}
        Copyright 2022. Ratry. All rights reserved.
    </footer>
  )
}