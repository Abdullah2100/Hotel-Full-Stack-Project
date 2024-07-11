/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import SlidBarAndHeaderHolder from "../../components/layout/SlidBarAndHeaderHolder"
import DepartmentServices from "../../services/DepartmentServices";
// import ProgressBar from "../../components/ui/ProgressBar";
// import localizationService from "../../services/localizationService";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from "react-router-dom";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import Util from "../../global/Utile";
import enState from "../../types/enState";
import ProgressBar from "../../components/ui/ProgressBar";
import clsDepartment from "../../model/clsDepartment";


const Department = () => {
    const signOut = useSignOut();
    const { handleSubmit } = useForm()
    const [departmentId, changeDepartmentId] = useState(0)
    // const [operationNumber, changeOperation] = useState(1)
    const [departmentName, changeDepartmentName] = useState("")
    const navigate = useNavigate();
    const authHeader = useAuthHeader();



    // const { isRight } = localizationService();
    const {
        createDepartment,
        departmentState,
        getDepartment, depatmentItems,
        deleteDepartment,
        updateDepartment
    } = DepartmentServices()
    useEffect(() => {
        getDepartment(authHeader ?? "");
    }, [])


    const addDeparmtmentHolder = useMutation({
        mutationFn: (name: string) => createDepartment(name, authHeader ?? ""),
        onError: ((error: any) => {

            Util.handleErrorReponse(error, navigate, signOut())
        }),
        onSuccess: (() => {

            toast.success(`data add secccessfuly`, {
                position: "bottom-right",
            })

        })
    })

    const deleteDepartmentHolder = useMutation({
        mutationFn: (id: number) => deleteDepartment(id, authHeader ?? ""),
        onError: ((error: any) => {

            Util.handleErrorReponse(error, navigate, signOut())
        }),
        onSuccess: (() => {

            toast.success(`data add secccessfuly`, {
                position: "bottom-right",
            })
        })

    })

    const updateDeparmtmentHolder = useMutation({
        mutationFn: (data: clsDepartment) => updateDepartment(data, authHeader ?? ""),
        onError: ((error: any) => {

            Util.handleErrorReponse(error, navigate, signOut())
        }),
        onSuccess: (() => {

            toast.success(`data add secccessfuly`, {
                position: "bottom-right",
            })

        })
    })





    const createOrUpdateDepartmentFunction = () => {
        switch (departmentId === 0) {
            case true: {

                addDeparmtmentHolder.mutateAsync(departmentName)
            } break;

            default: {

                updateDeparmtmentHolder.mutateAsync(new clsDepartment(departmentId, departmentName));
            }
        }
    }

    const deleteDeparmtntFunc = (id: number) => {
        deleteDepartmentHolder.mutateAsync(id)
    }




    return (

        <>
            {departmentState !== enState.loading ?

                <div  >


                    {/* <div className='h-screen bg-bodyColor relative'> */}


                    <SlidBarAndHeaderHolder itemNumber={1}>

                        {/* // isValidImage ? */}
                        {/* <div dir={isRight ? "rtl" : "ltr"} */}
                        {/* className="opacity-80 h-screen bg-gray-300"> */}
                        {/* <Header /> */}

                        <div className="profile mx-5 pt-10">
                            <form
                                onSubmit={
                                    handleSubmit(() => createOrUpdateDepartmentFunction())
                                }
                            >
                                <h1 className=" text-5xl font-bold text-gray-600  ">Department</h1>

                                <div className="deparmtnetName w-[100%] h-fit bg-white rounded-lg mt-4 shadow-lg  px-4 py-4  overflow-hidden">

                                    <h3 className="text-gray-600">Department Info</h3>
                                    <hr className="mt-4 mb-4" />

                                    <input
                                        className="w-[100%] text-gray-800"
                                        type="text"
                                        disabled
                                        value={departmentId}
                                        hidden={departmentId === 0 ? true : false}
                                    />

                                    {/*department name input*/}
                                    <label className="flex flex-col mt-4 " >
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


                            {depatmentItems.length > 0 &&
                                <>
                                    <div

                                        className="departmentList w-[100%] h-fit bg-white rounded-lg shadow-lg  px-4 py-4  overflow-hidden">

                                        <h3 className="text-gray-600">Departments</h3>
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

                                                {depatmentItems.map(
                                                    (key) =>
                                                        <tr className="">
                                                            <td className="text-start" >{key.id}</td>
                                                            <td className="text-start">{key.name}</td>
                                                            <td className="text-start  text-white">
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

export default Department