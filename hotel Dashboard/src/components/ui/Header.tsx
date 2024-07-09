/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef, useState } from "react"
import DropDownMenu from "./DropDownMenu";
import { useNavigate } from "react-router-dom";
import localizationService from "../../services/localizationService";
import clsAdminData from "../../global/clsAdminData";




const Header = () => {
    const { isRight } = localizationService();


    const navigation = useNavigate();
    const [isShowMenu, changeMenuState] = useState(false);
    let btnRef = useRef<HTMLButtonElement>(null);
    const dropDownItemRef = useRef<HTMLButtonElement>(null);



    const handleMenuClick = () => {
        changeMenuState(true)
    };


    // handleCloseMenu();

    useEffect(() => {

        if (isShowMenu === true) {

            const handleChangeOnMenu = (e: Event) => {
                let eventNode = e?.target as Node;
                if (
                    (((btnRef.current?.contains(eventNode)) || (dropDownItemRef.current?.contains(eventNode))) && isShowMenu === true)
                ) {

                    console.log("result is first")
                }
                else {
                    console.log("result is second")
                    changeMenuState(false)
                }
            }
            document.addEventListener("mousedown", handleChangeOnMenu)

            return () => {
                document.removeEventListener('mousedown', handleChangeOnMenu)
            }
        }
    })





    return (

        <div dir={isRight ? "rtl" : "ltr"}
            className='flex items-center h-14 w-[100%] bg-white px-4 justify-between  border-b-[1px] border-gray-200 fixed top-0 z-10'>

            <section className="right flex items-center  ">

                <button
                    onClick={
                        () => navigation("/dashboard")
                    }
                >

                    <img src="/logo.png" alt="logo" className=' w-12' />
                </button>

                <i className="fa-solid fa-bars text-2xl text-gray-500 mx-1"></i>
                <div className="search flex  items-center mx-4 text-gray-500">
                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                    <p className=' mx-1'>بحث</p>
                </div>

            </section>

            <nav className="">
                <div className="roundProfile h-8 w-8 bg-orange-600 rounded-full flex justify-center items-center pb-0">
                    <button
                        ref={btnRef}
                        id="dropBtn"
                        // onBlur={handleMenuClose}

                        onClick={
                            handleMenuClick
                            // handleMenuClick

                        }
                    >
                        <img src={clsAdminData.adminDataHolder?.image?.length > 0 ? clsAdminData.adminDataHolder.image : "/logo.png"}
                            alt="profile"
                            className="w-6 h-6 rounded-full" />
                    </button>

                    {isShowMenu &&
                        <DropDownMenu
                            name=""
                            ref={dropDownItemRef}

                        // {dropDownItemRef}
                        />


                    }
                </div>

            </nav>

        </div>
    )
}

Header.propTypes = {}

export default Header

