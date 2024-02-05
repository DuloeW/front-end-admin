import { useState } from "react";
import BoxClass from "./BoxClass";

const ListBoxClass = () => {
    const [activeClass, setActiveClass] = useState(null);
    const [activeGrade, setActiveGrade] = useState(null);

    const handleBoxClick = (className, grade) => {
        setActiveClass(className);
        setActiveGrade(grade);
        console.log({
            className,
            grade
        })
    };

    const renderBoxes = () => {
        const classes = ["Rekayasa Perangkat Lunak", "Tataboga", "Akutansi", "Multimedia", "Kuliner", "Desain Komunikasi Visual"];
        const grades = ["XII", "XI", "X"];

        return grades.map((grade) => (
            classes.map((className) => {
                const isActive = activeClass === className && activeGrade === grade;
                return (
                    <BoxClass
                        key={`${className}-${grade}`}
                        className={className}
                        grade={grade}
                        isActive={isActive}
                        onClick={handleBoxClick}
                    />
                );
            })
        ));
    };

    return (
        <div className='w-full h-fit flex flex-wrap gap-2.5'>
            {renderBoxes()}
        </div>
    );
};

export default ListBoxClass;
