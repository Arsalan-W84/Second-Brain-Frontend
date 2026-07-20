import { useRef } from "react";
import { useAddContentStore } from "../store";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CrossIcon } from "../assets/CrossIcon";
import { getLinkedInEmbedUrl, getYoutubeEmbedUrl } from "../utils/embedLinks";


const defaultstyles = "w-full box-border outline-none";

export const AddContentModal = () => {
    const ToggleModalShow = useAddContentStore((state) => state.ToggleModalShow);
    const titleref = useRef<HTMLInputElement>(null);
    const tagsref = useRef<HTMLInputElement>(null);
    const linkref = useRef<HTMLInputElement>(null);
    const typeref = useRef<HTMLSelectElement>(null);

    async function handleclick() {
        const type = typeref.current?.value;
        let link = linkref.current?.value;
        const tags= tagsref.current?.value;
        const title = titleref.current?.value;

        if(type == 'video' && link){
            link = getYoutubeEmbedUrl(link);
        }

        if(type == 'linkedin' && link){
            const embedLink = getLinkedInEmbedUrl(link);
            link = embedLink ?? link;
        }

        if(type && link && tags && title){
                await axios.post(`${BACKEND_URL}` + '/api/v1/content' , {
                link : link,
                type : type, 
                title : title ,
                tags : tags ,
            } , {
                headers : {
                    "token" : localStorage.getItem("token")
                }
            })
            alert("Content posted!!!!");
            ToggleModalShow();
        }
        
    }

    return (
        <div className="w-full h-screen bg-slate-800/70  absolute z-10 position-fixed flex items-center justify-center" >
            <div className="p-4 bg-gray-100 rounded-xl w-80">
                <div className="flex justify-between">
                    <div className="text-2xl">Add a new Content</div>
                    <div> 
                        <button onClick={ToggleModalShow} className="p-1 cursor-pointer hover:bg-gray-300 rounded-full"> {< CrossIcon size="md"/>} </button>
                    </div>
                </div>
                
                <div className="p-2">
                    <div className="w-full mt-3 p-3 border rounded-lg "> <input placeholder="title" ref={titleref} className={defaultstyles} ></input> </div>
                    <div className="w-full mt-2 p-3 border rounded-lg"> <input placeholder="link" ref={linkref} className={defaultstyles} ></input> </div>
                    
                    <div className="w-full mt-2 p-3 border rounded-lg "> 
                        {/* <input placeholder="type (video/photo/article)" ref={typeref} className={defaultstyles} ></input>  */}
                        <select 
                            ref={typeref}
                            defaultValue=""
                            className="w-full bg-transparent outline-none appearance-none cursor-pointer text-gray-700"
                        > 
                            <option value="" disabled hidden className="p-2 text-gray-400">
                            Select type
                            </option>
                            <option value="video">Video</option>
                            <option value="photo">Photo</option>
                            <option value="article">Article</option>
                            <option value="tweet">tweet</option>
                            <option value="linkedin">LinkedIn</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>

                    <div className="w-full mt-2 p-3 border rounded-lg "> <input placeholder="tags" ref={tagsref} className={defaultstyles}></input> </div>
                    <div className=" w-full flex justify-center">
                            <Button variant="primary" size="lg" text=" Add To Brain " onClick={handleclick}  />
                    </div>
                      
                </div>
            </div>
        </div>
    );
}