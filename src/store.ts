
import { create } from "zustand"


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
        console.log("Hi");
    }
}))

