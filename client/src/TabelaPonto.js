import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Select, Button, TimePicker, Tag, Space, message } from 'antd';
import moment from 'moment';

const { Option } = Select;

const TabelaPonto = () => {
    const [colaboradores, setColaboradores] = useState([]);
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [dataRegistros, setDataRegistros] = useState([]);
    const [colaboradorId, setColaboradorId] = useState('');

    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const tags = [
        { value: 'NORMAL', color: 'green' },
        { value: 'FALTA', color: 'volcano' },
        { value: 'FERIAS', color: 'gold' },
        { value: 'ATRASO', color: 'red' }
    ];

    useEffect(() => {
        carregarColaboradores();
    }, []);

    const carregarColaboradores = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cadastro'); // Endpoint de colaboradores
            setColaboradores(response.data); // Supondo que a resposta contém os colaboradores
        } catch (error) {
            console.error('Erro ao carregar colaboradores:', error);
        }
    };

    const filtrarDias = async () => {
        try {
            // Limpar dados anteriores antes de aplicar o filtro
            setDataRegistros([]);

            const response = await axios.get(`http://localhost:5000/api/tabelaPonto/${colaboradorId}/${meses.indexOf(mes) + 1}/${ano}`);
            if (response.data.length > 0) {
                setDataRegistros(response.data);
                message.success('Dados filtrados com sucesso!');
            } else {
                const novoRegistroResponse = await axios.post('http://localhost:5000/api/tabelaPonto/generate', {
                    colaboradorId,
                    mes: meses.indexOf(mes) + 1,
                    ano,
                });
                setDataRegistros(novoRegistroResponse.data);
                message.success('Pontos gerados com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao filtrar ou gerar pontos:', error);
            message.error('Erro ao filtrar ou gerar pontos.');
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:5000/api/tabelaPonto/update/${id}`, updatedData);
            const updatedRegistros = dataRegistros.map((registro) => 
                registro._id === id ? { ...registro, ...updatedData } : registro
            );
            setDataRegistros(updatedRegistros);
            message.success('Registro atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o registro:', error);
            message.error('Erro ao atualizar o registro.');
        }
    };

    const columns = [
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Horário de Entrada',
            dataIndex: 'horarioEntrada',
            key: 'horarioEntrada',
            render: (_, record) => (
                <TimePicker
                    defaultValue={record.horarioEntrada ? moment(record.horarioEntrada, 'HH:mm') : null}
                    onOk={(time) => handleUpdate(record._id, { horarioEntrada: time ? time.format('HH:mm') : '' })}
                />
            ),
        },
        {
            title: 'Horário de Almoço',
            dataIndex: 'horarioAlmoco',
            key: 'horarioAlmoco',
            render: (_, record) => (
                <TimePicker
                    defaultValue={record.horarioAlmoco ? moment(record.horarioAlmoco, 'HH:mm') : null}
                    onOk={(time) => handleUpdate(record._id, { horarioAlmoco: time ? time.format('HH:mm') : '' })}
                />
            ),
        },
        {
            title: 'Retorno do Almoço',
            dataIndex: 'retornoAlmoco',
            key: 'retornoAlmoco',
            render: (_, record) => (
                <TimePicker
                    defaultValue={record.retornoAlmoco ? moment(record.retornoAlmoco, 'HH:mm') : null}
                    onOk={(time) => handleUpdate(record._id, { retornoAlmoco: time ? time.format('HH:mm') : '' })}
                />
            ),
        },
        {
            title: 'Horário de Saída',
            dataIndex: 'horarioSaida',
            key: 'horarioSaida',
            render: (_, record) => (
                <TimePicker
                    defaultValue={record.horarioSaida ? moment(record.horarioSaida, 'HH:mm') : null}
                    onOk={(time) => handleUpdate(record._id, { horarioSaida: time ? time.format('HH:mm') : '' })}
                />
            ),
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            render: (tag, record) => (
                <Select
                    defaultValue={tag}
                    onChange={(value) => handleUpdate(record._id, { tag: value })}
                >
                    {tags.map((tag) => (
                        <Option key={tag.value} value={tag.value}>
                            <Tag color={tag.color}>{tag.value}</Tag>
                        </Option>
                    ))}
                </Select>
            ),
        },
    ];

    return (
        <div>
            <h1>Tabela de Ponto</h1>
            <Space style={{ marginBottom: 16 }}>
                <Select placeholder="Mês" onChange={setMes} style={{ width: 120 }}>
                    {meses.map((mesNome) => (
                        <Option key={mesNome} value={mesNome}>{mesNome}</Option>
                    ))}
                </Select>
                <Select placeholder="Ano" onChange={setAno} style={{ width: 120 }}>
                    {Array.from({ length: 10 }, (_, index) => 2023 + index).map((year) => (
                        <Option key={year} value={year}>{year}</Option>
                    ))}
                </Select>
                <Select 
                    placeholder="Colaborador" 
                    onChange={(value) => {
                        setColaboradorId(value);
                        setDataRegistros([]); // Limpar registros ao mudar o colaborador
                    }} 
                    style={{ width: 200 }}
                >
                    {colaboradores.map((colaborador) => (
                        <Option key={colaborador._id} value={colaborador._id}>{colaborador.nomeCompleto}</Option>
                    ))}
                </Select>
                <Button onClick={filtrarDias}>Filtrar</Button>
            </Space>
            <Table columns={columns} dataSource={dataRegistros} rowKey="_id" />
        </div>
    );
};

export default TabelaPonto;
