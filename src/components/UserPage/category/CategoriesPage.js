import React, {useEffect, useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import {IoMdCreate} from "react-icons/io";
import {FaLayerGroup, FaPiggyBank} from "react-icons/fa6";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast
} from '@chakra-ui/react'
import {
    Table,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Button
} from '@chakra-ui/react'
import {Image} from '@chakra-ui/react'
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
import {Link, useNavigate} from "react-router-dom";

const CategoriesPage = () => {
    const {isOpen: isOpenModal1, onOpen: onOpenModal1, onClose: onCloseModal1} = useDisclosure();
    const {isOpen: isOpenModal2, onOpen: onOpenModal2, onClose: onCloseModal2} = useDisclosure();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [editCate, setEditCate] = useState([]);
    const [user, setUser] = useState({})
    const [categoryType, setCategoryType] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const defaultImagePath = "https://static.moneylover.me/img/icon/ic_category_salary.png";
    const navigate = useNavigate();
    const toast = useToast();

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
        const storedSelectedType = localStorage.getItem("selectedType");
        console.log(userData);
        fetchCategories(userData);
        if (storedSelectedType) {
            setSelectedType(storedSelectedType);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedType", selectedType);
    }, [selectedType]);

    useEffect(() => {
        // Load all categories when component mounts
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            fetchCategories(userData);
        }
    }, []);

    const createCategory = () => {
        const newCategory = {
            name: category.name,
            type: categoryType,
            image: defaultImagePath,
        };
        axios.post(`http://localhost:8080/api/categories/user/${user.id}`, newCategory)
            .then((response) => {
                console.log("Category created successfully:", response.data);
                onCloseModal1();
                fetchCategories(user);
                toast({
                    title: 'Create success!',
                    description: 'You successfully created a category!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
            })
            .catch((error) => {
                console.error("Error creating category:", error);
                toast({
                    title: 'Create Failed',
                    description: 'Failed to create a category!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:8080/api/categories/user/${user.id}/edit/${editCate.id}`, editCate)
            .then((res) => {
                console.log(res.data);
                fetchCategories(user);
                onCloseModal2();
                toast({
                    title: 'Update Successful',
                    description: 'Category updated successfully!',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: 'Update Failed',
                    description: 'Failed to update category!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    const uniqueTypes = Array.from(new Set(categories.map(category => category.type)));

    return (
        <div>
            <div>
                <Navbar className="justify-content-between">
                    <div className="d-flex align-items-center">
                        <FaLayerGroup className="mx-2 mb-2 my-2 text-green-600"
                                      style={{width: '30px', height: '30px'}}/>
                        <h4 className="mx-2 mb-2 my-2">Categories</h4>
                    </div>
                    <div className="d-flex align-items-center text-green-600">
                        <IoMdCreate onClick={onOpenModal1} className="mr-3" style={{width: '30px', height: '30px'}}/>
                    </div>
                </Navbar>
            </div>

            <div style={{
                backgroundColor: 'white',
                width: '40%',
                margin: 'auto',
                marginTop: '3%',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px'
            }}>
                <Tabs variant='enclosed'>
                    <TabList>
                        <Tab
                            style={{fontWeight: 'bold', color: '#32CD32'}}
                            onClick={() => setSelectedType('All')}
                            isSelected={'All' === selectedType}
                        >
                            All
                        </Tab>
                        {uniqueTypes.map((type, index) => (
                            <Tab
                                key={index}
                                style={{fontWeight: 'bold', color: '#32CD32'}}
                                onClick={() => setSelectedType(type)}
                                isSelected={type === selectedType}
                            >
                                {type}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div style={{overflowY: 'auto', maxHeight: '600px'}}>
                                <Table>
                                    <Tbody>

                                        {categories.map((category, index) => (
                                            <Tr key={index}>
                                                <td onClick={() => {
                                                    onOpenModal2();
                                                    setEditCate(category);
                                                }}>
                                                    <div style={{display: 'flex', alignItems: 'center',}}>
                                                        <Image
                                                            borderRadius='full'
                                                            boxSize='50px'
                                                            src={category.image}
                                                            alt='Category Image'
                                                        />
                                                        <span style={{marginLeft: '10px'}}>{category.name}</span>
                                                    </div>
                                                </td>
                                            </Tr>
                                        ))}


                                    </Tbody>
                                </Table>
                            </div>
                        </TabPanel>
                        {uniqueTypes.map((type, index) => (
                            <TabPanel key={index}>
                                <div style={{overflowY: 'auto', maxHeight: '600px'}}>
                                    <Table>
                                        <Tbody>
                                            {categories
                                                .filter(category => category.type === type)
                                                .map((category, index) => (
                                                    <Tr key={index}>
                                                        <td onClick={() => {
                                                            onOpenModal2();
                                                            setEditCate(category);
                                                        }}>
                                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                                <Image
                                                                    borderRadius='full'
                                                                    boxSize='50px'
                                                                    src={category.image}
                                                                    alt='Category Image'
                                                                />
                                                                <span
                                                                    style={{marginLeft: '10px'}}>{category.name}</span>
                                                            </div>
                                                        </td>
                                                    </Tr>
                                                ))}
                                        </Tbody>
                                    </Table>
                                </div>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </div>

            <Modal isOpen={isOpenModal1} onClose={onCloseModal1}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create Category New</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Category name</FormLabel>
                            <Input
                                placeholder='Enter name'
                                name='name'
                                onChange={(event) =>
                                    setCategory({...category, [event.target.name]: event.target.value})
                                }
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Select Type</FormLabel>
                            <Select
                                placeholder="Select a type"
                                value={categoryType}
                                onChange={(event) => setCategoryType(event.target.value)}
                            >
                                {uniqueTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={createCategory}>
                            Create
                        </Button>
                        <Button onClick={onCloseModal1}>Cancel</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenModal2} onClose={onCloseModal2}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Edit Category</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Category name</FormLabel>
                            <Input
                                placeholder='Enter name'
                                name="name"
                                value={editCate.name}
                                onChange={(e) => setEditCate({
                                    ...editCate,
                                    name: e.target.value
                                })}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Type</FormLabel>
                            <Select
                                placeholder="Select a type"
                                value={editCate.type}
                                onChange={(event) => setEditCate({...editCate, type: event.target.value})}
                            >
                                {uniqueTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleUpdate}>
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