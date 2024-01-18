const TextInput = (props: any) => {
    const { value, label, name, placeholder, type, onChange } = props;
    const _handleChange = () => {
        console.log("Handle Change")
    }
    return (
        <>
            <input
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                className="border border-yellow-951 rounded h-10"
            />
        </>
    )
}
export default TextInput;