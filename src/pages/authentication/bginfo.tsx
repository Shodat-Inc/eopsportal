import React from 'react';
import Image from "next/image";
export default function BgInfo() {
    return (
        <div className="bg-[url('/img/auth/bg.png')] bg-cover bg-no-repeat bg-center min-h-screen h-screen relative">
            <div className="w-[80%] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                <div className="flex w-full justify-start items-center mb-4">
                    <Image
                        src="/img/auth/invertedComma.svg"
                        alt="logo"
                        height={30}
                        width={30}
                    />
                </div>
                <div className="text-[#666666] mb-4">
                    The eOps™ Fabric - Edge enabled data mesh with management, processing, & security features. Enabling agile development & secured delivery of analytics applications and ML models to meet high paced business demandsThe eOps™ Chord - Blockchain framework ensuring highly compliant and audited edge operations
                </div>
                <div className="flex w-full justify-end items-center">
                    <Image
                        src="/img/auth/angle.svg"
                        alt="logo"
                        height={30}
                        width={30}
                        className=""
                    />
                </div>

            </div>
        </div>
    )
}