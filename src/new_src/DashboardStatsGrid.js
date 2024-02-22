import React from 'react';
import {IoBagHandle} from "react-icons/io5";

const DashboardStatsGrid = () => {
    return (
        <div className='flex gap-4 w-full'>
            <BoxWrapper>
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
                    <IoBagHandle className='text-2xl text-white'/>
                </div>
            </BoxWrapper>
            <BoxWrapper>

            </BoxWrapper>
            <BoxWrapper>

            </BoxWrapper>
            <BoxWrapper>

            </BoxWrapper>
        </div>
    );
};

export default DashboardStatsGrid;

function BoxWrapper({children}) {
    return (
        <div className='bg-white rounded-sm p-4 flex-1
                        border border-gray-200 flex items-center'>
            {children}
        </div>
    )
}