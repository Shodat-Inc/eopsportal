import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Router from 'next/router';
import Image from "next/image";
import moment from 'moment';
import Complete from './complete';
import axios from 'axios';
import useSWR from 'swr'


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
        // const res = axios.get("/api/getUsers")
        //     .then((response) => {
        //         setUserData(response.data)
        //     })

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
            <div className="column-2 flex font-OpenSans">
                <div className="w-[50%] bg-[url('/img/architecture2.jpg')] bg-cover bg-no-repeat bg-center h-screen">
                    <div className="w-full h-full backdrop-brightness-25 px-16 py-16">
                        <div className="flex">
                            <Image
                                src="/img/logo-white.svg"
                                alt="logo"
                                className="fill-white"
                                width={127}
                                height={27}
                            />
                        </div>
                        <div className="mt-24">
                            <p className="mb-3">
                                <Image
                                    src="/img/quote_alt_left_icon.svg"
                                    alt="quote"
                                    className="h-8"
                                    width={32}
                                    height={32}
                                />
                            </p>
                            <p className="text-xl text-white font-light leading-10">
                                The eOps Fabric - Edge enabled data mesh with management, processing, & security features. Enabling agile development & secured dilivery of analytics applications and ML models to meet high paced business demands. The eOps  Chord-Blockchain framework ensuring highly compliant and audited edge operations.
                            </p>
                        </div>
                    </div>
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
                            <p className="font-bold text-2xl text-black mb-3 capitalize">
                                {stepTwo ?
                                    <span>Complete Your Profile!</span>
                                    :
                                    <span>Register a Business Account!</span>}
                            </p>
                            <p className="font-normal text-xl text-gray-500">For the purpose of industry regulation, your details are required.</p>
                            <div className="mb-4 mt-5 border border-gray-100 w-full h-[1px]"></div>
                            <div className="signinform relative">
                                <form method='post' onSubmit={submitForm}>
                                    {stepOne ?
                                        <div>
                                            <div className="mb-5">
                                                <label className="text-gray-500 text-md font-medium mb-1 block">First name<span className='text-red-500'>*</span></label>
                                                <input
                                                    type="text"
                                                    className={`border rounded-lg pl-5 pr-10 border-black h-12 w-full shadow-sm ${errors.firstName ? 'border-red-500' : 'border-black'}`}
                                                    name="firstName"
                                                    placeholder="First name"
                                                    value={formData.firstName}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <span className='text-red-500 text-sm'>{errors.firstName}</span>
                                            </div>
                                            <div className="mb-5">
                                                <label className="text-gray-500 text-md font-medium mb-1 block">Last name<span className='text-red-500'>*</span></label>
                                                <input
                                                    type="text"
                                                    className={`border rounded-lg pl-5 pr-10 border-black h-12 w-full shadow-sm ${errors.lastName ? 'border-red-500' : 'border-black'}`}
                                                    name="lastName"
                                                    placeholder="Last name"
                                                    value={formData.lastName}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <span className='text-red-500 text-sm'>{errors.lastName}</span>
                                            </div>
                                            <div className="mb-5 relative">
                                                <div className="column-2 flex items-center justify-between">
                                                    <label className="text-gray-500 text-md font-medium mb-1 block">Email<span className='text-red-500 text-sm'>*</span></label>
                                                </div>
                                                <input
                                                    type="text"
                                                    className={`border rounded-lg pl-5 pr-10 border-black h-12 w-full shadow-sm ${errors.email ? 'border-red-500' : 'border-black'}`}
                                                    name="email"
                                                    placeholder="Company name"
                                                    value={formData.email}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <span className='text-red-500 text-sm'>{errors.email}</span>
                                            </div>
                                            <div className="mb-8 relative">
                                                <div className="column-2 flex items-center justify-between">
                                                    <label className="text-gray-500 text-md font-medium mb-1 block">Company name<span className='text-red-500 text-sm'>*</span></label>
                                                </div>
                                                <input
                                                    type="text"
                                                    className={`border rounded-lg pl-5 pr-10 border-black h-12 w-full shadow-sm ${errors.companyName ? 'border-red-500' : 'border-black'}`}
                                                    name="companyName"
                                                    placeholder="Company name"
                                                    value={formData.companyName}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <span className='text-red-500 text-sm'>{errors.companyName}</span>
                                            </div>

                                            <div className="relative">
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
