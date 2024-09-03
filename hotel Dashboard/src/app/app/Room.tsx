/* eslint-disable @typescript-eslint/no-explicit-any */
import SlidBarAndHeaderHolder from '../../components/layout/SlidBarAndHeaderHolder'
import { useNavigate } from 'react-router-dom';

import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import IErrorType from '../../types/IErrorType';
import toast from 'react-hot-toast';
import ProgressBar from '../../components/ui/ProgressBar';
import NoFoundData from '../../components/ui/NoFoundData';
import { useDeleteRoom, useGetRooms } from '../../hocks/useRoom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import fcae from '../../assets/imageHolder.png'
// import { useForm } from 'react-hook-form';

const Room = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();

    const authHeader = useAuthHeader();

    const { data, isError, error, isLoading } = useGetRooms(authHeader ?? "")
    const deletedHolder = useDeleteRoom(authHeader ?? "");
    const { handleSubmit } = useForm()



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




    useEffect(() => {
        if (isError)
            handleErrorReponse(error);
    }, [isError])


    const deletedFunc = async (roomId: number) => {
        await deletedHolder.mutateAsync(roomId, {
            onSuccess: (data: any) => {

                toast.success(`${data.message}`, {
                    position: "bottom-right",
                })
            },
            onError: (error: any) => {

                handleErrorReponse(error.response)
            }
        })
    }



    if (isLoading)
        return (<><ProgressBar /></>)

    if (isError)
        return null;
    return (
        <div>

            <SlidBarAndHeaderHolder itemNumber={3}>
                <div className=' profile pt-16  mx-5 '>
                    <div className=' flex items-center justify-between mx-auto mt-4 mb-4'>
                        <h1 className=" text-3xl font-bold text-black  ">Rooms</h1>
                        <button
                            type='button'
                            onClick={

                                () => navigate('/addOrUpdateRoom', { state: { roomId: 0 } })
                            }

                            className="w-28 h-8 bg-primeColor  rounded-lg text-white text-[16px] " >
                            add

                        </button>
                    </div>

                    {data?.data !== undefined && data?.data.length > 0 ?
                        <>
                            <div
                                className="departmentList w-[98%] h-fit bg-white rounded-lg shadow-lg  px-8 py-4  overflow-hidden flex mx-auto flex-col "
                            >


                                <h3 className="text-gray-600">Room</h3>
                                {/* <hr className="mt-2 " /> */}
                                <div className='overflow-x-scroll overflow-auto'>

                                    <table
                                        className="w-[450px] mt-5 ">
                                        <thead className="text-start">
                                            <tr className="border-b-2 ">
                                                <th className="text-start px-4">ID</th>
                                                <th className="text-start px-4 text-nowrap">Main Image</th>
                                                <th className="text-start px-4">title</th>
                                                <th className="text-start px-4">capacity</th>
                                                <th className="text-start px-4">bedNumber</th>
                                                <th className="text-start px-4">pricePerDay </th>
                                                <th className="text-start px-4 text-nowrap ">room at floor</th>
                                                <th className="text-start px-4 text-nowrap ">Is Rent</th>
                                                <th className="text-start px-4">operation</th>
                                            </tr>
                                        </thead>
                                        <tbody >

                                            {
                                                data.data.map(

                                                    (key, i) =>
                                                        <tr className=""

                                                            key={i}>
                                                            <td className="text-start px-4" >{key.id}</td>
                                                            <td className="text-start px-4">
                                                                <img src={
                                                                    (key.roomImages != null || key.roomImages?.length > 0) ? `${process.env.apiUrl}${key.roomImages[0]?.image}` : fcae} />
                                                            </td>
                                                            <td className="text-start px-4">{key.title}</td>
                                                            <td className="text-start px-4">{key.bedNumber}</td>
                                                            <td className="text-start px-4">{key.capacity}</td>
                                                            <td className="text-start px-4">{key.pricePerDay}</td>
                                                            <td className="text-start px-4">{key.floorNumber}</td>
                                                            <td className="text-start px-4">{key.isRent ? 'Yes' : 'No'}</td>
                                                            <td className="text-start  text-white flex">
                                                                <button
                                                                    type="button"

                                                                    onClick={

                                                                        // changeRoomId(key.id)
                                                                        () => navigate('/addOrUpdateRoom', { state: { roomId: key.id } })
                                                                        // changeRoomTypeName(key.name)



                                                                    }
                                                                    className="bg-primeColor h-8 w-24 my-8 rounded-lg hover:opacity-90 " >Update</button>
                                                                <button
                                                                    type="button"
                                                                    className="bg-primeColor h-8 w-24 my-8 rounded-lg ms-3 hover:opacity-90 "

                                                                    onClick={handleSubmit(() => deletedFunc(key.id))}
                                                                >Delete</button>

                                                            </td>
                                                        </tr>

                                                )
                                            }

                                        </tbody>
                                    </table>
                                </div>


                            </div>
                        </> : <NoFoundData />

                    }

                </div>
            </SlidBarAndHeaderHolder>
        </div>
    )
}

export default Room;