<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../../styles/Common.module.css';
import FabricInfo from './fabricInfo';
import Head from 'next/head'

export default function Complete(props: any) {
=======
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Link from "next/link";
import Router from 'next/router';
import Image from "next/image";
import axios from 'axios';
import FabricInfo from './fabricInfo';
import Head from 'next/head'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useRouter } from 'next/navigation';

export default function Complete() {
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
    const { push } = useRouter();
    const [showPassword, setShowPassword] = useState({
        pass: false,
        confirmPassword: false
    });
    const [formData, setFormData] = useState({
        phoneNumber: "",
<<<<<<< HEAD
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({
        phoneNumber: "",
        password: "",
        confirmPassword: ""
=======
        companyName: "",
    })
    const [errors, setErrors] = useState({
        phoneNumber: "",
        companyName: "",
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
    })
    const [agreement, setAgreement] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    const [agreementError, setAgreementError] = useState("");
<<<<<<< HEAD
    const [userData, setUserData] = useState([] as any);
    const [success, setSuccess] = useState(false);
=======
    const [success, setSuccess] = useState(false);
    const [items, setItems] = useState([] as any);
    const [lastID, setLastID] = useState(0)

    useEffect(() => {
        const items = localStorage.getItem('registerData');
        if (items) {
            setItems(JSON.parse(items));
        }
    }, []);

    const [phoneCode, setPhoneCode] = useState('RU')
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d

    // Get User Data on Page Load
    useEffect(() => {
        axios.get("/api/getUsers")
            .then((response) => {
<<<<<<< HEAD
                setUserData(response.data)
            })
    }, [])

    // Show Hide Eye Icon
    const hideShow = () => {
        setShowPassword({
            ...showPassword,
            pass: !showPassword.pass
        })
    }
    const hideShowConfirm = () => {
        setShowPassword({
            ...showPassword,
            confirmPassword: !showPassword.confirmPassword
        })
    }


=======
                let lastID = response.data.slice(-1)[0].userID;
                setLastID(lastID)
            })
    }, [])

>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
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

<<<<<<< HEAD
    // Get Last Asset ID
    const getLastID = (userData && userData.length > 0) ? userData.slice(-1)[0].userID : '1';
    console.log({
        getLastID:getLastID,
        userData:userData,        
    })

    const handleValidation = () => {
        const PHONE_REGEX = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
        const newErrorsState = { ...errors };
        let formIsValid = true;
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

        // Validate Last Name
        if (!formData.password) {
            formIsValid = false;
            newErrorsState.password = "Password must not be empty!"
        }

        // Validate company Name
        if (!formData.confirmPassword) {
            formIsValid = false;
            newErrorsState.confirmPassword = "Confirm password must not be empty!"
        } else if (formData.confirmPassword !== formData.password) {
            formIsValid = false;
            newErrorsState.confirmPassword = "Password and Confirm Password does not match"
=======
    const handleValidation = () => {
        const newErrorsState = { ...errors };
        let formIsValid = true;

        // Validate Last Name
        if (!formData.companyName) {
            formIsValid = false;
            newErrorsState.companyName = "Company name must not be empty!"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
        }

        // Validation for Checkbox
        if (!agreement) {
            formIsValid = false;
            setAgreementError("You must agree with terms and condition");
        }

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setFormIsValid(false);
            setErrors(newErrorsState);
        }

        return formIsValid
    }

    const submitForm = async (evt: any) => {
        evt.preventDefault()
        if (handleValidation()) {
<<<<<<< HEAD
            // Storing data to Users JSON            
            let currentDate = new Date().toISOString().split('T')[0];
            axios.post('/api/createUsers', {
                userID: parseInt(getLastID) + 1,
                username: `${props.registerData.email}`,
                firstName: `${props.registerData.firstName}`,
                lastName: `${props.registerData.lastName}`,
                companyName: `${props.registerData.companyName}`,
                phoneNumber: `${formData.phoneNumber}`,
                password: `${formData.password}`,
                terms: agreement,
                dateCreated: currentDate,
                dateModified: currentDate,
=======
            let currentDate = new Date().toISOString().split('T')[0];
            let currentTime = new Date().toISOString().split('T')[1].split(".")[0];
            let currentDateTime = currentDate + " " + currentTime;
            axios.post('/api/createUsers', {
                userID: lastID + 1,
                username: `${items.email}`,
                firstName: `${items.firstName}`,
                lastName: `${items.lastName}`,
                companyName: `${formData.companyName}`,
                phoneNumber: `${phoneCode}`,
                password: `${items.password}`,
                terms: agreement,
                dateCreated: currentDateTime,
                dateModified: currentDateTime,
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                role: "admin"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
<<<<<<< HEAD
                console.log('res', res.data);
=======
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                setSuccess(true)
                setTimeout(() => {
                    push("/authentication/success");
                }, 2000)
            }).catch(err => {
                console.log('error in request', err);
            });

        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }

    const handleChange = (event: any) => {
        setAgreement(event.target.checked);
        if (event.target.checkbox) { setFormIsValid(false); }
    }

<<<<<<< HEAD
    return (
        <>

            <div className="signinform relative">
                <form method='post' onSubmit={submitForm}>

                    <div className={`mb-5 ${styles.form__wrap}`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                className={`${styles.form__field} border border-black ${errors.phoneNumber ? 'border-red-952' : 'border-black'}`}
                                placeholder="Phone number"
                                value={formData.phoneNumber}
                                onChange={(e) => handleInput(e)}
                            />
                            <label htmlFor="phoneNumber" className={`${styles.form__label}`}>Phone number</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
                            {errors.phoneNumber &&
                                <>
                                    <Image
                                        height={14}
                                        width={14}
                                        alt="error"
                                        src="/img/alert-triangle.svg"
                                        className='mr-2'
                                    />
                                    {errors.phoneNumber}
                                </>
                            }
                        </span>
                    </div>

                    <div className={`mb-5 ${styles.form__wrap}`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type={showPassword.pass ? "text" : "password"}
                                id="password"
                                name="password"
                                className={`${styles.form__field} border border-black ${errors.password ? 'border-red-952' : 'border-black'}`}
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) => handleInput(e)}
                            />
                            <label htmlFor="password" className={`${styles.form__label}`}>Enter password</label>
                            <span
                                className="absolute text-black font-normal font-8 right-2 bottom-[8px] cursor-pointer"
                                onClick={hideShow}
                            >
                                {
                                    showPassword.pass ?
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
                        <span className='text-red-952 text-sm flex items-center justify-start'>
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

                    <div className={`mb-5 ${styles.form__wrap}`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                className={`${styles.form__field} border border-black ${errors.confirmPassword ? 'border-red-952' : 'border-black'}`}
                                placeholder="Enter confirm password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInput(e)}
                            />
                            <label htmlFor="confirmPassword" className={`${styles.form__label}`}>Enter confirm password</label>
                            <span
                                className="absolute text-black font-normal font-8 right-2 bottom-[8px] cursor-pointer"
                                onClick={hideShowConfirm}
                            >
                                {
                                    showPassword.confirmPassword ?
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
                        <span className='text-red-952 text-sm flex items-center justify-start'>
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

                    <div className="mb-5 relative flex flex-wrap">
                        <div className='flex justify-start items-center'>
                            <div className={`${styles.customCheck}`}>
                                <input type='checkbox' name="agreement" onChange={handleChange} />
                                <span></span>
                            </div>
                            <label className="ml-2 text-black block">I agree to terms & conditions</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
                            {!agreement ?
                                <>
                                    <Image
                                        height={14}
                                        width={14}
                                        alt="error"
                                        src="/img/alert-triangle.svg"
                                        className='mr-2'
                                    />
                                    {agreementError}
                                </>
                                : null}
                        </span>
                    </div>
                    <div className="relative">
                        <button className={`rounded-lg h-16 bg-black1 w-full text-white text-md ${!formIsValid} ? bg-black : bg-black`}>
                            {/* Register Account */}
                            <span className='flex justify-center items-center'>
                                <span>{success ? "Please wait..." : 'Register Account'}</span>
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
                        <div className="mt-5 mb-5 flex items-center justify-center">
                            <Image
                                src="/img/lock.svg"
                                alt="lock"
                                className="h-6"
                                height={24}
                                width={24}
                            />
                            <span className="text-gray-951 text-sm">Your info is safely secured</span>
                        </div>
                    </div>
                </form >
            </div >

=======

    const [successVerify, setSuccessVerify] = useState(false)
    const verifyPhoneFunction = () => {
        setSuccessVerify(!successVerify);
        setTimeout(() => {
            Router.push({
                pathname: '/authentication/verifyphone'
            }, 'verifyphone')
        }, 100)
    }

    return (
        <>
            <Head>
                <title>eOps Fabric - Register</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="column-2 flex font-Inter">
                <div className={`lg:w-[50%] lg:block md:hidden md:hidde sm:hidden ${styles.fabricInfo}`}>
                    <FabricInfo />
                </div>

                <div className={`lg:w-[50%] md:w-full sm:w-full sm:mt-0 relative ${styles.formContent}`}>
                    <div className="flex justify-start items-center h-full flex-wrap flex-col">

                        <div className="pt-5 pr-2 text-left text-gray-951 text-lg font-medium mb-5 md:w-full lg:pl-0 md:pl-5 lg:w-[470px]">
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

                        <div className="text-left w-[450px] lg:w-[450px] md:w-full sm:w-full lg:px-0 lg:py-0 md:px-5 md:py-5 sm:px-5 sm:py-5 sm:text-left">
                            <p className="font-[700] text-3xl md:text-3xl md:text-left text-black mb-2 capitalize sm:text-center sm:text-2xl">
                                Complete Your Profile!
                            </p>
                            <p className="font-normal text-lg text-gray-500">For the purpose of industry regulation, your details are required.</p>
                            <div className="mb-4 mt-5 border border-gray-100 w-full h-[1px]"></div>
                            <div className="signinform relative">

                                <div className="signinform relative">
                                    <form method='post' onSubmit={submitForm}>

                                        <div className={`mb-3 relative justify-start items-start flex flex-wrap flex-col w-full mb-4 relative ${styles.phoneField}`}>
                                            <label htmlFor="phoneNumber" className='font-[500] text-md text-gray-971 mb-3'>Phone Number <span>*</span></label>

                                            <PhoneInput
                                                international
                                                countryCallingCodeEditable={false}
                                                defaultCountry="RU"
                                                className='rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-16 w-full'
                                                value={phoneCode}
                                                onChange={(inputValue: any) => setPhoneCode(inputValue)}
                                            />

                                            <button
                                                onClick={verifyPhoneFunction}
                                                className={`text-sm ${successVerify ? 'text-[#138A00]' : 'text-black'} font-semibold absolute right-[6px] top-[49px]`}>
                                                {successVerify ? 'Verified' : 'Verify'}
                                            </button>
                                        </div>

                                        <div className='mb-3 relative justify-start items-start flex flex-wrap flex-col w-full mb-4'>
                                            <label htmlFor="companyName" className='font-[500] text-md text-gray-971 mb-3'>Company Name <span>*</span></label>
                                            <input
                                                type="text"
                                                className='rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-2 w-full'
                                                id="companyName"
                                                name="companyName"
                                                placeholder='Company Name'
                                                value={formData.companyName}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <span className='text-red-952 text-sm flex items-center justify-start'>{errors.companyName}</span>
                                        </div>

                                        <div className="mb-7 relative flex flex-wrap">
                                            <div className='flex justify-start items-center'>
                                                <div className={`${styles.customCheck} mt-2`}>
                                                    <input
                                                        type='checkbox'
                                                        name="agreement"
                                                        onChange={handleChange} />
                                                    <span></span>
                                                </div>
                                                <label className="ml-2 text-black block">I agree to terms & conditions</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'>
                                                {!agreement ?
                                                    <>
                                                        {agreementError}
                                                    </>
                                                    : null}
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <button className={`rounded-lg h-16 bg-black1 w-full text-white text-md ${!formIsValid} ? bg-black : bg-black`}>
                                                {/* Register Account */}
                                                <span className='flex justify-center items-center'>
                                                    <span>{success ? "Please wait..." : 'Register Account'}</span>
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
                                            <div className="mt-5 mb-5 flex items-center justify-center">
                                                <Image
                                                    src="/img/lock.svg"
                                                    alt="lock"
                                                    className="h-6"
                                                    height={18}
                                                    width={18}
                                                />
                                                <span className="text-gray-951 text-[12px]">Your info is safely secured</span>
                                            </div>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
        </>
    );
}
