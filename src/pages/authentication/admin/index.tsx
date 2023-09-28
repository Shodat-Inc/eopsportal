import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '../../../styles/Common.module.css';
import Head from 'next/head';
import Header from './header';

export default function AdminLogin() {

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
                <title>eOps Fabric - Admin Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header />

            <div className='flex justify-center items-center w-full h-full flex-wrap flex-col'>
                
                <div className='w-[420px] min-h-[380px] border border-[#A7A7A7] rounded rounded-xl mt-12 px-4 py-7'>
                    <h1 className='text-2xl text-black font-bold mb-2'>Hello! Welcome back.</h1>
                    <p className='text-[#8692A6] text-lg mb-8'>Log in with your credentials that you entered during your registration.</p>
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
                            <Link className="text-black text-sm font-bold mb-0 block mt-1" href="/authentication/forgotpassword">Forgot Password?</Link>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Link className="text-black text-sm font-bold" href="/">Create new account</Link>
                            <button
                                className={`flex rounded-lg h-[44px] px-6 text-black text-lg block flex justify-center items-center bg-yellow-951 text-sm`}
                            >
                                <span>Next</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
