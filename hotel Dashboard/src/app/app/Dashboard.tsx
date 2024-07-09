// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Adminservices from '../../services/Adminservices';
import Header from '../../components/ui/Header';
// import IErrorType from '../../types/IErrorType';
// import toast from 'react-hot-toast';
import localizationService from '../../services/localizationService';
// import useSignOut from 'react-auth-kit/hooks/useSignOut';
// import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';


const Dashboard = () => {
    // const signOut = useSignOut()
    const { isRight } = localizationService();
    // const navigate = useNavigate();
    // const { getAdminData } = Adminservices();
    // const authHeader = useAuthHeader();

    // useEffect(() => {
    //     getAdminData(authHeader ?? "").catch((error) => {

    //         const errorBody = error as IErrorType;
    //         console.log(error.errorBody);

    //         toast.error(`${errorBody.message}`, {
    //             position: "bottom-right",

    //         })

    //         if (errorBody.message.includes("401")) {

    //             signOut()
    //             // navigate("/auth/login",
    //             //     {
    //             //         replace: false

    //             //     });
    //             return Promise.resolve('/auth/login');

    //         }

    //     })
    // }, [])




    return (
        <div dir={isRight ? "rtl" : "ltr"} >

            <div className='h-screen bg-bodyColor relative'>
                <Header />
            </div>
        </div>
    )
}


export default Dashboard;
