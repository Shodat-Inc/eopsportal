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
                    <div className='w-full mt-32 flex justify-center items-start'>
                        <div className='rounded rounded-lg w-[70%] mb-10'>

                            <div className={`mb-6`}>
                                <div className='flex justify-start items-start w-full'>
                                    <Image
                                        src="/img/success_tick_icon.svg"
                                        alt="success_tick_icon"
                                        height={100}
                                        width={100}
                                        className='mb-4'
                                    />
                                </div>
                                <div className='flex flex-wrap flex-col justify-start items-start w-full'>
                                    <p className='font-bold text-3xl mb-2 text-black'>Thank you for contacting us!</p>
                                    <p className=' text-xl mb-2 text-[#0A0A0A]'>Our dedicated sales team will reach you as early as possible.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}