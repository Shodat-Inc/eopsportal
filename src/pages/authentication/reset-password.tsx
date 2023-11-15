import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function ResetPassword() {
    const [showPass, setShowPass] = useState(false);
    const [showCnfPass, setShowCnfPass] = useState(false);
    const showHidePasswordFunction = () => {
        setShowPass(!showPass)
    }
    const showHideConfirmPasswordFunction = () => {
        setShowCnfPass(!showCnfPass)
    }
    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Reset Password</title>
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
                                <h2 className='text-2xl font-semibold mb-2'>Reset Password?</h2>
                                <div className='text-[#8692A6] mb-4'>Don’t worry about your password! you can reset that any time.</div>
                                <div className={`mb-2 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                        <input
                                            type={showPass ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            className={`border border-[#A7A7A7] text-[#666666] !pr-12 ${styles.form__field}`}
                                            placeholder=""
                                            required
                                        />
                                        <label htmlFor="password" className={`${styles.form__label} !text-[#666666]`}>Password</label>
                                        <button className='absolute right-2 top-7' onClick={showHidePasswordFunction}>
                                            {
                                                !showPass ?
                                                    <Image
                                                        src="/img/auth/pass-show-off.svg"
                                                        alt="pass-show-off"
                                                        height={24}
                                                        width={24}
                                                    />
                                                    :
                                                    <Image
                                                        src="/img/auth/eye-off.svg"
                                                        alt="eye-off"
                                                        height={24}
                                                        width={24}
                                                    />
                                            }
                                        </button>
                                    </div>
                                </div>

                                <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                        <input
                                            type={showCnfPass ? 'text' : 'password'}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            className={`border border-[#A7A7A7] text-[#666666] !pr-12 ${styles.form__field}`}
                                            placeholder=""
                                            required
                                        />
                                        <label htmlFor="confirmPassword" className={`${styles.form__label} !text-[#666666]`}>Confirm Password</label>
                                        <button className='absolute right-2 top-7' onClick={showHideConfirmPasswordFunction}>
                                            {
                                                !showCnfPass ?
                                                    <Image
                                                        src="/img/auth/pass-show-off.svg"
                                                        alt="pass-show-off"
                                                        height={24}
                                                        width={24}
                                                    />
                                                    :
                                                    <Image
                                                        src="/img/auth/eye-off.svg"
                                                        alt="eye-off"
                                                        height={24}
                                                        width={24}
                                                    />
                                            }
                                        </button>
                                    </div>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <div></div>
                                    <Link href="" className='bg-yellow-951 min-w-[111px] flex justify-center items-center rounded rounded-xl py-4 px-2 font-semibold'>
                                        <span>Done</span>
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