export default function Input(props){
    const {type, name, label, id, disabled, defaultValue, onChange, className, required} = props
    return(
        <div>
            {label && <label htmlFor={name} className="">{label}</label>}
            <input className={className} onChange={onChange} placeholder={name} type={type} id={id} defaultValue={defaultValue} disabled={disabled} required={required}/>
        </div>
    )
}