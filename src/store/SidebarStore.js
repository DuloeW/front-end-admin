import { create } from "zustand";

const useStoreSideBar = create((set) => ({
    activeUrl: "/",
    setActiveUrl: (url) => set({ activeUrl: url }),
}))

export default useStoreSideBar