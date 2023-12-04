import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import FabricInfo from "./fabricInfo";
import Head from 'next/head'

export default function VerifyPhone() {
    const [code, setcode] = useState(new Array(6).fill(""));
    const [showTick, setShowTick] = useState(false)
    const handleChange = (element: any, index: any) => {
        if (isNaN(element.value)) return false;

        setcode([...code.map((d: any, indx: any) => (indx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
        console.log({
            index:index
        })
        if(index===5) {
            setShowTick(true)
        } else {
            setShowTick(false)
        }
    };
    return (
        <>
            <Head>
                <title>eOps Fabric - Verify Account</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="column-2 flex font-Inter">
                <div className="w-[50%]">
                    <FabricInfo />
                </div>

                <div className="w-[50%] relative">
                    <div className="flex justify-center items-center h-full flex-wrap flex-col">
                        <div className="text-left w-[450px] lg:w-[450px] md:w-full sm:w-full lg:px-0 lg:py-0 md:px-5 md:py-5 sm:px-5 sm:py-5 sm:text-left">
                            <p className="font-[700] text-3xl md:text-3xl md:text-left text-black mb-2 capitalize sm:text-center sm:text-2xl">
                                <span>Verify your account!</span>
                            </p>
                            <p className="font-normal text-lg text-gray-972">For the purpose of industry regulation, your details are required.</p>

                            <div className="mt-7 mb-12 relative">
                                <label htmlFor="" className="font-[500] text-md text-gray-971 mb-3">Phone verification number (PVN)</label>

                                <div className="flex justfy-between items-center mt-3">
                                    {code.map((data: any, index: any) => {
                                        return (
                                            <input
                                                type="text"
                                                className="rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-1 pr-1 w-[55px] text-center mr-4 text-xl font-semibold"
                                                name="otp"
                                                maxLength={1}
                                                key={index}
                                                value={data}
                                                onChange={(e) => handleChange(e.target, index)}
                                                onFocus={(e) => e.target.select}
                                            />
                                        );
                                    })}

                                    {
                                        showTick &&

                                        <span>
                                            <Image
                                                src="/img/green-circular-tick.svg"
                                                alt="green-circular-tick"
                                                height={19}
                                                width={19}
                                                className=""
                                            />
                                        </span>
                                    }
                                </div>
                                <div className='mt-2 text-gray-971 text-sm'><button>Resend Code</button></div>

                                <div className='mt-2 text-red-500 text-sm'>OTP mismatched! Please try again</div>
                            </div>

                            <div className='relative justify-start items-start flex flex-wrap flex-col w-full mb-2'>
                                <Link
                                    href="/authentication/complete"
                                    className="rounded-lg h-16 bg-black w-full text-white text-md justify-center items-center flex"
                                >
                                    <span>Verify</span>
                                </Link>
                                <span className="text-gray-951 text-sm flex justify-center items-center mt-6 w-full">
                                    <Image
                                        src="/img/lock.svg"
                                        alt="green-circular-tick"
                                        height={19}
                                        width={19}
                                        className=""
                                    />
                                    Your info is safely secured
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
