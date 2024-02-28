import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { saveUserDataFirstStepAction } from "@/store/actions/authenticationAction";

export default function Individual() {
    const router = useRouter();
    const dispatch = useDispatch<any>()
    const [userData, setUserData] = useState([] as any);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        verify: false,
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [formIsValid, setFormIsValid] = useState(true);
    const [resMessage, setResMessage] = useState(false);

    // GET ALL STATE FROM STORE
    const authenticationReducer = useSelector((state: any) => state.authenticationReducer);

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
        setFormIsValid(false);
    };

    const checkEmailAdress = (email: any) => {
        const matched = userData.filter((item: any) => {
            return item.username === email
        })
        if (matched && matched.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    const handleValidation = () => {
        const EMAIL_REGEX = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        const PHONE_REGEX = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
        const newErrorsState = { ...errors };
        let formIsValid = true;
        if (!formData.firstName) {
            formIsValid = false;
            newErrorsState.firstName = "First name must not be empty!"
        }
        // Validate Last Name
        if (!formData.lastName) {
            formIsValid = false;
            newErrorsState.lastName = "Last name must not be empty!"
        }

        // Validate Email Address
        if (!formData.email) {
            formIsValid = false;
            newErrorsState.email = "Email must not be empty!"
        } else if (!EMAIL_REGEX.test(formData.email)) {
            formIsValid = false;
            newErrorsState.email = "Please enter valid email address!"
        } else if (checkEmailAdress(formData.email) === true) {
            formIsValid = false;
            newErrorsState.email = "Username already exists please enter unique user email!!"
        }


        // Validate Password
        if (!formData.password) {
            formIsValid = false;
            newErrorsState.password = "Password must not be empty!"
        }

        // Validate Confirm Password
        if (!formData.confirmPassword) {
            formIsValid = false;
            newErrorsState.confirmPassword = "Confirm password must not be empty!"
        } else if (formData.confirmPassword !== formData.password) {
            formIsValid = false;
            newErrorsState.confirmPassword = "Password and Confirm Password does not match"
        }

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setFormIsValid(false);
            setErrors(newErrorsState);
        }

        return formIsValid
    }

    const submitForm = (evt: any) => {
        evt.preventDefault();
        if (handleValidation()) {
            localStorage.setItem('registerData', JSON.stringify(formData));
            dispatch(saveUserDataFirstStepAction(formData))
            setTimeout(() => {
                Router.push({
                    pathname: '/authentication/verify-individual'
                }, '/authentication/verify-individual')
            }, 100)
        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }

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
                            <div className='border border-[#D9D9D9] rounded-lg min-h-[400px] p-6 w-full mb-10'>
                                <h2 className='text-2xl font-semibold mb-2'>Register a Individual Account!</h2>
                                <div className='text-[#8692A6] mb-4'>For the purpose of industry regulation, your details are required.</div>
                                <form method='post' onSubmit={submitForm} className='w-full'>
                                    <div className={`mb-2 lg:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder='First Name'
                                                value={formData.firstName}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="firstName" className={`${styles.form__label} !text-[#666666]`}>First name</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start mt-1'>
                                            {errors.firstName &&
                                                <>
                                                    <Image
                                                        height={14}
                                                        width={14}
                                                        alt="error"
                                                        src="/img/alert-triangle.svg"
                                                        className='mr-2'
                                                    />
                                                    {errors.firstName}
                                                </>
                                            }
                                        </span>
                                    </div>
                                    <div className={`mb-2 lg:w-fullsmall:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder='Last Name'
                                                value={formData.lastName}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="lastName" className={`${styles.form__label} !text-[#666666]`}>Last name</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start mt-1'>
                                            {errors.lastName &&
                                                <>
                                                    <Image
                                                        height={14}
                                                        width={14}
                                                        alt="error"
                                                        src="/img/alert-triangle.svg"
                                                        className='mr-2'
                                                    />
                                                    {errors.lastName}
                                                </>
                                            }
                                        </span>
                                    </div>
                                    <div className={`mb-2 lg:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder='Enter your email address'
                                                value={formData.email}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="emailAddress" className={`${styles.form__label} !text-[#666666]`}>Enter your email address</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start mt-1'>
                                            {errors.email &&
                                                <>
                                                    <Image
                                                        height={14}
                                                        width={14}
                                                        alt="error"
                                                        src="/img/alert-triangle.svg"
                                                        className='mr-2'
                                                    />
                                                    {errors.email}
                                                </>
                                            }
                                        </span>
                                    </div>

                                    <div className={`mb-2 lg:w-fullsmall:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder='Password'
                                                value={formData.password}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="password" className={`${styles.form__label} !text-[#666666]`}>Enter Password</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start mt-1'>
                                            {errors.password &&
                                                <>
                                                    <Image
                                                        height={14}
                                                        width={14}
                                                        alt="error"
                                                        src="/img/alert-triangle.svg"
                                                        className='mr-2'
                                                    />
                                                    {errors.password}
                                                </>
                                            }
                                        </span>
                                    </div>

                                    <div className={`mb-8 lg:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder='Confirm Password'
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="confirmPassword" className={`${styles.form__label} !text-[#666666]`}>Confirm Password</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start mt-1'>
                                            {errors.confirmPassword &&
                                                <>
                                                    <Image
                                                        height={14}
                                                        width={14}
                                                        alt="error"
                                                        src="/img/alert-triangle.svg"
                                                        className='mr-2'
                                                    />
                                                    {errors.confirmPassword}
                                                </>
                                            }
                                        </span>
                                    </div>

                                    <div className='flex justify-end items-center'>
                                        <button
                                            // href="/authentication/verify-individual" 
                                            className='bg-yellow-951 min-w-[111px] flex justify-center items-center rounded-xl py-4 px-2 font-semibold'>
                                            <span>Continue</span>
                                        </button>
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