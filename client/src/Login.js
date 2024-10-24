// src/Login.js

import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, message, Tabs, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TabPane } = Tabs;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('login');
  const [rememberMe, setRememberMe] = useState(false); // Estado para o checkbox
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Verifica se há credenciais salvas no localStorage ao montar o componente
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true); // Marca o checkbox como verdadeiro
    }

    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        message.success(data.message);
        
        // Se o usuário marcar o checkbox, armazena as credenciais no localStorage
        if (rememberMe) {
          localStorage.setItem('username', values.username);
          localStorage.setItem('password', values.password); // Não é recomendado para senhas, mas é um exemplo
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }

        navigate('/app'); // Redireciona para a página App
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        message.success(data.message);
        setActiveKey('login'); // Muda para a aba de login
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error('Erro ao registrar usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: 400, borderRadius: 10 }} bordered={false}>
        <Title level={3} style={{ textAlign: 'center' }}>Login / Registro</Title>
        <Tabs activeKey={activeKey} onChange={setActiveKey}>
          <TabPane tab="Login" key="login">
            <Form
              name="login"
              onFinish={handleLogin}
              layout="vertical"
              initialValues={{ username, password }} // Preenche os campos com os valores salvos
            >
              <Form.Item
                name="username"
                label="Nome de Usuário"
                rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
              >
                <Input placeholder="Digite seu nome de usuário" onChange={(e) => setUsername(e.target.value)} />
              </Form.Item>

              <Form.Item
                name="password"
                label="Senha"
                rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
              >
                <Input.Password placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>

              <Form.Item>
                <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}> Lembrar senha </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                  Entrar
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Registrar" key="register">
            <Form
              name="register"
              onFinish={handleRegister}
              layout="vertical"
            >
              <Form.Item
                name="username"
                label="Nome de Usuário"
                rules={[{ required: true, message: 'Por favor, insira um nome de usuário!' }]}
              >
                <Input placeholder="Escolha um nome de usuário" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Por favor, insira seu email!' }, { type: 'email', message: 'Email inválido!' }]}
              >
                <Input placeholder="Digite seu email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Senha"
                rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
              >
                <Input.Password placeholder="Escolha uma senha" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                  Registrar
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
