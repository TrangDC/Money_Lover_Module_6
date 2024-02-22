import React from 'react';

const DashboardStatsGrid = () => {
    return (
        <div className='flex gap-4 w-full'>
            <BoxWrapper>

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