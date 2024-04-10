import axios from "../axios/axios.js";
import {create} from "zustand";

const useStudentsStore = create((set) => ({
    students: [],
    studentPicked: {},
    studentPickedInStudentsPages: {},
    setStudents: (students) => set({ students }),
    setStudentPicked: (studentPicked) => set({ studentPicked }),
    setStudentPickedInStudentsPages: (studentPickedInStudentsPages) => set({ studentPickedInStudentsPages }),
    addNewStudent: (student) => set((state) => ({ students: [...state.students, student] })),
    getAllStudents: async () => {
        try {
            const response = await axios('students/get/status/active');
            const students = await response.data.data;
            set({ students });
        } catch (error) {
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                alert('Token expired, please login again')
                window.location.href = '/login';
            }
        }
    },
    postStudent: async (data) => {
        try {
            return await axios.post('students/create', data);
        } catch (error) {
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                alert('Token expired, please login again')
                window.location.href = '/login';
            }
        }
    },
}))

export default useStudentsStore;