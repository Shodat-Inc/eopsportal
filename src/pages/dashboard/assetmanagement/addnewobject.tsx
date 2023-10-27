import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import { toggleAddNewObjectModel } from "@/store/actions/classAction";

export default function AddNewObject(props: any) {
    const dispatch = useDispatch<any>();
    const closeModel = () => {
        dispatch(toggleAddNewObjectModel(false));
    }
    return (
        <div className="bg-white h-full w-[45%] z-[11] fixed top-0 right-0 p-5 shadow shadow-lg">
            <div className="flex justify-between items-center w-full mb-3">
                <h2 className="font-semibold text-lg">Add New Object</h2>
                <button onClick={closeModel}>
                    <Image
                        src="/img/x.svg"
                        alt="close"
                        height={27}
                        width={27}
                    />
                </button>
            </div>

            <div className={`flex justify-start items-start w-full overflow-auto h-full pb-10 ${styles.scroll} pr-3`}>
                <form action="" className="w-full flex justify-start items-start flex-wrap flex-col">
                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="serialID"
                                name="serialID"
                                className={`border border-gray-961 ${styles.form__field}`}
                                placeholder="Enter class name"
                                required
                            />
                            <label htmlFor="serialID" className={`${styles.form__label}`}>Enter Serial ID</label>
                        </div>
                    </div>

                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="VIN"
                                name="VIN"
                                className={`border border-gray-961 ${styles.form__field}`}
                                placeholder="Enter class name"
                                required
                            />
                            <label htmlFor="VIN" className={`${styles.form__label}`}>Enter VIN No</label>
                        </div>
                    </div>

                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="manufacturer"
                                name="manufacturer"
                                className={`border border-gray-961 ${styles.form__field}`}
                                placeholder="Enter class name"
                                required
                            />
                            <label htmlFor="manufacturer" className={`${styles.form__label}`}>Enter Manufacturer</label>
                        </div>
                    </div>

                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="capacity"
                                name="capacity"
                                className={`border border-gray-961 ${styles.form__field}`}
                                placeholder="Enter class name"
                                required
                            />
                            <label htmlFor="capacity" className={`${styles.form__label}`}>Enter Capacity (AH)</label>
                        </div>
                    </div>

                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="voltage"
                                name="voltage"
                                className={`border border-gray-961 ${styles.form__field}`}
                                placeholder="Enter class name"
                                required
                            />
                            <label htmlFor="voltage" className={`${styles.form__label}`}>Enter Voltage (V)</label>
                        </div>
                    </div>

                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="lotNo"
                                name="lotNo"
                                className={`border border-gray-961 ${styles.form__field}`}
                                placeholder="Enter class name"
                                required
                            />
                            <label htmlFor="lotNo" className={`${styles.form__label}`}>Enter Lot No</label>
                        </div>
                    </div>

                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                            <input
                                type="text"
                                id="type"
                                name="type"
                                className={`border border-gray-961 ${styles.form__field}`}
                                placeholder="Enter class name"
                                required
                            />
                            <label htmlFor="type" className={`${styles.form__label}`}>Enter Type</label>
                        </div>
                    </div>

                    <div className="relative flex justify-end items-center w-full">
                        <button
                            className="border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                        >
                            <span>Save</span>
                        </button>
                        <button
                            onClick={closeModel}
                            className="border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                        >
                            <span>Cancel</span>
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}