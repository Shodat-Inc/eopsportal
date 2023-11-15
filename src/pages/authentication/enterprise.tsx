import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function Enterprise() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        workEmail: "",
        message: "",
        companyName: "",
        numberOfEmp: "",
        phoneNumber: "",
        CIN: "",
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        workEmail: "",
        message: "",
        companyName: "",
        numberOfEmp: "",
        phoneNumber: "",
        CIN: "",
    });
    const [formIsValid, setFormIsValid] = useState(true);
    const [userData, setUserData] = useState([] as any);
    const [success, setSuccess] = useState(false);
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
        if (!formData.workEmail) {
            formIsValid = false;
            newErrorsState.workEmail = "Email must not be empty!"
        } else if (!EMAIL_REGEX.test(formData.workEmail)) {
            formIsValid = false;
            newErrorsState.workEmail = "Please enter valid email address!"
        }


        // Validate message
        if (!formData.message) {
            formIsValid = false;
            newErrorsState.message = "Message must not be empty!"
        }

        // Validate company name
        if (!formData.companyName) {
            formIsValid = false;
            newErrorsState.companyName = "Company Name must not be empty!"
        }

        // Validate number of employee
        if (!formData.numberOfEmp) {
            formIsValid = false;
            newErrorsState.numberOfEmp = "Please select Number of Employee!"
        }

        // Validate phone number
        if (!formData.phoneNumber) {
            formIsValid = false;
            newErrorsState.phoneNumber = "Phone number must not be empty!"
        } else if (!PHONE_REGEX.test(formData.phoneNumber)) {
            formIsValid = false;
            newErrorsState.phoneNumber = "Please enter valid phone number!"
        } else if (formData.phoneNumber.length != 10) {
            formIsValid = false;
            newErrorsState.phoneNumber = "Please enter valid  phone number!"
        }

        // Validate CIN
        if (!formData.CIN) {
            formIsValid = false;
            newErrorsState.CIN = "Please enter your CIN number"
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
            // Storing data to Users JSON  
        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }

    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="font-OpenSans">
                {/* Header */}
                <Header />

                {/* MAIN Content */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Bg Image Information */}
                    {/* <BgInfo /> */}

                    <div className='h-full flex justify-center items-center mt-20'>
                        <Image
                            src="/img/contact-sales-image.svg"
                            alt='contact-sales-image'
                            height={320}
                            width={320}
                            className='inline-block'
                        />
                    </div>

                    {/* Content section */}
                    <div className='w-full mt-20 flex justify-center items-start'>
                        <div className='border border-[#D9D9D9] rounded rounded-lg w-[70%] mb-10'>
                            <div className='p-6 w-full'>
                                <h2 className='text-2xl font-semibold mb-2'>Contact Sales</h2>
                                <div className='text-[#8692A6] mb-4'>Lets get this conversation started. Tell us a bit about yourself, and we will get in touch as soon as we can</div>
                            </div>

                            <div className={`${styles.overflowScroll} mr-2 mb-6`}>
                                <form method='post' onSubmit={submitForm} className='w-full pl-6 pr-4'>

                                    <div className="flex w-full mb-3">
                                        <div className={`${styles.form__wrap} w-full`}>
                                            <div className={`relative ${styles.form__group} font-Inter`}>
                                                <input
                                                    type="text"
                                                    id="workEmail"
                                                    name="workEmail"
                                                    className={`${styles.form__field} border border-gray-954 !bg-white ${errors.workEmail ? 'border-red-952' : 'border-gray-954'}`}
                                                    placeholder="Work email address"
                                                    value={formData.workEmail}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <label htmlFor="workEmail" className={`${styles.form__label}`}>Work email address</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'>
                                                {errors.workEmail}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex w-full mb-3">
                                        <div className={`${styles.form__wrap} w-full`}>
                                            <div className={`relative ${styles.form__group} font-Inter`}>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    className={`${styles.form__field} border border-gray-954 !bg-white !h-24  ${errors.message ? 'border-red-952' : 'border-gray-954'}`}
                                                    placeholder="Message"
                                                    value={formData.message}
                                                    onChange={(e) => handleInput(e)}
                                                >
                                                </textarea>
                                                <label htmlFor="phoneNumber" className={`${styles.form__label}`}>Message</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'>
                                                {errors.message}
                                            </span>
                                        </div>
                                    </div>


                                    <div className="flex w-full mb-3">
                                        <div className={`${styles.form__wrap} w-full`}>
                                            <div className={`relative ${styles.form__group} font-Inter`}>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.firstName ? 'border-red-952' : 'border-gray-954'}`}
                                                    placeholder="First Name"
                                                    value={formData.firstName}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <label htmlFor="firstName" className={`${styles.form__label}`}>First Name</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'>{errors.firstName}</span>
                                        </div>
                                    </div>


                                    <div className="flex w-full mb-3">
                                        <div className={`${styles.form__wrap} w-full`}>
                                            <div className={`relative ${styles.form__group} font-Inter`}>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.lastName ? 'border-red-952' : 'border-gray-954'}`}
                                                    placeholder="Last Name"
                                                    value={formData.lastName}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <label htmlFor="lastName" className={`${styles.form__label}`}>Last Name</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'>{errors.lastName}</span>
                                        </div>
                                    </div>


                                    <div className="flex w-full mb-3">
                                        <div className={`${styles.form__wrap} w-full`}>
                                            <div className={`relative ${styles.form__group} font-Inter`}>
                                                <input
                                                    type="text"
                                                    id="companyName"
                                                    name="companyName"
                                                    className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.companyName ? 'border-red-952' : 'border-gray-954'}`}
                                                    placeholder="Company Name"
                                                    value={formData.companyName}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <label htmlFor="companyName" className={`${styles.form__label}`}>Company Name</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'>{errors.companyName}</span>
                                        </div>
                                    </div>


                                    <div className="flex w-full mb-3">
                                        <div className={`${styles.form__wrap} w-full`}>
                                            <div className={`relative ${styles.form__group} font-Inter`}>
                                                <input
                                                    type="text"
                                                    id="CIN"
                                                    name="CIN"
                                                    className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.CIN ? 'border-red-952' : 'border-gray-954'}`}
                                                    placeholder="CIN"
                                                    value={formData.CIN}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <label htmlFor="CIN" className={`${styles.form__label}`}>CIN</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'>{errors.CIN}</span>
                                        </div>
                                    </div>


                                    <div className="flex w-full mb-3">
                                        <div className={`${styles.form__wrap} w-full`}>
                                            <div className={`relative ${styles.form__group} font-Inter`}>
                                                <select
                                                    id="numberOfEmp"
                                                    name="numberOfEmp"
                                                    className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.numberOfEmp ? 'border-red-952' : 'border-gray-954'}`}
                                                    value={formData.numberOfEmp}
                                                    onChange={(e) => handleInput(e)}
                                                >
                                                    <option value="">Select number of employees</option>
                                                    <option value="5">5</option>
                                                    <option value="15">15</option>
                                                    <option value="25">25</option>
                                                    <option value="35">35</option>
                                                    <option value="45">45</option>
                                                </select>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'>{errors.numberOfEmp}</span>
                                        </div>
                                    </div>

                                    <div className="flex w-full mb-8">
                                        <div className={`${styles.form__wrap} w-full`}>
                                            <div className={`relative ${styles.form__group} font-Inter`}>
                                                <input
                                                    type="number"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.phoneNumber ? 'border-red-952' : 'border-gray-954'}`}
                                                    placeholder="Phone number"
                                                    value={formData.phoneNumber}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <label htmlFor="phoneNumber" className={`${styles.form__label}`}>Phone number</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'>{errors.phoneNumber}</span>
                                        </div>
                                    </div>


                                    <div className='flex justify-between items-center'>
                                        <Link href="/authentication/complete-individual" className='bg-white border border-black min-w-[111px] flex justify-center items-center rounded rounded-xl py-4 px-2 font-semibold'>
                                            <span>Talk to us</span>
                                        </Link>
                                        <Link href="/authentication/thankyou" className='bg-yellow-951 border-yellow-951 min-w-[111px] flex justify-center items-center rounded rounded-xl py-4 px-2 font-semibold'>
                                            <span>Submit</span>
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