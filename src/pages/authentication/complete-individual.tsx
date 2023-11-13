import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';
import PhoneInput from 'react-phone-number-input'

export default function CompleteIndividual() {
    const [phoneCode, setPhoneCode] = useState('IN')
    const [verified, setVerified] = useState(false);
    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Complete Individual Registeration</title>
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
                                <h2 className='text-2xl font-semibold mb-2'>Complete your registration!</h2>
                                <div className='text-[#8692A6] mb-4'>For the purpose of industry regulation, your details are required.</div>
                                <form action="" className='w-full'>

                                    <div className={`mb-3 relative justify-start items-start flex flex-wrap flex-col w-full mb-4 relative ${styles.phoneField}`}>
                                        <label htmlFor="phoneNumber" className='font-[500] text-md text-gray-971 mb-3'>Phone Number <span>*</span></label>

                                        <PhoneInput
                                            international
                                            countryCallingCodeEditable={false}
                                            defaultCountry="IN"
                                            className='rounded rounded-lg border border-gray-972 h-[46px] pl-4 pr-16 w-full'
                                            value={phoneCode}
                                            onChange={(inputValue:any) => setPhoneCode(inputValue)}
                                        />
                                        {
                                            verified &&
                                            <div>
                                                <div className='text-green-500 text-sm absolute right-[10px] top-[48px] font-semibold'>Verified</div>
                                                <span className='absolute right-[-20px] top-[48px]'>
                                                    <Image
                                                        src="/img/green-circular-tick.svg"
                                                        alt="green-circular-tick"
                                                        height={19}
                                                        width={19}
                                                        className=""
                                                    />
                                                </span>
                                            </div>
                                        }
                                    </div>

                                    <div className={`mb-8 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="companyName"
                                                name="companyName"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder=""
                                                required
                                            />
                                            <label htmlFor="companyName" className={`${styles.form__label} !text-[#666666]`}>Company Name (Optional)</label>
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