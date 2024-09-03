/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useEffect, useRef, useState } from "react";
import EditeImage from "../../components/ui/EditeImage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import useSignOut from 'react-auth-kit/hooks/useSignOut';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import ProgressBar from "../../components/ui/ProgressBar";
import SlidBarAndHeaderHolder from "../../components/layout/SlidBarAndHeaderHolder";
import IErrorType from "../../types/IErrorType";
import { useAdminData, useUpdateAdminData } from "../../hocks/useAdmin";
import { useGetDepartment } from "../../hocks/useDepartment";

const Profile = () => {

  const [imageData, setImage] = useState('');
  const navigate = useNavigate();
  const signOut = useSignOut();
  const authHeader = useAuthHeader();
  const { isError, isLoading, data, error } = useAdminData(authHeader ?? "")


  //request data
  const [profileImage, changeProfileImage] = useState<File>()
  const [firstName, changeFirstName] = useState<string>(data?.data.person?.firstName ?? "")
  const [secondName, changeSecondName] = useState<string>(data?.data.person?.lastName ?? "")
  const [brithDay, changeBrithDay] = useState<Date>(data?.data.person?.brithDay ?? new Date())
  const [nationalNo, changeNationalNo] = useState<string>(data?.data.person?.nationalNo ?? "")
  const [userName, changeUserName] = useState<string>(data?.data.userName ?? "")
  const [address, changeAddress] = useState<string>(data?.data.address ?? "")
  const [phone, changePhone] = useState<string>(data?.data.phone ?? "")
  const [department, changeDepartment] = useState<string>(data?.data.department.name ?? "")
  const [isBlock, changeIsBlock] = useState<boolean>(data?.data.isBlock ?? false)
  const [currentPassword, changeCurrentPassword] = useState<string>("")
  const [newPassword, changeNewPassword] = useState<string>("")
  const { handleSubmit } = useForm();


  const imageRef = useRef<HTMLButtonElement>(null)
  const imageeInputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)




  // const { isRight } = localizationService();


  const { data: departmentsData, isError: isdeparmtnetError, error: deparmtmentError } = useGetDepartment(authHeader ?? "")
  const updateProfileFun = useUpdateAdminData(authHeader ?? "")

  useEffect(() => {
    if ((isError || isdeparmtnetError))
      handleErrorReponse(error ?? deparmtmentError);
  }, [isError, isdeparmtnetError])








  const openFileDialog = () => {
    imageeInputRef.current?.click();
  }

  const selectFile = () => {
    const file = imageeInputRef?.current?.files;

    if (file != null) {
      changeProfileImage(file[0])
      const fileData = URL.createObjectURL(file[0])
      setImage(fileData);

    }
  }

  function selectedDepartmentValue(e: any) {
    changeDepartment(e.target.value);
  }


  const handleErrorReponse = (error: any) => {
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





  const updateFunction = async () => {
    let adminData = new FormData();
    if (profileImage != null)
      adminData.append("profileImage", profileImage)
    adminData.append("userName", userName)
    adminData.append("firstName", firstName)
    adminData.append("lastName", secondName)
    adminData.append("password", currentPassword)
    adminData.append("newPassword", newPassword)
    adminData.append("departmentName", `${selectRef?.current?.value}`)
    adminData.append("address", address)
    adminData.append("brithDay", brithDay.toString())
    adminData.append("phone", phone)


    await updateProfileFun.mutateAsync(adminData).catch((error) => {
      handleErrorReponse(error)
    }).then((data) => {
      toast.success(`${data}`, {
        position: "bottom-right",
      })
    })
  }


  useEffect(() => {
    document.addEventListener("change", selectFile);
    selectRef?.current?.addEventListener("select", selectedDepartmentValue)


    return () => {
      selectRef?.current?.addEventListener("select", selectedDepartmentValue)

      document.removeEventListener('change', selectFile)
    }

  },)


  if (isError)
    return;

  if (isLoading)
    return (<><ProgressBar /></>)

  return (
    <>
      {/* <Header /> */}
      <SlidBarAndHeaderHolder itemNumber={-1}>

        <div className="profile mx-5 pt-12">
          <h1 className=" text-3xl font-bold text-black mt-12 ">Profile</h1>
          <form onSubmit={
            handleSubmit(updateFunction)
          }>
            <div className="personalInfo mt-5">
              <div className="personalImage w-[100%] h-48 relative ">

                <div className="absolute background w-[100%] h-36 rounded-lg bg-slate-500 "> </div>


                <div className="absolute imageHolder w-[100%] h-16  bottom-0  flex items-center justify-center">


                  <div className="absolute  bg-blue-700 w-28 h-28   flex items-center justify-center rounded-full  bottom-0 p-">



                    {/* image body */}

                    {
                      (data?.data?.image != '' || imageData.length > 0) ?
                        // <img src={imageData ?? adminData?.image} alt="" className="h-24 w-24 text-white rounded-[150px]" />
                        <img
                          id="pofileImage"
                          src={imageData?.length > 0 ? imageData : data?.data?.image != '' ? data?.data.image : ''} alt=""
                          className="h-24 w-24 text-white rounded-full" />
                        : <i className="text-5xl text-white fa-solid fa-user"></i>
                    }
                  </div>

                  <input

                    // onClick={selectFile}
                    ref={imageeInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    id="" />
                  <button
                    type="button"
                    onClick={openFileDialog}
                    ref={imageRef}
                    className="absolute mt-8 ms-16" >
                    <EditeImage />
                  </button>

                </div>


              </div>

              <div className="personInfo w-[100%] h-fit bg-white rounded-lg mt-4 shadow-lg  px-4 py-4 ">

                <h3 className="text-black">Basic Information</h3>
                <hr className="mt-4 mb-4" />

                {/* fullName input */}
                <label className="mt-3 flex flex-col md:flex-row">
                  <h4 className="text-black/70">FullName</h4>

                  <div className="inputHolder  items-end md:space-x-2 md:ms-8 ">

                    <input

                      required
                      value={firstName}
                      onChange={(e) => {
                        e.preventDefault();

                        changeFirstName(e.target.value)
                      }
                      }
                      className="focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg h-10 px-2  w-[100%] md:w-60  "
                      max={20}
                      type="text" />
                    <input
                      required
                      value={secondName}
                      onChange={(e) => {
                        e.preventDefault();
                        changeSecondName(e.target.value)
                      }
                      }
                      className="focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg h-10 px-2 w-[100%] md:w-60 mt-1 md:mt-0"
                      max={20}
                      type="text" />
                  </div>
                </label>

                {/* brithDay input */}
                <label className="mt-3 flex flex-col sm:flex-row sm:space-x-52 " >
                  <h3 className="text-black/70">
                    BrithDay
                  </h3>

                  <DatePicker

                    required
                    className="focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg h-10 px-2  w-52 sm:ms-10"
                    selected={brithDay}
                    onChange={(e) => {
                      if (e != null)
                        changeBrithDay(new Date(e.toISOString()))
                    }
                    }
                  />

                </label>
                {/* National No input */}
                <label className="mt-3 flex flex-col sm:flex-row " >
                  <h3 className="text-black/70 me-3">
                    National No.
                  </h3>
                  <input
                    required
                    value={nationalNo}
                    onChange={(e) => {
                      e.preventDefault();
                      changeNationalNo(e.target.value)
                    }
                    }
                    className="focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg h-10 px-2  w-52  "
                    max={15}
                    type="text" />

                </label>
              </div>

            </div>

            <div className="employeeInfo w-[100%] h-fit bg-white rounded-lg mt-4 shadow-lg  px-4 py-4 ">

              <h3 className="text-black">Employee Information</h3>
              <hr className="mt-4 mb-4" />



              {/*userName input*/}
              <label className="flex flex-col sm:flex-row sm:space-x-52" >
                <h3 className="text-black/70 me-6">
                  UserName
                </h3>
                <input
                  required
                  value={userName}
                  onChange={(e) => {
                    e.preventDefault();
                    changeUserName(e.target.value)
                  }
                  }
                  className="focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg h-10 px-2  w-52 sm:ms-[24px]"
                  max={50}
                  type="text" />
              </label>

              {/*address input*/}
              <label className="mt-2 flex flex-col sm:flex-row sm:space-x-52" >
                <h3 className="text-black/70 me-10">
                  Address
                </h3>
                <textarea

                  required
                  value={address}
                  onChange={(e) => {
                    e.preventDefault();
                    changeAddress(e.target.value)
                  }
                  }
                  className="focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg  w-[100%] h-24 sm:ms-[45px] px-2 py-2"
                  cols={5} ></textarea> </label>


              {/*phone input*/}
              <label className="mt-2 flex flex-col sm:flex-row sm:space-x-52" >
                <h3 className="text-black/70 me-[50px]">
                  phone
                </h3>
                <input
                  required
                  value={phone}
                  onChange={(e) => {
                    e.preventDefault();
                    changePhone(e.target.value)
                  }
                  }
                  className="focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg h-10 px-2  w-52 sm:ms-[59px]"
                  max={15}
                  type="text" />
              </label>

              {/*department input*/}
              <label className="mt-2 flex flex-col sm:flex-row sm:space-x-52" >
                <h3 className="text-black/70 me-[10px]">
                  Department
                </h3>
                <select
                  ref={selectRef}
                  required
                  value={department}

                  // onChange={selectedDepartmentValue}

                  name="cars" id="cars" className="focus:outline-none  rounded-lg h-10 px-2 bg-primeColor text-white  w-52 sm:ms-4">

                  {
                    departmentsData?.data?.map((valueData, key) =>
                      <>
                        <option selected={valueData.id === valueData.id ? true : false} value={valueData.name} key={key}>{valueData.name}</option>
                      </>
                    )
                  }

                </select>

              </label>

              {/*isBlock input*/}
              <label className=" mt-2 flex flex-row sm:space-x-52 items-center" >
                <h3 className="text-black/70 me-9">
                  IsBlock
                </h3>
                <input
                  // required
                  checked={isBlock}
                  onChange={(e) => {
                    e.preventDefault();
                    changeIsBlock(!isBlock)
                  }
                  }
                  className="border-2 rounded-sm  w-8 ms-11"
                  max={15}
                  type="checkbox" />
              </label>

            </div>

            <div className="passwordInfo w-[100%] h-fit bg-white rounded-lg mt-4 shadow-lg  px-4 py-4 ">

              <h3 className="text-black">Update Password Information</h3>
              <hr className="mt-4 mb-4" />



              {/*Password input*/}
              <label className="flex flex-col sm:flex-row " >
                <h3 className="text-black/70 me-8">
                  Password
                </h3>
                <input
                  required
                  value={currentPassword}
                  onChange={(e) => {
                    e.preventDefault();
                    changeCurrentPassword(e.target.value)
                  }
                  }
                  className=" focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg h-10 px-2  w-52 sm:ms-[90px]"
                  max={50}
                  type="password" />
              </label>

              {/*phone input*/}
              <label className="mt-2 flex flex-col sm:flex-row sm:space-x-52" >
                <h3 className="text-black/70 me-14">
                  Confirm Password
                </h3>
                <input
                  required

                  value={newPassword}
                  onChange={(e) => {
                    e.preventDefault();
                    changeNewPassword(e.target.value)
                  }
                  }
                  className=" focus:border-primeColor focus:outline-none border-2 border-solid rounded-lg h-10 px-2 w-52 sm:ms-[25px]"
                  max={15}
                  type="password" />
              </label>

            </div>

            <button

              value="Submite"
              type="submit"
              className="w-48 h-12 bg-primeColor mt-4 rounded-lg text-white text-2xl" >
              Submite

            </button>
            <div className="sizer h-10"></div>

          </form>
        </div>

      </SlidBarAndHeaderHolder >
    </>
  )
}

export default Profile