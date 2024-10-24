// App.js

import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Dropdown, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Sobre from './Sobre';       // Importando o arquivo Sobre.js
import Home from './Home';         // Importando o arquivo Home.js (Minha Empresa)
import Cadastro from './Cadastro'; // Importando o arquivo Cadastro.js (Colaboradores)
import TabelaPonto from './TabelaPonto'; // Importando o novo arquivo TabelaPonto.js
import 'antd'; // Importando os estilos do Ant Design

const { Header, Content, Footer } = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState('/minha-empresa'); // Define a chave padrão do menu
  const [currentPage, setCurrentPage] = useState(<Home />); // Inicializa a página atual com Home
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Função para lidar com a mudança de seleção do menu
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);

    // Renderiza as páginas de acordo com a chave selecionada
    if (e.key === '/sobre') {
      setCurrentPage(<Sobre />); // Renderiza o componente Sobre
    } else if (e.key === '/minha-empresa') {
      setCurrentPage(<Home />); // Renderiza o componente Home (Minha Empresa)
    } else if (e.key === '/colaboradores') {
      setCurrentPage(<Cadastro />); // Renderiza o componente Cadastro (Colaboradores)
    } else if (e.key === '/registro-ponto') {
      setCurrentPage(<TabelaPonto />); // Renderiza o componente TabelaPonto (Registro de Ponto)
    }
  };

  const handleLogout = () => {
    // Limpa o localStorage e exibe mensagem de logout
    localStorage.clear();
    message.success('Usuário deslogado com sucesso!');
    window.location.href = '/'; // Redireciona para a página de login
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Menu.Item key="/minha-empresa">Minha Empresa</Menu.Item>
          <Menu.Item key="/colaboradores">Colaboradores</Menu.Item>
          <Menu.Item key="/registro-ponto">Registro de Ponto</Menu.Item>
          <Menu.Item key="/sobre">Sobre o Desenvolvedor</Menu.Item>
        </Menu>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <UserOutlined style={{ fontSize: '24px', color: '#fff', cursor: 'pointer', marginLeft: '16px' }} />
        </Dropdown>
      </Header>

      <Content
        style={{
          padding: '0 48px',
          flex: '1',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>
            Seleção: <strong>
              {selectedKey === '/minha-empresa'
                ? 'Minha Empresa'
                : selectedKey === '/colaboradores'
                ? 'Colaboradores'
                : selectedKey === '/registro-ponto'
                ? 'Registro de Ponto'
                : 'Sobre o Desenvolvedor'}
            </strong>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 10,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {currentPage}
        </div>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          position: 'relative',
          width: '100%',
          bottom: 0,
        }}
      >
        Super Ponto - Manual ©{new Date().getFullYear()} Ed's Sistemas
      </Footer>
    </Layout>
  );
};

export default App;
