import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from 'next/link';
import Router from 'next/router'
import { breadCrumbNavigationAction } from '@/store/actions/aimodaldetectionAction';

export default function Breadcrumb(props: any) {
    // console.log({
    //     "__PROPS_IN_BREADCRUMBS": props
    // })
    const dispatch = useDispatch<any>()
    const [nav, setNav] = useState({} as any);

    const getSelClass = useSelector((state: any) => state.classReducer);

    useEffect(() => {
        setNav(props?.breadcrumbs || getSelClass?.classBreadcrumbs)
    }, [props?.breadcrumbs || getSelClass?.classBreadcrumbs])

    console.log({
        getSelClass: getSelClass
    })

    const handleClassClicked = () => {
        // const navData = {
        //     "className": getSelClass?.classBreadcrumbs?.class,
        //     "classID": getSelClass?.dataforeopswatchReducer?.class,
        //     "classTab": 2,
        //     "subClassName": getSelClass?.classBreadcrumbs?.subClass,
        //     "subClassID": getSelClass?.dataforeopswatchReducer?.subClass,
        //     "subClassTab": 4,
        //     "object": getSelClass?.classBreadcrumbs?.classObjValue,
        //     "objectID": getSelClass?.dataforeopswatchReducer?.classObject,
        //     "objectTab": 2,
        //     "subObject": getSelClass?.classBreadcrumbs?.subClassObjValue,
        //     "subObjectID": getSelClass?.dataforeopswatchReducer?.object,
        //     "subObjectTab": 3
        // }

        const navData = {
            "className": getSelClass?.classBreadcrumbs?.class,
            "classID": getSelClass?.dataforeopswatchReducer?.class,
            "classTab": 2,
            "subClassName": "",
            "subClassID": "",
            "subClassTab": 0,
            "object": "",
            "objectID": "",
            "objectTab": 0,
            "subObject": "",
            "subObjectID": "",
            "subObjectTab": 0
        }

        dispatch(breadCrumbNavigationAction(navData))

        setTimeout(() => {
            Router.push({
                pathname: '/dashboard/assetmanagement',
            })
        }, 50)
    }

    const handleClassObjectClicked = () => {
        const navData = {
            "className": getSelClass?.classBreadcrumbs?.class,
            "classID": getSelClass?.dataforeopswatchReducer?.class,
            "classTab": 2,
            "subClassName": "",
            "subClassID": "",
            "subClassTab": 0,
            "object": getSelClass?.classBreadcrumbs?.classObjValue,
            "objectID": getSelClass?.dataforeopswatchReducer?.classObject,
            "objectTab": 2,
            "subObject": "",
            "subObjectID": "",
            "subObjectTab": 0
        }
        dispatch(breadCrumbNavigationAction(navData))
        setTimeout(() => {
            Router.push({
                pathname: '/dashboard/assetmanagement',
            })
        }, 50)
    }

    const handleSubClassClicked = () => {
        const navData = {
            "className": getSelClass?.classBreadcrumbs?.class,
            "classID": getSelClass?.dataforeopswatchReducer?.class,
            "classTab": 2,
            "subClassName": getSelClass?.classBreadcrumbs?.subClass,
            "subClassID": getSelClass?.dataforeopswatchReducer?.subClass,
            "subClassTab": 4,
            "object": getSelClass?.classBreadcrumbs?.classObjValue,
            "objectID": getSelClass?.dataforeopswatchReducer?.classObject,
            "objectTab": 2,
            "subObject": "",
            "subObjectID": "",
            "subObjectTab": 0
        }
        dispatch(breadCrumbNavigationAction(navData))
        setTimeout(() => {
            Router.push({
                pathname: '/dashboard/assetmanagement',
            })
        }, 50)
    }

    const handleSubClassObjectClicked = () => {
        const navData = {
            "className": getSelClass?.classBreadcrumbs?.class,
            "classID": getSelClass?.dataforeopswatchReducer?.class,
            "classTab": 2,
            "subClassName": getSelClass?.classBreadcrumbs?.subClass,
            "subClassID": getSelClass?.dataforeopswatchReducer?.subClass,
            "subClassTab": 4,
            "object": getSelClass?.classBreadcrumbs?.classObjValue,
            "objectID": getSelClass?.dataforeopswatchReducer?.classObject,
            "objectTab": 2,
            "subObject": getSelClass?.classBreadcrumbs?.subClassObjValue,
            "subObjectID": getSelClass?.dataforeopswatchReducer?.object,
            "subObjectTab": 3
        }
        dispatch(breadCrumbNavigationAction(navData))
        setTimeout(() => {
            Router.push({
                pathname: '/dashboard/assetmanagement',
            })
        }, 50)
    }

    return (
        <>
            {nav ?
                <div className="relative bg-white rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3] mb-5">
                    <ul className="flex justify-start items-center text-sm">
                        <li className="flex justify-start items-center">
                            <Link
                                href="/dashboard/assetmanagement"
                                className="font-semibold"
                            >
                                {nav.flow}
                            </Link>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                className="font-semibold"
                                onClick={handleClassClicked}
                            >
                                <span>{nav.class}</span>
                            </button>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                className="font-semibold"
                                onClick={handleClassObjectClicked}
                            >
                                {
                                    nav.classObjKey ?
                                        <span>{nav.classObjKey}: {nav.classObjValue}</span>
                                        :
                                        <span>{nav.classObjValue}</span>
                                }
                            </button>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                className="font-semibold"
                                onClick={handleSubClassClicked}
                            >
                                <span>{nav.subClass}</span>
                            </button>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                className="font-semibold"
                                onClick={handleSubClassObjectClicked}
                            >
                                <span>{nav.subClassObjValue}</span>
                            </button>
                        </li>

                        {props?.current &&
                            <li className="flex justify-start items-center">
                                <Image
                                    src="/img/chevron-right.svg"
                                    alt="chevron-right"
                                    height={28}
                                    width={28}
                                />
                                <span className="text-gray-967 capitalize">
                                    {props?.current}
                                </span>
                            </li>
                        }

                    </ul>
                </div>
                : null
            }
        </>
    )

}