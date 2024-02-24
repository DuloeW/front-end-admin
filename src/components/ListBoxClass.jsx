import {useEffect, useState} from "react";
import BoxClass from "./BoxClass";
import useClassStore from "../store/ClassStore.js";
import axios from "../axios/axios.js";

const ListBoxClass = ({queryDate}) => {
    const [activeClass, setActiveClass] = useState(null);
    const [activeGrade, setActiveGrade] = useState(null);
    const {
        classes,
        classSelectedInStudentsPages,
        setClassSelectedInStudentsPages,
        updateSelectedClassInStudentsPages,
        setClassSelectedInStudentsPagesCopy
    } = useClassStore()

    const handleBoxClick = (classSelected) => {
        setActiveClass(classSelected.major);
        setActiveGrade(classSelected.grade);
        setClassSelectedInStudentsPages(classSelected)
        setClassSelectedInStudentsPagesCopy(classSelected)
    };

    useEffect(() => {
        updateSelectedClassInStudentsPages(queryDate)
    }, [queryDate, classSelectedInStudentsPages]);


    const renderBoxes2 = () => {
        return classes?.map((classItem) => {
            const isActive = activeClass === classItem.major && activeGrade === classItem.grade
            return (
                <BoxClass
                    key={classItem.id}
                    className={classItem}
                    isActive={isActive}
                    disable={isActive}
                    onClick={handleBoxClick}
                />
            );
        })
    }

    return (
        <div className='w-full h-fit flex flex-wrap gap-2.5'>
            {renderBoxes2()}
        </div>
    );
};

export default ListBoxClass;
