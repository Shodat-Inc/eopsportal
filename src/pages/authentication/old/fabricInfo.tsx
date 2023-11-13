import React from 'react';
import Image from "next/image";
export default function FabricInfo() {
    return (
        <div className="font-Inter bg-[url('/img/sign/wallpaper.png')] bg-cover bg-no-repeat bg-center min-h-screen h-screen sm:hidden md:block">
            <div className="w-full h-full lg:px-16 lg:py-16 sm:px-4 sm:py-4 md:px-4 md:py-4">
                <div className="flex">
                    <Image
                        src="/img/logo-white.svg"
                        alt="logo"
                        className="fill-white"
                        width={127}
                        height={27}
                    />
                </div>
                <div className="mt-24 relative w-[90%]">
                    <p className="mb-3">
                        <Image
                            src="/img/quote_alt_left_icon.svg"
                            alt="quote"
                            className="h-8"
                            width={32}
                            height={32}
                        />
                    </p>
                    <p className="md:text-lg lg:text-xl sm:text-lg text-white font-light lg:leading-10">
                        The eOps™ Fabric - Edge enabled data mesh with management, processing, & security features. Enabling agile development & secured delivery of analytics applications and ML models to meet high paced business demandsThe eOps™ Chord - Blockchain framework ensuring highly compliant and audited edge operations
                    </p>
                    <p className="mt-3 absolute right-0">
                        <Image
                            src="/img/sign/quote-angled.svg"
                            alt="quote"
                            className="h-8"
                            width={28}
                            height={28}
                        />
                    </p>
                </div>
            </div>
        </div>
    )
}