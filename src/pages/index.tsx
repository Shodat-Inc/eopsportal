import Link from "next/link";
import Image from "next/image";
import Head from 'next/head'
import styles from '../styles/Common.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>eOps Fabric</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="font-OpenSans">

        {/* Header */}
        <div className="flex justify-between items-center py-3 px-3">
          <Link
            href="/"
          >
            <Image
              src="/img/logo-new.svg"
              alt="logo"
              height={50}
              width={140}
            />
          </Link>
          <ul className="flex justify-start items-center space-x-9">
            <li>
              <Link
                href=""
                className="text-black h-[37px] px-4 bg-yellow-951 flex justify-center items-center rounded rounded-lg"
              >
                <span>Plans and pricing</span>
              </Link>
            </li>
            <li>
              <Link href="">Help</Link>
            </li>
            <li>
              <Link href="">Sign in</Link>
            </li>
          </ul>
        </div>

        {/* MAIN Content */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bg Image Information */}
          <div className="bg-[url('/img/auth/bg.png')] bg-cover bg-no-repeat bg-center min-h-screen h-screen relative">
            <div className="w-[80%] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
              <div className="flex w-full justify-start items-center mb-4">
                <Image
                  src="/img/auth/invertedComma.svg"
                  alt="logo"
                  height={30}
                  width={30}
                />
              </div>
              <div className="text-[#666666] mb-4">
                The eOps™ Fabric - Edge enabled data mesh with management, processing, & security features. Enabling agile development & secured delivery of analytics applications and ML models to meet high paced business demandsThe eOps™ Chord - Blockchain framework ensuring highly compliant and audited edge operations
              </div>
              <div className="flex w-full justify-end items-center">
                <Image
                  src="/img/auth/angle.svg"
                  alt="logo"
                  height={30}
                  width={30}
                  className=""
                />
              </div>

            </div>
          </div>

          {/* Content section */}
          <div className="flex justify-center items-start w-full mt-16">
            <div className="relative w-[62%]">
              <h2 className="flex justify-start items-center font-semibold">
                Have an account?
                <button
                  className="text-black text-sm h-[28px] px-4 bg-yellow-951 flex justify-center items-center rounded rounded-lg ml-4">
                  Sign in
                </button>
              </h2>
              <div className="h-[1px] w-full bg-[#C4C1C1] my-6"></div>
              <div className="flex justify-start items-center font-semibold mb-5">New Customers</div>
              <div className="text-sm text-[#8692A6] mb-8">To begin this journey, tell us what type of account you would be opening.</div>

              {/* Individual */}
              <Link href="/authentication/individual" className="rounded rounded-lg shadow shadow-lg p-3 min-h-[100px] flex justify-between items-center mb-10 border border-white hover:border-yellow-951 cursor-pointer">
                <div className="relative flex w-[60%]">
                  <Image
                    alt="individual"
                    src="/img/auth/individual.svg"
                    height={52}
                    width={52}
                    className="mr-4"
                  />
                  <div className="flex flex-wrap flex-col">
                    <div className="font-semibold text-sm mb-2">Individual</div>
                    <div className="text-[13px] text-[#8692A6]">Personal account to manage all you activities.</div>
                  </div>
                </div>
                <div className="relative">
                  <button className="text-sm bg-yellow-951 px-6 py-1 rounded rounded-lg flex justify-center items-center transition-all duration-[400ms] transition-opacity duration-300 outline-none transform active:scale-75 transition-transform bg-opacity-50 hover:bg-opacity-100">
                    <span>Free</span>
                  </button>
                </div>
              </Link>

              {/* Enterprises */}
              <div className="rounded rounded-lg shadow shadow-lg p-3 min-h-[100px] flex justify-between items-center border border-white hover:border-yellow-951 cursor-pointer">
                <div className="relative flex w-[60%]">
                  <Image
                    alt="Enterprises"
                    src="/img/auth/enterprises.svg"
                    height={52}
                    width={52}
                    className="mr-4"
                  />
                  <div className="flex flex-wrap flex-col">
                    <div className="font-semibold text-sm mb-2">Enterprises</div>
                    <div className="text-[13px] text-[#8692A6]">Own or belong to a company, this is for you.</div>
                  </div>
                </div>
                <div className="relative">
                  <button className="text-sm bg-yellow-951 px-6 py-1 rounded rounded-lg flex justify-center items-center transition-all duration-[400ms] transition-opacity duration-300 outline-none transform active:scale-75 transition-transform bg-opacity-50 hover:bg-opacity-100">
                    <span>Contact</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
      {/* Main div ends */}

    </>
  )
}
