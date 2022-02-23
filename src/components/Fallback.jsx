export default function Fallback(props /** onClick: function or null */) {
    return <div onClick={(e) => { props.onClick && props.onClick(e) }}>
        The cat touched the wire.
        {props.children && props.children}
    </div>
}