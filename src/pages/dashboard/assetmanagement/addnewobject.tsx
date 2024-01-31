import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import { toggleAddNewObjectModel } from "@/store/actions/classAction";
import { successMessageAction, successMessagAdvancedAction } from '@/store/actions/classAction';
import axios from 'axios';

export default function AddNewObject(props: any) {

    const [selectedObjectData, setSelectedObjectData] = useState([] as any);
    const [objectData, setObjectData] = useState([] as any)
    const formData = useRef("");

    const classSelector = useSelector((state: any) => state.classReducer);

    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    useEffect(() => {
        if (props.subClassData && props.subClassData.length > 0) {
            let filtered = props.subClassData.filter((item: any) => {
                return item.id === props.selectedSubClass
            })
            if (filtered) {
                console.log({
                    "__AMIT": filtered
                })
                setSelectedObjectData(filtered[0].ClassTags)
                setObjectData(filtered);
            }
        }
    }, [props])

    const dispatch = useDispatch<any>();
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
        const objVal = [] as any;
        Object.keys(form_values).map((item: any) => {
            let tagID = item.split("_")[1];
            let tagName = item.split("_")[0];
            objectKey.push({
                "classTagId": tagID
            })
            objVal.push({
                tagName: tagName
            })
        })
        const objectValue = [] as any;
        Object.values(form_values).map((item: any) => {
            objectValue.push({
                "value": item
            })
        })

        let finalArray = objectKey.map((item: any, i: any) => Object.assign({}, item, objectValue[i]));
        const dataToSave = {
            "classId": props.selectedSubClass,
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
                    dispatch(successMessageAction(true))
                    let data = {
                        "type": "newSubObject",
                        "action": true
                    };
                    dispatch(successMessagAdvancedAction(data))
                    setTimeout(() => {
                        dispatch(toggleAddNewObjectModel(false));
                    }, 50);
                }
            }).catch(function (error) {
                console.log("ERROR IN AXIOS CATCH (CREATE CLASS OBJECT):", error)
            })
        } catch (err) {
            console.log("ERROR IN TRY CATCH (CREATE CLASS OBJECT):", err)
        }
    }

    return (
        <>
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>
                <div className="flex justify-between items-center w-full mb-3">
                    <h2 className="font-semibold text-lg">Add New Object (<span className="text-sm text-gray-800">{props.subClassName}</span>)</h2>
                    <button onClick={closeModel} className="duration-100 outline-none transform active:scale-75 transition-transform">
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
                        {selectedObjectData && selectedObjectData.length != 0 ?
                            selectedObjectData.map((item: any, index: any) => (
                                <div key={index} className="w-full flex justify-start items-start flex-wrap flex-col">
                                    <div className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id={`${item.tagName}`}
                                                // name={`${item.tagName}`}
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
                            <div className="flex justify-center items-center flex-wrap flex-col font-OpenSans mt-20">
                                <div className="no-data-image">
                                    <Image
                                        src="/img/not-found.svg"
                                        alt="no data found!"
                                        className="inline-block"
                                        height={72}
                                        width={72}
                                    />
                                </div>
                                <p className="text-black text-xl mt-8 font-semibold">No data found!!</p>
                            </div>
                        }

                        <div className="w-full flex justify-start items-start flex-wrap flex-col">
                            <div className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}>
                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                    <input
                                        type="text"
                                        id={`${objectData[0]?.ParentJoinKeys[0]?.parentTagId}`}
                                        name={`${objectData[0]?.ParentJoinKeys[0]?.tagname}_${objectData[0]?.ParentJoinKeys[0]?.parentTagId}`}
                                        className={`border border-gray-961 ${styles.form__field}`}
                                        placeholder=""
                                        value={`${classSelector?.classBreadcrumbs?.classObjValue}`}
                                        onChange={(e) => (formData.current = e.target.value)}
                                        required
                                    />
                                    <label htmlFor="" className={`${styles.form__label}`}>Parent Join Key ({objectData[0]?.ParentJoinKeys[0]?.tagname})</label>
                                </div>
                            </div>
                        </div>


                        <div className="relative flex justify-end items-center w-full">
                            <button
                                className="outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                            >
                                <span>Save</span>
                            </button>
                            <button
                                onClick={closeModel}
                                className=" outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
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