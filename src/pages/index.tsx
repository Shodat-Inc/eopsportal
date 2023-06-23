import Link from "next/link";
import Image from "next/image";
import Head from 'next/head'
import FabricInfo from "./authentication/fabricInfo";
import styles from '../styles/Common.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>eOPS Fabric</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="font-OpenSans md:flex lg:flex">
        <div className={`md:w-[50%] md:block sm:hidden ${styles.fabricInfo}`}>
          <FabricInfo />
        </div>

        <div className={`lg:w-[50%] md:w-[50%] sm:w-full sm:mt-0 relative ${styles.formContent}`}>
          <div className="sm:block md:hidden lg:hidden sm:mb-10 sm:w-full sm:flex sm:justify-center sm:items-center sm:pt-10 max-[540px]:mb-5 max-[540px]:w-full max-[540px]:flex max-[540px]:justify-center max-[540px]:items-center max-[540px]:pt-5 ">
            <Image
              src="/img/logo.svg"
              height={20}
              width={20}
              alt="logo"
              className="h-auto w-[200px]"
            />
          </div>
          <div className="flex justify-center items-center h-full sm:flex-wrap sm:flex-row xss:flex-wrap xss:flex-row">


            <div className={`pt-10 pr-2 text-right text-black text-xl font-medium absolute top-0 right-2 sm:relative sm:pt-3 sm:pb-3 sm:right-0 sm:left-0 md:absolute sm:pt-0 sm:pb-0 sm:right-2 sm:left-0 ${styles.dontHaveAcc}`}>
              <span className="text-gray-500 font-normal">Already have an account? </span> <Link href="/authentication/signin">Sign In</Link>
            </div>

            <div className="text-left lg:w-[470px] md:w-full sm:w-full sm:px-4">
              <p className="font-bold text-2xl text-black mb-4">Join Us!</p>
              <p className="font-normal text-xl text-gray-500 mb-10">To begin this journey, tell us what type of account you&apos;d be opening?</p>

              <Link href="authentication/register" className="rounded-lg border border-black px-4 py-6 bg-gray-100 flex justify-center items-center relative hover:border-black hover:bg-[#f1f1f1] hover:shadow-lg transition-all">
                <span className="rounded-md bg-gray-951 text-black h-7 w-20 flex font-medium justify-center items-center absolute top-2 right-10">Free</span>
                <div className="mr-4">
                  <Image
                    src="/img/business.svg"
                    alt="business"
                    className="h-14"
                    height={56}
                    width={56}
                  />
                </div>
                <div className="ml-2">
                  <p className="text-black font-medium text-xl w-[200px]">Business</p>
                  <p className="text-gray-600 font-normal text-lg w-[300px] leading-5">Own or belong to a company, this is for you.</p>
                </div>
                <div className="ml-2 mt-2">
                  <Image
                    src="/img/arrowRight.svg"
                    alt="business"
                    className="h-5"
                    width={18}
                    height={20}
                  />
                </div>
              </Link>

            </div>

          </div>
        </div>

      </div>
    </>
  );
}
