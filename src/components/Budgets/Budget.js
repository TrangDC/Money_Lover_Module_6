import React, {useEffect, useState} from 'react';
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    TabIndicator,
    useDisclosure,
    Button,
    InputLeftElement, useToast
} from '@chakra-ui/react';
import ProgressCircle from './ProgressCircle';
import {IoMdAdd} from "react-icons/io";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import {Select} from '@chakra-ui/react';
import {Input, InputGroup} from '@chakra-ui/react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Budget = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [isCardOpen, setIsCardOpen] = useState(false);
    const handleTransClick = () => {
        setIsCardOpen(true);
        fetchBudgets();
    };

    const handleCloseCard = () => {
        setIsCardOpen(false);
        fetchBudgets();
    };
    //show custom time
    const [showInputs, setShowInputs] = useState(false);

    const handleSelectChange = (event) => {
        setShowInputs(event.target.value === 'option2');
    };

    //add budget
    const toast = useToast();
    const [budget, setBudget] = useState({
        amount: '',
        category_id: '',
        wallet_id: '',
        startDate: '',
        endDate: ''
    });

    const navigate = useNavigate()

    // Handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/budgets/`, {
            ...budget,
            user_id: user.id
        })
            .then(res => {
                console.log(res);
                onClose();
                handleBudgetCreated();
                fetchBudgets();
                toast({
                    title: 'Create success!',
                    description: 'You successfully created a budget!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
            })
            .catch(err => {
                console.error(err);
                toast({
                    title: 'Create Failed',
                    description: 'Failed to create a budget!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };
    const handleChange = (e) => {
        console.log(e)
        setBudget({
            ...budget,
            [e.target.name]: e.target.value
        });
    };

    //lay danh sach category va wallet
    const user = JSON.parse(localStorage.getItem("user"));
    const [categories, setCategories] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [select_category, setCategory] = useState('');

    const [newBudgetCreated, setNewBudgetCreated] = useState(false);

    // Callback function để cập nhật danh sách budget trên trang con
    const handleBudgetCreated = () => {
        setNewBudgetCreated(!newBudgetCreated);
    };
    const fetchData = async () => {
        try {

            // Gọi API để lấy danh sách ví
            const wallets_data = await axios.get('http://localhost:8080/api/wallets/user/' + user.id);
            setWallets(wallets_data.data);

            // Gọi API để lấy danh sách category
            const categories_data = await axios.get('http://localhost:8080/api/categories/user/' + user.id);
            setCategories(categories_data.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    useEffect(() => {
        fetchData();
        fetchBudgets();
    }, [user.id]);

    //số liệu biểu đồ
    const [budgets, setBudgets] = useState([]);
    const [moneyBudget, setMoneyBudget] = useState(0);
    const [moneyTrans, setMoneyTrans] = useState(0);
    const fetchBudgets = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/budgets/user/${user.id}`);
            setBudgets(response.data);
            // Tính tổng số tiền của các định mức
            let totalAmount = 0;
            response.data.forEach((budget) => {
                totalAmount += parseInt(budget.amount);
            });
            setMoneyBudget(totalAmount);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };


    return (
        <div style={{marginLeft: isCardOpen ? '-300px' : '0', transition: 'margin-left 0.5s'}}>
            <div style={{
                maxHeight: '600px', maxWidth: '500px',
                backgroundColor: 'white', margin: 'auto',
                borderRadius: '10px'
            }}>
                <Tabs position="relative" variant="unstyled">
                    <TabList>
                        <Tab>BUDGETS</Tab>
                        <IoMdAdd onClick={onOpen} style={{fontSize: '30px', marginTop: '10px', marginLeft: '70%'}}/>
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="blue.500"
                        borderRadius="1px"
                    />
                    <TabPanels>
                        <TabPanel>
                            <div>
                                <ProgressCircle value={800000} maxValue={moneyBudget} handleTransClick={handleTransClick}
                                                handleCloseCard={handleCloseCard} newBudgetCreated={newBudgetCreated} onBudgetCreated={handleBudgetCreated}/>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit}>
                    <ModalContent>
                        <ModalHeader>Add Budget</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <span>Amount</span>
                            <InputGroup style={{marginTop: '10px'}}>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                >
                                    $
                                </InputLeftElement>
                                <Input placeholder='Enter amount' name="amount" value={budget.amount}
                                       onChange={handleChange}/>
                            </InputGroup>
                            <span>Type Category</span>
                            <Select placeholder='Select Type' style={{marginTop: '10px'}}
                                    value={select_category} onChange={handleCategoryChange}>
                                <option value='EXPENSE'>EXPENSE</option>
                                <option value='LOAN'>LOAN</option>
                            </Select>
                            <span>Category</span>
                            <Select name='category_id' className="form-select" aria-label="Default select example"
                                    onChange={handleChange}>
                                <option>Select category</option>
                                {categories.filter(category => category.type === select_category)
                                    .map((category) => (
                                        <option key={category.id} value={category.id}>
                                            <span>{category.name}</span>
                                        </option>
                                    ))}
                            </Select>
                            <span>Time(Start to End)</span>
                            <div>
                                <Select
                                    placeholder='Select Time'
                                    style={{marginTop: '10px'}}
                                    onChange={handleSelectChange}
                                >
                                    <option value='option1'>This Month</option>
                                    <option value='option2'>Custom</option>
                                </Select>
                                {showInputs && (
                                    <>
                                        <Input
                                            placeholder="Select Date and Time"
                                            size="md"
                                            type="date"
                                            style={{marginTop: '10px'}}
                                            name='startDate' value={budget.startDate} onChange={handleChange}
                                        />
                                        <Input
                                            placeholder="Select Date and Time"
                                            size="md"
                                            type="date"
                                            style={{marginTop: '10px'}}
                                            name='endDate' value={budget.endDate} onChange={handleChange}
                                        />
                                    </>
                                )}
                            </div>
                            <span>Wallet</span>
                            <Select name='wallet_id' className="form-select" aria-label="Default select example"
                                    onChange={handleChange}>
                                <option>Select wallet</option>
                                {wallets.map((wallet) => (
                                    <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                                ))}
                            </Select>

                        </ModalBody>

                        <ModalFooter>
                            <Button variant='success' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme='green' type="submit">Submit</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </div>
    );
};

export default Budget;