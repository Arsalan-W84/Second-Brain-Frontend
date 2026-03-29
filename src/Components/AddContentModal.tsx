import { DeleteIcon } from "../assets/Deleteicon";
import { useAddContentStore } from "../store";
import { Button } from "./Button";


export const AddContentModal = () => {
    const ToggleModalShow = useAddContentStore((state) => state.ToggleModalShow);
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
                    <div className="m-2 p-3 border rounded-lg"> <input placeholder="title" className="text-md"></input> </div>
                    <div className=" m-2 p-3 border rounded-lg"> <input placeholder="link"></input> </div>
                    <div className=" m-2 p-3 border rounded-lg "> <input placeholder="type"></input> </div>
                    <div className=" m-2 p-3 border rounded-lg "> <input placeholder="tags"></input> </div>
                    <div className=" w-full flex justify-center">
                            <Button variant="primary" size="lg" text=" Add To Brain " onClick={()=> {}}  />
                    </div>
                      
                </div>
            </div>
        </div>
    );
}