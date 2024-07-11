import { forwardRef, Ref, useEffect, useRef, useState } from 'react'
import clsSideBarType from '../../types/clsSideBarType';
import department from '../../assets/department.png';
import roomType from '../../assets/roomType.png';
import { useNavigate } from 'react-router-dom';

const SidBar =
    forwardRef((props: { itmeNumber: number, isOpenDrawer: boolean }, ref: Ref<HTMLDivElement>) => {
        const navigate = useNavigate();

        const sidBarImtems: clsSideBarType[] = [
            new clsSideBarType(1, department, "department")
            , new clsSideBarType(2, roomType, "roomType")
            , new clsSideBarType(3, department, "")
        ]

        const itmesRef = useRef<HTMLButtonElement>(null);

        // const [isHover, changeHoverState] = useState(false);
        const [hoverIndex, changeHoverIndex] = useState(0);



        useEffect(
            () => {


                // const handleSideItemHover = () => {
                //     if (props.isOpenDrawer)
                //         sidBarImtems.forEach(value => {
                //             document.getElementById(value.navigationPage)?.addEventListener("mouseover", (e: Event) => {
                //                const elemt = e.currentTarget as HTMLDivElement;
                //                elemt.classList.
                //             })
                //         })
                // }



                // const changeSlideSType = () => {
                //     if (props.isOpenDrawer)
                //         sidBarImtems.forEach(value => {
                //             document.getElementById(value.navigationPage)?.addEventListener("mouseover", (e: Event) => {
                //                 const elemt = e.currentTarget as HTMLDivElement;

                //             })
                //         })
                // }

                // document.addEventListener("resize", changeSlideSType);
                // return () => {
                //     document.removeEventListener('resize', changeSlideSType)

                // }

            },
        )



        return (
            <div

                className={`w-[80px] h-[100%] bg-white fixed ${!props.isOpenDrawer && 'end-[-80px]'} flex-col  border-s-[2px] border-dashed border-gray z-30 md:end-0 ${props.isOpenDrawer && 'end-[0]'}  duration-75 ease-linear top-0`}
                // className={`w-[80px] h-[100%] bg-white absolute end-[-80px] flex-col  border-s-[2px] border-dashed border-gray z-20 md:end-0 duration-75 ease-linear`}
                ref={ref}>


                <div className='w-[70px] h-[60px]  flex justify-center items-center mx-auto mt-2 '>
                    <img src="logo.png" alt="logo" className='w-[80px] ' />
                </div>

                {
                    sidBarImtems &&
                    sidBarImtems.map((value, key) =>

                        <div className='relative'>
                            <div
                                id={value.imageName}

                                className={`absolute top-3 end-[73px] bg-primeColor h-8 flex items-center w-24 justify-center rounded-lg text-white text-sm  ${hoverIndex === value.index ? 'flex' : 'hidden'} `}>{value.navigationPage}</div>
                            <button

                                onMouseLeave={() => {
                                    changeHoverIndex(-1);
                                }}
                                onMouseEnter={
                                    () => {
                                        console.log("the event is hover")
                                        changeHoverIndex(value.index)
                                    }
                                }
                                type='submit'
                                ref={itmesRef}
                                onMouseDown={() => {

                                    navigate('/' + value.navigationPage)
                                }}
                                key={key}

                                className={`w-[60px] h-[60px]   rounded-lg flex justify-center items-center mx-auto mt-2 pb-[7px] ps-[3px] text-gray-500  hover:bg-sideBarButtonBackground ${props.itmeNumber === value.index ? 'bg-sideBarButtonBackground' : ''}`}>
                                <img


                                    // id={value.navigationPage}
                                    src={value.imageName} alt="logo"
                                    className={`w-[40px]  ${props.itmeNumber !== value.index ? 'imageUnselectEffect' : ''}`} />
                            </button>
                        </div>
                    )
                }

            </div>
        )
    })

export default SidBar