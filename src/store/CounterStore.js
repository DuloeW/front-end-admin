import { create } from "zustand";

const useStoreCounter = create((set) => ({
    value: 0,
    inscrement: () => set((state) => ({ value: state.value + 1 })),
}))


export default useStoreCounter