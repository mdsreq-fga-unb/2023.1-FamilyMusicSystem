## Histórico de revisão

|    Data    | Versão |                            Descrição                            |            Autor(es)            |
| :--------: | :----: | :-------------------------------------------------------------: | :-----------------------------: |
| 30/04/2023 |  0.1   | Criação e estruturação da primeira versão do backlog do produto | Luan Mateus, </br>Maykon Júnio  |
| 07/05/2023 |  0.2   |        Ajuste de Granularidade dos Requisitos Funcionais        | Luan Mateus, </br>Luana Ribeiro |
| 10/05/2023 |  0.3   |        Criação de Tabela de Analíse de Viabilidade dos Requisitos        | Luan Mateus, </br>Luana Ribeiro, </br>Maykon Júnio |

<p style="text-indent: 50px;text-align: justify;"> O backlog do produto é uma lista ordenada que contém todos os requisitos que possam ser necessários para desenvolvimento de um projeto, podendo conter: epics, features e users stories. Além disso, é a única fonte de requisitos para todas as mudanças a serem feitas no produto. O time recorrerá a ele durante o processo para eventuais dúvidas sobre projeto.
</p>

## Personas

- **Professor:** É o usuário comum que é capaz de ter o controle de turmas e alunos. <br>
- **Aluno:** É o usuário comum que é capaz de ter acesso aos boletos de sua mensalidade e possíveis avisos provenientes do administrador e professor; <br>
- **Administrador:** Pessoa com funções que vão desde o gerenciamento da escola de música até o envio de mensagens de aviso para os alunos. <br>
- **Usuário:** Refere-se tanto ao aluno quanto ao professor. <br>
  <br>

## Requisitos funcionais

| Temas                                  | Épicos                                                   | User Story|
| -------------------------------------- | -------------------------------------------------------- |           |
| <b>[TE01]</b> Gerenciamento de Pessoas | <b>[EP01]</b> Gestão de Usuários             | <b>[US01]</b> Eu, como administrador, quero ser capaz de realizar o cadastro de professores.<br><b>[US02]</b> Eu, como administrador, quero ser capaz de realizar o cadastro de alunos para que possam ter acesso à plataforma. <br> <b>[US03]</b> Eu, como administrador, quero ser capaz de realizar a atualização do perfil de professores para manter seus dados sempre atualizados. <br> <b>[US04]</b>Eu, como administrador, quero ser capaz de realizar a atualização do perfil de alunos para manter seus dados sempre atualizados. <br> <b>[US05]</b> Eu, como administrador, quero ser capaz de remover o cadastro de professores. <br><b>[US06]</b> Eu, como administrador, quero ser capaz de remover o cadastro de alunos. <br>|
| <b>[TE01]</b> Gerenciamento de Pessoas | <b>[EP02]</b> Autenticação de Usuário na Plataforma <br> | <b>[US07]</b> Eu, como usuário, quero poder acessar a plataforma com e-mail e senha para que eu tenha privacidade e meus dados estejam seguros <br> <b>[US08]</b> Eu, como usuário, quero recuperar minha senha, caso eu esqueça, para acessar a plataforma.|
| <b>[TE02]</b> Gerenciamento de Aulas   | <b>[EP03]</b> Gestão de Salas de Aulas                        | <b>[US07]</b> Eu, como administrador, quero ter a opção de cadastrar novas salas de aula na minha escola. <br> <b>[US08]</b> Eu, como administrador, quero ter a opção de gerenciar as salas de aula existentes na minha instituição, para possíveis alterações de turmas, aulas e ensaios musicais. <br>                               |
| <b>[TE02]</b> Gerenciamento de Aulas   | <b>[EP04]</b> Controle de Agendas                        | <b>[US09]</b> Eu, como administrador, quero ter a opção de visualizar a agenda do professor para escolher a data para agendamento de aulas. <br> <b>[US10]</b> Eu, como administrador, quero ter a opção de agendar as aulas dos alunos, para que sejam registradas na agenda do professor. <br> <b>[US11]</b> Eu, como professor, atualizar minha agenda para novas aulas que serão ministradas por mim.<br><b>[US12]</b> Eu como administrador, quero poder registrar novas aulas com alunos e professores. |
| <b>[TE02]</b> Gerenciamento de Aulas   | <b>[EP05]</b> Controle de Faltas e Notas                 | <b>[US13]</b> Eu, como professor, quero ter o controle de frequência dos alunos na aula para que eu saiba quem precisa repor as aulas.|
| <b>[TE03]</b> Gerenciamento Financeiro | <b>[EP06]</b> Mensalidades dos Alunos                    | <b>[US16]</b> Eu, como administrador, quero poder registrar o pagamento da mensalidade de cada aluno na plataforma <br>
| <b>[TE03]</b> Gerenciamento Financeiro | <b>[EP07]</b> Gestão Contratual                    | <b>[US20]</b> Eu, como administrador, quero gerar um contrato de prestação de serviços para cada aluno no ato da matrícula <br> <b>[US21]</b> Eu, como administrador, quero verificar a situação de cada aluno em relação ao cumprimento ou descumprimento do contrato, para ter noção dos alunos que estão se tornando inadimplentes, seja por falta de pagamento ou por não renovação do contrato.  |
| <b>[TE04]</b> Comunicação              | <b>[EP08]</b> Mural de Avisos                            | <b>[US22]</b> Eu, como administrador, quero me comunicar com os devidos alunos e/ou responsáveis para avisá-los de algum impasse que possa surgir.|

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
| User Stories                                      | Justificativa                                                                                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <b>[US01] [US02] [US03] [US04] [US05] [US06] </b>| O administrador deve ser capaz de gerenciar os usuários na plataforma sejam professores ou alunos.                                                                               |
| <b>[US07] [US08]</b>| O usuário deverá ser capaz de acessar a plataforma e recuperar seu acesso caso o perca.                                                                                    |
| <b>[US09] [US10] [US11] [US12]</b>| Os professores devem poder atualizar suas agendas constantemente, enquanto o administrador deve ter acesso ao registro dessas agendas para marcar novas aulas.                                                                               |
| <b>[US20]</b> | O super-usuário deve ser capaz de gerar um contrato personalizado para novos alunos através da plataforma.                                              |


## MVP 2
| Requisitos                          | Justificativa                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Gestão de Pagamentos e Mensalidades | O super-usuário deve ser capaz de acompanhar o fluxo de pagamento de cada aluno.                                                     |
| Controle de Frequência de Alunos    | O super-usuário, professores e alunos deve ser capazes de acompanhar a frequência dos alunos nas aulas.                              |
| Central de Comunicação              | O super-usuário deve ser capaz de enviar mensagens de texto para os alunos e responsáveis via WhatsApp e Email.                      |
| Relatório de Inadimplência             | O super-usuário deve ser  capaz de verificar quais alunos estão se tornando inadimplentes por falta de pagamento ou não renovação do contrato. |
| Agenda dos Professores                          | Os professores devem ter a capacidade de atualizar a sua agenda de disponibilidades para novas aulas, enquanto o super-usuário tem acesso à todas elas. |
| Gerenciamento de Salas de Aula e de Ensaio      | O super-usuário deve ser capaz de gerenciar as salas de aulas para remanejamento de turmas, aulas e ensaios musicais.                                   |
| Histórico de Aulas                  | O super-usuário deve ser capaz de vizualizar todo o histórico de aulas ministradas e não ministradas devido a faltas ou reposições.  |

## Analíse de Viabilidade - Requisitos Funcionais

| Requisito | Valor de Negócio | Viabilidade | Criticidade | Total |
| --------- | ---------------- | ----------- | ----------- | ----- |
| <b>[MVP1]</b> CRUD de Alunos | 5.0 | 4.0 | 4.0 | <b>4.33 |
| <b>[MVP1]</b> CRUD de Professores | 4.0 | 4.0 | 4.0 | <b>4.0 |
| <b>[MVP1]</b> Agenda dos Professores | 3.0 | 4.0 | 4.0 | <b>3.67 |
| <b>[MVP1]</b> Agendamento de Aulas | 2.0 | 4.0 | 4.0 | <b>3.33 |
| <b>[MVP1]</b> Geração de um contrato de Prestação de serviços | 5.0 | 4.0 | 4.0 | <b>4.33 |
| <b>[MVP2]</b> Gestão de Pagamentos e Mensalidades | 3.0 | 2.0 | 2.0 | <b>2.33 |
| <b>[MVP2]</b> Controle de Frequência de Alunos | 3.0 | 3.0 | 3.0 | <b>3.00 |
| <b>[MVP2]</b> Central de Comunicação | 3.0 | 2.0 | 3.0 | <b>2.67 |
| <b>[MVP2]</b> Relatório de Inadimplência | 4.0 | 3.0 | 2.0 | <b>3.00 |
| <b>[MVP2]</b> Gerenciamento de Salas de Aula e de Ensaio | 3.0 | 2.0 | 3.0 | <b>2.67 |
| <b>[MVP2]</b> Histórico de Aulas | 3.0 | 3.0 | 3.0 | <b>3.00 |
| <b>[MVP2]</b> CRUD de salas de aula  | 2.0 | 3.0 | 1.0 | <b>2.00 |