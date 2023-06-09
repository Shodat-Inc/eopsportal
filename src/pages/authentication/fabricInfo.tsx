import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
const FabricInfo = (props: any) => {
    return (
        <div className="font-OpenSans bg-[url('/img/architecture2.jpg')] bg-cover bg-no-repeat bg-center h-screen sm:hidden md:block">
            <div className="w-full h-full backdrop-brightness-25 lg:px-16 lg:py-16 sm:px-4 sm:py-4 md:px-4 md:py-4">
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
                    <p className="md:text-lg lg:text-2xl sm:text-lg text-white font-light leading-10">
                        The eOps Fabric - Edge enabled data mesh with management, processing, & security features. Enabling agile development & secured dilivery of analytics applications and ML models to meet high paced business demands. The eOps  Chord-Blockchain framework ensuring highly compliant and audited edge operations.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default FabricInfo;