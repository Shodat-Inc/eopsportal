import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import { editSubObjectModalAction } from '@/store/actions/classAction';
import axios from "axios";

export default function EditSubObject(props: any) {

    console.log({
        "PROPS IN SUBOBJECT": props
    })

    const [selectedObjectData, setSelectedObjectData] = useState([] as any);
    const [objectsData, setObjectsData] = useState([] as any);
    const formData = useRef("");

    async function fetchData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getChildObject`,

            }).then(function (response) {
                if (response) {


                    if (response) {
                        const filtered = response.data.filter((item: any) => {
                            return item.className === props.parentClass && item.object === props.subClass && item?.tags?.ID === props.selectedObject
                        })
                        setObjectsData(filtered[0]?.tags);
                        console.log({
                            filtered: filtered,
                            response: response.data
                        })
                    }
                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH": err
            })
        }
    }
    useEffect(() => {
        if (props.selectedObject) {
            fetchData();
        }
    }, [props.selectedObject])

    useEffect(() => {
        if (props.subClassData && props.subClassData.length > 0) {
            let filtered = props.subClassData.filter((item: any) => {
                return item.assetName === props.selectedSubClass
            })
            if (filtered) {
                setSelectedObjectData(filtered[0].tagsWithDataType)
            }
        }
    }, [props])

    const dispatch = useDispatch<any>();
    const closeModel = () => {
        dispatch(editSubObjectModalAction(false))
    }

    // Submit Form Data
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        let currentDate = new Date().toISOString().split('T')[0];
        const form_values = Object.fromEntries(formData);

        // const response = await fetch('/api/createChildObject', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(
        //         {
        //             className: `${props.parentClass}`,
        //             object: `${props.selectedSubClass}`,
        //             subObject: `${props.objID}`,
        //             dateCreated: `${currentDate}`,
        //             tags: form_values,
        //         }
        //     )
        // });
        // const resdata = await response.json();
        // if (resdata) {
        //     dispatch(successMessageAction(true));
        //     setTimeout(() => {
        //         dispatch(toggleAddNewObjectModel(false));
        //     }, 10)
        // } else {
        //     console.log("FAILED")
        // }
    }
    let entries = Object.entries(objectsData);

    return (
        <>
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>
                <div className="flex justify-between items-center w-full mb-3">
                    <h2 className="font-semibold text-lg">Edit Sub Object (<span className="text-sm text-gray-800">{props.parentClass} / {props.subClass} / <strong>{props.selectedObject}</strong></span>)</h2>
                    <button onClick={closeModel} className="transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform">
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
                        action=""
                        method="post"
                        onSubmit={handleSubmit}
                        className="w-full flex justify-start items-start flex-wrap flex-col"
                    >

                        {
                            entries.map(([key, val]) => (
                                <div className="w-full flex justify-start items-start flex-wrap flex-col">
                                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id={`${key}`}
                                                name={`${key}`}
                                                className={`border border-gray-961 ${styles.form__field}`}
                                                placeholder={`${key}`}
                                                onChange={(e) => (formData.current = e.target.value)}
                                                required
                                                value={`${val}`}
                                            />
                                            <label htmlFor={`${key}`} className={`${styles.form__label}`}>{key}</label>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                        <div className="relative flex justify-end items-center w-full">
                            <button
                                className="transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                            >
                                <span>Update</span>
                            </button>
                            <button
                                onClick={closeModel}
                                className="transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                            >
                                <span>Cancel</span>
                            </button>
                        </div>

                    </form>

                </div>

            </div>
            {props.show === true && <div className={styles.backdrop}></div>}
        </>
    )
}