import { create } from "zustand";

const useStoreSideBar = create((set) => ({
    homeOpen: false,
    studentOpen: false,
    qrOpen: false,
    switchOpenHomeLink: () => set((state) => ({ homeOpen: !state.homeOpen })),
    switchOpenStudentsLink: () => set((state) => ({ studentOpen: !state.studentOpen })),
    switchOpenQrLink: () => set((state) => ({ qrOpen: !state.qrOpen })),
}))

export default useStoreSideBar