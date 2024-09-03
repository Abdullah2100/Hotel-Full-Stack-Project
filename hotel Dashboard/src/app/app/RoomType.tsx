/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import SlidBarAndHeaderHolder from "../../components/layout/SlidBarAndHeaderHolder"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import clsDepartment from "../../model/clsDepartment";
import IErrorType from "../../types/IErrorType";
import ProgressBar from "../../components/ui/ProgressBar";
import NoFoundData from "../../components/ui/NoFoundData";
import { useCreateRoomType, useDeleteRoomType, useGetRoomType, useUpdateRoomType } from "../../hocks/useRoomType";


const RoomType = () => {
    const signOut = useSignOut();
    const { handleSubmit } = useForm()
    const [roomtTypeId, changeRoomId] = useState(0)
    const [roomTypeName, changeRoomTypeName] = useState("")

    const navigate = useNavigate();
    const authHeader = useAuthHeader();


    const { isLoading, data, isError, error } = useGetRoomType(authHeader ?? "")


    const addRoomTypeHolder = useCreateRoomType(authHeader ?? "")
    const updateRoomTypeHOlder = useUpdateRoomType(authHeader ?? "")
    const deleRoomTypeHOlder = useDeleteRoomType(authHeader ?? "")


    function handleErrorReponse(error: any) {
        const errorBody = (error.response) as IErrorType;

        let errorMessage = errorBody?.data ?? "";

        if (errorBody === undefined)
            errorMessage = error.message;
        // console.log(errorMessage);

        toast.error(`${errorMessage}`, {
            position: "bottom-right",
        })

        if (errorBody.status === 401) {

            signOut();
            navigate('/')
        }

    }

    const createOrupdateRoomTypeFunction = async () => {
        switch (roomtTypeId === 0) {
            case true: {

                await addRoomTypeHolder.mutateAsync(roomTypeName).catch((error) => {
                    handleErrorReponse(error)
                }).then((data) => {
                    toast.success(`${data}`, {
                        position: "bottom-right",
                    })
                })
            } break;

            default: {

                await updateRoomTypeHOlder.mutateAsync(new clsDepartment(roomtTypeId, roomTypeName))
                    .catch((error) => {
                        handleErrorReponse(error)
                    }).then((data) => {
                        toast.success(`${data}`, {
                            position: "bottom-right",
                        });
                    })
            }
        }

    }

    const deleteDeparmtntFunc = async (id: number) => {
        await deleRoomTypeHOlder.mutateAsync(id).catch((error) => {
            handleErrorReponse(error)
        }).then((data) => {
            toast.success(`${data}`, {
                position: "bottom-right",
            });
        })
    }


    useEffect(() => {
        if (isError)
            handleErrorReponse(error);
    }, [isError])


    if (isLoading)
        return (<><ProgressBar /></>)

    if (isError)
        return;



    return (





        <div  >

            <SlidBarAndHeaderHolder itemNumber={2}>

                <div className="h-[100%]  profile mx-5 pt-10">
                    <form
                        onSubmit={
                            handleSubmit(() => createOrupdateRoomTypeFunction())
                        }
                    >
                        <h1 className=" text-3xl font-bold text-black mt-12 ">RoomType</h1>

                        <div className="deparmtnetName w-[100%] h-fit bg-white rounded-lg mt-4 shadow-lg  px-4 py-4  overflow-hidden">

                            <h3 className="text-black">RoomType Info</h3>
                            <hr className="mt-4 mb-4" />

                            <input
                                className="w-[100%] text-gray-800"
                                type="text"
                                disabled
                                value={roomtTypeId}
                                hidden={roomtTypeId === 0 ? true : false}
                            />

                            {/*department name input*/}
                            <label className="flex flex-col mt-4 text-black/70" >
                                name
                                <input
                                    required
                                    value={roomTypeName}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        changeRoomTypeName(e.target.value)
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
                                className="w-48 h-12 bg-primeColor mt-4 rounded-lg text-white text-2xl" >
                                Submite

                            </button>
                            {
                                roomtTypeId !== 0 && <button

                                    value="Submite"
                                    type="submit"
                                    className={`w-48 h-12 bg-primeColor mt-4 rounded-lg text-white text-[16px] ${roomtTypeId !== 0 ? 'hidden' : 'flex'}}`} >
                                    update

                                </button>}
                        </div>
                        <div className="sizer h-10"></div>

                    </form>


                    {data?.data !== undefined ?
                        <>
                            <div
                                className="departmentList w-[100%] h-fit bg-white rounded-lg shadow-lg  px-4 py-4  overflow-hidden">


                                <h3 className="text-gray-600">RoomTypes</h3>
                                {/* <hr className="mt-2 " /> */}

                                <table className="w-[100%] mt-5 ">
                                    <thead className="text-start">
                                        <tr className="border-b-2 ">
                                            <th className="text-start">ID</th>
                                            <th className="text-start">Name</th>
                                            <th className="text-start">operation</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {data?.data.map(
                                            (key) =>
                                                <tr className="">
                                                    <td className="text-start" >{key.id}</td>
                                                    <td className="text-start">{key.name}</td>
                                                    <td className="text-start  text-white">
                                                        <button
                                                            type="button"

                                                            onClick={
                                                                () => {
                                                                    changeRoomId(key.id)
                                                                    changeRoomTypeName(key.name)
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

export default RoomType;