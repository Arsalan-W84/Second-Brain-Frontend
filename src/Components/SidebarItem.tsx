import type { ReactElement } from "react";
import { useSidebarstore } from "../store";

interface SidebarItemProps {
    text : String;
    startIcon? : ReactElement;
    endIcon? : ReactElement;
}
export const SidebarItem = (props : SidebarItemProps) => {
    const show = useSidebarstore((state) => state.show);
        return <div className = {`ml-1 mt-2 p-2 hover:bg-gray-300 rounded-lg gap-1 text-lg flex items-center`}>
            <span> {props.startIcon} </span>
            <span> {show && props.text} </span> 
            <span>{props.endIcon} </span>
        </div>
}
