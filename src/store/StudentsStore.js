import axios from "../axios/axios.js";
import {create} from "zustand";
import {goToLoginPage} from "../util/Method.js";

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
                goToLoginPage()
            }
        }
    },
    postStudent: async (data) => {
        try {
            return await axios.post('students/create', data);
        } catch (error) {
            console.log(error)
            if(error.response.status === 401 && (window.location.pathname !== '/login')) {
                goToLoginPage()
            }
        }
    },
}))

export default useStudentsStore;