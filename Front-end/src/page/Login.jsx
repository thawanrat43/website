import React, { useContext } from 'react'
import Bar from '../compament/Bar'
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import TextField from '@mui/material/TextField';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Navigate, useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import sessionstorage from 'sessionstorage';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
const Login = () => {
    const [user,setUser] =useState({})
    const [inputs,setInputs] = useState({
        email: "",
        password: ""
    })
    const popuperror = async ()=>{
        Swal.fire({
            icon: 'error',
            title: 'ไม่สำเร็จ',
            text: 'ล็อกอินไม่สำเสร็จE-mail หรือ รหัสผ่านของคุณไม่ถูกต้อง'
            
            
        }).then((result) => {
            if (result.value) {
                window.location.href = `/login`
            }
        });
          
    }
    const [err, setErr] = useState(null);
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    // const { login } = useContext(AuthContext);
    axios.defaults.withCredentials = true;
    
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://back-end-nr6u.onrender.com/login`, inputs)
            .then(function (response) {
                if(err){
                    popuperror();
                    
                }
                else{
                    localStorage.setItem('token',response.data.token)
                    //navigate("/otp");
                    if(response.data.status=='1')
                    {
                        navigate("/home");

                    }
                    else{
                        navigate("/adminuser");
                    }
                }  
            })
              
        } catch (err) {
          setErr(err.response.data);
          popuperror();
          
        }
        
    };
    const style = {
        fontFamily:"Athiti",
        border: "none",
        color: "wh",
        width:"15rem"
       
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-wh">
                    <Container>

                        <Navbar.Brand href='/'style={{fontFamily:"Athiti"}} className='fs-1' >CHECK</Navbar.Brand>

                            
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="4" >
                        
                        <Nav.Link href='/' style={{fontFamily:"Athiti"}} className='fs-5' eventKey="2">ตรวจประวัติ</Nav.Link>
                        
                        <Nav.Link href="/login" style={{fontFamily:"Athiti"}} className='fs-5' eventKey="4">Login</Nav.Link>
                        <Nav.Link href="/register" style={{fontFamily:"Athiti"}} className='fs-5' eventKey="3">Register</Nav.Link>
                        
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
            </Navbar>
            <div className='m-5 d-flex justify-content-center'>
                <Card fluid className='m-5 ' style={{width:'45%'}} >
                    <Card.Body >
                        <div className='d-flex justify-content-end'>
                            <Link to={`/register`}  sx={{ mt: 3}} style={style}  >
                                    <p className='fs-6' >Don't have an account?</p>
                            </Link>
                        </div>
                        <div className='d-flex justify-content-center mt-5'>
                            <p style={{fontFamily:"Athiti"}} className='fs-1 mb-5'>Login</p>
                        </div>
                        <div className='pl-5 pr-5'>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                style={{fontFamily:"Athiti"}} 
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                style={{fontFamily:"Athiti"}} 
                            />
                        </div>
                            
                        <div className='d-flex justify-content-center' style={{fontFamily:"Athiti"}} >
                            {err && err}
                        </div>
                            
                        <Row className="mt-5 mb-5 d-flex justify-content-center">
                            <Col  className='d-flex justify-content-center ' >
                                <Button   type="submit" fullWidth variant="contained"  sx={{ mt: 3}} onClick={handleLogin} style={{ textDecoration: 'none' ,color:"white" ,fontFamily:"Athiti" ,width:"15rem"}} className='bg-secondary' >
                                    <p className='fs-5'>Login</p>
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                    
                    
                </Card>
            </div>
            
            
            
        </div>
    )
}
  


export default Login