import type { ReactElement } from "react";

interface SidebarItemProps {
    text : String;
    startIcon? : ReactElement;
    endIcon? : ReactElement;
}
export const SidebarItem = (props : SidebarItemProps) => {
        return <div className = {`m-2 p-2 hover:bg-gray-300 rounded-lg gap-2 text-lg flex items-center`}>
            {props.startIcon} {props.text} {props.endIcon}
        </div>
}