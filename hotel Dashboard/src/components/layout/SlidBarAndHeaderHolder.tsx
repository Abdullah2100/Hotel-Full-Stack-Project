import { ReactNode, useRef, useState } from "react"
import Header from "../ui/Header";
import SidBar from "../ui/SidBar";
import localizationService from "../../services/localizationService";

const SlidBarAndHeaderHolder = (props: { children: ReactNode, itemNumber: number }) => {
    const sidBarRef = useRef<HTMLDivElement>(null)
    const [isOpentDrawer, changeDrawerState] = useState(false)
    const { isRight } = localizationService()

    const { children } = props;
    return (
        <div
            dir={!isRight ? "rtl" : "ltr"}

            className="w-screen h-screen relative bg-background ">
            <div
                onClick={() => changeDrawerState(false)}
                className={`overlay absolute h-screen w-[100%] backdrop-blur-sm bg-black/30 z ease-in-out transition-all duration-[50%] ${isOpentDrawer === true ? 'flex ' : 'hidden'} z-20`}></div>
            <SidBar
                itmeNumber={props.itemNumber}
                ref={sidBarRef}
                isOpenDrawer={isOpentDrawer}


            />
            <Header

                changeDrawerState={() => {
                    changeDrawerState(true)
                }}
                state={isOpentDrawer}
            />
            <div className={`${isOpentDrawer === true ? ' w-[100%]' : 'md:w-[calc(100%-80px)]'} w-[100%] h-fit bg-background   `}>
                {children}
            </div>

        </div>
    )
}

export default SlidBarAndHeaderHolder