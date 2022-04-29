import { useNavigate } from "react-router-dom";

const Unauthorize = () => {
    const navigate = useNavigate()
    return (
        <div className='p-5'>
            You Are Not Unauthorize
            <br />
            <button onClick={() => navigate(-1)}>Kembali</button>
        </div>
    )
}

export default Unauthorize;