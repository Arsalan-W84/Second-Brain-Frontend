import { useRef } from "react";
import { Button } from "../Components/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
    const UsernameRef = useRef<HTMLInputElement> (null);
    const PasswordRef = useRef<HTMLInputElement> (null);
    const navigate = useNavigate();

    async function OnSubmit() {
        const username = UsernameRef.current?.value;
        const password = PasswordRef.current?.value;
        console.log(UsernameRef.current?.value);
        console.log(PasswordRef.current?.value);
        await axios.post(`${BACKEND_URL}` + '/api/v1/auth/signup'  ,  {
            username : username,
            password : password
        });
        navigate("/signin");
        alert("You have signed up");
    }

    return (
        <div className="w-screen h-screen bg-gray-400 flex items-center justify-center">
            <div className="p-2 bg-gray-200">
                <div className="m-2 p-2 border text-xl rounded-lg" >
                    <input ref={UsernameRef} placeholder="Username" />
                </div>

                <div className="m-2 p-2 border text-xl rounded-lg" >
                    <input ref={PasswordRef} placeholder="Password " />
                </div>

                <div className="p-1 flex justify-center">
                    <Button variant="primary" text="Signup" onClick={OnSubmit} size="lg" />
                </div>
            </div>
        </div>
    );
}