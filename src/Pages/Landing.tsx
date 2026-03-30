import { useRef } from "react";
import { Button } from "../Components/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Landing = () => {
    const UsernameRef = useRef<HTMLInputElement> (null);
    const PasswordRef = useRef<HTMLInputElement> (null);
    const navigate = useNavigate();

    async function OnSignup() {
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

    async function OnSignin() {
        const username = UsernameRef.current?.value;
        const password = PasswordRef.current?.value;
        console.log(username);
        console.log(password);
        const response = await axios.post(`${BACKEND_URL}` + '/api/v1/auth/login'  ,  {
            username : username,
            password : password
        });
        const jwt = response.data.token;
        if(jwt){
            localStorage.setItem("token" , jwt);
            alert("You have logged in");
            navigate("/dashboard")
        }else{
            alert("Something Went Wrong!");
        }
    }


    return (
        <div className="w-screen h-screen bg-gray-400 flex items-center justify-center">
            <div className="p-6 bg-gray-200 rounded-lg">
                <div className="text-sm">Username & password must be 5-12 characters</div>
                <div className="mt-3 p-2 border text-xl rounded-3xl" >
                    <input ref={UsernameRef} placeholder="Username...." className="w-full box-border outline-none" />
                </div>

                <div className="mt-3 p-2 border text-xl rounded-3xl" >
                    <input ref={PasswordRef} placeholder="Password...." className="w-full box-border outline-none"/>
                </div>
                
                <div className="text-red-500 text-xs">
                    
                </div>
                <div className="mt-1 text-gray-600 text-sm flex justify-center">
                    Already have an account ? Login here :
                </div>
                <div className="p-1 flex justify-center">
                    <Button variant="primary" text="Sign in" onClick={OnSignin} size="lg" />
                </div>
                
                <div className=" mt-1 p-2 text-gray-600 text-sm flex justify-center">
                    Dont have an account ? Sign up here :
                </div>
                <div className="p-1 flex justify-center">
                    <Button variant="primary" text="Sign up" onClick={OnSignup} size="lg" />
                </div>
                

            </div>
        </div>
    );
}