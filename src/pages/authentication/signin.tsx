import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function SignIn() {
    const [showPass, setShowPass] = useState(false);
    const showHidePasswordFunction = () => {
        setShowPass(!showPass)
    }
    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="font-OpenSans">
                {/* Header */}
                <Header />

                {/* MAIN Content */}

                <div className='w-full mt-20 flex justify-center items-start'>
                    <div className='border border-[#D9D9D9] rounded rounded-lg p-6 w-[480px] mb-10'>
                        <h2 className='text-2xl font-semibold mb-2'>Hello! Welcome Back.</h2>
                        <div className='text-[#8692A6] mb-4'>Log in with your credentials that you entered during your registration.</div>
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
                        <div className='flex justify-between items-center mb-10'>
                            <Link href="/authentication/forgot-password" className='font-semibold text-sm'>Forgot Password?</Link>
                        </div>

                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='text-black text-sm mb-2 font-semibold'>Create an account</p>
                            </div>
                            <Link href="/authentication/complete-individual" className='bg-yellow-951 min-w-[111px] flex justify-center items-center rounded rounded-xl py-4 px-2 font-semibold'>
                                <span>Next</span>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}