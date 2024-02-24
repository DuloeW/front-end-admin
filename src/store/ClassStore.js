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
    },
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