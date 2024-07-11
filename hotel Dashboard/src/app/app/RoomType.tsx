/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import SlidBarAndHeaderHolder from "../../components/layout/SlidBarAndHeaderHolder"
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from "react-router-dom";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import clsDepartment from "../../model/clsDepartment";
import RoomTypeServices from "../../services/RoomTypeServices";
import IErrorType from "../../types/IErrorType";
import clsRoomType from "../../model/clsRoomType";
import enState from "../../types/enState";
import ProgressBar from "../../components/ui/ProgressBar";


const RoomType = () => {
    const signOut = useSignOut();
    const { handleSubmit } = useForm()
    const [roomtTypeId, changeRoomId] = useState(0)
    const [roomTypeName, changeRoomTypeName] = useState("")
    const navigate = useNavigate();
    const authHeader = useAuthHeader();



    const {
        createRoomType,
        roomTypeState,
        changeRoomType,
        getRoomType, roomTypeItems,
        deleteRoomType,
        updateRoomType,
        addToRoomTypes
    } = RoomTypeServices()



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
        // return;
    }

    useEffect(() => {
        getRoomType(authHeader ?? "").catch((error) => {
            handleErrorReponse(error);
            changeRoomType(enState.complate)
        })
            .then((data) => {
                const roomDataList = data as clsRoomType[];
                addToRoomTypes(roomDataList);
                changeRoomType(enState.complate)
            });
    }, [])


    const addDeparmtmentHolder = useMutation({
        mutationFn: (name: string) => createRoomType(name, authHeader ?? ""),
        onError: ((error: any) => {

            handleErrorReponse(error)
        }),
        onSuccess: (() => {

            toast.success(`data add secccessfuly`, {
                position: "bottom-right",
            })

        })
    })

    const deleteRoomTypeHolder = useMutation({
        mutationFn: (id: number) => deleteRoomType(id, authHeader ?? ""),
        onError: ((error: any) => {

            handleErrorReponse(error)
        }),
        onSuccess: (() => {

            toast.success(`data add secccessfuly`, {
                position: "bottom-right",
            })
        })

    })

    const updateDeparmtmentHolder = useMutation({
        mutationFn: (data: clsDepartment) => updateRoomType(data, authHeader ?? ""),
        onError: ((error: any) => {

            handleErrorReponse(error)
        }),
        onSuccess: (() => {

            toast.success(`data add secccessfuly`, {
                position: "bottom-right",
            })

        })
    })





    const createOrupdateRoomTypeFunction = () => {
        switch (roomtTypeId === 0) {
            case true: {

                addDeparmtmentHolder.mutateAsync(roomTypeName)
            } break;

            default: {

                updateDeparmtmentHolder.mutateAsync(new clsDepartment(roomtTypeId, roomTypeName));
            }
        }
    }

    const deleteDeparmtntFunc = (id: number) => {
        deleteRoomTypeHolder.mutateAsync(id)
    }




    return (

        <>
            {
                roomTypeState !== enState.loading ?

                    <div  >

                        <SlidBarAndHeaderHolder itemNumber={1}>

                            <div className="profile mx-5 pt-10">
                                <form
                                    onSubmit={
                                        handleSubmit(() => createOrupdateRoomTypeFunction())
                                    }
                                >
                                    <h1 className=" text-5xl font-bold text-gray-600  ">RoomType</h1>

                                    <div className="deparmtnetName w-[100%] h-fit bg-white rounded-lg mt-4 shadow-lg  px-4 py-4  overflow-hidden">

                                        <h3 className="text-gray-600">RoomType Info</h3>
                                        <hr className="mt-4 mb-4" />

                                        <input
                                            className="w-[100%] text-gray-800"
                                            type="text"
                                            disabled
                                            value={roomtTypeId}
                                            hidden={roomtTypeId === 0 ? true : false}
                                        />

                                        {/*department name input*/}
                                        <label className="flex flex-col mt-4 " >
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
                                            className="w-48 h-12 bg-primeColor mt-4 rounded-lg text-white text-[16px] me-2" >
                                            add
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


                                {roomTypeItems.length > 0 &&
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
                                                    {roomTypeItems.map(
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
                                    </>

                                }

                            </div>


                        </SlidBarAndHeaderHolder >
                    </div >

                    // </div > 
                    : <ProgressBar />
            }  </>
    )
}

export default RoomType;