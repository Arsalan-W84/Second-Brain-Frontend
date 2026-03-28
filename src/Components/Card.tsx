import type { ReactElement } from "react";
import { DeleteIcon } from "../assets/Deleteicon";
import { ShareIcon } from "../assets/ShareIcon";

interface Cardprops {

    typeIcon : ReactElement;
    title : string;
}


export const Card = (props: Cardprops) => {
    return (
        <div  className={`mt-10 ml-10 p-2 bg-gray-200 w-90 h-100 rounded-lg `} >
            <div>
               <div className="p-2 flex justify-between items-center">
                    <div className={`flex gap-2`}>    
                      {props.typeIcon} {props.title}
                    </div>
                    <div className="flex gap-2"> 
                        <button className="p-2 hover:bg-gray-300 rounded-full"> { <ShareIcon size="sm"/>} </button>
                        <button className="p-2 hover:bg-gray-300 rounded-full" > {<DeleteIcon size="sm"/>} </button>
                    </div> 
                 
                </div>
                
                <div>BODY</div>

            </div>
        </div>
    );
}