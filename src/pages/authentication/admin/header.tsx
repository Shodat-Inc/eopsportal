import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '../../../styles/Common.module.css';
import Head from 'next/head';
export default function Header() {
    return (
        <div className='flex justify-between items-center px-3 py-3 w-full'>
            <Link href="/">
                <Image
                    src="/img/logo-new.svg"
                    alt='logo'
                    height={35}
                    width={82}
                    className='h-auto w-auto'
                />
            </Link>
            <ul className='flex justify-between items-center min-w-[250px]'>
                <li>
                    <button className='h-[37px] text-black bg-yellow-951 px-3 text-sm flex justify-center items-center rounded rounded-xl'>Plans and pricing</button>
                </li>
                <li><Link href="#">Help</Link></li>
                <li><Link href="#">Sign In</Link></li>
            </ul>
        </div>
    )
}