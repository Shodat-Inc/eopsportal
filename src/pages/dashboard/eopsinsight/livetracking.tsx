import React, { useState, useRef, useEffect, useMemo } from "react"
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { GoogleMap, useJsApiLoader, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styles from '../../../styles/Common.module.css';
// import '../../../styles/globals.css';

export default function LiveTracking() {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBb9Fpz_nbVvsbLKvgOsKvPeStV4B2qniQ"
    })
    if (!isLoaded) return <div>Loading ...</div>
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">Live Tracking</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/eopsinsight"
                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/home.svg"
                                            alt="home"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm text-black hover:text-yellow-950 md:ml-1 font-bold">Live Tracking</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm text-black hover:text-yellow-950 md:ml-1 font-bold">VIN 5PVBE7AJ8R5T50001</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Content Goes Here */}
                    <div className="mt-8">
                        <Map />
                        <Image
                            src="/img/eopsinsights/live_tracking_img.png"
                            alt="Live Tracking"
                            height={500}
                            width={500}
                            className="h-full w-full hidden"
                        />
                    </div>

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

LiveTracking.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}

function Map() {

    const onLoad = (marker: any) => {
        console.log('marker: ', marker)
    }

    const centerPos = useMemo(() => ({ lat: 26.9124, lng: 75.7873 }), [])

    const [showInfo, setShowInfo] = useState(true);
    const handleInfoWindow = () => {
        setShowInfo(!showInfo);
    }
    const handleToggleClose = () => {
        setShowInfo(false);
    }

    return <GoogleMap
        zoom={15}
        center={centerPos}
        mapContainerClassName={`${styles.mapContainer}`}
    >
        <Marker
            onLoad={onLoad}
            position={centerPos}
            onClick={handleInfoWindow}
        >
            {showInfo ?
                <InfoWindow
                    onLoad={onLoad}
                    position={centerPos}
                    onCloseClick={handleToggleClose}
                >
                    <div className="rounded rounded-xl h-[70px] w-[250px] flex justify-center items-center bg-yellow-951 flex-wrap flex-col">
                        <h1 className="text-xl font-bold text-black w-full text-center">VIN</h1>
                        <p className="text-black text-lg w-full text-center">5PVBE7AJ8R5T50001</p>
                    </div>
                </InfoWindow>
                : null}
        </Marker>
    </GoogleMap>
}