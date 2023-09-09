import Image from "next/image"
export default function Template() {
    return (
        <>
            <p className="text-black text-lg mb-0 font-medium w-full text-center">Template</p>
            <div className="rounded-lg bg-blue-951 h-[88px] w-[116px] mt-6 mb-5 px-3 py-3 flex justify-center items-center flex-wrap flex-row">
                <Image
                    src="/img/automotive-vehicles.svg"
                    alt="automotive-vehicles"
                    className="mb-2"
                    height={36}
                    width={36}
                />
                <p className="text-center font-medium text-[14px] w-full">Automotive</p>
            </div>
            <div className="rounded-lg bg-green-951 h-[88px] w-[116px] mb-5 px-3 py-3 flex justify-center items-center flex-wrap flex-row">
                <Image
                    src="/img/freight.svg"
                    alt="freight"
                    className="mb-2"
                    height={36}
                    width={36}
                />
                <p className="text-center font-medium text-[14px] w-full">Freight</p>
            </div>
            <div className="rounded-lg bg-blue-952 h-[88px] w-[116px] mb-5 px-3 py-3 flex justify-center items-center flex-wrap flex-row">
                <Image
                    src="/img/gas-station.svg"
                    alt="gas-station"
                    className="mb-2 h-[36px] w-[36px]"
                    height={36}
                    width={36}
                />
                <p className="text-center font-medium text-[14px] w-full">Gas Station</p>
            </div>
            <div className="rounded-lg bg-pink-951 h-[98px] w-[116px] mb-5 px-3 py-3 flex justify-center items-center flex-wrap flex-row">
                <Image
                    src="/img/manufacturing-plants.svg"
                    alt="manufacturing-plants"
                    className="mb-2"
                    height={36}
                    width={36}
                />
                <p className="text-center font-medium text-[12px] w-full">Manufacturing Plant</p>
            </div>
        </>
    )
}