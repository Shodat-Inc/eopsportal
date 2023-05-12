import Image from "next/image"
export default function Template() {
    return (
        <>
            <p className="text-black text-lg mb-0 font-medium text-center">Template</p>
            <div className="rounded-lg bg-blue-951 h-36 w-f2ll mt-6 mb-8 px-3 py-3 flex justify-center items-center flex-wrap flex-col">
                <Image
                    src="/img/automotive-vehicles.svg"
                    alt="automotive-vehicles"
                    className="mb-2"
                    height={36}
                    width={36}
                />
                <p className="text-center font-medium font-lg">Automotive Vehicles</p>
            </div>
            <div className="rounded-lg bg-green-951 h-32 w-full mb-8 px-3 py-3 flex justify-center items-center flex-wrap flex-col">
                <Image
                    src="/img/freight.svg"
                    alt="freight"
                    className="mb-2"
                    height={36}
                    width={36}
                />
                <p className="text-center font-medium font-lg">Freight</p>
            </div>
            <div className="rounded-lg bg-blue-952 h-32 w-full mb-8 px-3 py-3 flex justify-center items-center flex-wrap flex-col">
                <Image
                    src="/img/gas-station.svg"
                    alt="gas-station"
                    className="mb-2"
                    height={36}
                    width={36}
                />
                <p className="text-center font-medium font-lg">Gas Station</p>
            </div>
            <div className="rounded-lg bg-pink-951 h-32 w-full mb-8 px-3 py-3 flex justify-center items-center flex-wrap flex-col">
                <Image
                    src="/img/manufacturing-plants.svg"
                    alt="manufacturing-plants"
                    className="mb-2"
                    height={36}
                    width={36}
                />
                <p className="text-center font-medium font-lg">Manufacturing Plants</p>
            </div>
        </>
    )
}