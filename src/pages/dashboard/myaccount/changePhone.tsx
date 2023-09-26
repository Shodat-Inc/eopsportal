import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
export default function ChangePhone(props: any) {
    const [edit, setEdit] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("+919571373757")
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
                <div className="text-lg font-semibold text-black w-[33%]">Change Phone Number</div>
                <div className="relative w-[34%] text-right hidden">
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

            <div className='w-full flex justify-center item-center'>
                <div className="flex justify-center item-center w-[50%] min-h-[250px] flex-wrap flex-col">
                    <div className={`mb-7 ${styles.form__wrap} w-[100%]`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                className={`${styles.form__field} border border-black bg-white`}
                                placeholder="Phone Number"
                                value={phoneNumber}
                            />
                            <label htmlFor="currentPassword" className={`${styles.form__label}`}>Phone Number</label>
                        </div>
                    </div>
                    <div className={`mb-0 ${styles.form__wrap} w-[100%]`}>
                        <button className='bg-yellow-951 text-black text-sm rounded rounded-xl flex justify-center items-center h-[48px] w-full'>Update</button>
                    </div>
                </div>
            </div>


        </div>
    )
}