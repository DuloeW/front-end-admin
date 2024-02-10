import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Alert = ({ message, icon, trueOrFalse }) => {
  return (
    <div className={`w-80 h-fit p-5 rounded-md flex flex-col justify-center items-center gap-2 shadow-xl
        ${trueOrFalse ? 'bg-green-500' : 'bg-red-500'}
    `}>
        {trueOrFalse ? (
            <FontAwesomeIcon icon={icon} className='text-5xl text-white'/>
        ) : (
            <FontAwesomeIcon icon={icon} className='text-5xl text-white'/>
        )}
      <p className='text-3xl font-bold text-white text-center'>{message}</p>
    </div>
  );
}

export default Alert;