import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';

export default function VerifyIndividual() {
    const [code, setcode] = useState(new Array(6).fill(""));
    const [disable, setDisable] = useState(true);
    const handleChange = (element: any, index: any) => {
        if (isNaN(element.value)) return false;

        setcode([...code.map((d: any, indx: any) => (indx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const initialMinute = 9;
    const initialSeconds = 59;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    setDisable(false)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                    setDisable(true)
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });
    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Verify Individual</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="font-OpenSans">
                {/* Header */}
                <Header />

                {/* MAIN Content */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Bg Image Information */}
                    <BgInfo />

                    {/* Content section */}
                    <div className="flex justify-center items-start w-full mt-10">
                        <div className="relative w-[70%]">
                            <Link href="/" className="flex justify-start items-center font-semibold mb-5">
                                <Image
                                    src="/img/auth/arrow-left-black.svg"
                                    alt="arrow-left-black"
                                    height={24}
                                    width={24}
                                    className='mr-2'
                                />
                                <span>Back to Sign in</span>
                            </Link>

                            {/* Form Fields */}
                            <div className='border border-[#D9D9D9] rounded rounded-lg min-h-[400px] p-6 w-full mb-10'>
                                <h2 className='text-2xl font-semibold mb-2'>Verify your email account!</h2>
                                <div className='text-[#8692A6] mb-12'>An 6-digit code has been sent to narendra.nallamilli@shodat.com <Link href="/authentication/individual" className='font-semibold text-black ml-1'>Change</Link></div>
                                <h2 className='text-md font-semibold mb-4'>Enter your email verification code</h2>
                                <div className="flex justify-between items-center mb-3">
                                    {code.map((data: any, index: any) => {
                                        return (
                                            <input
                                                type="text"
                                                className="rounded rounded-lg border border-[#A7A7A7] h-[55px] pl-1 pr-1 w-[55px] text-center text-xl font-semibold"
                                                name="otp"
                                                maxLength={1}
                                                key={index}
                                                value={data}
                                                onChange={(e) => handleChange(e.target, index)}
                                                onFocus={(e) => e.target.select}
                                            />
                                        );
                                    })}
                                </div>
                                <div className='text-sm text-[#666666]'>
                                    The OTP will be expired in
                                    <span>
                                        {minutes === 0 && seconds === 0
                                            ? null
                                            : <span> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                                        }
                                    </span>
                                </div>
                                <div>

                                </div>
                                <div className='flex justify-between items-center mt-10'>
                                    <div>
                                        <p className='text-[#666666] text-sm mb-2'>Did not receive the code?</p>
                                        <button disabled={disable} className={`font-bold ${!disable ? 'text-black' : 'text-[#888888]'}`}><span>Resend code</span></button>
                                    </div>
                                    <Link href="/authentication/complete-individual" className='bg-yellow-951 min-w-[111px] flex justify-center items-center rounded rounded-xl py-4 px-2 font-semibold'>
                                        <span>Verify</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}