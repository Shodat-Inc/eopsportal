import Image from "next/image";
import Link from "next/link";
import FabricInfo from "./fabricInfo";
import Head from 'next/head'

export default function Success() {
    return (
        <>
            <Head>
                <title>eOPS Fabric - Success</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="column-2 flex font-OpenSans">
                <div className="w-[50%]">
                    <FabricInfo />
                </div>

                <div className="w-[50%] relative">
                    <div className="flex justify-center items-center h-full">

                        <div className="text-left w-[470px]">
                            <div className="mb-4">
                                <Image
                                    src="/img/success.png"
                                    alt="success icon"
                                    className="inline h-24"
                                    height={96}
                                    width={96}
                                />
                            </div>
                            <p className="font-bold text-2xl text-black mb-4 capitalize">Your account has been created.</p>
                            <p className="text-xl text-gray-951">Please <span className="text-black">check your registered email account</span> and continue to your account activities.</p>
                            <Link href="/authentication/signin" className="block mt-5 text-xl text-black font-semibold hover:text-yellow-951">Login to your account</Link>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}
