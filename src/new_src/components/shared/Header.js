import React from 'react';
import {HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch} from "react-icons/hi";

const Header = () => {
    return (
        <div className='bg-white h-16 px-4 flex justify-between items-center
                        border-b border-gray-200'>
            <div className='relative'>
                <HiOutlineSearch fontSize={20}
                                 className='text-gray-400 absolute
                                            top-1/2 -translate-y-1/2 left-3'/>
                <input type='text'
                       placeholder='Search your wallet...'
                       className='text-sm focus:outline-none active:outline-none
                                  h-10 w-[24rem] border border-gray-400 rounded-sm pr-4 pl-11'
                />
            </div>
            <div className='flex items-center gap-2 mr-2'>
                <HiOutlineChatAlt fontSize={24}/>
                <HiOutlineBell fontSize={24}/>
            </div>
        </div>
    );
};

export default Header;