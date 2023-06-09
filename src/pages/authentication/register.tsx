import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Link from "next/link";
import Router from 'next/router';
import Image from "next/image";
import moment from 'moment';
import Complete from './complete';
import axios from 'axios';
import useSWR from 'swr';
import FabricInfo from './fabricInfo';
import Head from 'next/head'


const fetcher = (url: any) => axios.get(url).then(res => res.data)
export default function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        email: ""
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        email: ""
    });

    const [formIsValid, setFormIsValid] = useState(true);
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);
    const [userData, setUserData] = useState([] as any);
    const { data, error } = useSWR('/api/getUsers', fetcher);

    // Get User Data on Page Load
    useEffect(() => {
        setUserData(data)
    }, [data, error])

    // Get Last Asset ID
    const getLastID = (userData && userData.length > 0) ? userData.slice(-1)[0].userID : '1';

    // Return matching email address
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


    const handleValidation = () => {
        const EMAIL_REGEX = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
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

        // Validate company Name
        if (!formData.companyName) {
            formIsValid = false;
            newErrorsState.companyName = "Company name must not be empty!"
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

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setFormIsValid(false);
            setErrors(newErrorsState);
        }

        return formIsValid
    }

    const submitForm = (evt: any) => {
        evt.preventDefault()
        if (handleValidation()) {
            setStepTwo(true)
            setStepOne(false)
        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }

    return (
        <>
            <Head>
                <title>eOPS Fabric - Register</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="column-2 flex font-OpenSans">
                <div className="w-[50%]">
                    <FabricInfo />
                </div>

                <div className="w-[50%] relative">
                    <div className="flex justify-start items-center h-full flex-wrap flex-col">

                        <div className="pt-5 pr-2 text-left text-gray-951 text-lg font-medium mb-5 w-[470px]">
                            <Link href="/" className="flex items-center justify-start">
                                <Image
                                    src="/img/angle_left_icon.svg"
                                    alt="angle left"
                                    className="mr-2"
                                    width={10}
                                    height={10}
                                />
                                <span>Back</span>
                            </Link>
                        </div>

                        <div className="text-left w-[470px]">

                            {/* <div className={`${styles.wrapper} ${styles.six}`}>
                                <div>
                                    <h3 className={`${styles.flicker}`}>FLICKER</h3>
                                </div>
                            </div> */}

                            <p className="font-bold text-2xl text-black mb-3 capitalize">
                                {stepTwo ?
                                    <span>Complete Your <span className='bg-yellow-951 pl-1 pr-1 pt-1 pb-1 rounded'>Profile!</span></span>
                                    :
                                    <span><span className='bg-yellow-951 pl-1 pr-1 pt-1 pb-1 rounded'>Register</span> a Business Account!</span>}
                            </p>
                            <p className="font-normal text-xl text-gray-500">For the purpose of industry regulation, your details are required.</p>
                            <div className="mb-4 mt-5 border border-gray-100 w-full h-[1px]"></div>
                            <div className="signinform relative">
                                <form method='post' onSubmit={submitForm}>
                                    {stepOne ?
                                        <div>

                                            <div className={`mb-2 ${styles.form__wrap}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="firstName"
                                                        name="firstName"
                                                        className={`${styles.form__field} border border-black ${errors.firstName ? 'border-red-952' : 'border-black'}`}
                                                        placeholder="First name"
                                                        value={formData.firstName}
                                                        onChange={(e) => handleInput(e)}
                                                    />
                                                    <label htmlFor="firstName" className={`${styles.form__label}`}>First Name</label>
                                                </div>
                                                <span className='text-red-952 text-sm flex items-center justify-start'>
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

                                            <div className={`mb-2 ${styles.form__wrap}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="lastName"
                                                        name="lastName"
                                                        className={`${styles.form__field} border border-black ${errors.lastName ? 'border-red-952' : 'border-black'}`}
                                                        placeholder="Last name"
                                                        value={formData.lastName}
                                                        onChange={(e) => handleInput(e)}
                                                    />
                                                    <label htmlFor="lastName" className={`${styles.form__label}`}>Last Name</label>
                                                </div>
                                                <span className='text-red-952 text-sm flex items-center justify-start'>
                                                    {
                                                        errors.lastName &&
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

                                            <div className={`mb-2 ${styles.form__wrap}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className={`${styles.form__field} border border-black ${errors.email ? 'border-red-952' : 'border-black'}`}
                                                        placeholder="Company Email"
                                                        value={formData.email}
                                                        onChange={(e) => handleInput(e)}
                                                    />
                                                    <label htmlFor="email" className={`${styles.form__label}`}>Company Email</label>
                                                </div>
                                                <span className='text-red-952 text-sm flex items-center justify-start'>
                                                    {
                                                        errors.email &&
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

                                            <div className={`mb-5 ${styles.form__wrap}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="companyName"
                                                        name="companyName"
                                                        className={`${styles.form__field} border border-black ${errors.companyName ? 'border-red-952' : 'border-black'}`}
                                                        placeholder="Company Name"
                                                        value={formData.companyName}
                                                        onChange={(e) => handleInput(e)}
                                                    />
                                                    <label htmlFor="companyName" className={`${styles.form__label}`}>Company Name</label>
                                                </div>
                                                <span className='text-red-952 text-sm flex items-center justify-start'>
                                                    {
                                                        errors.companyName &&
                                                        <>
                                                            <Image
                                                                height={14}
                                                                width={14}
                                                                alt="error"
                                                                src="/img/alert-triangle.svg"
                                                                className='mr-2'
                                                            />
                                                            {errors.companyName}
                                                        </>
                                                    }
                                                </span>
                                            </div>

                                            <div className="relative pt-2">
                                                <button
                                                    className="rounded-lg h-16 bg-black w-full text-white text-md"
                                                >
                                                    Save & Continue
                                                </button>
                                            </div>
                                        </div>
                                        : null}
                                </form>

                                {/* === STEP 2 STARTS === */}
                                {stepTwo ? <Complete registerData={formData} /> : null}
                                {/* == STEP 2 ENDS === */}



                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}
