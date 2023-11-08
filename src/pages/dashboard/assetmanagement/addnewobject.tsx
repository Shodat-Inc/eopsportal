import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import axios from "axios";
import { toggleAddNewObjectModel } from "@/store/actions/classAction";

export default function AddNewObject(props: any) {
    const dispatch = useDispatch<any>();
    const [allSubClass, setAllSubClass] = useState([] as any);
    const [subClass, setSubClass] = useState([] as any);
    const [data, setData] = useState([] as any);
    const formData = useRef("");
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    // UseEffect to get Sub Class from parent Class ID
    useEffect(() => {
        let tokenStr = access_token;
        (async function () {
            try {
                await axios({
                    method: 'GET',
                    url: `/api/getChildAssets?id=${props.parentClassID}`,
                    headers: {
                        "Authorization": `Bearer ${tokenStr}`,
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                    if (response.data) {
                        setAllSubClass(response.data.data)
                        console.log({
                            "RESPONSE": response.data.data
                        })
                    }
                }).catch(function (error) {
                    console.log("ERROR IN AXIOS CATCH BLOCK")
                })
            } catch (err) {
                console.log("ERROR IN TRY CATCH BLOCK:", err)
            }
        })();
    }, [props.parentClassID]);
    // Get the exact sub class data 
    useEffect(() => {
        if (allSubClass && allSubClass.length > 0) {
            const filtered = allSubClass.filter((item: any) => {
                return item.S_No === props.subClassID
            })
            setSubClass(filtered)
        }
    }, [allSubClass]);

    const closeModel = () => {
        dispatch(toggleAddNewObjectModel(false));
    }

    // Save Data for subclass
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        let currentDate = new Date().toISOString().split('T')[0];
        const form_values = Object.fromEntries(formData);
        const objectKey = [] as any;
        Object.keys(form_values).map((item: any) => {
            let tagID = item.split("_")[1];
            objectKey.push({
                "classTagId": tagID                
            })
        })
        const objectValue = [] as any;
        Object.values(form_values).map((item: any) => {            
            objectValue.push({                
                "value": item
            })
        })

        let finalArray = objectKey.map((item:any, i:any) => Object.assign({}, item, objectValue[i]));
        const dataToSave = {
            "classId": 3, //Static id of Sub Class for Battery
            "values": finalArray
        }

        let tokenStr = access_token;
        try {
            await axios({
                method: 'POST',
                url: `/api/createObjects`,
                data: dataToSave,
                headers: {
                    "Authorization": `Bearer ${tokenStr}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    console.log({
                        MESSAGE: "SUCCESS: Stored successfully!"
                    })                   
                }
            }).catch(function (error) {
                console.log("ERROR IN AXIOS CATCH BLOCK:", error)
            })
        } catch (err) {
            console.log("ERROR IN TRY CATCH BLOCK:", err)
        }

        // console.log({
        //     "FORM DATA": formData,
        //     "FORM VALUE": form_values,
        //     "INDIVIDUAL": Object.keys(form_values),
        //     "objectValue": objectValue,
        //     "objectKey":objectKey,
        //     "finalArray":finalArray,
        //     "dataToSave":dataToSave
        // })

    }

    console.log({
        "PROPS IN ADD NEW OBJECT": props,
        "SELECTED SUB CLASS DATA": subClass
    })
    return (
        <>
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>
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
                    <form
                        method='post'
                        onSubmit={handleSubmit}
                        className="w-full flex justify-start items-start flex-wrap flex-col"
                    >
                        {
                            subClass && subClass.length >= 0 ?
                                subClass[0]?.ClassTags.map((item: any, index: any) => (
                                    <div key={index} className="w-full flex justify-start items-start flex-wrap flex-col">
                                        <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    id={`${item.tagName}`}
                                                    name={`${item.tagName}_${item.id}`}
                                                    className={`border border-gray-961 ${styles.form__field}`}
                                                    placeholder={`${item.tagName}`}
                                                    onChange={(e) => (formData.current = e.target.value)}
                                                    required
                                                />
                                                <label htmlFor={`${item.tagName}`} className={`${styles.form__label}`}>{item.tagName}</label>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <h2>No sub class tags found!!</h2>
                        }


                        {/* <div className="w-full flex justify-start items-start flex-wrap flex-col hidden">
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
                        </div> */}

                        <div className="relative flex justify-end items-center w-full">
                            <button
                                className="border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                            >
                                <span>Save</span>
                            </button>
                            <div
                                onClick={closeModel}
                                className="border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300 cursor-pointer flex justify-center items-center"
                            >
                                <span>Cancel</span>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
            {props.show === true && <div className={styles.backdrop}></div>}
        </>
    )
}