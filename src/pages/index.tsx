import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="column-2 flex font-OpenSans">
        <div className="w-[50%] bg-[url('/img/architecture2.jpg')] bg-cover bg-no-repeat bg-center h-screen">
          <div className="w-full h-full backdrop-brightness-25 px-16 py-16">
            <div className="flex">
              <Image
                src="/img/logo-white.svg"
                alt="logo"
                className="fill-white"
                width={127}
                height={27}
              />
            </div>
            <div className="mt-24">
              <p className="mb-3">
                <Image
                  src="/img/quote_alt_left_icon.svg"
                  alt="quote"
                  className="h-8"
                  width={32}
                  height={32}
                />
              </p>
              <p className="text-2xl text-white font-light leading-10">
                The eOps Fabric - Edge enabled data mesh with management, processing, & security features. Enabling agile development & secured dilivery of analytics applications and ML models to meet high paced business demands. The eOps  Chord-Blockchain framework ensuring highly compliant and audited edge operations.
              </p>
            </div>
          </div>
        </div>

        <div className="w-[50%] relative">
          <div className="flex justify-center items-center h-full">

            <div className="pt-10 pr-2 text-right text-black text-xl font-medium absolute top-0 right-2">
              <span className="text-gray-500 font-normal">Already have an account? </span> <Link href="/authentication/signin">Sign In</Link>
            </div>

            <div className="text-left w-[470px]">
              <p className="font-bold text-3xl text-black mb-4">Join Us!</p>
              <p className="font-normal text-2xl text-gray-500 mb-10">To begin this journey, tell us what type of account you'd be opening?</p>

              <Link href="authentication/register" className="rounded-lg border border-black px-4 py-6 bg-gray-100 flex justify-center items-center relative">
                <span className="rounded-md bg-gray-400 text-black h-7 w-20 flex font-medium justify-center items-center absolute top-2 right-10">Free</span>
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
                <div className="ml-0">
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
