import { useState, type ReactElement } from "react";

//generic button cmponent , having defined style variants , taking text as input \
interface buttonProps { 
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg"; 
    text : string;
    starticon? : ReactElement;
    endIcon? : ReactElement;
    onClick : ()=>void;
}

const variants = {
    primary : "bg-[#5046e4] text-white",
    secondary : "bg-[#e0e7ff] text-[#453eaf]"

}
const sizes = {
    sm: "p-1 m-2",
    md : "p-2 m-2",
    lg : "p-3 m-2"
}

export const Button  = (props:buttonProps) => {
    const [Loading, setloading] = useState(false);
    async function handleclick() {
        setloading(true);
        try{
            await props.onClick()
        } finally{
            setloading(false);
        }
    }
    return <button className = {`${variants[props.variant]} ${sizes[props.size]} flex items-center rounded-lg gap-2 cursor-pointer`} onClick={handleclick} disabled={Loading}>

        {props.starticon} {props.text} {props.endIcon}

    </button>
}