
import axios from "axios";
import { create } from "zustand"
import { BACKEND_URL } from "./config";


type Sidebarstore = {
    show : boolean,
    toggleshow : () => void
}
export const useSidebarstore = create<Sidebarstore>( (set) => ({
    show : true,
    toggleshow : () => {
        set((state) => ({show : !state.show}));
    }

}))

type AddContentStore = {
    ModalShow : boolean;
    ToggleModalShow : () => void
}

export const useAddContentStore = create<AddContentStore>((set) => ({
    ModalShow : false , 
    ToggleModalShow : () => {
        set((state) => ({ModalShow : !state.ModalShow}));
    }
}))

export type Content = {
    _id : string , 
    link : string,
    type : 'photo' | 'video' | 'article' | 'tweet',
    title: string,
    tags:  [],
    userId : string
}
type UserContents = {
    Contents  : Content[]
    SetContents : () => void | Promise<void>
}

export const useUserContents = create<UserContents>((set) => ({
    Contents : [] ,
    SetContents : async() => {
        try{
            const response = await axios.get(`${BACKEND_URL}` + '/api/v1/content' , {
                headers : {
                    "token" : localStorage.getItem("token")
                }
            })
            set({Contents : response.data.contents})
        }catch(e){
            console.log(e);
        }
        
    }
}))