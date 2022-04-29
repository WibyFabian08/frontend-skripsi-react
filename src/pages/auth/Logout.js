import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const Logout = () => {
    useEffect(() => {
        localStorage.clear()
      }, []);
    return (
        <div className='p-5'>
            Logout Page
            <br />
            <Link to="/">Login</Link>
        </div>
    )
}

export default Logout;