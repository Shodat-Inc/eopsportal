import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function ForgotPassword() {
    const [showPass, setShowPass] = useState(false);
    const showHidePasswordFunction = () => {
        setShowPass(!showPass)
    }
    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Forgot Password</title>
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
                            <Link href="/authentication/signin" className="flex justify-start items-center font-semibold mb-5">
                                <Image
                                    src="/img/auth/arrow-left-black.svg"
                                    alt="arrow-left-black"
                                    height={24}
                                    width={24}
                                    className='mr-2'
                                />
                                <span>Back to Sign in</span>
                            </Link>
                            <div className='border border-[#D9D9D9] rounded rounded-lg p-6 min-h-[300px] mb-10'>
                                <h2 className='text-2xl font-semibold mb-2'>Forgot Password?</h2>
                                <div className='text-[#8692A6] mb-4'>Don’t worry about your password! you can reset that any time.</div>
                                <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                        <input
                                            type="text"
                                            id="emailAddress"
                                            name="emailAddress"
                                            className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                            placeholder=""
                                            required
                                        />
                                        <label htmlFor="emailAddress" className={`${styles.form__label} !text-[#666666]`}>Enter email address</label>
                                    </div>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <div></div>
                                    <Link href="/authentication/reset-password" className='bg-yellow-951 min-w-[111px] flex justify-center items-center rounded rounded-xl py-4 px-2 font-semibold'>
                                        <span>Submit</span>
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