import { Form, Layout, Typography } from 'antd';
import { DefaultForm } from '../components/form/form';
import { FormInputPassword, FormInput } from '../components/input/inputs';
import { PrimaryButton } from '../components/button/buttons';
import Logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const { state, handleLogin } = useAuth();

  const initialValue: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    handleLogin(values, navigate);
    console.log("Login: ", values);
  };

  return (
    <Layout className='bg-[#438ED2] h-screen'>
      <div className='flex'>
        <div className='w-[30%] bg-white h-screen py-[5%] px-[2%]'>
          <Title style={{ fontWeight: "bold", textAlign: "center" }}>Login</Title>
          <DefaultForm
            name="LoginForm"
            initialValues={initialValue}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <FormInputPassword />
            </Form.Item>
            <PrimaryButton
              style={{ width: "100%" }}
              htmlType="submit"
              loading={state.isFetching}
            >
              Login
            </PrimaryButton>
          </DefaultForm>
        </div>
        <div className='w-[70%] flex justify-center items-center'>
          <img src={Logo} className='w-[50%]' alt="Logo" />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;