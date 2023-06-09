import React, { useState, useEffect } from 'react';
import Link from "next/link";
import styles from '../../styles/Common.module.css';
import Router from 'next/router';
import Image from "next/image";
import FabricInfo from './fabricInfo';
import Head from 'next/head'

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        companyEmail: "",
    });
    const [errors, setErrors] = useState({
        companyEmail: "",
    });
    const handleInput = (evt: any) => {
        evt.preventDefault()
        let targetName = evt.target.name;
        let targetValue = evt.target.value;
        setFormData((state) => ({
            ...state,
            [targetName]: targetValue
        }));
        setErrors({
            ...errors,
            [targetName]: ""

        })
    };

    const handleValidation = () => {
        const EMAIL_REGEX = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        const newErrorsState = { ...errors };
        let formIsValid = true;

        // Validate Email Address
        if (!formData.companyEmail) {
            formIsValid = false;
            newErrorsState.companyEmail = "Email must not be empty!"
        } else if (!EMAIL_REGEX.test(formData.companyEmail)) {
            formIsValid = false;
            newErrorsState.companyEmail = "Please enter valid email address!"
        }

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setErrors(newErrorsState);
        }

        return formIsValid
    }

    const submitForm = (evt: any) => {
        evt.preventDefault()
        if (handleValidation()) {
            console.log("GOOD TO GOOOooo !")
        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }
    return (
        <>
            <Head>
                <title>eOPS Fabric - Forgot Password</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="column-2 flex font-OpenSans">
                <div className="w-[50%]">
                    <FabricInfo />
                </div>

                <div className="w-[50%] relative">
                    <div className="flex justify-start items-center h-full flex-wrap flex-col">

                        <div className="flex justify-between items-center w-[470px] pt-5">
                            <div className="pr-2 text-left text-gray-951 text-xl font-medium">
                                <Link href="/authentication/signin" className="flex items-center justify-start">
                                    <Image
                                        src="/img/angle_left_icon.svg"
                                        alt="angle left"
                                        className="mr-2"
                                        width={12}
                                        height={12}
                                    />
                                    <span>Back</span>
                                </Link>
                            </div>

                            <div className="pr-2 text-right text-black text-xl font-medium">
                                <span className="text-gray-500 font-normal">Don&apos;t have an account? </span> <Link href="/authentication/register">Sign Up</Link>
                            </div>
                        </div>

                        <div className="text-left w-[470px] mt-28">
                            <p className="font-bold text-3xl text-black mb-4 capitalize"><span className='bg-yellow-951 px-1 py-1 rounded'>Forgot</span> Password</p>
                            <p className="font-normal text-2xl text-gray-500">Don&apos;t worry about your password! you can reset that any time.</p>
                            <div className="mb-4 mt-5 border border-gray-100 w-full h-[1px]"></div>
                            <div className="signinform relative">
                                <form method='post' onSubmit={submitForm}>
                                    <div className={`mb-7 ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="companyEmail"
                                                name="companyEmail"
                                                className={`${styles.form__field} border border-black ${errors.companyEmail ? 'border-red-952' : 'border-black'}`}
                                                placeholder="Enter email address"
                                                value={formData.companyEmail}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="companyEmail" className={`${styles.form__label}`}>Enter email address</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>
                                            {
                                                errors.companyEmail &&
                                                <>
                                                    <Image
                                                        height={14}
                                                        width={14}
                                                        alt="error"
                                                        src="/img/alert-triangle.svg"
                                                        className='mr-2'
                                                    />
                                                    {errors.companyEmail}
                                                </>
                                            }
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <button className="rounded-lg h-16 bg-black w-full text-white text-lg">
                                            Confirm
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}
