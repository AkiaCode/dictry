import { createSignal } from 'solid-js'
import styles from '../App.module.css'

export default function Popup(props /** isOpen: Boolean, header: String, message: String, footer: String, layoutCSS: String, onClick: function | null */) {
    const [isOpen, setIsOpen] = createSignal(props.isOpen)

    return (
        <div style={ isOpen() ? null : 'display: none;'} className={styles.layout}> {/*@once*/}
            <div className={styles.popup}>
                <div className={styles.popupHeader}>{props.header}</div>
                <div className={styles.popupMessage}>{props.message}</div>
                <div className={styles.popupFooter} onClick={(e) => { setIsOpen(false); props.onClick && props.onClick(e) }}>{props.footer}</div>
            </div>
        </div>
    )
}