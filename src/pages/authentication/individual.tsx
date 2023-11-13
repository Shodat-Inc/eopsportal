import React from 'react';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';

export default function Individual() {
    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Individual</title>
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
                                <h2 className='text-2xl font-semibold mb-2'>Register a Individual Account!</h2>
                                <div className='text-[#8692A6] mb-4'>For the purpose of industry regulation, your details are required.</div>
                                <form action="" className='w-full'>
                                    <div className={`mb-2 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder=""
                                                required
                                            />
                                            <label htmlFor="firstName" className={`${styles.form__label} !text-[#666666]`}>First name</label>
                                        </div>
                                    </div>
                                    <div className={`mb-2 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder=""
                                                required
                                            />
                                            <label htmlFor="lastName" className={`${styles.form__label} !text-[#666666]`}>Last name</label>
                                        </div>
                                    </div>
                                    <div className={`mb-2 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="emailAddress"
                                                name="emailAddress"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder=""
                                                required
                                            />
                                            <label htmlFor="emailAddress" className={`${styles.form__label} !text-[#666666]`}>Enter your email address</label>
                                        </div>
                                    </div>
                                    <div className={`mb-2 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="password"
                                                name="password"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder=""
                                                required
                                            />
                                            <label htmlFor="password" className={`${styles.form__label} !text-[#666666]`}>Enter Password</label>
                                        </div>
                                    </div>
                                    <div className={`mb-8 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder=""
                                                required
                                            />
                                            <label htmlFor="confirmPassword" className={`${styles.form__label} !text-[#666666]`}>Confirm Password</label>
                                        </div>
                                    </div>
                                    <div className='flex justify-end items-center'>
                                        <Link href="/authentication/verify-individual" className='bg-yellow-951 min-w-[111px] flex justify-center items-center rounded rounded-xl py-4 px-2 font-semibold'>
                                            <span>Continue</span>
                                        </Link>            
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}