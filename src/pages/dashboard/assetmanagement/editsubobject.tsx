import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import { editSubObjectModalAction } from '@/store/actions/classAction';
import axios from "axios";

export default function EditSubObject(props: any) {

    const [objectsData, setObjectsData] = useState([] as any);
    const [data, setData] = useState({} as any);
    const [json, setJson] = useState({} as any)
    const [parentJoinKey, setParentJoinKey] = useState('' as any)
    const [parentJoinValue, setParentJoinValue] = useState('' as any)

    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    // console.log({
    //     access_token: access_token, 
    //     objID: props.objID, 
    //     selectedSubClass: props.selectedSubClass
    // })

    // GET ALL DATATYPES
    async function fetchObjectData() {
        let access_token = "" as any;
        if (typeof window !== 'undefined') {
            access_token = localStorage.getItem('authToken')
        }
        try {
            await axios({
                method: 'GET',
                url: `/api/getObjectById?objectId=${props.objID}&classId=${props.selectedSubClass}`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {

                    let arr1 = [] as any;
                    let arr2 = [] as any;
                    let arr3 = [] as any;

                    let data = response.data?.data?.rows || [] as any
                    setObjectsData(data)
                    let objectsData = data || [];

                    let key = Object.keys(objectsData[0]?.parentJoinValues);
                    let val = Object.values(objectsData[0]?.parentJoinValues)
                    setParentJoinKey(key[0])
                    // console.log({
                    //     "__VAL": objectsData
                    // })
                    setParentJoinValue(val[0])

                    data[0]?.Class?.ClassTags.map((item: any, index: any) => {
                        const linkContentVal = data[0]?.ObjectValues[index];
                        let tagWithID = item?.tagName + "_" + linkContentVal?.id
                        arr1.push(tagWithID);
                        arr3.push(item?.tagName)
                    })

                    data[0]?.ObjectValues.map((item: any) => {
                        arr2.push(item.values);
                    })

                    let arr5 = Object.fromEntries(arr1.map((v: any, i: any) => [v, arr2[i]]));
                    setData(arr5)
                    setJson(arr3)

                    // console.log({
                    //     arr3:arr3,
                    //     arr5:arr5
                    // })
                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH ESO": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH ESO": err
            })
        }
    }
    useEffect(() => {
        if(props.objID!=="" && (props.selectedSubClass!=="" || props.selectedSubClass===0)) {
            fetchObjectData();
        }
            
    }, [access_token, props.objID, props.selectedSubClass])

    const dispatch = useDispatch<any>();
    const closeModel = () => {
        dispatch(editSubObjectModalAction(false))
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
                "classTagId": parseInt(tagID)
            })
            objVal.push({
                tagName: tagName
            })
        })
        const objectValue = [] as any;
        Object.values(form_values).map((item: any) => {
            objectValue.push({
                "values": item
            })
        })

        let finalArray = objectKey.map((item: any, i: any) => Object.assign({}, item, objectValue[i]));
        const dataToSave = {
            "objectId": props.objID,
            "deleteValueId": [],
            "updatedValues": finalArray
        }
        let tokenStr = access_token;

        try {
            await axios({
                method: 'PUT',
                url: `/api/updateObjects`,
                data: dataToSave,
                headers: {
                    "Authorization": `Bearer ${tokenStr}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    dispatch(editSubObjectModalAction(false))
                    props.message(true)
                }
            }).catch(function (error) {
                console.log("ERROR IN AXIOS CATCH (EDIT SUB OBJECT):", error)
            })
        } catch (err) {
            console.log("ERROR IN TRY CATCH (EDIT SUB OBJECT):", err)
        }
    }

    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }


    // console.log({
    //     "__AMIT__ID": objectsData[0]?.Class?.ParentJoinKeys[0]?.parentTagId,
    //     "__AMIT__KEY": parentJoinKey,
    //     "__AMIT__VALUES": parentJoinValue
    // })

    return (
        <>
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>
                <div className="flex justify-between items-center w-full mb-3">
                    <h2 className="font-semibold text-lg">Edit Sub Object
                        <span className="hidden pl-2 text-sm text-gray-800">({props.parentClass} / {props.selectedSubClass} / <strong>{props.objID}</strong>)</span>
                    </h2>
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

                        {
                            objectsData && objectsData[0]?.ObjectValues.length > 0 &&
                            objectsData[0]?.ObjectValues.map((items: any, index: any) => {
                                const linkContent = objectsData[0]?.Class?.ClassTags[index];
                                const linkContentVal = objectsData[0]?.ObjectValues[index];
                                const stateVal = Object.values(data)[index];
                                const key = Object.keys(data)[index];
                                let label1 = Object.values(json)[index] as any
                                return (
                                    <div key={index} className="w-full flex justify-start items-start flex-wrap flex-col">
                                        <div className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    name={key}
                                                    id={`${key}_${linkContentVal.id}`}
                                                    className={`border border-gray-961 ${styles.form__field}`}
                                                    placeholder={key}
                                                    value={stateVal as any}
                                                    onChange={(e) => handleChange(e)}
                                                    required
                                                />
                                                <label htmlFor={`${key}`} className={`${styles.form__label}`}>{label1} <span className="hidden">{key}</span></label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                        <div className="w-full flex justify-start items-start flex-wrap flex-col">
                            <div className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}>
                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                    <input
                                        type="text"
                                        id={`${objectsData && objectsData[0]?.Class?.ParentJoinKeys[0]?.parentTagId}`}
                                        name={`${parentJoinKey}_${objectsData && objectsData[0]?.Class?.ParentJoinKeys[0]?.parentTagId}`}
                                        className={`border border-gray-961 ${styles.form__field} ${styles.form__field__disabled}`}
                                        placeholder=""
                                        value={`${parentJoinValue}`}
                                        // onChange={(e) => (formData.current = e.target.value)}
                                        disabled
                                        required
                                    />
                                    <label htmlFor="" className={`${styles.form__label}`}>Parent Join Key ({parentJoinKey})</label>
                                </div>
                            </div>
                        </div>


                        <div className="relative flex justify-end items-center w-full">
                            <button
                                className=" outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                            >
                                <span>Update</span>
                            </button>
                            <div
                                onClick={closeModel}
                                className="outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300 flex justify-center items-center"
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