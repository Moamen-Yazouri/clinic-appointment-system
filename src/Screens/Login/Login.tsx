import './Login.css'
import { useContext } from 'react';
import { Button, Form, Input, message } from 'antd';
import { AuthContext } from '../../Providers/AuthContext';
import { ILoginData } from '../../types/types';
import Logged from '../../components/Logged/Logged';
import { useNavigate } from 'react-router-dom';
interface FieldType {
  username?: string;
  password?: string;
  remember?: boolean;
}
const Login = () => {
  const users: ILoginData[] = JSON.parse(localStorage.getItem("login-data") || "[]");
  const { login, user, isNaved, setIsNaved} = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = (values: FieldType) => {
    const userName = values.username!;
    const password = values.password!;
    const user = users.find((user) =>
            user.userName === userName ? user.password === password : null
          );
          if(user) {
            const role = user.role.toString().toLowerCase();
            login(user);
            navigate(role === "doctor" ? "/manage" : "/create");
            setTimeout(() => {
              setIsNaved(true);
            }, 1000)
          }
          else {
            message.destroy();
            message.error('Invalid username or password');
          }
  };
    if(!user || !isNaved) {
      return (
        <div className='login-wrapper'>
        <Form
          className='login-form'
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 500, padding: 24, borderRadius: 8, backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <h2 style={{ textAlign: 'center', color: '#646cff', marginBottom: 35 }}>Clinic Appointment Login</h2>
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please enter your username!' },
              { min: 3, message: 'Username must be longer than 3 characters' },
            ]}
          >
            <Input style={{ borderColor: '#646cff' }} />
          </Form.Item>
    
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password style={{ borderColor: '#646cff' }} />
          </Form.Item>
    
          <Form.Item style={{display: "flex",justifyContent: "center", width: '100%'}}>
            <Button
            className='login'
            type="primary" 
            htmlType="submit" 
            style={{ width: '80px', backgroundColor: '#646cff', borderColor: '#646cff'}}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
      );
    }
    else {
      if(isNaved) {
          return(
            <Logged />
          )
      }
  }
}
export default Login;
