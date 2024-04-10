import {create} from "zustand";
import axios from "../axios/axios.js";
import StudentsStore from "./StudentsStore.js";

const useClassStore = create((set) => ({
    classes: [],
    classSelected: {},
    classSelectedInStudentsPages: {},
    classSelectedInStudentsPagesCopy: {},
    lengthStudentsOfClassSelected: 0,
    setClasses: (classes) => set({ classes }),
    setClassSelectedInStudentsPagesCopy: (classSelectedInStudentsPagesCopy) => set({ classSelectedInStudentsPagesCopy }),
    setClassSelectedInStudentsPages: (classSelectedInStudentsPages) => set({ classSelectedInStudentsPages }),
    setClassSelected: (classSelected) => set({ classSelected }),
    setStudentsClassSelected: (students) => set((state) => (
        {
            classSelected: { ...state.classSelected, students }
        }
    )),
    updateSelectedClassInStudentsPages: async (date) => {
        try {
            const response = await axios.post('absensi/get/date', { date });
            const data = await response.data;
            set((state) => ({
                classSelectedInStudentsPages: {
                    ...state.classSelectedInStudentsPages,
                    students: state.classSelectedInStudentsPagesCopy.students?.map((student) => {
                        const studentAbsensi = data.find((absensi) => {
                            return student.absensi.find((abs) => abs.date === date && abs.time === absensi.time && abs.id === absensi.id)
                        })
                        return {
                            ...student, absensi: studentAbsensi
                        }
                    })
            }}));
        } catch (error) {
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                window.location.href = '/login';
            }
        }
    },
    getAllClasses: async () => {
        try {
            const response = await axios('class/get-all');
            const classes = await response.data.data;
            set({ classes });
        } catch (error) {
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                window.location.href = '/login';
            }
        }
    },
    getClassById: async (id) => {
        try {
            const response = await axios(`class/get/${id}`);
            let classSelected = await response.data.data;

            // Assuming each student object has an 'active' property that is either true or false
            classSelected.students = classSelected.students.filter(student => student.status === 'ACTIVE');
            set({ classSelected });
        } catch (error) {
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                window.location.href = '/login';
            }
        }
    },
    setLengthStudentsOfClassSelected: async (id) => {
        try {
            const response = await axios(`class/get/${id}`);
            let students = await response.data.data.students;
            students = students.filter(student => student.status === 'ACTIVE');
            set({ lengthStudentsOfClassSelected: students.length });
        } catch (error) {
            if(error.code === "ERR_BAD_REQUEST" && (window.location.pathname !== '/login')) {
                window.location.href = '/login';
            }
        }
    }
}))

export default useClassStore;