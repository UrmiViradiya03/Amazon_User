export default function Input(props) {
    const { type, placeholder, onChange, value, style, id, className ,isError,helperText} = props
    return (
        <>
            <div className="w-100">
                <input type={type} placeholder={placeholder || ""} style={style || {}} className={className || ""} id={id || ""} onChange={onChange} value={value || ""} />
                {
                isError ? <span className="text-danger">{helperText}</span> : ""
                }
            </div>
        </>
    )
}