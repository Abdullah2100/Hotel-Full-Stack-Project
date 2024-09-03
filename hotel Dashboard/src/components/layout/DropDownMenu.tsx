/* eslint-disable prefer-const */
// import { useNavigate } from 'react-router-dom';
import HeaderMenuType from '../../types/IHeaderMenuType'
import { Ref, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import localizationService from '../../services/localizationService';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
const DropDownMenu = forwardRef<HTMLButtonElement, {
    name: string;
}>((props: { name: string }, ref: Ref<HTMLButtonElement>) => {
    console.log(props.name)

    const { isRight } = localizationService();

    const navigation = useNavigate()
    const signOut = useSignOut()
    let items: HeaderMenuType[] = [
        {
            iconName: "fa-regular fa-id-badge",
            name: "Profile",   ///profile
            navigaitonPageName: "/profile"
        }
        ,
        {
            iconName: "fa-solid fa-right-from-bracket",
            name: "logout",   ///profile
            navigaitonPageName: "/"
        }
    ];
    return (
        <div dir={isRight ? "rtl" : "ltr"}
            className='absolute top-[46px] end-2 h-42 bg-white border-[1px] border-gray-200 rounded-sm'>
            {
                items.map((ke, value) => <button key={value}
                    id={ke.name}
                    ref={ref}

                    onClick={
                        () => {
                            if (ke.name === "logout")
                                signOut()
                            navigation(`${ke.navigaitonPageName}`)
                        }
                    }
                    className='wrapper flex w-36  px-2 py-2 justify-between items-center' >
                    <i className={ke.iconName}></i>
                    <h3 className='mx-1'>{ke.name}</h3>
                </button>)
            }


        </div >
    )
})

export default DropDownMenu

