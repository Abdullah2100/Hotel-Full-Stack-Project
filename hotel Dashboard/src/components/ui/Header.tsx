/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import DropDownMenu from "../layout/DropDownMenu";
import { useNavigate } from "react-router-dom";
import localizationService from "../../services/localizationService";
import '../../App.css'




const Header =
    (props: { changeDrawerState: Dispatch<SetStateAction<boolean>>, state: boolean }) => {
        const { isRight } = localizationService();


        const navigation = useNavigate();
        const [isShowMenu, changeMenuState] = useState(false);
        let btnRef = useRef<HTMLButtonElement>(null);
        const dropDownItemRef = useRef<HTMLButtonElement>(null);
        // const headerRef = useRef<HTMLDivElement>(null)



        const handleMenuClick = () => {
            changeMenuState(true)
        };


        // handleCloseMenu();

        useEffect(() => {

            //handling the menu event 
            // console.log(props.state)

            if (isShowMenu === true) {

                const handleChangeOnMenu = (e: Event) => {
                    let eventNode = e?.target as Node;
                    if (
                        (((btnRef.current?.contains(eventNode)) || (dropDownItemRef.current?.contains(eventNode))) && isShowMenu === true)
                    ) {

                        console.log("result is first")
                    }
                    // else {
                    //     console.log("result is second")
                    //     changeMenuState(false)
                    // }
                }
                document.addEventListener("mousedown", handleChangeOnMenu)

                return () => {
                    document.removeEventListener('mousedown', handleChangeOnMenu)
                }
            }

        })





        return (

            <div
                dir={isRight ? "rtl" : "ltr"}
                //  className={`flex items-center h-14 ${props.state === true ? 'w-screen' : 'md:w-[calc(100%-70px)]'} w-[100%]  bg-white px-4 justify-between  border-b-[1px] border-gray-200 fixed top-0 z-10 transition-all ease-out`}
                className={`flex items-center h-14 ${props.state === true ? 'w-screen' : 'md:w-[calc(100%-60px)]'} w-screen  bg-white px-5 justify-between  border-b-[1px] border-gray-200 fixed top-0 z-10 transition-all ease-out`}

            >

                <section className="right flex items-center  ">

                    <button
                        onClick={
                            () => navigation("/dashboard")
                        }
                    >

                        <img src="/logo.png" alt="logo" className=' w-12' />
                    </button>
                    {/* menu bar */}
                    <button
                        className="md:hidden flex"
                        onClick={() => { props.changeDrawerState(true) }}>
                        <i className="fa-solid fa-bars text-2xl text-gray-500 mx-1 "></i>
                    </button>
                    <div className="search flex  items-center mx-4 text-gray-500">
                        <i className="fa-solid fa-magnifying-glass text-sm"></i>
                        <p className=' mx-1'>بحث</p>
                    </div>

                </section>

                <nav className="">
                    <div className="roundProfile h-8 w-8 bg-orange-600 rounded-full flex justify-center items-center pb-0 me-5">
                        <button
                            ref={btnRef}
                            id="dropBtn"
                            // onBlur={handleMenuClose}

                            onClick={
                                handleMenuClick
                                // handleMenuClick

                            }
                        >
                            <img src={"/logo.png"}
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

