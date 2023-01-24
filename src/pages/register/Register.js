import 'bootstrap/dist/css/bootstrap.min.css';
import {toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios'
function Register() {
    const formData = useRef();
    const navigate = useNavigate();
    const registerHandler= async(e)=>{
        e.preventDefault();
        if(formData.current.password.value===formData.current.confirmPassword.value){
            const data={
                userName:formData.current.username.value,
                email:formData.current.email.value,
                password:formData.current.password.value
            }
            const res = await axios.post(process.env.REACT_APP_BASE_URL+"/auth/register",data);
            if(!res.data.status){
                toast.error(res.data.message);
            }else{
                const data = [res.data.user.email,res.data.token ]
                localStorage.setItem("addoc",JSON.stringify(data))
                navigate("/");
            }
        }else{
            toast.error("passwords do not match !")
        }
    }
    return (
        <div className="loginContainer">
            <Header companyName="ADDOC" state="Login" />
            <div className="loginWrapper">
                <Form className='loginForm' ref={formData} onSubmit={registerHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" name="username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="confirmPassword" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Register;