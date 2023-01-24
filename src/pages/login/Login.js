import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../../components/header/Header';
import { useRef } from 'react';
import axios from "axios";
import "./login.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useSelector} from "react-redux"
function Login() {
    const formData = useRef();
    const navigate = useNavigate();
    const user= useSelector(state=>state.user)

    const loginHandler= async(e)=>{
        e.preventDefault();
        const data={
            email:formData.current.email.value,
            password:formData.current.password.value
        }   
        const res = await axios.post(process.env.REACT_APP_BASE_URL+"/auth/login",data);
        console.log(res)
        if(!res.data.status){
            toast.error(res.data.message);
        }else{
            const data = [res.data.user.email,res.data.token ]
            localStorage.setItem("addoc",JSON.stringify(data))
            navigate("/");
        }
    }
    
    return (
        <div className="loginContainer">
            <Header companyName="ADDOC" state="Register" />
            <div className="loginWrapper">
                <Form className='loginForm' ref={formData} onSubmit={loginHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <div>Forget Password?</div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;