/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, } from 'react-hook-form'
import '../../App.css'
import clsLoginRequest from '../../model/clsLoginRequest'
import { useMutation } from 'react-query'
import AuthServices from "../../services/Adminservices"
import toast from 'react-hot-toast'
import localizationService from '../../services/localizationService'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Util from '../../global/Utile'

const Login = () => {

    const { isRight } = localizationService();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { handleSubmit } = useForm();
    let navigate = useNavigate();
    const signIn = useSignIn();

    const handleUserNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };


    const { login } = AuthServices();
    let loginRequestData = new clsLoginRequest(userName, password);


    const mutation = useMutation(

        {
            mutationFn: (data: clsLoginRequest) => login(data),
            onError: (erro: any) => {
                Util.handleErrorReponse(erro)



            }
            ,
            onSuccess: (seecc) => {

                let data = seecc
                toast.success(`welcom admin`, {
                    position: "bottom-right",
                });
                signIn(
                    {
                        auth: {
                            token: data,
                            type: 'Bearer',

                        },
                    })
                // return Promise.resolve('/dashboard');
                navigate("/dashboard", { replace: true })
            }
            ,
        }
    );

    const loginFunHolder = () => {
        mutation.mutateAsync(loginRequestData);
    };






    return (

        <div
            dir={isRight ? "rtl" : "ltr"}
            className='h-screen flex  justify-center items-center '>





            <div className='w-[500px] flex flex-col  '>
                <div className='flex justify-center'>
                    <img src="/logo.png" alt="logo"
                        className='w-40' />

                </div>


                <form
                    onSubmit={handleSubmit(loginFunHolder)}
                    className='mt-8'>
                    <label className='flex flex-col mb-3'>
                        <h3>
                            الايميل
                        </h3>
                        <input
                            required
                            type="text"
                            name="userName"
                            id="userName"
                            value={userName}
                            onChange={handleUserNameChange}
                            placeholder='Ali-Ahmed Qasem'
                            className=' border-2 rounded-lg h-12 px-3 mt-3' />
                    </label>

                    <label className='flex flex-col mb-3'>
                        <h3>
                            كلمة المرور
                        </h3>
                        <input
                            required
                            type="text"
                            name="password"
                            id="password"
                            onChange={handlePasswordChange}
                            placeholder='*******'
                            value={password}
                            className=' border-2 rounded-lg h-12 px-3 mt-3' />
                    </label>

                    <button

                        className='w-full bg-orange-600 h-14 rounded-md mt-5'>
                        {
                            // authRequestState == enState.loading ?
                            //     <ClipLoader
                            //         className='h-12'
                            //         color='#ffffff'

                            //     /> :
                            <h3 className='text-white text-2xl'>تسجيل</h3>

                        }
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Login


