import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  DatePicker,
  Upload,
  Avatar,
  Tooltip,
  Typography,
  Divider,
  List,
  ConfigProvider,
  Popconfirm,
} from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/pt-br';
import { message } from 'antd';
import locale from 'antd/es/locale/pt_BR';

const { Option } = Select;
const { Title } = Typography;

moment.locale('pt-br');

const Cadastro = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [cadastroList, setCadastroList] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [form] = Form.useForm();

  // Carregar lista de colaboradores
  useEffect(() => {
    const fetchCadastros = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cadastro');
        setCadastroList(response.data.map((item) => ({ ...item, key: item._id }))); // Define a chave corretamente
      } catch (error) {
        console.error('Erro ao buscar cadastros:', error);
      }
    };
    fetchCadastros();
  }, []);

  useEffect(() => {
    if (editingKey !== null) {
      const cadastroEdit = cadastroList.find((c) => c.key === editingKey);
      if (cadastroEdit) {
        form.setFieldsValue({
          nomeCompleto: cadastroEdit.nomeCompleto,
          rg: cadastroEdit.rg,
          cpf: cadastroEdit.cpf,
          pis: cadastroEdit.pis,
          ctps: cadastroEdit.ctps,
          escala: cadastroEdit.escala,
          salario: cadastroEdit.salario,
          funcao: cadastroEdit.funcao,
          nomePai: cadastroEdit.nomePai,
          nomeMae: cadastroEdit.nomeMae,
          dataAdmissao: moment(cadastroEdit.dataAdmissao),
        });
        setImageUrl(cadastroEdit.foto || null);
      }
    } else {
      form.resetFields();
    }
  }, [editingKey, cadastroList, form]);

  // Salvar cadastro
  const onFinish = async (values) => {
    const { dataAdmissao } = values;
    try {
      if (editingKey !== null) {
        // Atualizar cadastro existente
        const response = await axios.put(`http://localhost:5000/api/cadastro/${editingKey}`, {
          ...values,
          dataAdmissao: moment(dataAdmissao).format('YYYY-MM-DD'),
        });

        message.success('Atualização realizada com sucesso!');
        setCadastroList((prevList) =>
          prevList.map((cadastro) => (cadastro.key === editingKey ? { ...cadastro, ...response.data } : cadastro))
        );
        setEditingKey(null);
        form.resetFields();
      } else {
        // Adicionar novo cadastro
        const response = await axios.post('http://localhost:5000/api/cadastro', {
          ...values,
          dataAdmissao: moment(dataAdmissao).format('YYYY-MM-DD'),
        });

        setCadastroList((prevList) => [
          ...prevList,
          { ...response.data, key: response.data._id },
        ]);
        message.success('Cadastro realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar cadastro:', error);
      message.error('Erro ao realizar a operação!');
    }
  };

  const handleUploadChange = (info) => {
    if (info.file && info.file.originFileObj) {
      const fileSize = info.file.originFileObj.size / 1024 / 1024;
      if (fileSize <= 2) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageUrl(e.target.result);
        };
        reader.readAsDataURL(info.file.originFileObj);
      } else {
        alert('O tamanho da imagem deve ser inferior a 2MB!');
      }
    }
  };

  const handleEdit = (cadastro) => {
    setEditingKey(cadastro.key); // Captura o ObjectId correto para edição
  };

  const handleDelete = async (cadastroId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cadastro/${cadastroId}`);
      setCadastroList((prevList) => prevList.filter((cadastro) => cadastro.key !== cadastroId)); // Remove da lista
      message.success('Cadastro deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar cadastro:', error);
      message.error('Erro ao deletar o cadastro!');
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <div style={{ padding: '20px' }}>
        <Title level={3} style={{ textAlign: 'center' }}>Cadastro de Funcionários</Title>
        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ margin: '0' }}
        >
          <Row gutter={16}>
            {/* Manter todos os campos originais como no seu formulário */}
            <Col span={18}>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="nomeCompleto"
                    rules={[{ required: true, message: 'Por favor, insira seu nome completo!' }]}
                  >
                    <Input placeholder="Nome Completo" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="rg"
                    rules={[{ required: true, message: 'Por favor, insira seu RG!' }]}
                  >
                    <Input placeholder="RG" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="cpf"
                    rules={[{ required: true, message: 'Por favor, insira seu CPF!' }]}
                  >
                    <Input placeholder="CPF" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="pis"
                    rules={[{ required: true, message: 'Por favor, insira seu PIS!' }]}
                  >
                    <Input placeholder="PIS" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="ctps"
                    rules={[{ required: true, message: 'Por favor, insira o número da CTPS!' }]}
                  >
                    <Input placeholder="Nº da CTPS" style={{ width: '100%', height: '40px', fontSize: '16px' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="escala"
                    rules={[{ required: true, message: 'Por favor, selecione a escala de trabalho!' }]}
                  >
                    <Select
                      placeholder="Escala de Trabalho"
                      style={{ width: '100%', height: '40px', fontSize: '16px' }}
                    >
                      <Option value="4x2">4x2</Option>
                      <Option value="4x3">4x3</Option>
                      <Option value="5x1">5x1</Option>
                      <Option value="5x2">5x2</Option>
                      <Option value="6x2">6x2</Option>
                      <Option value="12x24">12x24</Option>
                      <Option value="18x36">18x36</Option>
                      <Option value="24x48">24x48</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="salario"
                    rules={[{ required: true, message: 'Por favor, insira o salário!' }]}
                  >
                    <Input placeholder="Salário" style={{ width: '100%', height: '40px', fontSize: '16px' }} type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="funcao"
                    rules={[{ required: true, message: 'Por favor, insira a função!' }]}
                  >
                    <Input
                      placeholder="Função"
                      style={{ width: '100%', height: '40px', fontSize: '16px' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="nomePai"
                    rules={[{ required: true, message: 'Por favor, insira o nome do pai!' }]}
                  >
                    <Input
                      placeholder="Nome do Pai"
                      style={{ width: '100%', height: '40px', fontSize: '16px' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="nomeMae"
                    rules={[{ required: true, message: 'Por favor, insira o nome da mãe!' }]}
                  >
                    <Input
                      placeholder="Nome da Mãe"
                      style={{ width: '100%', height: '40px', fontSize: '16px' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="dataAdmissao"
                    rules={[{ required: true, message: 'Por favor, insira a data de admissão!' }]}
                  >
                    <DatePicker
                      placeholder="Data de Admissão"
                      style={{ width: '100%', height: '40px', fontSize: '16px' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={5} style={{ textAlign: 'center' }}>
              <div>
                <Avatar
                  size={160}
                  icon={<UserOutlined />}
                  src={imageUrl}
                  style={{ marginBottom: '10px' }}
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <Tooltip title="Foto">
                  <Upload
                    showUploadList={false}
                    onChange={handleUploadChange}
                  >
                    <Button icon={<EditOutlined />} style={{ width: '100%' }}>
                      Alterar Foto
                    </Button>
                  </Upload>
                </Tooltip>
              </div>
            </Col>
          </Row>

          <Row justify="center" style={{ marginTop: '20px', width: '100%' }}>
            <Col>
              <Button type="primary" htmlType="submit" size="large" style={{ width: '170px' }}>
                {editingKey !== null ? 'Salvar Alterações' : 'Cadastrar'}
              </Button>
            </Col>
          </Row>
        </Form>

        <Divider />

        <Title level={4} style={{ textAlign: 'center' }}>Lista de Cadastros</Title>
        <List
          itemLayout="horizontal"
          dataSource={cadastroList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button onClick={() => handleEdit(item)}>Editar</Button>,
                <Popconfirm
                  title="Tem certeza que deseja deletar?"
                  onConfirm={() => handleDelete(item.key)}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button type="primary" danger icon={<DeleteOutlined />}>
                    Deletar
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={item.nomeCompleto}
                description={`CPF: ${item.cpf}, Função: ${item.funcao}`}
              />
            </List.Item>
          )}
        />
      </div>
    </ConfigProvider>
  );
};

export default Cadastro;
