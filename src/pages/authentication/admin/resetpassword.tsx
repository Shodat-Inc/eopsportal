import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '../../../styles/Common.module.css';
import Head from 'next/head';
import Header from './header';

export default function AdminResetPassword() {

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
                    <h1 className='text-2xl text-black font-bold mb-2'>Reset your password!</h1>
                    <p className='text-[#8692A6] text-lg mb-8'>Please choose your new password.</p>
                    <form action="">
                    <div className={`w-full mb-8 ${styles.form__wrap}`}>
                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                <input
                                    type={showPassword.password ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className={`border border-[#A7A7A7] ${styles.form__field} !text-[#666666]`}
                                    placeholder="Password"
                                    required
                                />
                                <span className="absolute text-black font-normal font-8 right-4 bottom-[11px] cursor-pointer" onClick={hideShow}>
                                    {
                                        showPassword.password ?
                                            <Image
                                                src="/img/eye_hide_off_see_view_icon.svg"
                                                alt='hide'
                                                height={28}
                                                width={28}
                                            />
                                            :
                                            <Image
                                                src="/img/eye_on_see_show_view_icon.svg"
                                                alt='hide'
                                                height={28}
                                                width={28}
                                            />
                                    }
                                </span>
                                <label htmlFor="password" className={`${styles.form__label} !text-[#666666]`}>Password</label>
                            </div>
                        </div>

                        <div className={`w-full mb-8 ${styles.form__wrap}`}>
                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                <input
                                    type={showPassword.password ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className={`border border-[#A7A7A7] ${styles.form__field} !text-[#666666]`}
                                    placeholder="confirmPassword"
                                    required
                                />
                                <span className="absolute text-black font-normal font-8 right-4 bottom-[11px] cursor-pointer" onClick={hideShow}>
                                    {
                                        showPassword.password ?
                                            <Image
                                                src="/img/eye_hide_off_see_view_icon.svg"
                                                alt='hide'
                                                height={28}
                                                width={28}
                                            />
                                            :
                                            <Image
                                                src="/img/eye_on_see_show_view_icon.svg"
                                                alt='hide'
                                                height={28}
                                                width={28}
                                            />
                                    }
                                </span>
                                <label htmlFor="password" className={`${styles.form__label} !text-[#666666]`}>Confirm Password</label>
                            </div>
                        </div>

                        <div className='flex justify-between items-center'>
                            <Link className="text-black text-sm font-bold" href=""></Link>
                            <button
                                className={`flex rounded-lg h-[44px] px-6 text-black text-lg block flex justify-center items-center bg-yellow-951 text-sm`}
                            >
                                <span>Done</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
