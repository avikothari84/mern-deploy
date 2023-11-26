import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_BACKEND_URL } from '../config';


const Home = () => {
    axios.defaults.withCredentials = true;
    const apiUrl = `${BASE_BACKEND_URL}/`;
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.jwt) {
                navigate("/login");
            }
            const { data } = await axios.post(
                apiUrl,
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);
            return status
                ? toast(`Hello ${user}`, {
                    position: "top-right",
                })
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
    const Logout = () => {
        removeCookie("jwt");
        navigate("/signup");
    };
    useEffect(()=> {
        console.log("updated token")
    },[username])
    return (
        <>
            <div className="home_page">
                <h4>
                    {" "}
                    Welcome <span>{username}</span>
                </h4>
                <button onClick={Logout}>LOGOUT</button>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;