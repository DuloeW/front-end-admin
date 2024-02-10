import axios from "../axios/axios.js";
import {create} from "zustand";

const useStudentsStore = create((set) => ({
    students: [],
    studentPicked: {},
    setStudents: (students) => set({ students }),
    setStudentPicked: (studentPicked) => set({ studentPicked }),
    addNewStudent: (student) => set((state) => ({ students: [...state.students, student] })),
    getAllStudents: async () => {
        const response = await axios('students/get/status/active');
        const students = await response.data.data;
        set({ students });
    },
    postStudent: async (data) => {
        return await axios.post('students/create', data);
    },
}))

export default useStudentsStore;