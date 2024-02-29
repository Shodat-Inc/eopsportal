import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Router from 'next/router';
import { useRouter } from 'next/router';
import axios from "axios";

export default function CompleteIndividual() {
    const [phoneCode, setPhoneCode] = useState('IN')
    const [companyName, setCompanyName] = useState("")
    const [verified, setVerified] = useState(false);
    const [terms, setTerms] = useState(false as any);
    const [success, setSuccess] = useState(false)
    const [prevData, setPrevData] = useState({} as any);
    const router = useRouter();

    const authenticationReducer = useSelector((state: any) => state.authenticationReducer);
    useEffect(() => {
        setPrevData(authenticationReducer?.saveUserFirstStepReducer)
    }, [authenticationReducer?.saveUserFirstStepReducer])

    const handleInput = (evt: any) => {
        evt.preventDefault()
        let targetName = evt.target.name;
        let targetValue = evt.target.value;
        setCompanyName(targetValue)
    };

    const handleClick = (e: any) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setTerms(checked);
    }

    console.log({
        phoneCode: phoneCode,
        companyName: companyName,
        terms: terms
    })

    const submitForm = async () => {
        if (phoneCode !== "" && companyName !== "" && terms === true) {
            let fromData = {
                "email": prevData.email,
                "firstName": prevData.firstName,
                "lastName": prevData.lastName,
                "companyName": companyName,
                "countryCodeId": 91,
                "phoneNumber": phoneCode,
                "password": prevData.password,
                "isPrimary": true,
                "primary": true,
                "roleId": 1
            }


            console.log({
                fromData: fromData
            })

            try {
                await axios({
                    method: 'POST',
                    url: `/api/createUsers`,
                    withCredentials: false,
                    data: fromData,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(function (response) {
                    if (response) {
                        console.log({
                            "RESPONSE": response
                        })
                        setSuccess(true)

                    }
                }).catch(function (error) {
                    console.log({
                        ERROR_IN_AXIOS_CATCH: error
                    })
                })
            } catch (err) {
                console.log({
                    ERROR_IN_TRY_CATCH: err
                })
            }
        }
    }

    useEffect(() => {
        if (success === true) {
            setTimeout(() => {
                router.push('/authentication/signin');
            }, 5000)
        }
    }, [success])

    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Complete Individual Registeration</title>
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
                    {success === true &&
                        <div className='w-full mt-32 flex justify-center items-start'>
                            <div className='rounded-lg w-[70%] mb-10'>

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
                                        <p className='text-xl text-[#0A0A0A]'>Our dedicated sales team will reach you as early as possible.</p>
                                    </div>
                                </div>

                                <div className='flex flex-wrap flex-col justify-start items-start w-full text-xl text-[#0A0A0A]'>
                                    <Link href="/authentication/signin">Sign in</Link>
                                </div>

                            </div>
                        </div>
                    }

                    {/* Content section */}
                    {success === false &&
                        <div className="flex justify-center items-start w-full mt-10">
                            <div className="relative w-[70%]">
                                <Link href="/authentication/individual" className="flex justify-start items-center font-semibold mb-5">
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
                                    <h2 className='text-2xl font-semibold mb-2'>Complete your registration!</h2>
                                    <div className='text-[#8692A6] mb-4'>For the purpose of industry regulation, your details are required.</div>

                                    {success &&
                                        <div className={`bg-green-957 border-green-958 text-green-959 border text-md px-4 py-3 rounded-xl relative flex items-center justify-start mb-5`}>
                                            <Image
                                                src="/img/AlertSuccess.svg"
                                                alt="Alert Info"
                                                height={32}
                                                width={32}
                                                className='mr-2'
                                            />
                                            <span className="block sm:inline ml-2">Registered Successfully! Redirection to login ...</span>
                                        </div>
                                    }

                                    {/* <form action="" className='w-full'> */}
                                    <div className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`justify-start items-start flex flex-wrap flex-col w-full mb-4 relative ${styles.phoneField}`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans w-full`}>
                                                <PhoneInput
                                                    international
                                                    countryCallingCodeEditable={false}
                                                    defaultCountry="IN"
                                                    className='rounded-lg border border-gray-972 h-[46px] pl-4 pr-16 w-full'
                                                    value={phoneCode}
                                                    onChange={(inputValue: any) => setPhoneCode(inputValue)}
                                                />
                                                <label htmlFor="phoneNumber" className='font-[500] text-md text-gray-971 mb-3'>Phone Number <span>*</span></label>
                                                {
                                                    verified &&
                                                    <div>
                                                        <div className='text-green-500 text-sm absolute right-[10px] top-[48px] font-semibold'>Verified</div>
                                                        <span className='absolute right-[-20px] top-[48px]'>
                                                            <Image
                                                                src="/img/green-circular-tick.svg"
                                                                alt="green-circular-tick"
                                                                height={19}
                                                                width={19}
                                                                className=""
                                                            />
                                                        </span>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="companyName"
                                                name="companyName"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder='companyName'
                                                value={companyName}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="companyName" className={`${styles.form__label} !text-[#666666]`}>Company Name (Optional)</label>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-8 relative flex flex-wrap">
                                            <div className='flex justify-start items-center'>
                                                <div className={`${styles.customCheck} mt-2`}>
                                                    <input
                                                        type='checkbox'
                                                        name="agreement"
                                                        onClick={handleClick}
                                                        value={terms}
                                                    />
                                                    <span></span>
                                                </div>
                                                <label className="ml-2 text-[#696F79] block">I agree to terms & conditions</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-end items-center'>
                                        <button
                                            onClick={submitForm}
                                            className={`min-w-[111px] flex justify-center items-center rounded-xl py-4 px-2 font-semibold ${phoneCode !== "" && companyName !== "" && terms === true ? 'bg-yellow-951' : 'bg-gray-951'}`}
                                        >
                                            <span>Submit</span>
                                        </button>
                                    </div>
                                    {/* </form> */}
                                </div>

                            </div>
                        </div>
                    }
                </div>

            </div>
        </>
    )
}