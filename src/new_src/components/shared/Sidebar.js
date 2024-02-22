import React from 'react';
import {FcBullish} from "react-icons/fc";

const Sidebar = () => {
    return (
        <div className="flex flex-col bg-neutral-900 w-60 p-3">
            <div className='flex items-center gap-2 px-1 py-3'>
                <FcBullish fontSize={24}/>
                <span className='text-neutral-100 text-lg'>Money Lover</span>
            </div>
            <div className='flex-1'>
                top part
            </div>
            <div>bottom part</div>
        </div>
    );
};

export default Sidebar;