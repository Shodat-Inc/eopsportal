import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import axios from 'axios';

export default function EditProfile(props: any) {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
    })
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
    });

    const [formIsValid, setFormIsValid] = useState(true);

    const [edit, setEdit] = useState(false);

    const [userData, setUserData] = useState([] as any);

    // Get All User Data From JSON
    useEffect(() => {
        let authenticationUsername = localStorage.getItem('authenticationUsername');
        axios.get("/api/getUsers").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    if (item.emailAddress === authenticationUsername) {
                        return item;
                    }
                });
                if (filtered && filtered.length > 0) {
                    setUserData(filtered);
                    setFormData({
                        firstName: filtered[0].firstName,
                        lastName: filtered[0].lastName,
                        emailAddress: filtered[0].emailAddress,
                        phone: filtered[0].phoneNumber,
                        address: filtered[0].address,
                        city: filtered[0].city,
                        state: filtered[0].state,
                        pincode: filtered[0].pincode,
                        country: filtered[0].country,
                    })
                }
            }
        });
    }, [])

    console.log({
        userData: userData
    })

    // Return matching email address in an array
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

        // Validate Email Address
        // if (!formData.emailAddress) {
        //     formIsValid = false;
        //     newErrorsState.emailAddress = "Email must not be empty!"
        // } else if (!EMAIL_REGEX.test(formData.emailAddress)) {
        //     formIsValid = false;
        //     newErrorsState.emailAddress = "Please enter valid email address!"
        // } else if (checkEmailAdress(formData.emailAddress) === true) {
        //     formIsValid = false;
        //     newErrorsState.emailAddress = "Email address already exists please enter unique email!!"
        // }

        // Validate Phone Number
        if (!formData.phone) {
            formIsValid = false;
            newErrorsState.phone = "Phone must not be empty!"
        }

        // Validate Address
        if (!formData.address) {
            formIsValid = false;
            newErrorsState.address = "Address must not be empty!"
        }

        // Validate city
        if (!formData.city) {
            formIsValid = false;
            newErrorsState.city = "City must not be empty!"
        }

        // Validate state
        if (!formData.state) {
            formIsValid = false;
            newErrorsState.state = "State must not be empty!"
        }

        // Validate pincode
        if (!formData.pincode) {
            formIsValid = false;
            newErrorsState.pincode = "Pincode must not be empty!"
        }

        // Validate country
        if (!formData.country) {
            formIsValid = false;
            newErrorsState.country = "Country must not be empty!"
        }

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setFormIsValid(false);
            setErrors(newErrorsState);
        }

        return formIsValid
    }

    // Submit form
    const submitForm = (evt: any) => {
        evt.preventDefault()
        if (handleValidation()) {
            console.log("Here you go buddy ....")
        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }


    // Toggle Edit & Save button
    const toggleSave = () => {
        setEdit(!edit)
    }
    // Save Form Data
    const saveDetails = () => {
        console.log("Save Details!")
    }
    return (
        <div className="relative bg-white p-5">
            <form method='post' onSubmit={submitForm}>

                <div className="flex justify-between items-start mb-10">
                    <div className="text-lg font-semibold text-black w-[33%]">Edit Profile</div>
                    <div className="relative w-[33%] text-center">
                        <div className="inline-flex relative">
                            <span className="bg-blue-961 rounded-full h-[90px] w-[90px] flex items-center justify-center relative text-5xl font-normal text-white">A</span>
                            <button
                                className="rounded-full bg-yellow-951 h-[24px] w-[24px] flex items-center justify-center absolute right-[-5px] bottom-[5px]"
                            >
                                <Image
                                    src="/img/editpencil.svg"
                                    alt="edit_icon"
                                    height={13}
                                    width={13}
                                    className=""
                                />
                            </button>
                        </div>
                    </div>
                    <div className="relative w-[34%] text-right">
                        {
                            !edit ?

                                <button
                                    onClick={toggleSave}
                                    className="text-sm text-white px-2 bg-black flex justify-center items-center rounded-lg h-9 w-20  transition-opacity duration-300 outline-none transform active:scale-75 transition-transform inline-flex"
                                >
                                    <Image
                                        src="/img/edit_white_icon.svg"
                                        alt="edit"
                                        height={13}
                                        width={13}
                                        className="mr-1"
                                    />
                                    <span>Edit</span>
                                </button>
                                :
                                <div className="flex text-right inline-flex">
                                    <button
                                        onClick={saveDetails}
                                        className="border border-black text-sm text-white px-2 bg-black flex justify-center items-center rounded-lg h-9 w-30 hover:bg-yellow-951 hover:text-black hover:border-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                    >
                                        <span>Save changes</span>
                                    </button>
                                    <button
                                        onClick={() => setEdit(false)}
                                        className="ml-2 border border-black text-sm text-black px-2 flex justify-center items-center rounded-lg h-9 w-30 hover:bg-yellow-951 hover:border-yellow-951 hover:text-black transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                    >
                                        <span>Cancel</span>
                                    </button>
                                </div>
                        }
                    </div>
                </div>

                <div className="flex justify-between item-center">
                    <div className={`mb-5 ${styles.form__wrap} w-[45%]`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={(e) => handleInput(e)}
                                disabled={!edit ? true : false}

                            />
                            <label htmlFor="firstname" className={`${styles.form__label}`}>First Name</label>
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
                    <div className={`mb-5 ${styles.form__wrap} w-[45%]`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={(e) => handleInput(e)}
                                disabled={!edit ? true : false}
                            />
                            <label htmlFor="lastName" className={`${styles.form__label}`}>Last Name</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
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
                </div>

                <div className="flex justify-between item-center">
                    <div className={`mb-5 ${styles.form__wrap} w-[45%]`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="emailAddress"
                                name="emailAddress"
                                className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : styles.form__field__disabled}`}
                                placeholder="Email Address"
                                value={formData.emailAddress}
                                // onChange={(e) => handleInput(e)}
                                disabled={true}
                            />
                            <label htmlFor="emailAddress" className={`${styles.form__label}`}>Email Address</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
                            {
                                errors.emailAddress &&
                                <>
                                    <Image
                                        height={14}
                                        width={14}
                                        alt="error"
                                        src="/img/alert-triangle.svg"
                                        className='mr-2'
                                    />
                                    {errors.emailAddress}
                                </>
                            }
                        </span>
                    </div>
                    <div className={`mb-5 ${styles.form__wrap} w-[45%]`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                                placeholder="Contact Number"
                                value={formData.phone}
                                onChange={(e) => handleInput(e)}
                                disabled={!edit ? true : false}
                            />
                            <label htmlFor="phone" className={`${styles.form__label}`}>Contact Number</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
                            {
                                errors.phone &&
                                <>
                                    <Image
                                        height={14}
                                        width={14}
                                        alt="error"
                                        src="/img/alert-triangle.svg"
                                        className='mr-2'
                                    />
                                    {errors.phone}
                                </>
                            }
                        </span>
                    </div>
                </div>

                <div className="flex justify-between item-center">
                    <div className={`mb-5 ${styles.form__wrap} w-full`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                                placeholder="address"
                                value={formData.address}
                                onChange={(e) => handleInput(e)}
                                disabled={!edit ? true : false}
                            />
                            <label htmlFor="address" className={`${styles.form__label}`}>Address</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
                            {
                                errors.address &&
                                <>
                                    <Image
                                        height={14}
                                        width={14}
                                        alt="error"
                                        src="/img/alert-triangle.svg"
                                        className='mr-2'
                                    />
                                    {errors.address}
                                </>
                            }
                        </span>
                    </div>
                </div>

                <div className="flex justify-between item-center">
                    <div className={`mb-5 ${styles.form__wrap} w-[45%]`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                                placeholder="City"
                                value={formData.city}
                                onChange={(e) => handleInput(e)}
                                disabled={!edit ? true : false}
                            />
                            <label htmlFor="city" className={`${styles.form__label}`}>City</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
                            {
                                errors.city &&
                                <>
                                    <Image
                                        height={14}
                                        width={14}
                                        alt="error"
                                        src="/img/alert-triangle.svg"
                                        className='mr-2'
                                    />
                                    {errors.city}
                                </>
                            }
                        </span>
                    </div>
                    <div className={`mb-5 ${styles.form__wrap} w-[45%]`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                                placeholder="State"
                                value={formData.state}
                                onChange={(e) => handleInput(e)}
                                disabled={!edit ? true : false}
                            />
                            <label htmlFor="state" className={`${styles.form__label}`}>State</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
                            {
                                errors.state &&
                                <>
                                    <Image
                                        height={14}
                                        width={14}
                                        alt="error"
                                        src="/img/alert-triangle.svg"
                                        className='mr-2'
                                    />
                                    {errors.state}
                                </>
                            }
                        </span>
                    </div>
                </div>

                <div className="flex justify-between item-center">
                    <div className={`mb-5 ${styles.form__wrap} w-[45%]`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={(e) => handleInput(e)}
                                disabled={!edit ? true : false}
                            />
                            <label htmlFor="pincode" className={`${styles.form__label}`}>Pincode</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
                            {
                                errors.pincode &&
                                <>
                                    <Image
                                        height={14}
                                        width={14}
                                        alt="error"
                                        src="/img/alert-triangle.svg"
                                        className='mr-2'
                                    />
                                    {errors.pincode}
                                </>
                            }
                        </span>
                    </div>
                    <div className={`mb-5 ${styles.form__wrap} w-[45%]`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                                placeholder="Country"
                                value={formData.country}
                                onChange={(e) => handleInput(e)}
                                disabled={!edit ? true : false}
                            />
                            <label htmlFor="country" className={`${styles.form__label}`}>Country</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
                            {
                                errors.country &&
                                <>
                                    <Image
                                        height={14}
                                        width={14}
                                        alt="error"
                                        src="/img/alert-triangle.svg"
                                        className='mr-2'
                                    />
                                    {errors.country}
                                </>
                            }
                        </span>
                    </div>
                </div>

            </form>

        </div>
    )
}