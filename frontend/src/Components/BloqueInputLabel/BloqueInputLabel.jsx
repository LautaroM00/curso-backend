const BloqueInputLabel = ({label, forIdName, onChange}) => {
    return (
        <div>
            <label htmlFor={forIdName}>{label}</label>
            <input id={forIdName} name={forIdName} onChange={onChange} />
        </div>
    )
}

export default BloqueInputLabel