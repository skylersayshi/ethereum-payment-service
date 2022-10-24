import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";
import { useState } from "react";
import { useEffect } from "react";
import NotWorkingModal from "./NotWorkingModal";

const Hero = () => {

  const [isMobile, setIsMobile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const checkWindowSize = () =>{
  //   if(window.innerWidth>=650){
	// 		setIsMobile(false)
	// 	}
  // }
  useEffect(()=>{
		if(window.innerWidth<=650){
			setIsMobile(true)
		}
  })
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        {/* <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">20%</span> Discount For{" "}
            <span className="text-white">1 Month</span> Account
          </p>
        </div> */}
        {isModalOpen && isMobile && (<NotWorkingModal />)}
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            The Next <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Generation</span>{" "}
          </h1>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Payment Method.
        </h1>
        <div className="ss:flex md:mr-4 mr-0 mt-2">
            <a onClick={()=>setIsModalOpen(true)} href={!isMobile ? "https://rodeopay.xyz/" : null}>
            <GetStarted />
            </a>
        </div>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Sending crypto payments has never been easier. Find, request, and pay friends from around the world, all in one place.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      {/* <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div> */}
    </section>
  );
};

export default Hero;
