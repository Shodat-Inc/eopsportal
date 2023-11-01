import Link from "next/link";
import Image from "next/image";
import Head from 'next/head'
import FabricInfo from "./authentication/fabricInfo";
import styles from '../styles/Common.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>eOps Fabric</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="font-Inter md:flex lg:flex">
        <div className={`md:w-[50%] md:block sm:hidden ${styles.fabricInfo}`}>
          <FabricInfo />
        </div>

        <div className={`lg:w-[50%] md:w-[50%] sm:w-full sm:mt-0 relative ${styles.formContent}`}>

          <div className="flex justify-center items-center h-full sm:flex-wrap sm:flex-row xss:flex-wrap xss:flex-col">

            <div className="sm:mx-0 lg:mx-0 md:mx-2 lg:hidden md:hidden small:block">
              <Image
              src="/img/logoNew.svg"
              alt="logo"
              height={40}
              width={150}
              />
            </div>

            <div className={`pt-10 pr-2 text-right text-black text-xl font-medium lg:absolute top-0 right-2 sm:relative sm:pt-3 sm:pb-3 sm:right-0 sm:left-0 md:relative sm:pt-0 sm:pb-0 sm:right-2 sm:left-0 ${styles.dontHaveAcc}`}>
              <span className="text-gray-500 font-normal">Already have an account? </span> <Link href="/authentication/signin">Sign In</Link>
            </div>

            <div className="text-left lg:w-[520px] md:w-full sm:w-full sm:px-4 md:mb-10 small:mb-6 small:text-center">
              <p className="font-[800] text-3xl text-black mb-4">Join Us!</p>
              <p className="font-normal text-lg text-gray-500 mb-10">To begin this journey, tell us what type of account you&apos;d be opening.</p>

              <Link
                href="authentication/register"
                className="rounded-lg border border-black px-4 py-6 bg-gray-100 flex justify-between items-center relative hover:border-black hover:bg-[#f1f1f1] hover:shadow-lg transition-all mb-10 md:w-full md:flex-wrap md:flex-col lg:flex-nowrap lg:flex-row md:text-center lg:text-left small:w-full small:flex-wrap small:flex-col lg:flex-nowrap lg:flex-row small:text-center"
              >
                <Image
                  src="/img/sign/individual.svg"
                  alt="individual.svg"
                  height={52}
                  width={52}
                  className="md:mb-4 lg:mb-0 small:mb-4 xss:mb-4"
                />
                <div className="ml-2">
                  <p className="text-black mb-1 font-medium text-xl lg:w-[200px] md:w-full md:mb-4 lg:mb-0 small:mb-4 xss:mb-4">Individual</p>
                  <p className="text-gray-600 font-normal text-md lg:w-[250px] md:w-full md:mb-4 lg:mb-0 leading-5 small:mb-4 xss:mb-4">Personal account to manage all you activities.</p>
                </div>
                <button className="rounded-md bg-gray-970 text-black h-7 w-20 flex font-medium justify-center items-center">Free</button>
              </Link>

              <Link
                href="authentication/enterprise"
                className="rounded-lg border border-[#efefef] px-4 py-6 bg-white shadow shadow-md flex justify-between items-center relative hover:shadow-lg transition-all md:w-full md:flex-wrap md:flex-col lg:flex-nowrap lg:flex-row md:text-center lg:text-left small:w-full small:flex-wrap small:flex-col lg:flex-nowrap lg:flex-row small:text-center"
              >
                <Image
                  src="/img/sign/enterprises.svg"
                  alt="enterprises.svg"
                  height={52}
                  width={52}
                  className="md:mb-4 lg:mb-0 small:mb-4 xss:mb-4"
                />
                <div className="ml-2">
                  <p className="text-black mb-1 font-medium text-xl lg:w-[200px] md:w-full md:mb-4 lg:mb-0 small:mb-4 xss:mb-4">Enterprises</p>
                  <p className="text-gray-600 font-normal text-md lg:w-[250px] md:w-full md:mb-4 lg:mb-0 leading-5 small:mb-4 xss:mb-4">Own or belong to a company, this is for you.</p>
                </div>
                <button className="rounded-md bg-gray-970 text-black h-7 w-20 flex font-medium justify-center items-center">Contact</button>
              </Link>

            </div>

          </div>
        </div>

      </div>
    </>
  );
}
