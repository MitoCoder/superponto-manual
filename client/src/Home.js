import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  List,
  message,
  Popconfirm,
} from 'antd';
import {DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;

const Home = () => {
  const [empresaList, setEmpresaList] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [form] = Form.useForm();

  // Função para buscar empresas cadastradas
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/empresas');
        setEmpresaList(response.data.map((item) => ({ ...item, key: item._id })));
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    fetchEmpresas();
  }, []);

  // Função para preencher o formulário ao editar
  useEffect(() => {
    if (editingKey) {
      const empresaEdit = empresaList.find((e) => e.key === editingKey);
      if (empresaEdit) {
        form.setFieldsValue({
          nome: empresaEdit.nome,
          cnpj: empresaEdit.cnpj,
          razaoSocial: empresaEdit.razaoSocial,
          inscricaoEstadual: empresaEdit.inscricaoEstadual,
          inscricaoMunicipal: empresaEdit.inscricaoMunicipal,
        });
      }
    } else {
      form.resetFields();
    }
  }, [editingKey, empresaList, form]);

  const onFinish = async (values) => {
    try {
      if (editingKey) {
        // Atualizar empresa existente
        const response = await axios.put(`http://localhost:5000/api/empresas/${editingKey}`, values);
        setEmpresaList((prevList) =>
          prevList.map((empresa) => (empresa.key === editingKey ? { ...empresa, ...response.data } : empresa))
        );
        message.success('Empresa atualizada com sucesso!'); // Mensagem de sucesso
        setEditingKey(null); // Limpa a chave de edição
      } else {
        // Adicionar nova empresa
        const response = await axios.post('http://localhost:5000/api/empresas/add', values);
        setEmpresaList((prevList) => [
          ...prevList,
          { ...response.data, key: response.data._id },
        ]);
        message.success('Empresa cadastrada com sucesso!'); // Mensagem de sucesso
      }
      form.resetFields(); // Limpar o formulário após a ação
    } catch (error) {
      console.error('Erro ao cadastrar ou atualizar empresa:', error);
      message.error('Erro ao cadastrar ou atualizar a empresa!'); // Mensagem de erro
    }
  };

  const handleEdit = (empresa) => {
    setEditingKey(empresa.key); // Captura o ID correto da empresa
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://localhost:5000/api/empresas/${key}`);
      setEmpresaList((prevList) => prevList.filter((empresa) => empresa.key !== key));
      message.success('Empresa deletada com sucesso!'); // Mensagem de sucesso
      form.resetFields(); // Limpa o formulário após a exclusão
      setEditingKey(null); // Limpa a chave de edição
    } catch (error) {
      console.error('Erro ao deletar empresa:', error); // Log do erro detalhado
      message.error('Erro ao deletar a empresa!'); // Mensagem de erro
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center' }}>Cadastro de Empresas</Title>
      <Divider />

      <Row gutter={16}>
        {/* Coluna para o Formulário */}
        <Col span={10}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: '100%', margin: '0 auto' }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="nome"
                  rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                >
                  <Input placeholder="Nome da Empresa" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="cnpj"
                  rules={[{ required: true, message: 'Por favor, insira o CNPJ!' }]}
                >
                  <Input placeholder="CNPJ" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="razaoSocial"
                  rules={[{ required: true, message: 'Por favor, insira a razão social!' }]}
                >
                  <Input placeholder="Razão Social" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="inscricaoEstadual"
                  rules={[{ required: true, message: 'Por favor, insira a inscrição estadual!' }]}
                >
                  <Input placeholder="Inscrição Estadual" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="inscricaoMunicipal"
                  rules={[{ required: true, message: 'Por favor, insira a inscrição municipal!' }]}
                >
                  <Input placeholder="Inscrição Municipal" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center" style={{ marginTop: '20px' }}>
              <Col span={24}>
                <Button type="primary" htmlType="submit" size="large" style={{ width: '100%', height: '40px' }}>
                  {editingKey ? 'Atualizar' : 'Cadastrar'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

        {/* Coluna para a Lista de Empresas */}
        <Col span={14}>
          <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Empresas</Title>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={empresaList}
            style={{ textAlign: 'center' }} // Alinha o conteúdo à direita
            renderItem={(item) => (
              <List.Item
                key={item.key}
                style={{ border: '1px solid #f0f0f0', borderRadius: '8px', marginBottom: '16px', padding: '16px' }} // Estilo aprimorado
              >
                <List.Item.Meta
                  title={item.nome}
                  description={
                    <>
                      <div>CNPJ: {item.cnpj}</div>
                      <div>Razão Social: {item.razaoSocial}</div>
                    </>
                  }
                />
                <div>
  <Button onClick={() => handleEdit(item)} type="default" style={{ width: '100px', marginRight: '8px' }}>Editar</Button>
  <Popconfirm
    title="Tem certeza que deseja deletar esta empresa?"
    onConfirm={() => handleDelete(item.key)}
    okText="Sim"
    cancelText="Não"
  >
    <Button type="primary" danger icon={<DeleteOutlined />} style={{ width: '100px' }}>
      Deletar
    </Button>
  </Popconfirm>
</div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
