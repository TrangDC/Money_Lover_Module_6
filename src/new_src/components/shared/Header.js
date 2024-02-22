import React from 'react';

const Header = () => {
    return (
        <div className='bg-white h-16 px-4 flex justify-between items-center'>
            <div>
                <input type='text'
                       placeholder='Search your wallet...'
                       className='text-sm focus:outline-none active:outline-none
                                  h-10 w-[24rem] border border-gray-400 rounded-sm px-4'
                />
            </div>
            <div>side button</div>
        </div>
    );
};

export default Header;