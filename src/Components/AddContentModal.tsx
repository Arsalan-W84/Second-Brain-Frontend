import { useRef } from "react";
import { DeleteIcon } from "../assets/Deleteicon";
import { useAddContentStore } from "../store";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";



export const AddContentModal = () => {
    const ToggleModalShow = useAddContentStore((state) => state.ToggleModalShow);
    const titleref = useRef<HTMLInputElement>(null);
    const tagsref = useRef<HTMLInputElement>(null);
    const linkref = useRef<HTMLInputElement>(null);
    const typeref = useRef<HTMLInputElement>(null);

    async function handleclick() {
        const type = typeref.current?.value;
        let link = linkref.current?.value;
        const tags= tagsref.current?.value;
        const title = titleref.current?.value;

        if(type == 'video'){
            const match = link?.match(/v=([^&]+)/);
            link =  match ? `https://www.youtube.com/embed/${match[1]}` : link;
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
        <div className="w-full h-screen bg-slate-800 opacity-60 absolute z-10 position-fixed flex items-center justify-center" >
            <div className="p-3 bg-gray-100">
                <div className="flex justify-between">
                    <div>Add new Content</div>
                    <div> 
                        <button onClick={ToggleModalShow} className="curson-pointer"> {<DeleteIcon size="md"/>} </button>
                    </div>
                </div>
                
                <div className="p-2">
                    <div className="m-2 p-3 border rounded-lg"> <input placeholder="title" ref={titleref}></input> </div>
                    <div className=" m-2 p-3 border rounded-lg"> <input placeholder="link" ref={linkref}></input> </div>
                    <div className=" m-2 p-3 border rounded-lg "> <input placeholder="type (video/photo/article)" ref={typeref} ></input> </div>
                    <div className=" m-2 p-3 border rounded-lg "> <input placeholder="tags" ref={tagsref} ></input> </div>
                    <div className=" w-full flex justify-center">
                            <Button variant="primary" size="lg" text=" Add To Brain " onClick={handleclick}  />
                    </div>
                      
                </div>
            </div>
        </div>
    );
}