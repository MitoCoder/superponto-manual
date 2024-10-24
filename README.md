# Ponto Supremo

## 📊 Descrição

**Ponto Supremo** é um sistema de gerenciamento de ponto manual desenvolvido com React para o frontend e Node.js com MongoDB para o backend. Este projeto tem como objetivo facilitar o registro e controle das horas trabalhadas, proporcionando uma interface intuitiva e fácil de usar.

---

## 🚀 Funcionalidades

- **Cadastro de Usuários**: Permite o registro completo de todos os dados dos colaboradores.
- **Gerenciamento de Empresas**: Cadastre e gerencie todos os dados das empresas no sistema.
- **Registro de Ponto**: Registre pontos ao selecionar o colaborador específico.
- **Edição de Pontos e Tags**: Edite os pontos e associe tags conforme necessário.
- **Visualização em Tabela**: Acompanhe todos os registros de ponto em uma tabela organizada.
- **Autenticação**: Sistema de login seguro para proteger os dados dos usuários.

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework para construção de APIs.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Axios**: Cliente HTTP para fazer requisições ao backend.

### Frontend

- **React**: Biblioteca para construção de interfaces de usuário.
- **Ant Design**: Biblioteca de componentes para um design moderno e responsivo.

---

## 📂 Estrutura do Projeto

```
ponto-supremo/
├── server/            # Backend
│   ├── models/        # Modelos de dados (Cadastro, Empresa, TabelaPonto)
│   ├── router/        # Rotas da API
│   ├── server.js      # Inicialização do servidor
│   └── login.js       # Lógica de autenticação
└── client/            # Frontend
    ├── src/           # Código fonte da aplicação React
    │   ├── Cadastro.js
    │   ├── Home.js
    │   ├── App.js
    │   ├── Sobre.js
    │   ├── TabelaPonto.js
    │   └── login.js
    └── package.json    # Configurações do projeto (inicializa ambas as aplicações)
```

---

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seuusuario/ponto-supremo.git
   cd ponto-supremo
   ```

2. **Instale as dependências:**
   - No diretório `client`, instale as dependências do frontend:
     ```bash
     cd client
     npm install
     cd ..
     ```
   - No diretório `server`, instale as dependências do backend:
     ```bash
     cd server
     npm install
     cd ..
     ```
   - No diretório raiz (onde ficam as pastas `server` e `client`), instale as dependências gerais:
     ```bash
     npm install
     ```

3. **Inicie as aplicações:**
   No diretório raiz, execute:
   ```bash
   npm start
   ```

   Isso iniciará tanto o backend quanto o frontend simultaneamente.

---

## 📞 Contato

Para sugestões, dúvidas ou colaborações, sinta-se à vontade para entrar em contato:

- **Email**: edvamsantos444@gmail.com
- **LinkedIn**: [Seu Perfil](https://www.linkedin.com/in/mycosmus)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
