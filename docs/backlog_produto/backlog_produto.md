## Histórico de revisão

|    Data    | Versão |                            Descrição                            |           Autor(es)            |
| :--------: | :----: | :-------------------------------------------------------------: | :----------------------------: |
| 30/04/2023 |  0.1   | Criação e estruturação da primeira versão do backlog do produto | Luan Mateus, </br>Maykon Júnio |

<p style="text-indent: 50px;text-align: justify;"> O backlog do produto é uma lista ordenada que contém todos os requisitos que possam ser necessários para desenvolvimento de um projeto, podendo conter: epics, features e users stories. Além disso, é a única fonte de requisitos para todas as mudanças a serem feitas no produto. O time recorrerá a ele durante o processo para eventuais dúvidas sobre projeto.
</p>

## Personas

- **Professor:** É o usuário comum que é capaz de ter o controle de turmas e alunos. <br>
- **Aluno:** É o usuário comum que é capaz de ter acesso aos boletos de sua mensalidade e possíveis avisos provenientes do administrador e professor; <br>
- **Administrador:** Pessoa com funções que vão desde o gerenciamento da escola de música até o envio de mensagens de aviso para os alunos. <br>
- **Usuário:** Refere-se tanto ao aluno quanto ao professor. <br>
  <br>

## Requisitos funcionais

| Épico                                   | Feature                                                                | User Story                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <b>[EP01]</b> Gerenciamento de Usuários | <b>[FEAT01]</b> Cadastrar, remover e atualizar perfis de usuários <br> | <b>[US01]</b> Eu, como administrador, quero ser capaz de realizar o cadastro de professores e alunos para que possam ter acesso à plataforma. <br> <b>[US02]</b> Eu, como administrador, quero ser capaz de realizar a atualização do perfil de professores e alunos para manter seus dados sempre atualizados. <br> <b>[US03]</b> Eu, como administrador, quero ser capaz de remover o cadastro de professores e alunos para removê-los da base de dados do sistema. <br> |
| <b>[EP01]</b> Gerenciamento de usuários | <b>[FEAT02]</b> Acesso de Usuário <br>                                 | <b>[US05]</b> Eu, como usuário, quero poder acessar a plataforma com e-mail e senha para que eu tenha privacidade e meus dados estejam seguros <br> <b>[US06]</b> Eu, como usuário, quero recuperar minha senha, caso eu esqueça, para acessar a plataforma.                                                                                                                                                                                                               |
| <b>[EP02]</b> Gerenciamento de Aulas    | <b>[FEAT03]</b> Controle de Agendas                                    | <b>[US07]</b> Eu, como aluno, quero ter a opção de visualizar a agenda do professor para escolher a data para agendamento de aulas. <br> <b>[US08]</b> Eu, como aluno, quero ter a opção de agendar as minhas aulas, para que sejam registradas na agenda do professor. <br> <b>[US09]</b> Eu, como professor, quero ter a opção de agendar as aulas que serão ministradas por mim, para registrar a reposição de aula ou aulas de reforço.                                |
| <b>[EP02]</b> Gerenciamento de Aulas    | <b>[FEAT04]</b> Controle de Faltas e Notas                             | <b>[US10]</b> Eu, como professor, quero ter o controle de frequência dos alunos na aula para que eu saiba quem precisa repor as aulas. <br> <b>[US11]</b> Eu, como professor, quero poder registrar as notas de avaliação de cada aluno para saber o progresso de formação dos mesmos. <br> <b>[US12]</b> Eu, como aluno, quero ter acesso às minhas notas e frequências em cada disciplina para identificar meu progresso.                                                |
| <b>[EP03]</b> Gerenciamento Financeiro  | <b>[FEAT05]</b> Mensalidades dos Alunos                                | <b>[US13]</b> Eu, como administrador, quero poder gerar boletos e recibos de mensalidades para fazer o envio para cada aluno. <br> <b>[US14]</b> Eu, como aluno, quero ter acesso aos boletos de mensalidade para realizar o devido pagamento.                                                                                                                                                                                                                             |
| <b>[EP04]</b> Comunicação               | <b>[FEAT06]</b> Mural de Avisos                                        | <b>[US15]</b> Eu, como administrador, quero me comunicar com os devidos alunos e/ou responsáveis para avisá-los de algum impasse que possa surgir.                                                                                                                                                                                                                                                                                                                         |

## Requisitos não-funcionais

| Categoria       | Requisito                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Implementação   | <b>[RNF01]</b> O back-end da aplicação deve ser construído com a ferramenta Strapi.                                                                          |
| Interface       | <b>[RNF02]</b> A interface deve conter modo de alto contraste e texto alternativo, com o propósito de deixar a aplicação mais acessível.                     |
| Interface       | <b>[RNF03]</b> A aplicação deve conter estilização das páginas com cores, fontes e icones padronizados.                                                      |
| Usabilidade     | <b>[RNF04]</b> A aplicação deve ser responsiva, podendo ser acessada por diferentes tamanhos de telas.                                                       |
| Suportabilidade | <b>[RNF05]</b> A aplicação deve ser compatível com as versões mais recentes dos navegadores modernos como Chrome, Safari, Edge, Firefox, e Opera.            |
| Confiabilidade  | <b>[RNF06]</b> A aplicação deve garantir a privacidade dos dados dos usuários, estando de acordo com a Lei Geral de Proteção de Dados (13.709/2018).         |
| Confiabilidade  | <b>[RNF07]</b> A aplicação deve proporcionar um ambiente suficientemente seguro para garantir que apenas aqueles registrados no sistema tenham acesso a ele. |

## MVP 1
| Requisitos            | Justificativa                                                                                                                                              |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cadastro de Professores| O super-usuário deve ser capaz de cadastrar os professores na plataforma.|
| Cadastro de Alunos    | O super-usuário deve ser capaz de cadastrar os alunos na plataforma.|
| Agendamento de Aulas  | O super-usuário deve ser capaz de agendar as aulas de cada aluno com seus respectivos professores na plataforma.|
| Agenda dos Professores  | Os professores devem ter a capacidade de atualizar a sua agenda de disponibilidades para novas aulas, enquanto o super-usuário tem acesso à todas elas.|
| Geração de um contrato de Prestação de serviços | O super-usuário deve ser capaz de gerar um contrato personalizado para novos alunos através da plataforma.|
| Gerenciamento de Salas de Aula e de Ensaio  |   O super-usuário deve ser capaz de gerenciar as salas de aulas para remanejamento de turmas, aulas e ensaios musicais.

## MVP 2
| Requisitos            | Justificativa                                                                                                                                              |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Gestão de Pagamentos e Mensalidades| O super-usuário deve ser capaz de acompanhar o fluxo de pagamento de cada aluno.|
| Controle de Frequência de Alunos    | O super-usuário, professores e alunos deve ser capazes de acompanhar a frequência dos alunos nas aulas.|
| Central de Comunicação  | O super-usuário deve ser capaz de enviar mensagens de texto para os alunos e responsáveis via WhatsApp e Email.|
| Gestão de Inadimplência | O super-usuário deve ser verificar quais alunos estão se tornando inadimplentes por falta de pagamento ou não renovação do contrato.|
| Relatório de Despesas |   O super-usuário deve ser capaz de contabilizar as despesas do espaço físico da escola.|
| Histórico de Aulas |   O super-usuário deve ser capaz de vizualizar todo o histórico de aulas ministradas e não ministradas devido a faltas ou reposições.|
