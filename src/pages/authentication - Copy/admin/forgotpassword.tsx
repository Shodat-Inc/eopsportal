import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '../../../styles/Common.module.css';
import Head from 'next/head';
import Header from './header';

export default function AdminForgotPassword() {

    const [showPassword, setShowPassword] = useState({
        password: false
    });
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    })
    const hideShow = () => {
        setShowPassword({
            ...showPassword,
            password: !showPassword.password
        })
    }

    return (
        <>
            <Head>
                <title>eOps Fabric - Admin Forgot Password</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header />

            <div className='flex justify-center items-center w-full h-full flex-wrap flex-col'>
            <div className='w-[420px] mt-12 mb-4'>
                <Link href='/authentication/admin/' className='flex flex justify-start items-center text-sm font-semibold'>
                    <Image
                        src="/img/arrow-left.svg"
                        alt='back'
                        height={24}
                        width={24}
                        className='mr-2'
                    />
                    <span>Back to Sign In</span>
                </Link>
                </div>
                <div className='w-[420px] min-h-[280px] border border-[#A7A7A7] rounded rounded-xl px-4 py-7'>
                    <h1 className='text-2xl text-black font-bold mb-2'>Forgot Password.</h1>
                    <p className='text-[#8692A6] text-lg mb-8'>Don’t worry about your password! you can reset that any time.</p>
                    <form action="">
                        <div className={`w-full mb-5 ${styles.form__wrap}`}>
                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className={`border border-[#A7A7A7] ${styles.form__field} !text-[#666666]`}
                                    placeholder="Enter email address"
                                    required
                                />
                                <label htmlFor="username" className={`${styles.form__label} !text-[#666666]`}>Enter email address</label>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Link className="text-black text-sm font-bold" href=""></Link>
                            <button
                                className={`flex rounded-lg h-[44px] px-6 text-black text-lg block flex justify-center items-center bg-yellow-951 text-sm`}
                            >
                                <span>Submit</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
