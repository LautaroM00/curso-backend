const BloqueInputLabel = ({label, forIdName}) => {
    return (
        <div>
            <label htmlFor={forIdName}>{label}</label>
            <input id={forIdName} name={forIdName} />
        </div>
    )
}

export default BloqueInputLabel