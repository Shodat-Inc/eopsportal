import React, {useState, useEffect} from 'react'
import Image from "next/image";
const AlertMessage = (props: any) => {
    const [alertClass, setAlertClass] = useState('bg-blue-957 border-blue-958 text-blue-959');
    const [alertIcon, setAlertIcon] = useState('/img/AlertInfo.svg')    
    useEffect(()=>{
        let clName = '';
        let icon = '';
        if(props.alertType==="Info" || props.alertType==="info") {
            clName = 'bg-blue-957 border-blue-958 text-blue-959';
            icon = '/img/AlertInfo.svg';
        } else if(props.alertType==="Warning" || props.alertType==="warning") {
            clName = 'bg-yellow-957 border-yellow-958 text-yellow-959';
            icon = '/img/AlertWarning.svg';
        } else if(props.alertType==="Success" || props.alertType==="success") {
            clName = 'bg-green-957 border-green-958 text-green-959';
            icon = '/img/AlertSuccess.svg';
        } else if(props.alertType==="Error" || props.alertType==="error" || props.alertType==="Danger" || props.alertType==="danger") {
            clName = 'bg-red-957 border-red-958 text-red-959';
            icon = '/img/AlertError.svg';
        }
        setAlertClass(clName);
        setAlertIcon(icon)
    }, [props])

    return (
        <div className={`${alertClass} mb-1 mt-1 border text-md px-4 py-3 rounded rounded-xl relative flex items-center justify-start`}>
            <Image
                src={alertIcon}
                alt="Alert Success"
                height={24}
                width={24}
                className='mr-2'
            />
            <strong className="font-semibold">{props.title}</strong>
            <span className="block sm:inline ml-2">{props.message}</span>
        </div>
    )
}
export default AlertMessage;