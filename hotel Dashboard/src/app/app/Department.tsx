/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import SlidBarAndHeaderHolder from "../../components/layout/SlidBarAndHeaderHolder"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from "react-router-dom";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import ProgressBar from "../../components/ui/ProgressBar";
import clsDepartment from "../../model/clsDepartment";
import IErrorType from "../../types/IErrorType";
import NoFoundData from "../../components/ui/NoFoundData";
import { useCreateDepartment, useDeleteDepartment, useGetDepartment, UseupdateDepartment } from "../../hocks/useDepartment";





const Department = () => {
    const signOut = useSignOut();
    const { handleSubmit } = useForm()
    const [departmentId, changeDepartmentId] = useState(0)
    const [departmentName, changeDepartmentName] = useState("")
    const navigate = useNavigate();
    const authHeader = useAuthHeader();







    function handleErrorReponse(error: any) {
        if (error === null) return;

        const errorBody = (error.response) as IErrorType;

        let errorMessage = errorBody?.data ?? "";

        if (errorBody === undefined)
            errorMessage = error.message;

        toast.error(`${errorMessage}`, {
            position: "bottom-right",
        })

        if (errorBody.status === 401) {
            signOut();
            navigate('/')
        }
    }


    const { data, isError, error, isLoading } = useGetDepartment(authHeader ?? "")
    const { mutateAsync: addDepartment } = useCreateDepartment(authHeader ?? "")
    const updateDepartment = UseupdateDepartment(authHeader ?? "")
    const deleteDepartment = useDeleteDepartment(authHeader ?? "")





    const createOrUpdateDepartmentFunction = async () => {
        switch (departmentId === 0) {
            case true: {

                await addDepartment(departmentName).catch((error) => {
                    handleErrorReponse(error)
                }).then((data) => {
                    toast.success(`${data}`, {
                        position: "bottom-right",
                    })
                })
            } break;

            default: {

                await updateDepartment.mutateAsync(new clsDepartment(departmentId, departmentName)).catch((error) => {

                    handleErrorReponse(error)
                }).then((data) => {

                    toast.success(`${data?.statusText}`, {
                        position: "bottom-right",
                    })
                })
            }
        }
    }

    const deleteDeparmtntFunc = async (id: number) => {

        await deleteDepartment.mutateAsync(id).catch((error) => {

            handleErrorReponse(error)
        }).then((data) => {

            toast.success(`${data?.statusText}`, {
                position: "bottom-right",
            })
        })


    }



    useEffect(() => {
        if (isError)
            handleErrorReponse(error);
    }, [isError === true])


    if (isLoading)
        return (<><ProgressBar /></>)

    if (isError)
        return;



    return (


        <div  >


            {/* <div className='h-screen bg-bodyColor relative'> */}


            <SlidBarAndHeaderHolder itemNumber={1}>

                {/* // isValidImage ? */}
                {/* <div dir={isRight ? "rtl" : "ltr"} */}
                {/* className="opacity-80 h-screen bg-gray-300"> */}
                {/* <Header /> */}

                <div className="profile mx-5 pt-16">
                    <form
                        onSubmit={
                            handleSubmit(() => createOrUpdateDepartmentFunction())
                        }
                    >
                        <h1 className=" text-3xl font-bold text-black mt-8 ">Department</h1>

                        <div className="deparmtnetName w-[100%] h-fit bg-white rounded-lg mt-4 shadow-lg  px-4 py-4  overflow-hidden">

                            <h3 className="text-black">Department Info</h3>
                            <hr className="mt-4 mb-4" />

                            <input
                                className="w-[100%] text-gray-800"
                                type="text"
                                disabled
                                value={departmentId}
                                hidden={departmentId === 0 ? true : false}
                            />

                            {/*department name input*/}
                            <label className="flex flex-col mt-4 text-black/80 " >
                                name
                                <input
                                    required
                                    value={departmentName}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        changeDepartmentName(e.target.value)
                                    }
                                    }
                                    className="border-2 rounded-sm  w-[100%] mt-2"
                                    // max={50}
                                    maxLength={50}
                                    type="text" />
                            </label>



                        </div>

                        <div className="columns-xl">
                            <button

                                value="Submite"
                                type="submit"
                                className="w-48 h-12 bg-primeColor mt-4 rounded-lg text-white text-[16px] me-2" >
                                add

                            </button>
                            {
                                departmentId !== 0 && <button

                                    value="Submite"
                                    type="submit"
                                    className={`w-48 h-12 bg-primeColor mt-4 rounded-lg text-white text-[16px] ${departmentId !== 0 ? 'hidden' : 'flex'}}`} >
                                    update

                                </button>}
                        </div>
                        <div className="sizer h-10"></div>

                    </form>


                    {
                        data?.data !== undefined && data?.data.length > 0 ?
                            <>
                                <div

                                    className="departmentList w-[100%] h-fit bg-white rounded-lg shadow-lg  px-4 py-4  overflow-hidden">

                                    <h3 className="text-black">Departments</h3>
                                    {/* <hr className="mt-2 " /> */}


                                    <table className="w-[100%] mt-5 ">
                                        <thead className="text-start">
                                            <tr className="border-b-2 ">
                                                <th className="text-start text-gray-700">ID</th>
                                                <th className="text-start text-gray-700">Name</th>
                                                <th className="text-start text-gray-700">operation</th>
                                            </tr>
                                        </thead>
                                        <tbody >

                                            {data.data.map(
                                                (key, i) =>
                                                    <tr className="">
                                                        <td
                                                            key={i}
                                                            className="text-start" >
                                                            {key.id}
                                                        </td>
                                                        <td
                                                            className="text-start">
                                                            {key.name}
                                                        </td>
                                                        <td
                                                            className="text-start  text-white">
                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    () => {
                                                                        changeDepartmentId(key.id)
                                                                        changeDepartmentName(key.name)
                                                                    }
                                                                }
                                                                className="bg-primeColor h-8 w-24 my-2 rounded-lg hover:opacity-90 " >Update</button>
                                                            <button
                                                                type="button"
                                                                className="bg-primeColor h-8 w-24 my-2 rounded-lg ms-3 hover:opacity-90 "

                                                                onClick={handleSubmit(() => deleteDeparmtntFunc(key.id))}>Delete</button>

                                                        </td>
                                                    </tr>

                                            )
                                            }
                                        </tbody>
                                    </table>


                                </div>
                            </> : <NoFoundData />

                    }

                </div>


            </SlidBarAndHeaderHolder >
        </div >


    )
}

export default Department