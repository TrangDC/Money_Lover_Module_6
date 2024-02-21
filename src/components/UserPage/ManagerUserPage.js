import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                />
                <Button
                    variant="outline-secondary"
                    onClick={toggleShowPassword}
                    className="input-group-append"
                >
                    {showPassword ? 'Hide' : 'Show'}
                </Button>
            </div>
        </Form.Group>
    );
};

const ManagerUserPage = () => {
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <PasswordInput />
            </Form>
        </>
    );
};

export default ManagerUserPage;