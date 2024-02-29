import React, {useEffect, useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import { IoMdCreate } from "react-icons/io";
import {FaLayerGroup, FaPiggyBank} from "react-icons/fa6";
import {Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure, FormControl, FormLabel, Input} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,Button
} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import axios from "axios";
import {Link} from "react-router-dom";
import {GiPiggyBank} from "react-icons/gi";
const CategoriesPage = () => {
    const { isOpen: isOpenModal1, onOpen: onOpenModal1, onClose: onCloseModal1 } = useDisclosure();
    const { isOpen: isOpenModal2, onOpen: onOpenModal2, onClose: onCloseModal2 } = useDisclosure();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [user, setUser] = useState({})
    const [categoryType, setCategoryType] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const fetchCategories = (userData) => {
        axios.get('http://localhost:8080/api/users/' + userData.id)
            .then((res) => {
                console.log(res.data);
                setUser(userData);
                setCategories(res.data.categories);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData);
        fetchCategories(userData);
    }, []);

    const filteredCategories = selectedType ? categories.filter(category => category.type === selectedType) : categories;

    const types = categories.reduce((acc, cur) => {
        if (!acc.includes(cur.type)) {
            acc.push(cur.type);
        }
        return acc;
    }, []);

    return (
        <div>
            <div>
                <Navbar className="justify-content-between">
                    <div className="d-flex align-items-center">
                        <FaLayerGroup className="mx-2 mb-2 my-2 text-green-600" style={{ width: '30px', height: '30px' }} />
                        <h4 className="mx-2 mb-2 my-2">Categories</h4>
                    </div>
                    <div className="d-flex align-items-center text-green-600">
                        <IoMdCreate onClick={onOpenModal1} className="mr-3" style={{ width: '30px', height: '30px' }} />
                    </div>
                </Navbar>
            </div>

            <div style={{backgroundColor: 'white',width: '40%',margin: 'auto',marginTop: '3%',borderTopLeftRadius: '10px',borderTopRightRadius: '10px',borderBottomLeftRadius: '10px',borderBottomRightRadius: '10px'}}>
                <Tabs variant='enclosed'>
                    <TabList>
                        {types.map((type, index) => (
                            <Tab style={{ fontWeight: 'bold', color: '#32CD32'}} key={index} onClick={() => setSelectedType(type)}>{type}</Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {types.map((type, index) => (
                            <TabPanel key={index}>
                                <Table>

                                    <Tbody>
                                        {filteredCategories.map((category, index) => (
                                            <Tr key={index}>
                                                <td onClick={onOpenModal2}>
                                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src={category.image}
                                                            alt='Dan Abramov'
                                                        />
                                                        <span style={{marginLeft: '10px'}}>{category.name}</span>
                                                    </div>
                                                </td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </div>


            <Modal isOpen={isOpenModal1} onClose={onCloseModal1}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Category New</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Category name</FormLabel>
                            <Input placeholder='Enter name' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder='Last name' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onCloseModal1}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Modal isOpen={isOpenModal2} onClose={onCloseModal2}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Category Detail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Category name</FormLabel>
                            <Input placeholder='Enter name' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder='Last name' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onCloseModal2}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CategoriesPage;


