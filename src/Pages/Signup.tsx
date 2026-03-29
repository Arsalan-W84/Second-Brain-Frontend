import { Button } from "../Components/Button";

export const Signup = () => {
    return (
        <div className="w-screen h-screen bg-gray-400 flex items-center justify-center">
            <div className="p-2 bg-gray-200">
                <div className="m-2 p-2 border text-xl rounded-lg">
                    <input placeholder="Username" />
                </div>

                <div className="m-2 p-2 border text-xl rounded-lg" >
                    <input placeholder="Password " />
                </div>

                <div className="p-1 flex justify-center">
                    <Button variant="primary" text="Signup" onClick={()=>{}} size="lg" />
                </div>
            </div>
        </div>
    );
}