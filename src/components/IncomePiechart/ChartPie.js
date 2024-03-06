import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React from 'react';
import {Doughnut} from 'react-chartjs-3';

const data = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const DoughnutChart = () => (
    <div>
        <h2>Doughnut Example</h2>
        <Doughnut data={data} />
    </div>
);

const ExpensePage = () => {
    return (
        <div>
            <div style={{width: '50%',height: '50%',margin: 'auto'}}>
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>One</Tab>
                        <Tab>Two</Tab>
                        <Tab>Three</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <DoughnutChart />
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    );
};

export default ExpensePage;