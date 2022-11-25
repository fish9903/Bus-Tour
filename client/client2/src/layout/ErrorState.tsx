import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const ErrorState: React.FC = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('error', { replace: true })
    }, [navigate])
    return (<div></div>);
}

export default ErrorState;