import Image from "next/image";
const NoDataFound = (props) => {
    return (
        <div className="flex justify-center items-center flex-wrap flex-col font-OpenSans">
            <div className="no-data-image">
                <Image
                    src="/img/not-found.svg"
                    alt="no data found!"
                    className="inline-block"
                    height={72}
                    width={72}
                />
            </div>
            <p className="text-black text-2xl mt-8 font-medium">No asset data found!!</p>
            <p className="text-black text-xl mt-3 font-normal">Please create your sub asset by clicking on <span className="text-black font-bold">&#34;{props.createText}&#34;</span> button.</p>
        </div>
    )
}
export default NoDataFound