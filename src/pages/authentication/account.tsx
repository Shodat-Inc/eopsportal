import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Image from "next/image";
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: any) => axios.get(url).then(res => res.data)
export default function Account(props: any) {
    const [successVerify, setSuccessVerify] = useState(false)

    const verifyEmailFunction = () => {
        setSuccessVerify(!successVerify)
        setTimeout(() => {
            Router.push({
                pathname: '/authentication/verifyaccount'
            }, 'verifyaccount')
        }, 100)
    }


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        verify:false,
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [formIsValid, setFormIsValid] = useState(true);
    const [userData, setUserData] = useState([] as any);
    const { data, error } = useSWR('/api/getUsers', fetcher);

    // Get User Data on Page Load
    useEffect(() => {
        setUserData(data)
    }, [data, error])

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
            setTimeout(() => {
                Router.push({
                    pathname: '/authentication/complete'
                }, 'authentication/complete')
            }, 100)
        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }


    return (
        <div className='flex flex-wrap flex-col justify-start items-start'>
            <form method='post' onSubmit={submitForm} className='w-full'>
                <div className='mb-3 relative justify-start items-start flex flex-wrap flex-col w-full mb-4'>
                    <label htmlFor="firstName" className='font-[500] text-md text-gray-971 mb-3'>First Name <span>*</span></label>
                    <input
                        type="text"
                        className={`rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-2 w-full ${errors.firstName ? 'border-red-952' : 'border-gray-972'}`}
                        id="firstName"
                        name="firstName"
                        placeholder='First Name'
                        value={formData.firstName}
                        onChange={(e) => handleInput(e)}
                    />
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

                <div className='mb-3 relative justify-start items-start flex flex-wrap flex-col w-full mb-4'>
                    <label htmlFor="lastName" className='font-[500] text-md text-gray-971 mb-3'>Last Name <span>*</span></label>
                    <input
                        type="text"
                        className={`rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-2 w-full ${errors.lastName ? 'border-red-952' : 'border-gray-972'}`}
                        id="lastName"
                        name="lastName"
                        placeholder='Last Name'
                        value={formData.lastName}
                        onChange={(e) => handleInput(e)}
                    />
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

                <div className='mb-3 relative justify-start items-start flex flex-wrap flex-col w-full mb-4 relative'>
                    <label htmlFor="emailaddress" className='font-[500] text-md text-gray-971 mb-3'>Email address <span>*</span></label>
                    <input
                        type="text"
                        className={`rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-16 w-full ${errors.email ? 'border-red-952' : 'border-gray-972'}`}
                        id="email"
                        name="email"
                        placeholder='Enter your email address'
                        value={formData.email}
                        onChange={(e) => handleInput(e)}
                    />
                    <button
                        onClick={verifyEmailFunction}
                        className={`text-sm ${successVerify ? 'text-[#138A00]' : 'text-black'} font-semibold absolute right-[6px] top-[49px]`}>
                        {successVerify ? 'Verified' : 'Verify'}
                    </button>
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

                <div className='mb-3 relative justify-start items-start flex flex-wrap flex-col w-full mb-4'>
                    <label htmlFor="password" className='font-[500] text-md text-gray-971 mb-3'>Password <span>*</span></label>
                    <input
                        type="password"
                        className={`rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-2 w-full ${errors.password ? 'border-red-952' : 'border-gray-972'}`}
                        id="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={(e) => handleInput(e)}
                    />
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

                <div className='mb-8 relative justify-start items-start flex flex-wrap flex-col w-full mb-4'>
                    <label htmlFor="confirmPassword" className='font-[500] text-md text-gray-971 mb-3'>Confirm Password <span>*</span></label>
                    <input
                        type="confirmPassword"
                        className={`rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-2 w-full ${errors.confirmPassword ? 'border-red-952' : 'border-gray-972'}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={(e) => handleInput(e)}
                    />
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

                <div className='relative justify-start items-start flex flex-wrap flex-col w-full mb-4'>
                    <button
                        className="rounded-lg h-16 bg-black w-full text-white text-md justify-center items-center flex"
                    >
                        <span>Continue</span>
                    </button>
                </div>

            </form>
        </div>
    )
}