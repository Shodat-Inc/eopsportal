const TextInput = (props: any) => {
    const { value, label, name, placeholder, type, onChange } = props;
    const _handleChange = () => {
        console.log("Handle Change")
    }
    return (
        <>
            <div className="relative">
                <span className="absolute bg-white text-sm top-[-11px] left-[8px] font-semibold">{label}</span>
                <input
                    type={type}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="border border-yellow-951 rounded h-12 w-[300px] pl-2 pr-2"
                />
            </div>
        </>
    )
}
export default TextInput;