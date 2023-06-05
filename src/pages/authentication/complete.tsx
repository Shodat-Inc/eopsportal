import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Complete(props: any) {
    const { push } = useRouter();
    const [showPassword, setShowPassword] = useState({
        pass: false,
        confirmPassword: false
    });
    const [formData, setFormData] = useState({
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })
    const [agreement, setAgreement] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    const [agreementError, setAgreementError] = useState("");
    const [userData, setUserData] = useState([] as any);

    // Get User Data on Page Load
    useEffect(() => {
        const res = axios.get("/api/getUsers")
            .then((response) => {
                setUserData(response)
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

    console.log("AMIT - USERS", userData)
    // Get Last Asset ID
    const getLastID = (userData && userData.length > 0) ? userData.slice(-1)[0].userID : '1';
    console.log("AMIT - getLastID", getLastID)

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
        let targetName = evt.target.name;
        let targetValue = evt.target.value;
        if (handleValidation()) {
            // Storing data to Users JSON            
            let currentDate = new Date().toISOString().split('T')[0];
            let ID = 1
            // const response = await fetch('/api/createUsers', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(
            //         {
            //             userID:ID+1, 
            //             username:`${props.registerData.email}`, 
            //             firstName:`${props.registerData.firstName}`, 
            //             lastName:`${props.registerData.lastName}`, 
            //             companyName:`${props.registerData.companyName}`, 
            //             phoneNumber:`${formData.phoneNumber}`, 
            //             password:`${formData.password}`, 
            //             terms:agreement, 
            //             dateCreated:currentDate, 
            //             dateModified:currentDate,
            //             role:"admin"
            //         }
            //     )
            // });           


            axios
                .post('/api/createUsers', {
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
                    role: "admin"
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    console.log('res', res.data);
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

    return (
        <>

            <div className="signinform relative">
                <form method='post' onSubmit={submitForm}>
                    <div className="mb-5">
                        <label className="text-gray-500 text-md font-medium mb-1 block">Phone number<span className='text-red-500'>*</span></label>
                        <input
                            type="number"
                            className={`border rounded-lg pl-5 pr-10 border-black h-12 w-full shadow-sm ${errors.phoneNumber ? 'border-red-500' : 'border-black'}`}
                            name="phoneNumber"
                            placeholder="Phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInput(e)}
                        />
                        <span className='text-red-500 text-sm'>{errors.phoneNumber}</span>
                    </div>
                    <div className="mb-5 relative">
                        <label className="text-gray-500 text-md font-medium mb-1 block">Enter password<span className='text-red-500'>*</span></label>
                        <div className='relative'>
                            <input
                                type={showPassword.pass ? "text" : "password"}
                                className={`border rounded-lg pl-5 pr-10 border-black h-12 w-full shadow-sm ${errors.password ? 'border-red-500' : 'border-black'}`}
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) => handleInput(e)}
                            />
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
                        <span className='text-red-500 text-sm'>{errors.password}</span>
                    </div>
                    <div className="mb-5 relative">
                        <div className="column-2 flex items-center justify-between">
                            <label className="text-gray-500 text-md font-medium mb-3 block">Confirm password<span className='text-red-500'>*</span></label>
                        </div>
                        <div className='relative'>
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                className={`border rounded-lg pl-5 pr-10 border-black h-12 w-full shadow-sm ${errors.confirmPassword ? 'border-red-500' : 'border-black'}`}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInput(e)}
                            />
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
                        <span className='text-red-500 text-sm'>{errors.confirmPassword}</span>
                    </div>
                    <div className="mb-5 relative flex flex-wrap">
                        <div className='flex'>
                            <input
                                className="checked:bg-black indeterminate:bg-gray-300"
                                type="checkbox"
                                name="agreement"
                                onChange={handleChange}
                            />
                            <label className="ml-5 text-gray-951 block">I agree to terms & conditions</label>
                        </div>
                        <span className='text-red-500 text-sm'>{!agreement ? agreementError : null}</span>
                    </div>
                    <div className="relative">
                        <button className={`rounded-lg h-16 bg-black1 w-full text-white text-md ${!formIsValid} ? bg-black : bg-black`}>
                            Register Account
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
                </form>
            </div>

        </>
    );
}
