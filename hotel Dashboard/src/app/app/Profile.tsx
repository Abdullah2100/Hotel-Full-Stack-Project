/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useEffect, useRef, useState } from "react";
import EditeImage from "../../components/ui/EditeImage";
import Adminservices from "../../services/Adminservices"
import localizationService from "../../services/localizationService";
import DepartmentServices from "../../services/DepartmentServices";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import clsAdminData from "../../global/clsAdminData";
import useSignOut from 'react-auth-kit/hooks/useSignOut';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import ProgressBar from "../../components/ui/ProgressBar";
import SlidBarAndHeaderHolder from "../../components/layout/SlidBarAndHeaderHolder";
import Util from "../../global/Utile";

const Profile = () => {

  let isValidImage = clsAdminData?.adminDataHolder !== undefined;

  const imageRef = useRef<HTMLButtonElement>(null)
  const imageeInputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)

  const navigate = useNavigate();
  const signOut = useSignOut();
  const authHeader = useAuthHeader();



  const { isRight } = localizationService();
  const { depatmentItems, getDepartment, addToDepartment } = DepartmentServices();
  let { updateAdminData, getAdminData } = Adminservices()
  const [imageData, setImage] = useState('');


  useEffect(() => {
    // if (clsAdminData.adminDataHolder?.person?.firstName.length === 0)
    getAdminData(authHeader ?? "").then(() => {
      changeFirstName(clsAdminData.adminDataHolder.person.firstName);
      changeSecondName(clsAdminData.adminDataHolder.person.lastName);
      changeBrithDay(clsAdminData.adminDataHolder.person.brithDay);
      changeBrithDay(clsAdminData.adminDataHolder.person.brithDay);
      changeNationalNo(clsAdminData.adminDataHolder.person.nationalNo)
      changeUserName(clsAdminData.adminDataHolder.userName)
      changeAddress(clsAdminData.adminDataHolder.address)
      changePhone(clsAdminData.adminDataHolder.phone)
      changeDepartment(clsAdminData.adminDataHolder.department.name)
      changeIsBlock(clsAdminData.adminDataHolder.isBlock)
      getDepartment(authHeader ?? "");
      setImage(clsAdminData?.adminDataHolder?.image ?? "")
      addToDepartment(clsAdminData.adminDataHolder.department)
    })
  }, [])



  //request data
  const [profileImage, changeProfileImage] = useState<File>()
  const [firstName, changeFirstName] = useState<string>(clsAdminData.adminDataHolder?.person?.firstName)
  const [secondName, changeSecondName] = useState<string>(clsAdminData.adminDataHolder?.person?.lastName)
  const [brithDay, changeBrithDay] = useState<Date>(clsAdminData.adminDataHolder?.person?.brithDay ?? Date.now())
  const [nationalNo, changeNationalNo] = useState<string>(clsAdminData.adminDataHolder?.person?.nationalNo)
  const [userName, changeUserName] = useState<string>(clsAdminData.adminDataHolder?.userName)
  const [address, changeAddress] = useState<string>(clsAdminData.adminDataHolder?.address)
  const [phone, changePhone] = useState<string>(clsAdminData.adminDataHolder?.phone)
  const [department, changeDepartment] = useState<string>(clsAdminData.adminDataHolder?.department.name)
  const [isBlock, changeIsBlock] = useState<boolean>(clsAdminData.adminDataHolder?.isBlock)
  const [currentPassword, changeCurrentPassword] = useState<string>("")
  const [newPassword, changeNewPassword] = useState<string>("")
  const { handleSubmit } = useForm();



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

  const updateData = useMutation(
    {
      mutationFn: (data: FormData) => updateAdminData(data, authHeader ?? ""),
      onError: ((error: any) => {
        // const errorBody = (error.response) as IErrorType;
        // console.log(errorBody.data);

        // toast.error(`${errorBody.data}`, {
        //   position: "bottom-right",
        // })

        // if (errorBody.status === 401) {
        // navigate("/auth/login",
        //   {
        //     replace: false
        //   });
        //   return signOut();
        // }
        Util.handleErrorReponse(error, navigate, signOut())

      }),
      onSuccess: (() => {

        toast.success(`data add secccessfuly`, {
          position: "bottom-right",
        })
      })
    }
  )


  const updateFunction = () => {
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

    adminData.forEach((value, key) => {
      console.log(`value is  ${value} key is ${key}`);
    })
    updateData.mutateAsync(adminData);
  }


  useEffect(() => {
    document.addEventListener("change", selectFile);
    selectRef?.current?.addEventListener("select", selectedDepartmentValue)


    return () => {
      selectRef?.current?.addEventListener("select", selectedDepartmentValue)

      document.removeEventListener('change', selectFile)
    }

  },)

  function selectedDepartmentValue(e: any) {
    changeDepartment(e.target.value);
  }



  return (
    <>
      {
        isValidImage ? <div dir={isRight ? "rtl" : "ltr"}

          className="opacity-80 h-screen   ">
          {/* <Header /> */}
          <SlidBarAndHeaderHolder itemNumber={-1}>

            <div className="profile mx-5 mt-12">
              <h1 className=" text-5xl font-bold text-gray-600  ">Profile</h1>
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
                          (clsAdminData.adminDataHolder?.image.length > 0 || imageData.length > 0) ?
                            // <img src={imageData ?? adminData?.image} alt="" className="h-24 w-24 text-white rounded-[150px]" />
                            <img
                              id="pofileImage"
                              src={imageData?.length > 0 ? imageData : clsAdminData.adminDataHolder?.image.length > 0 ? clsAdminData.adminDataHolder?.image : ''} alt=""
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

                    <h3 className="text-gray-600">Basic Information</h3>
                    <hr className="mt-4 mb-4" />

                    {/* fullName input */}
                    <label className="mt-3 flex flex-col md:flex-row ">
                      <h4>FullName</h4>

                      <div className="inputHolder  items-end md:space-x-2 md:ms-8 ">

                        <input

                          required
                          value={firstName}
                          onChange={(e) => {
                            e.preventDefault();

                            changeFirstName(e.target.value)
                          }
                          }
                          className="border-2 rounded-sm w-[100%] md:w-60"
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
                          className="border-2 rounded-sm w-[100%] md:w-60 mt-1 md:mt-0"
                          max={20}
                          type="text" />
                      </div>
                    </label>

                    {/* brithDay input */}
                    <label className="mt-3 flex flex-col sm:flex-row sm:space-x-52" >
                      BrithDay

                      <DatePicker

                        required
                        className="border-2 rounded-sm  w-52 sm:ms-10"
                        selected={brithDay}
                        onChange={(e) => {
                          if (e != null)
                            changeBrithDay(new Date(e.toISOString()))
                        }
                        }
                      />

                    </label>
                    {/* National No input */}
                    <label className="mt-3 flex flex-col sm:flex-row sm:space-x-52" >
                      National No.
                      <input
                        required
                        value={nationalNo}
                        onChange={(e) => {
                          e.preventDefault();
                          changeNationalNo(e.target.value)
                        }
                        }
                        className="border-2 rounded-sm  w-52 sm:ms-3"
                        max={15}
                        type="da" />

                    </label>
                  </div>

                </div>

                <div className="employeeInfo w-[100%] h-fit bg-white rounded-lg mt-4 shadow-lg  px-4 py-4 ">

                  <h3 className="text-gray-600">Employee Information</h3>
                  <hr className="mt-4 mb-4" />



                  {/*userName input*/}
                  <label className="flex flex-col sm:flex-row sm:space-x-52" >
                    UserName
                    <input
                      required
                      value={userName}
                      onChange={(e) => {
                        e.preventDefault();
                        changeUserName(e.target.value)
                      }
                      }
                      className="border-2 rounded-sm  w-52 sm:ms-[24px]"
                      max={50}
                      type="text" />
                  </label>

                  {/*address input*/}
                  <label className="mt-2 flex flex-col sm:flex-row sm:space-x-52" >
                    Address
                    <textarea

                      required
                      value={address}
                      onChange={(e) => {
                        e.preventDefault();
                        changeAddress(e.target.value)
                      }
                      }
                      className="border-2 rounded-sm  w-[100%] h-24 sm:ms-[45px] px-2 py-2"
                      cols={5} ></textarea> </label>


                  {/*phone input*/}
                  <label className="mt-2 flex flex-col sm:flex-row sm:space-x-52" >
                    phone
                    <input
                      required
                      value={phone}
                      onChange={(e) => {
                        e.preventDefault();
                        changePhone(e.target.value)
                      }
                      }
                      className="border-2 rounded-sm  w-52 sm:ms-[59px]"
                      max={15}
                      type="text" />
                  </label>

                  {/*department input*/}
                  <label className="mt-2 flex flex-col sm:flex-row sm:space-x-52" >
                    Department
                    <select
                      ref={selectRef}
                      required
                      value={department}

                      // onChange={selectedDepartmentValue}
                      onClick={
                        depatmentItems.length == 0 ? () => getDepartment(authHeader ?? "") : undefined}
                      name="cars" id="cars" className="border-2 rounded-sm  w-52 sm:ms-4">

                      {
                        depatmentItems.map((valueData, key) =>
                          <>
                            <option selected={clsAdminData.adminDataHolder.department.id === valueData.id ? true : false} value={valueData.name} key={key}>{valueData.name}</option>
                          </>
                        )
                      }

                    </select>

                  </label>

                  {/*isBlock input*/}
                  <label className="mt-2 flex flex-row sm:space-x-52 items-center" >
                    IsBlock
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

                  <h3 className="text-gray-600">Update Password Information</h3>
                  <hr className="mt-4 mb-4" />



                  {/*Password input*/}
                  <label className="flex flex-col sm:flex-row sm:space-x-52" >
                    Password
                    <input
                      required
                      value={currentPassword}
                      onChange={(e) => {
                        e.preventDefault();
                        changeCurrentPassword(e.target.value)
                      }
                      }
                      className="border-2 rounded-sm  w-52 sm:ms-[90px]"
                      max={50}
                      type="password" />
                  </label>

                  {/*phone input*/}
                  <label className="mt-2 flex flex-col sm:flex-row sm:space-x-52" >
                    Confirm Password
                    <input
                      required

                      value={newPassword}
                      onChange={(e) => {
                        e.preventDefault();
                        changeNewPassword(e.target.value)
                      }
                      }
                      className="border-2 rounded-sm  w-52 sm:ms-[25px]"
                      max={15}
                      type="password" />
                  </label>

                </div>

                <button

                  value="Submite"
                  type="submit"
                  className="w-52 h-16 bg-primeColor mt-4 rounded-lg text-white text-3xl" >
                  Submite

                </button>
                <div className="sizer h-10"></div>

              </form>
            </div>

          </SlidBarAndHeaderHolder >
        </div > :
          <ProgressBar />

      }
    </>
  )
}

export default Profile