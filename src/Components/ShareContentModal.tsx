import axios from "axios";
import { CrossIcon } from "../assets/CrossIcon";
import { useShareContentStore } from "../store";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import { useState } from "react";


export const ShareContentModal  = () => {
    const [shareLink , setShareLink] = useState("");
    async function handleclick() {
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share` , {
            share : true
        } , {
            headers : {
                "token" : localStorage.getItem("token")
            }
        });
        const url =BACKEND_URL + '/api/v1/brain/' + response.data.link
        setShareLink(url);
    }

        const ToggleShareModalShow = useShareContentStore((state) => state.ToggleShareModalShow);
        return (
                <div className="w-full h-screen bg-slate-800/70  absolute z-10 position-fixed flex items-center justify-center" >
                    <div className="p-4 bg-gray-100 rounded-xl w-80">
                        <div className="flex justify-between">
                            <div className="text-2xl">Share your Brain with others</div>
                            <div> 
                                <button onClick={ToggleShareModalShow} className="p-1 cursor-pointer hover:bg-gray-300 rounded-full"> {< CrossIcon size="md"/>} </button>
                            </div>
                        </div>
                        
                        <div className="p-2">
                            <div className=" w-full flex justify-center">
                                    <Button variant="primary" size="lg" text=" Get Share Link " onClick={handleclick}  />
                            </div>
                              
                        </div>

                        {shareLink!=="" && <div className="w-full flex items-center gap-2 bg-gray-200 p-2 rounded-lg">
                            <input
                                type="text"
                                value={shareLink}
                                readOnly
                                className="flex-1 bg-transparent outline-none text-sm"
                            />
                            <button
                                onClick={() => navigator.clipboard.writeText(shareLink)}
                                className="px-2 py-1 bg-[#5046e4] text-white rounded-md text-sm"
                            >
                                Copy
                            </button>
                        </div>}

                    </div>
                </div>
            );
}