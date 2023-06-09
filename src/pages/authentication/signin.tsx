import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/Common.module.css';

export default function SignIn() {
    const { push } = useRouter();
    const [userData, setUserData] = useState([] as any);
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
    const [formIsValid, setFormIsValid] = useState(true);
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(false);
    const [responseError, setResponseError] = useState(false);
    useEffect(() => {
        axios.get("/api/getUsers")
            .then((response) => {
                setUserData(response.data)
            })
    }, [])

    // Show Hide Eye Icon
    const hideShow = () => {
        setShowPassword({
            ...showPassword,
            password: !showPassword.password
        })
    }

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

    // Handle Input
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

    // Check for validations
    const handleValidation = () => {
        const EMAIL_REGEX = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        const newErrorsState = { ...errors };
        let formIsValid = true;

        // Validate Last Name
        if (!formData.password) {
            formIsValid = false;
            newErrorsState.password = "Password must not be blank!"
        }

        // Validate Email Address
        if (!formData.username) {
            formIsValid = false;
            newErrorsState.username = "Username must not be empty!"
        } else if (!EMAIL_REGEX.test(formData.username)) {
            formIsValid = false;
            newErrorsState.username = "Please enter valid username address!"
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
            const matched = userData.filter((item: any) => {
                return item.username === formData.username && item.password === formData.password
            })
            if (matched && matched.length > 0) {
                sessionStorage.setItem("auth", userData);
                localStorage.setItem("auth", userData);
                setSuccess(true)
                setTimeout(() => {
                    push("/dashboard/assetmanagement");
                }, 2000)

            } else {
                setResponseError(true);
                setTimeout(() => {
                    setResponseError(false)
                    setFormData({
                        username: "",
                        password: ""
                    })
                    setErrors({
                        username: "",
                        password: ""
                    })
                }, 4000)
            }
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
                    <div className="flex justify-center items-center h-full">

                        <div className="pt-10 pr-2 text-right text-black text-xl font-medium absolute top-0 right-2">
                            <span className="text-gray-500 font-normal">Don&apos;t have an account? </span> <Link href="/authentication/register">Sign Up</Link>
                        </div>

                        <div className="text-left w-[470px]">
                            <p className="font-bold text-3xl text-black mb-4 capitalize">Hello! Welcome Back.</p>
                            <p className="font-normal text-2xl text-gray-500">Log in with your credenticals that you entered during your registration.</p>
                            <div className="mb-4 mt-5 border border-gray-100 w-full h-[1px]"></div>

                            {/* === Login Message Alert === */}
                            {responseError &&
                                <div className="mb-2 bg-red-100 border border-[#F5C6CB] text-[#721C24] px-4 py-3 rounded rounded-xl relative flex items-center justify-start text-m" role="alert">
                                    <Image
                                        src="/img/AlertError.svg"
                                        alt="Alert Success"
                                        height={24}
                                        width={24}
                                        className='mr-2'
                                    />
                                    <strong className="font-semibold">Login Failed!</strong>
                                    <span className="block sm:inline ml-2">Please try with different credentials!</span>
                                </div>
                            }

                            {success &&
                                <div className="mb-2 bg-[#D4EDDA] border border-[#D4EDDA] text-[#155724] textt-sm px-4 py-3 rounded rounded-xl relative flex items-center justify-start" role="alert">
                                    <Image
                                        src="/img/AlertSuccess.svg"
                                        alt="Alert Success"
                                        height={24}
                                        width={24}
                                        className='mr-2'
                                    />
                                    <strong className="font-semibold">Login Success!</strong>
                                    <span className="block sm:inline ml-2">Redirecting to portal ...</span>
                                </div>
                            }
                            {/* === Login Message Alert === */}

                            <div className="signinform relative">
                                <form method='post' onSubmit={submitForm}>

                                    <div className={`mb-5 ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                className={`${styles.form__field} border border-black ${errors.username ? 'border-red-952' : 'border-black'}`}
                                                placeholder="Your email address"
                                                value={formData.username}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="username" className={`${styles.form__label}`}>Your email address</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>
                                            {
                                                errors.username &&
                                                <>
                                                    <Image
                                                        height={14}
                                                        width={14}
                                                        alt="error"
                                                        src="/img/alert-triangle.svg"
                                                        className='mr-2'
                                                    />
                                                    {errors.username}
                                                </>
                                            }
                                        </span>
                                    </div>

                                    <div className={`mb-5 ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type={showPassword.password ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                className={`${styles.form__field} border border-black ${errors.password ? 'border-red-952' : 'border-black'}`}
                                                placeholder="Enter password"
                                                value={formData.password}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="password" className={`${styles.form__label}`}>Enter password</label>
                                            <span className="absolute text-black font-normal font-8 right-4 bottom-[11px] cursor-pointer" onClick={hideShow}>
                                                {
                                                    showPassword.password ?
                                                        <Image
                                                            src="/img/eye_hide_off_see_view_icon.svg"
                                                            alt='hide'
                                                            height={32}
                                                            width={32}
                                                        />
                                                        :
                                                        <Image
                                                            src="/img/eye_on_see_show_view_icon.svg"
                                                            alt='hide'
                                                            height={32}
                                                            width={32}
                                                        />
                                                }
                                            </span>
                                        </div>
                                        <div className="column-2 flex items-center justify-between">
                                            <span className='text-red-952 text-sm flex items-center justify-start'>
                                                {
                                                    errors.password &&
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
                                            <Link className="text-black text-sm font-medium mb-0 block" href="/authentication/forgotpassword">Forgot Password?</Link>
                                        </div>

                                    </div>

                                    <div className="relative">
                                        <button
                                            className={`flex rounded-lg h-16 bg-black1 w-full text-white text-lg block flex justify-center items-center ${success ? 'bg-gray-951' : 'bg-black'}`}
                                            disabled={success ? true : false}
                                        >
                                            <span className='flex justify-center items-center'>
                                                <span>{success ? "Please wait..." : 'Login'}</span>
                                                {success ?
                                                    <Image
                                                        src="/img/loading-gif.gif"
                                                        alt="loader"
                                                        height={20}
                                                        width={20}
                                                        className='ml-5'
                                                    />
                                                    : null}
                                            </span>
                                        </button>
                                        {/* <Link
                                            className="rounded-lg h-16 bg-black w-full text-white text-lg block flex justify-center items-center"
                                            href="/dashboard/assetmanagement"
                                        >
                                            Login
                                        </Link> */}
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div >

            </div >
        </>
    );
}
