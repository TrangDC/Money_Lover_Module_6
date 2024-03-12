import React, {useEffect, useState} from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    Table,
    Tbody,
    Tr,
    Td,
    Image,
    TableContainer, InputLeftElement, useToast,
} from '@chakra-ui/react'
import {MDBCard, MDBCardBody, MDBCardTitle, MDBRow} from "mdb-react-ui-kit";
import {MdOutlineClose} from "react-icons/md";
import {FaPen} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import ProgressBar from "./ProgressBar";
import {MdCalendarMonth} from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import {Input, InputGroup} from '@chakra-ui/react';

function ProgressCircle({value, maxValue, handleTransClick, handleCloseCard,newBudgetCreated, onBudgetCreated}) {
    // budget detail
    const [showCard2, setShowCard2] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(false);
    const [selectedBudgetId, setSelectedBudgetId] = useState(null);
    const [editBudget, setEditBudget] = useState({
        amount: '',
        category: '',
        wallet: '',
        startDate: '',
        endDate: ''
    });
    const handleClickX = () => {
        setShowCard2(false);
        setSelectedBudget(false);
        handleCloseCard();
    };

    const handleTrans = (budgetId) => {
        setSelectedBudgetId(budgetId);
        setShowCard2(true);
        setSelectedBudget(true);
        handleTransClick();
        const budget = budgets.find(b => b.id === budgetId);
        setEditBudget(budget);
        console.log(editBudget);
    };

    const [budgets, setBudgets] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchBudgets = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/budgets/user/${user.id}`);
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchBudgets();
    }, [newBudgetCreated]);

    //modal edit budget
    const [show, setShow] = useState(false);
    const [budgetE, setBudgetE] = useState()

    const handleClose = () => setShow(false);

    const handleShow = (budgetE) => {
        setShow(true);
        console.log(budgetE);
    };
    const [categories, setCategories] = useState([]);
    const [wallets, setWallets] = useState([])
    const [select_category, setCategory] = useState('');
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

    const handleChange = (e) => {
        console.log(e)
        setEditBudget({
            ...editBudget,
            [e.target.name]: e.target.value
        });
    };
    //hàm edit budget
    const toast = useToast();
    const handleEditBudget = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/budgets/user/${user.id}/edit/${selectedBudgetId}`, editBudget);
            handleClose();
            fetchBudgets();
            toast({
                title: 'Update success!',
                description: 'You successfully updated a budget!',
                status: 'success',
                duration: 1500,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error updating budget:', error);
            toast({
                title: 'Update Failed',
                description: 'Failed to updated a budget!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });

        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this budget?');
        if (confirmDelete) {
            axios.delete(`http://localhost:8080/api/budgets/user/${user.id}/delete/${id}`)
                .then(res => {
                    fetchBudgets();
                    handleClickX();
                    toast({
                        title: 'Delete Successful',
                        description: 'You have successfully deleted the budget!',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                    });
                    setSelectedBudget(null);
                })
                .catch(err => toast({
                    title: 'Delete Failed',
                    description: 'Failed to delete the budget!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                }));
        }
    };

    //bieu do
    const percentage = Math.min((value / maxValue) * 100, 100);

    return (
        <>
            <div style={{width: '200px', margin: 'auto', marginTop: '2%'}}>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage.toFixed(2)}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(0, 170, 0, ${percentage / 100})`,
                        textColor: '#66b73a',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#33de0d',
                    })}
                />

                <div style={{display: "flex", justifyContent: "space-between", marginTop: '10px', width: '350px'}}>
                    <div style={{
                        flex: 1,
                        textAlign: "center",
                        borderRight: '1px solid gray',
                        paddingRight: '10px',
                        marginLeft: '-45%'
                    }}>
                        <span style={{display: "block", marginBottom: 5}}>+ {maxValue.toLocaleString()} đ</span>
                        <span>Total budgets</span>
                    </div>
                    <div style={{
                        flex: 1,
                        textAlign: "center",
                        borderRight: '1px solid gray',
                        paddingLeft: '10px',
                        paddingRight: '10px'
                    }}>
                        <span style={{display: "block", marginBottom: 5}}>+8 M đ</span>
                        <span>Total spent</span>
                    </div>

                </div>
                {/*phần hiển thị danh sách budget*/}
                <div style={{marginLeft: '-30%', marginTop: '20px', width: '400px'}}>
                    <TableContainer style={{overflowY: 'auto', maxHeight: '180px'}}>
                        <Table variant='simple' style={{width: '300px'}}>
                            <Tbody>
                                {budgets.map((budget) => (
                                    <Tr key={budget.id}>
                                        <Td style={{display: 'flex', alignItems: 'center'}}
                                            onClick={() => handleTrans(budget.id)}>
                                            <Image
                                                borderRadius='full'
                                                boxSize='50px'
                                                src={budget.category.image}
                                                alt=''
                                            />
                                            <span style={{marginLeft: '15px'}}>{budget.name}</span>
                                        </Td>
                                        <Td style={{textAlign: 'right'}}>{budget.amount.toLocaleString()} đ</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>

            </div>

            {/*phần hiển thị thông tin budget */}
            <div className={`card2 ${selectedBudget ? 'selected' : ''}`}
                 style={{
                     width: '400px',
                     position: 'absolute',
                     top: '-12.5%',
                     right: '-120.5%',
                     transform: 'translateX(-50%)'
                 }}>
                {showCard2 && (
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow>
                                <div style={{display: 'flex'}}>
                                    <MdOutlineClose onClick={handleClickX}
                                                    style={{marginTop: '-2px', fontSize: '30px', marginLeft: '-10px'}}/>
                                    <MDBCardTitle style={{margin: 'auto'}}>Budget Details</MDBCardTitle>
                                    <div style={{marginLeft: 'auto', display: 'flex', gap: '5px'}}>
                                        <FaPen onClick={() => handleShow(editBudget)}
                                               style={{fontSize: '20px', marginRight: '1px'}}/>
                                        <MdDelete style={{
                                            fontSize: '25px',
                                            marginRight: '-1px',
                                            marginTop: '-2px',
                                            color: 'red'
                                        }}
                                                  onClick={() => handleDelete(editBudget.id)}
                                        />
                                    </div>
                                </div>

                                <hr style={{width: '350px', marginTop: '10px'}}/>
                                <MDBRow className="wallet-infomation">
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Image
                                            borderRadius='full'
                                            boxSize='50px'
                                            src={editBudget.category.image}
                                            alt=''
                                        />
                                        <div style={{marginLeft: '10px', display: 'flex', flexDirection: 'column'}}>
                                            <span style={{marginBottom: '5px'}}>{editBudget.category.name}</span>
                                            <span>{editBudget.amount.toLocaleString()} đ</span>
                                        </div>
                                    </div>
                                    <div style={{width: '250px'}}>
                                        <Table variant='simple' style={{width: '350px', marginTop: '10px'}}>
                                            <Tbody>
                                                <Tr>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'left',
                                                        borderBottom: '1px solid #fff'
                                                    }}>Spent</Td>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'right',
                                                        borderBottom: '1px solid #fff'
                                                    }}>Left</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'left',
                                                        borderBottom: '1px solid #fff'
                                                    }}>70,000 đ</Td>
                                                    <Td style={{
                                                        padding: '8px',
                                                        textAlign: 'right',
                                                        borderBottom: '1px solid #fff'
                                                    }}>6,930,000 đ</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </div>
                                    <div style={{marginLeft: '20px', marginTop: '10px'}}>
                                        <ProgressBar completed={60}/>
                                    </div>

                                </MDBRow>
                                <hr style={{width: '350px', marginTop: '10px'}}/>
                                <div style={{display: 'inline-flex', alignItems: 'center'}}>
                                    <MdCalendarMonth style={{fontSize: '20px'}}/>
                                    <span style={{marginLeft: '35px'}}>
                                        {editBudget.startDate} to {editBudget.endDate}
                                    </span>
                                </div>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    marginTop: '10px',
                                    marginLeft: '-5px'
                                }}>
                                    <Image
                                        borderRadius='full'
                                        boxSize='50px'
                                        src='https://static.moneylover.me/img/icon/icon.png'
                                        alt=''
                                    />
                                    <span style={{marginLeft: '15px'}}>{editBudget.wallet.name}</span>
                                </div>
                                <hr style={{width: '350px', marginTop: '10px'}}/>
                                <div style={{marginTop: '5px', width: '350px', marginLeft: '5%'}}>
                                    <TableContainer style={{overflowY: 'auto', maxHeight: '130px'}}>
                                        <Table variant='simple' style={{width: '300px'}}>
                                            <Tbody>
                                                <Tr>
                                                    <Td style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                            alt=''
                                                        />
                                                        <span style={{marginLeft: '15px'}}>Name Category</span>
                                                    </Td>
                                                    <Td style={{textAlign: 'right'}}>1.000.000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                            alt=''
                                                        />
                                                        <span style={{marginLeft: '15px'}}>Name Category</span>
                                                    </Td>
                                                    <Td style={{textAlign: 'right'}}>1.000.000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                            alt=''
                                                        />
                                                        <span style={{marginLeft: '15px'}}>Name Category</span>
                                                    </Td>
                                                    <Td style={{textAlign: 'right'}}>1.000.000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                            alt=''
                                                        />
                                                        <span style={{marginLeft: '15px'}}>Name Category</span>
                                                    </Td>
                                                    <Td style={{textAlign: 'right'}}>1.000.000</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src='https://static.moneylover.me/img/icon/ic_category_salary.png'
                                                            alt=''
                                                        />
                                                        <span style={{marginLeft: '15px'}}>Name Category</span>
                                                    </Td>
                                                    <Td style={{textAlign: 'right'}}>1.000.000</Td>
                                                </Tr>
                                            </Tbody>

                                        </Table>
                                    </TableContainer>
                                </div>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                )}

                {/*modal edit budget*/}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Budget</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <span>Amount</span>
                        <InputGroup style={{marginTop: '10px'}}>
                            <InputLeftElement
                                pointerEvents='none'
                                color='gray.300'
                                fontSize='1.2em'
                            >
                                $
                            </InputLeftElement>
                            <Input placeholder='Enter amount' name="amount" value={editBudget.amount}
                                   onChange={handleChange}/>
                        </InputGroup>

                        <div  style={{marginTop: '10px'}}>
                            <span className="text-green-900">Type : {editBudget.category.type}</span>
                            <Form.Select onChange={handleCategoryChange} >
                                <option>Change Type</option>
                                <option value='EXPENSE'>EXPENSE</option>
                                <option value='LOAN'>LOAN</option>
                            </Form.Select>
                        </div>

                        <div  style={{marginTop: '10px'}}>
                            <span className="text-green-900">Category : {editBudget.category.name}</span>
                            <Form.Select name='category_id' onChange={handleChange} >
                                <option>Open this select category</option>
                                {categories.filter(category => category.type === select_category)
                                    .map((category) => (
                                        <option key={category.id} value={category.id}>
                                            <span>{category.name}</span>
                                        </option>
                                    ))}
                            </Form.Select>
                        </div>

                        <div style={{marginTop: '10px'}}>
                            <span className="text-green-900">Wallet : {editBudget.wallet.name}</span>
                            <Form.Select onChange={handleChange}
                                         name='wallet_id'>
                                <option>Open this select wallet</option>
                                {wallets.map((wallet) => (
                                    <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                                ))}
                            </Form.Select>
                        </div>

                        <div style={{marginTop: '10px'}}>
                            <span>Start Date</span>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Start Date"
                                    type="date"
                                    name='startDate' onChange={handleChange}
                                    value={editBudget.startDate}
                                />
                            </InputGroup>
                            <span>End Date</span>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    onChange={handleChange}
                                    type="date"
                                    name='endDate'
                                    aria-describedby="basic-addon2"
                                    value={editBudget.endDate}
                                />
                            </InputGroup>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={handleEditBudget}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    );
}

export default ProgressCircle;