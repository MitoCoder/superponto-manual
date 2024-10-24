import React from 'react';
import { Button, Divider, Typography, Row, Col, Space } from 'antd';
import { QRCodeSVG } from 'qrcode.react';
import { InstagramOutlined, LinkedinOutlined, WhatsAppOutlined, FacebookOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Sobre = () => {
  const pix = '51410003892';
  const email = 'edvamsantos444@gmail.com';
  const portfolioLink = 'https://portfolio-edvam-santos.vercel.app/';

  return (
    <div style={{ padding: '10px' }}>
      <Title level={4} style={{ textAlign: 'center', marginBottom: '5px' }}>
        SUPER PONTO MANUAL: SOBRE O DESENVOLVEDOR
      </Title>
      <Divider style={{ margin: '13px 0' }} />
      <Row gutter={16} style={{ textAlign: 'center' }}>
        <Col span={12}>
          <Title level={5}>DOE QUALQUER VALOR</Title>
          <QRCodeSVG value={pix} size={128} />
          <Text style={{ display: 'block', marginTop: '10px' }}>Chave PIX: {pix}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>APOIE O DESENVOLVEDOR</Title>
          <Text style={{ display: 'block', marginTop: '10px' }}>Entre em contato:</Text>
          <Space size="middle" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              type="link" 
              icon={<WhatsAppOutlined />} 
              href="https://wa.me/5511957207168" 
              target="_blank"
            >
              WhatsApp
            </Button>
            <Button 
              type="link" 
              icon={<WhatsAppOutlined />} 
              href="https://chat.whatsapp.com/KVIM2D4hYpSA0erTDGLzv1" 
              target="_blank"
            >
              Grupo WhatsApp
            </Button>
            <Button 
              type="link" 
              icon={<InstagramOutlined />} 
              href="https://www.instagram.com/mycosmus/" 
              target="_blank"
            >
              Instagram
            </Button>
            <Button 
              type="link" 
              icon={<LinkedinOutlined />} 
              href="https://www.linkedin.com/in/mycosmus/" 
              target="_blank"
            >
              LinkedIn
            </Button>
            <Button 
              type="link" 
              icon={<FacebookOutlined />} 
              href="https://www.facebook.com/mycosmus" 
              target="_blank"
            >
              Facebook
            </Button>
            <Button 
              type="link" 
              icon={<GithubOutlined />} 
              href="https://github.com/mycosmus" 
              target="_blank"
            >
              GitHub
            </Button>
          </Space>

          {/* Adicionando E-mail e Portfólio */}
          <Divider style={{ margin: '10px 0' }} />
          <Text style={{ display: 'block', marginTop: '10px' }}>Entre em contato por e-mail:</Text>
          <Button 
            type="link" 
            icon={<MailOutlined />} 
            href={`mailto:${email}`} 
            target="_blank"
          >
            {email}
          </Button>
          <Text style={{ display: 'block', marginTop: '1px' }}>Veja meu portfólio:</Text>
          <Button  style={{ marginTop: '3px' }}
            type="primary" 
            href={portfolioLink} 
            target="_blank"
          >
            Meu Portfólio
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Sobre;
