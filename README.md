# MandaPraMim

## Índice

- [Descrição do Projeto](#descri%C3%A7%C3%A3o-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Contribuindo](#contribuindo)
- [Licença](#licen%C3%A7a)
- [Autores](#autores)

## Descrição do Projeto

O MandaPraMim é uma aplicação web desenvolvida com o objetivo de proporcionar mais praticidade na escolha e na realização de pedidos de comida via web. Além disso, recomendar alimentos saudáveis para os usuários. O sistema também conta com a autenticação do usuário para garantir a segurança dos dados. Este projeto foi criado como parte do Projeto Integrador do Grupo 7 durante a realização do Bootcamp Java FullStack na Generation Brasil.

## Funcionalidades

Dentro da aplicação dividimos os acessos em cliente e administrador, sendo o cliente nosso usuário final que usará a plataforma para realizar seu cadastro e realizar compras por meio da função de carrinho e posteriomente sacola. Já o modo administrador tem acesso aos produtos que estão sendo vendidos, onde ele consegue adicionar, apagar e atualizar novos produtos em tempo real. Além disso o sistema faz recomendações de produtos saudáveis. Todos os acessos na plataforma são feitos por meio de login, tornando a aplicação muito segura.

## Tecnologias Utilizadas

FRONT-END
- **Type Script**: Superset do JavaScript para gerar tipagem estática garantindo maior segurança e melhor desenvolvimento.
- **React**: Biblioteca JavaScript usado para a construção de interfaces de usuário dinâmicas e reativas.
- **Html 5**: Linguagem de marcação utilizada para estruturar o conteúdo da aplicação web.
- **CSS 3**: Linguagem de estilo utilizada para definir a apresentação visual da aplicação.
- **TailwindCss**: Framework CSS utilitário usado estilizar elementos rapidamente através da composição de classes.
- **Netlify**: Plataforma para deploy e hospedagem do frontend da aplicação, oferecendo facilidade e escalabilidade.

BACK-END
  
- **Java 17**: Linguagem de programação utilizada para o desenvolvimento da API.
- **Spring Boot**: Framework que simplifica o desenvolvimento de aplicações Java, fornecendo uma configuração automática e uma estrutura robusta.
- **Spring Data JPA**: Para a interação com o banco de dados, facilitando a persistência de dados.
- **Spring Security**: Para a implementação de autenticação e autorização.
- **H2 Database**: Banco de dados em memória utilizado para testes.
- **MySQL**: Banco de dados relacional utilizado para a persistência de dados em produção.
- **JUnit**: Framework de testes utilizado para garantir a qualidade do código.
- **Swagger (Springdoc OpenAPI)**: Para a documentação da API, permitindo que os desenvolvedores visualizem e testem os endpoints de forma interativa.
- **Insomnia**: Ferramenta utilizada para realizar requisições aos endpoints da API durante o desenvolvimento e testes.
- **Render**: Plataforma utilizada para o deploy da API, tornando-a acessível publicamente.



## Como Executar o Projeto

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/Projeto-Integrador-Grupo7/MandaPraMim.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd MandaPraMim
   ```

3. Instale as dependências:

   ```bash
   yarn install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   yarn dev
   ```

O aplicativo estará disponível em `http://localhost:3000`.

## Contribuindo

Contribuições são bem-vindas! Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:

   ```bash
   git checkout -b minha-feature
   ```

3. Commit suas alterações:

   ```bash
   git commit -m 'Adiciona minha feature'
   ```

4. Envie para o repositório remoto:

   ```bash
   git push origin minha-feature
   ```

5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autores

- [Eloiza Fernandes] (https://github.com/eloizafns)
- [Felipe Macedo] (https://github.com/FehMacedo10)
- [Jaime Filho] (https://github.com/jaimebranco)
- [Nathan Ribeiro] (https://github.com/Shost01)
- [Paola Patrícia] (https://github.com/PaolaPatricia16)

