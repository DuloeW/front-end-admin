import {create} from "zustand";

const useClassStore = create((set) => ({
    classes: [],
    classPickedForQr: {},
    classPickedForStudents: {},
    setClasses: (classes) => set({ classes }),
    setClassPickedForQr: (classPickedForQr) => set({ classPickedForQr }),
    setClassPickedForStudents: (classPickedForStudents) => set({ classPickedForStudents }),
}))