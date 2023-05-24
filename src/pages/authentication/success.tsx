import Image from "next/image";

export default function Success() {
    return (
        <>
            <div className="column-2 flex font-OpenSans">
                <div className="w-[50%] bg-[url('/img/architecture2.jpg')] bg-cover bg-no-repeat bg-center h-screen">
                    <div className="w-full h-full backdrop-brightness-25 px-16 py-16">
                        <div className="flex">
                            <Image
                                src="/img/logo-white.svg"
                                alt="logo"
                                className="fill-white"
                                width={127}
                                height={27}
                            />
                        </div>
                        <div className="mt-24">
                            <p className="mb-3">
                                <Image
                                    src="/img/quote_alt_left_icon.svg"
                                    alt="quote"
                                    className="h-8"
                                    width={32}
                                    height={32}
                                />
                            </p>
                            <p className="text-2xl text-white font-light leading-10">
                                The eOps Fabric - Edge enabled data mesh with management, processing, & security features. Enabling agile development & secured dilivery of analytics applications and ML models to meet high paced business demands. The eOps  Chord-Blockchain framework ensuring highly compliant and audited edge operations.
                            </p>
                        </div>
                    </div>
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
                            <p className="font-bold text-3xl text-black mb-4 capitalize">Your account has been created.</p>
                            <p className="text-xl text-gray-951">Please <span className="text-black">check your registered email account</span> and continue to your account activities.</p>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}
