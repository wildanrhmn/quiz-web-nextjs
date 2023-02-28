import { useState } from 'react';
import axios from 'axios';
import Styles from '../styles/Login.module.css'
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie'
import { Form, FloatingLabel, Button } from 'react-bootstrap';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post('/api/auth', { email, password });
        setCookie('user', {
          email: email,
        })
        router.push('/')
    
      } catch (error) {
        console.error(error);
        return false;
      }
    };
     
  return(
    <div className={Styles.LoginContainer}>
        <h1 className='text-center pb-5'>Login</h1>

        <Form onSubmit={handleSubmit}>

          <Form.Group className='mb-3'>
            <FloatingLabel label="email address" className={Styles.formLabel}>
                <Form.Control className={Styles.FormControl} value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='mb-5'>
            <FloatingLabel label="password" className={Styles.formLabel}>
                <Form.Control className={Styles.FormControl} value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            </FloatingLabel>
          </Form.Group>

          <Button type='submit' className={Styles.ButtonLogin}>Login</Button>
        </Form>
              
    </div>
  )
  }
