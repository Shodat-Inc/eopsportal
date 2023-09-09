import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
export default function ChangePassword(props: any) {
    const [edit, setEdit] = useState(false);
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

            <div className="flex justify-between items-start mb-5">
                <div className="text-lg font-semibold text-black w-[33%]">Change Password</div>                
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
                <div className={`mb-5 ${styles.form__wrap} w-[100%]`}>
                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                        <input
                            type="text"
                            id="currentPassword"
                            name="currentPassword"
                            className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                            placeholder="Current Password"
                            value=""
                            disabled={!edit ? true : false}
                        />
                        <label htmlFor="currentPassword" className={`${styles.form__label}`}>Current Password</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-between item-center">


                <div className={`mb-5 ${styles.form__wrap} w-[100%]`}>
                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                        <input
                            type="text"
                            id="newPassword"
                            name="newPassword"
                            className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                            placeholder="New Password"
                            value=""
                            disabled={!edit ? true : false}
                        />
                        <label htmlFor="newPassword" className={`${styles.form__label}`}>New Password</label>
                    </div>
                </div>
            </div>

            <div className="flex justify-between item-center">
                <div className={`mb-5 ${styles.form__wrap} w-[100%]`}>
                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                        <input
                            type="text"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`${styles.form__field} border border-black ${!edit ? styles.form__field__disabled : 'bg-white'}`}
                            placeholder="Confirm Password"
                            value=""
                            disabled={!edit ? true : false}
                        />
                        <label htmlFor="confirmPassword" className={`${styles.form__label}`}>Confirm Password</label>
                    </div>
                </div>
            </div>


        </div>
    )
}