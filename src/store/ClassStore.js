import {create} from "zustand";
import axios from "../axios/axios.js";

const useClassStore = create((set) => ({
    classes: [],
    classSelected: {},
    lengthStudentsOfClassSelected: 0,
    setClasses: (classes) => set({ classes }),
    setClassSelected: (classSelected) => set({ classSelected }),
    setStudentsClassSelected: (students) => set((state) => ({ classSelected: { ...state.classSelected, students } })),
    getAllClasses: async () => {
        const response = await axios('class/get-all');
        const classes = await response.data.data;
        set({ classes });
    },
    getClassById: async (id) => {
        const response = await axios(`class/get/${id}`);
        const classSelected = await response.data.data;
        set({ classSelected });
    },
    setLengthStudentsOfClassSelected: async (id) => {
        const response = await axios(`class/get/${id}`);
        const students = await response.data.data.students;
        set({ lengthStudentsOfClassSelected: students.length });
    }
}))

export default useClassStore;