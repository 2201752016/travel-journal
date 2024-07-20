export default function Button(props){
    const {children, type, className, onClick, disabled} = props
    return(
        <button type={type} className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}