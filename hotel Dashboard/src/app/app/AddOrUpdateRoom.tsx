/* eslint-disable @typescript-eslint/no-explicit-any */
import SlidBarAndHeaderHolder from "../../components/layout/SlidBarAndHeaderHolder";
import { useEffect, useRef, useState } from "react";
// import { useQuery } from "react-query";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import RoomTypeServices from "../../services/RoomTypeServices";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Await, useLocation, useNavigate } from 'react-router-dom';

import useSignOut from 'react-auth-kit/hooks/useSignOut';
import IErrorType from "../../types/IErrorType";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import ProgressBar from "../../components/ui/ProgressBar";
import { useGetRoomType } from "../../hocks/useRoomType";
import { useCreateRoom, useGetRoomByID, useUpdateRoom } from "../../hocks/useRoom";
import { ClipLoader } from "react-spinners";

const AddOrUpdateRoom = () => {
    const imageeInputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    const authHeader = useAuthHeader();
    const { state } = useLocation();
    const { roomId } = state;
    const roomIdNumber = roomId;
    const { isLoading, error, isError, data } = useGetRoomByID(roomIdNumber, authHeader ?? "")


    const signOut = useSignOut();
    const navigate = useNavigate();

    const addRoomFunc = useCreateRoom(authHeader ?? "")
    const updateRoomFunc = useUpdateRoom(authHeader ?? "", roomId)
    const { data: roomTypes } = useGetRoomType(authHeader ?? "")

    const [imageOne, changeImageOne] = useState<File | null>(null)
    const [imageTwo, changeImageTwo] = useState<File | null>(null)
    const [imageThree, changeimageThree] = useState<File | null>(null)
    const [imageFore, changeimageFore] = useState<File | null>(null)
    /*
    const [imageOnePreview, changeImageOnePreview] = useState<string>(((data != null && data?.data != null) && (data?.data?.roomImages != null && data?.data.roomImages?.length > 0)) ? `${process.env.apiUrl}` + `${data?.data.roomImages[0].image}` : '')
    const [imageTwoPreview, changeImageTwoPreview] = useState<string>(((data != null && data?.data != null) && (data?.data?.roomImages != null && data?.data.roomImages.length > 0)) ? `${process.env.apiUrl}` + `${data?.data.roomImages[1].image}` : '')
    const [imageThreePreview, changeimageThreePreview] = useState<string>(((data != null && data?.data != null) && (data?.data?.roomImages != null && data?.data.roomImages.length > 0)) ? `${process.env.apiUrl}` + `${data?.data.roomImages[2].image}` : '')
    const [imageForePreview, changeimageForePreview] = useState<string>(((data != null && data?.data != null) && (data?.data?.roomImages != null && data?.data.roomImages.length > 0)) ? `${process.env.apiUrl}` + `${data?.data.roomImages[3].image}` : '')
    */

    const [imageOnePreview, changeImageOnePreview] = useState<string>('')
    const [imageTwoPreview, changeImageTwoPreview] = useState<string>('')
    const [imageThreePreview, changeimageThreePreview] = useState<string>('')
    const [imageForePreview, changeimageForePreview] = useState<string>('')

    const [title, changeTitle] = useState('')
    const [descirption, changeDescription] = useState('')
    const [pricePerDay, changePricePerDay] = useState('')
    const [roomCapacity, changeCapacity] = useState('')
    const [bedNumber, changeBedNumber] = useState('')
    const [floorNumber, changeFloorNumber] = useState('')


    const [imageOneState, changeImageOneState] = useState(false)
    const [imageTwoState, changeImageTwoState] = useState(false)
    const [imageThreeState, changeImageThreeState] = useState(false)
    const [imageForeState, changeImageForeState] = useState(false)



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

    const addOrUpdateRommHolder = async () => {

        const roomData = new FormData();
        if ((roomIdNumber !== undefined && roomIdNumber !== 0))
            roomData.append("roomID", roomIdNumber.toString())
        //capacity
        if (roomCapacity.length > 0)
            roomData.append("capacity", roomCapacity?.toString())

        if (bedNumber.length > 0)
            roomData.append("bedNumber", bedNumber?.toString())

        if (pricePerDay.length > 0)
            roomData.append("pricePerDay", pricePerDay?.toString())

        if (floorNumber.length > 0)
            roomData.append("floorNumber", floorNumber.toString())

        roomData.append("roomType", `${selectRef.current?.value}`)

        if (title.length > 0)
            roomData.append("title", title)

        if (descirption.length > 0)
            roomData.append("description", descirption)

        if (imageOne != null)
            roomData.append("mainImage", imageOne)


        if (imageTwo != null)
            roomData.append("secondImage", imageTwo)

        if (imageThree != null)
            roomData.append("thirdImage", imageThree)

        if (imageFore != null)
            roomData.append("forthImage", imageFore)


        switch (roomIdNumber === 0) {
            case true: {
                if (imageOne === undefined || imageTwo === undefined || imageThree === undefined
                    || imageFore === undefined
                ) {
                    toast.error("you must select image")
                    return;
                }


                await addRoomFunc.mutateAsync(roomData, {
                    onSuccess: (data: any) => {

                        toast.success(`${data.message}`, {
                            position: "bottom-right",
                        })
                    },
                    onError: (error: any) => {

                        handleErrorReponse(error.response)
                    }
                })


                break;
            }
            default: {
                const { mutateAsync,} = updateRoomFunc;

                try {

                    await mutateAsync(roomData)
                } catch (e) {

                    handleErrorReponse(e)
                }


                /* .then((data: any) => {
 
                         toast.success(`data is Update`, {
                             position: "bottom-right",
                         })
                     },).catch((error) => {
                         {
 
                         }
                     })*/
                break;
            }
        }
    }

    function fileValidation(file: File): boolean {
        if (file.name.split('.').pop() !== 'png') {
            toast.error('image size must be 2M or less', { position: "bottom-right" })
            return false;
        }
        if (file.size > 2097152) {
            toast.error('image size must be 2M or less', { position: "bottom-right" })
            return false;
        }
        return true
    }
    const selectFile = (e: any, index: number) => {
        const inputElement = e.currentTarget as HTMLInputElement;
        const files = inputElement.files; // Get the files from the input element

        if (files && files.length > 0) {
            const file = files[0]; // Get the first file

            if (fileValidation(file)) { // Assuming fileValidation is a function that validates the file
                const fileData = URL.createObjectURL(file); // Create a URL for the file object

                switch (index) {
                    case 1:
                        changeImageOne(file);
                        changeImageOnePreview(fileData);
                        break;
                    case 2:
                        changeImageTwo(file);
                        changeImageTwoPreview(fileData);
                        break;
                    case 3:
                        changeimageThree(file);
                        changeimageThreePreview(fileData);
                        break;
                    case 4:
                        changeimageFore(file);
                        changeimageForePreview(fileData);
                        break;
                    default:
                        console.warn(`Invalid index: ${index}`);
                }
            }
        } else {
            console.warn('No files selected.');
        }
    }



    const removeFile = (index: number) => {

        switch (index) {
            case 1: {
                changeImageOne(null)
                changeImageOnePreview("")
                changeImageOneState(true);

                break;
            }

            case 2: {
                changeImageTwo(null)
                changeImageTwoPreview("");
                changeImageTwoState(true);


                break;
            }
            case 3: {
                changeimageThree(null);
                changeimageThreePreview("")
                changeImageThreeState(true);

                break;
            }

            case 4: {
                changeimageFore(null)
                changeimageForePreview("")
                changeImageForeState(true);

                break;
            }
        }

    }

    useEffect(() => {

        if (isError && roomIdNumber > 0)
            handleErrorReponse(error)

    }, [isError])



    if (isLoading === true)
        return (
            <div>
                <ProgressBar />
            </div>
        )


    return (
        <div >
            <SlidBarAndHeaderHolder itemNumber={3}>
                <div className='h-fit profile pt-16  mx-5 '>
                    <h1 className=" text-3xl font-bold text-black  ">{roomIdNumber != null ? 'Update Rooms' : "Add Rooms"}</h1>
                    <form onSubmit={handleSubmit(() => addOrUpdateRommHolder())}>
                        <div className="passwordInfo w-[100%] h-fit bg-white rounded-lg mt-4 shadow-lg  px-4 py-4 ">

                            <h3 className="text-black">Room Image</h3>
                            <hr className="mt-2 mb-4" />

                            {/* room images */}
                            <div className=" h-fit flex flex-col xl:flex-row justify-center overflow-hidden ">
                                <div className="flex  flex-col  xl:flex-row ">

                                    <label form="dropzone-file" className="flex flex-col items-center justify-center w-[100%] xl:w-[250px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500  mb-1 lg:mb-2 lg:me-4">
                                        {
                                            //((imageOnePreview !== '')) ?
                                            (((data?.data?.roomImages[0]?.image != undefined && !imageOneState) || imageOnePreview !== '')) ?
                                                <div className="rounded-[8px] w-[100%] xl:w-[250px] h-64 relative bg-black/60">
                                                    <img
                                                        className="rounded-[10px] w-[100%] xl:w-[250px] h-64 "
                                                        //src={imageOnePreview}
                                                        src={imageOnePreview.length > 0 ? imageOnePreview : `${process.env.apiUrl}` + `${data?.data.roomImages[0].image}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onMouseDown={() => removeFile(1)}
                                                        className="absolute text-white top-0 start-3 z-20 h-5 w-5">
                                                        <i className="fa-solid fa-xmark  text-[29px] text-white absolute top-2 start-2 "></i>
                                                    </button>

                                                </div> :
                                                <div>
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG</p>
                                                    </div>
                                                    <input
                                                        ref={imageeInputRef}
                                                        id="dropzone-file"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => selectFile(e, 1)} /></div>
                                        }
                                    </label>
                                    <label form="dropzone-file" className="flex flex-col items-center justify-center w-[100%] xl:w-[250px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500  mb-1 lg:mb-2 lg:me-4">
                                        {
                                            (((data?.data?.roomImages[1]?.image != undefined && !imageTwoState) || imageTwoPreview !== '')) ?
                                                <div className="rounded-[8px] w-[100%] xl:w-[250px] h-64 relative bg-black/60">
                                                    <img
                                                        className="rounded-[10px] w-[100%] xl:w-[250px] h-64 "
                                                        src={imageTwoPreview.length > 0 ? imageTwoPreview : `${process.env.apiUrl}` + `${data?.data.roomImages[1].image}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onMouseDown={() => removeFile(2)}
                                                        className="absolute text-white top-0 start-3 z-20 h-5 w-5">
                                                        <i className="fa-solid fa-xmark  text-[29px] text-white absolute top-2 start-2 "></i>
                                                    </button>

                                                </div> :
                                                <div>
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG</p>
                                                    </div>
                                                    <input
                                                        ref={imageeInputRef}
                                                        id="dropzone-file"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => selectFile(e, 2)} /></div>
                                        }
                                    </label>
                                    <label form="dropzone-file" className="flex flex-col items-center justify-center w-[100%] xl:w-[250px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500  mb-1 lg:mb-2 lg:me-4">
                                        {
                                            (((data?.data?.roomImages[2]?.image != undefined && !imageThreeState) || imageThreePreview !== '')) ?
                                                <div className="rounded-[8px] w-[100%] xl:w-[250px] h-64 relative bg-black/60">
                                                    <img
                                                        className="rounded-[10px] w-[100%] xl:w-[250px] h-64 "
                                                        src={imageThreePreview.length > 0 ? imageTwoPreview : `${process.env.apiUrl}` + `${data?.data.roomImages[2].image}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onMouseDown={() => removeFile(3)}
                                                        className="absolute text-white top-0 start-3 z-20 h-5 w-5">
                                                        <i className="fa-solid fa-xmark  text-[29px] text-white absolute top-2 start-2 "></i>
                                                    </button>

                                                </div> :
                                                <div>
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG</p>
                                                    </div>
                                                    <input
                                                        ref={imageeInputRef}
                                                        id="dropzone-file"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => selectFile(e, 3)} /></div>
                                        }
                                    </label>
                                    <label form="dropzone-file" className="flex flex-col items-center justify-center w-[100%] xl:w-[250px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500  mb-1 lg:mb-2 lg:me-4">
                                        {
                                            (((data?.data?.roomImages[3]?.image != undefined && !imageForeState) || imageForePreview !== '')) ?
                                                <div className="rounded-[8px] w-[100%] xl:w-[250px] h-64 relative bg-black/60">
                                                    <img
                                                        className="rounded-[10px] w-[100%] xl:w-[250px] h-64 "
                                                        src={imageForePreview.length > 0 ? imageTwoPreview : `${process.env.apiUrl}` + `${data?.data.roomImages[3].image}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onMouseDown={() => removeFile(4)}
                                                        className="absolute text-white top-0 start-3 z-20 h-5 w-5">
                                                        <i className="fa-solid fa-xmark  text-[29px] text-white absolute top-2 start-2 "></i>
                                                    </button>

                                                </div> :
                                                <div>
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG</p>
                                                    </div>
                                                    <input
                                                        ref={imageeInputRef}
                                                        id="dropzone-file"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => selectFile(e, 4)} /></div>
                                        }
                                    </label>

                                </div>

                                <div className="lg:w-[2%]"></div>

                            </div>


                        </div>

                        <div className="deparmtnetName w-[100%] h-fit bg-white rounded-lg mt-4 shadow-lg  px-4 py-4  overflow-hidden ">


                            <h3 className="text-black">Room Info</h3>
                            <hr className="mt-4 " />


                            {/*department name input*/}
                            <label className="flex flex-col md:flex-row  md:items-center mt-4 text-black/70" >
                                <h4 className="text-black/70  me-20">title</h4>

                                <input
                                    placeholder={data?.data?.title ?? ''}
                                    value={title}
                                    onChange={
                                        (e) => {
                                            e.preventDefault();
                                            changeTitle(e.target.value)
                                        }
                                    }
                                    required={data?.data?.title != undefined ? false : true}
                                    className="focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg px-2  w-52 mt-2 h-10 "
                                    // max={50}
                                    maxLength={20}
                                    type="text" />
                            </label>
                            <label className="flex flex-col md:flex-row  md:items-center mt-4 text-black/70 w-full" >
                                <h4 className="text-black/70  me-5 mb-2">description</h4>

                                <div className="w-[100%]">

                                    <ReactQuill
                                        placeholder={data?.data?.description ?? ''}

                                        theme="snow" value={descirption} onChange={changeDescription} />

                                </div>

                            </label>

                            <label className="flex flex-col md:flex-row  md:items-center mt-4 text-black/70" >
                                <h4 className="text-black/70  me-2">price perDay</h4>

                                <input

                                    placeholder={data?.data?.pricePerDay.toString() ?? ''}
                                    value={pricePerDay}
                                    onChange={(e) => {
                                        e.preventDefault()
                                        changePricePerDay(e.target.value)
                                    }
                                    }
                                    required={data?.data?.pricePerDay != undefined ? false : true}
                                    className=" focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg   px-2 w-52 mt-2 h-10 "

                                    type="number" />
                            </label>

                            <label className="flex flex-col md:flex-row  md:items-center mt-4 text-black/70" >
                                <h4 className="text-black/70  me-10">capacity</h4>

                                <input
                                    placeholder={data?.data?.capacity.toString() ?? ''}

                                    value={roomCapacity}
                                    onChange={
                                        (e) => {
                                            e.preventDefault();
                                            changeCapacity(e.target.value)
                                        }
                                    }
                                    required={data?.data?.capacity != undefined ? false : true}
                                    className=" focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg  px-2  w-52 mt-2 h-10 "

                                    type="number" />
                            </label>


                            <label className="flex flex-col md:flex-row  md:items-center mt-4 text-black/70" >
                                <h4 className="text-black/70  me-2">bedNumber</h4>

                                <input
                                    placeholder={data?.data?.bedNumber.toString() ?? ''}

                                    value={bedNumber}
                                    onChange={
                                        (e) => {
                                            e.preventDefault();
                                            changeBedNumber(e.target.value)
                                        }
                                    }
                                    required={data?.data?.bedNumber != undefined ? false : true}

                                    className=" focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg  marker: px-2 w-52 mt-2 h-10 "

                                    type="number" />
                            </label>

                            <label className="flex flex-col md:flex-row  md:items-center mt-4 text-black/70" >
                                <h4 className="text-black/70  me-4">floorNumber</h4>

                                <input
                                    placeholder={data?.data?.floorNumber.toString() ?? ''}

                                    value={floorNumber}
                                    onChange={
                                        (e) => {
                                            e.preventDefault();
                                            changeFloorNumber(e.target.value)
                                        }
                                    }
                                    required={data?.data?.floorNumber != undefined ? false : true}

                                    className=" focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg  px-2  w-52 mt-2 h-10 "

                                    type="number" />
                            </label>

                            <label className="flex flex-col md:flex-row  md:items-center mt-4 text-black/70" >
                                <h4 className="text-black/70  me-4">roomType</h4>

                                <select

                                    ref={selectRef}

                                    required={data?.data?.roomTypeInfo?.name != undefined ? false : true}


                                    // onChange={selectedDepartmentValue}
                                    name="cars" id="cars" className=" rounded-lg  w-[100%] h-10 mt-2  bg-primeColor text-white border-0">

                                    {
                                        roomTypes?.data?.map((valueData, key) =>
                                            <>
                                                <option

                                                    selected={data?.data?.roomTypeId === valueData?.id ? true : false}
                                                    value={valueData?.name} key={key}>{valueData?.name}</option>
                                            </>
                                        )
                                    }

                                </select>

                            </label>





                        </div>

                        <div className="">

                            <button
                                type="submit"

                                className="w-48 h-12 bg-primeColor mt-4 rounded-lg text-white text-2xl pt-1" >
                                {
                                    addRoomFunc.isLoading === true ? <ClipLoader
                                        className='h-12'
                                        color='white'

                                    /> : (roomIdNumber > 0) ? 'update' : 'add'

                                }
                            </button>


                        </div>
                        <div className="sizer h-10"></div>

                    </form>


                </div>
            </SlidBarAndHeaderHolder >
            {/* : <ProgressBar /> */}
        </div>
    )
}

export default AddOrUpdateRoom;
