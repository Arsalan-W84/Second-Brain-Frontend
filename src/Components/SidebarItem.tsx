import type { ReactElement } from "react";
import { useSidebarstore } from "../store";

interface SidebarItemProps {
    text : String;
    startIcon? : ReactElement;
    endIcon? : ReactElement;
    onclick : () => void;
    isActive : boolean
}
export const SidebarItem = (props : SidebarItemProps) => {
    const show = useSidebarstore((state) => state.show);
        return <button  onClick={props.onclick} className = {`ml-1 mt-2 p-2 w-full  rounded-lg gap-1 text-lg flex items-center ${(props.isActive)? 'bg-gray-400': 'hover:bg-gray-300'}`}>
            <span> {props.startIcon} </span>
            <span> {show && props.text} </span> 
            <span>{props.endIcon} </span>
        </button>
}
