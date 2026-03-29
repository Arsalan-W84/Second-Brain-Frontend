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