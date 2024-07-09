import { ClipLoader } from 'react-spinners'

const ProgressBar = () => {
    return (
        <div className="h-screen flex justify-center items-center ">
            <ClipLoader
                className='h-12'
                color='#EA580C'

            />
        </div>
    )
}

export default ProgressBar