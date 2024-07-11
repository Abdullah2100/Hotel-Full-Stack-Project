import { forwardRef, Ref, useEffect, useRef } from 'react'
import clsSideBarType from '../../types/clsSideBarType';
import department from '../../assets/department.png';
import { useNavigate } from 'react-router-dom';

const SidBar =
    forwardRef((props: { itmeNumber: number, isOpenDrawer: boolean }, ref: Ref<HTMLDivElement>) => {
        const navigate = useNavigate();

        const sidBarImtems: clsSideBarType[] = [
            new clsSideBarType(1, department, "/department")
            , new clsSideBarType(2, department, "")
            , new clsSideBarType(3, department, "")
        ]

        const itmesRef = useRef<HTMLButtonElement>(null);
        useEffect(

            () => {
                const changeSlideSType = () => {
                }
                document.addEventListener("resize", changeSlideSType);
                return () => {
                    document.removeEventListener('resize', changeSlideSType)

                }

            },
        )

        // const itemClick = (id: number) => {
        //     Util.currentPage = id;
        //     console.log(Util.currentPage)
        // }

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
                        <button
                            type='submit'
                            ref={itmesRef}
                            onMouseDown={() => {

                                navigate(value.navigationPage)
                            }}
                            key={key}

                            className={`w-[60px] h-[60px]   rounded-lg flex justify-center items-center mx-auto mt-2 pb-[7px] ps-[3px] text-gray-500  hover:bg-sideBarButtonBackground ${props.itmeNumber === value.index ? 'bg-sideBarButtonBackground' : ''}`}>
                            <img
                                id={value.navigationPage}
                                src={value.imageName} alt="logo"
                                className={`w-[40px]  ${props.itmeNumber !== value.index ? 'imageUnselectEffect' : ''}`} />
                        </button>
                    )
                }

            </div>
        )
    })

export default SidBar