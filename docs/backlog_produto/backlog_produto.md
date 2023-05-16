## Histórico de revisão

|    Data    | Versão |                            Descrição                            |            Autor(es)            |
| :--------: | :----: | :-------------------------------------------------------------: | :-----------------------------: |
| 30/04/2023 |  0.1   | Criação e estruturação da primeira versão do backlog do produto | Luan Mateus, </br>Maykon Júnio  |
| 07/05/2023 |  0.2   |        Ajuste de Granularidade dos Requisitos Funcionais        | Luan Mateus, </br>Luana Ribeiro |
| 10/05/2023 |  0.3   |        Criação de Tabela de Analíse de Viabilidade dos Requisitos        | Luan Mateus, </br>Luana Ribeiro, </br>Maykon Júnio |
| 12/05/2023 |  0.3   |        Alteração no Backlog do Produto e Inserção das Histórias de Usuário no MVP1 e MVP2        | Davi Ranieri, </br>Guilherme Santos |
|15/05/2023| 0.4 | Atualização do Backlog - Requisitos Funcionais | Luan Mateus, </br> Luana Ribeiro |

<p style="text-indent: 50px;text-align: justify;"> O backlog do produto é uma lista ordenada que contém todos os requisitos que possam ser necessários para desenvolvimento de um projeto, podendo conter: epics, features e users stories. Além disso, é a única fonte de requisitos para todas as mudanças a serem feitas no produto. O time recorrerá a ele durante o processo para eventuais dúvidas sobre projeto.
</p>

## Personas

- **Professor:** É o usuário comum que é capaz de ter o controle de turmas e alunos. <br>
- **Aluno:** É o usuário comum que é capaz de ter acesso aos boletos de sua mensalidade e possíveis avisos provenientes do administrador e professor; <br>
- **Administrador:** Pessoa com funções que vão desde o gerenciamento da escola de música até o envio de mensagens de aviso para os alunos. <br>
- **Usuário:** Refere-se tanto ao aluno quanto ao professor. <br>
  <br>

## Requisitos funcionais

Os requisitos funcionais são as funcionalidades que o software deve realizar, e dependem de diversos fatores, como a abordagem utilizada para descrever os requisitos, o usuário do software, dentre outros. No projeto FMS, a análise de viabilidade do projeto conta com três critérios: Valor de negócio (N), Viabilidade (V) e Criticidade (C). Na tabela a seguir, cada requisito recebe uma nota de 1 a 5 atribuindo valor para esse requisito, e cada um receberá seu grau de prioridade de acordo com a média desses critérios para cada requisito: (N+V+C)/3.

| Temas                    | Épicos                    | User Story| Valor de negócio | Viabilidade | Criticidade | Total |
| -------------------------------------- | ------------------------------------------------ |      ---------     |         |      |   |    |
| <b>[TE01]</b> Gerenciar Pessoas | <b>[EP01]</b> Gerir Usuários      | <b>[US01]</b> Eu, como administrador, quero ser capaz de realizar o cadastro de alunos para que possam ter acesso à plataforma.<br><b>[US02]</b> Eu, como administrador, quero ser capaz de realizar o cadastro de professores, para que possam ter acesso à plataforma. <br> <b>[US03]</b> Eu, como administrador, quero ser capaz de realizar a atualização do perfil de professores para manter seus dados sempre atualizados. <br> <b>[US04]</b>Eu, como administrador, quero ser capaz de realizar a atualização do perfil de alunos para manter seus dados sempre atualizados. <br> <b>[US05]</b> Eu, como administrador, quero ser capaz de remover o cadastro de professores, para remover do banco de dados os que não fazem mais parte da escola. <br><b>[US06]</b> Eu, como administrador, quero ser capaz de remover o cadastro de alunos,para remover do banco de dados os que não fazem mais parte da escola. <br>| 5.0 </br> </br> </br> 4.0 </br> </br> </br> 4.0 </br> </br> </br></br> 4.0</br> </br> </br></br> 3.0 </br></br> </br> </br>3.0| 5.0 </br> </br> </br> 4.0</br> </br> </br> 4.0 </br> </br> </br></br>4.0 </br> </br> </br></br> 4.0</br> </br> </br></br>4.0 | 4.0 </br> </br> </br> 4.0 </br> </br> </br> 4.0 </br> </br> </br></br>4.0</br> </br> </br></br>4.0</br> </br> </br></br>4.0| 5.0 </br> </br> </br> 4.0</br> </br> </br>4.0</br> </br> </br></br>4.0</br> </br> </br></br>4.0</br> </br> </br></br>4.0|
| <b>[TE01]</b> Gerenciar Pessoas | <b>[EP02]</b> Autenticar Usuário na Plataforma <br> | <b>[US07]</b> Eu, como usuário, quero poder acessar a plataforma com e-mail e senha para que eu tenha privacidade e meus dados estejam seguros <br> <b>[US08]</b> Eu, como usuário, quero recuperar minha senha, caso eu esqueça, para acessar a plataforma.| 5.0 </br></br></br></br> 5.0 | 4.0 </br></br></br></br> 3.0| 3.0 </br></br></br></br> 3.0 | 4.0 </br></br></br></br> 3.0 |
| <b>[TE02]</b> Gerenciar Aulas   | <b>[EP03]</b> Gerir Salas de Aulas                        | <b>[US09]</b> Eu, como administrador, quero ter a opção de cadastrar novas salas de aula na minha escola. <br> <b>[US10]</b> Eu, como administrador, quero ter a opção de gerenciar as salas de aula existentes na minha instituição, para possíveis alterações de turmas, aulas e ensaios musicais. <br>  | 1.0 </br></br></br> 1.0 | 2.0 </br></br></br> 2.0 | 1.0 </br></br></br> 1.0 | 1.0 </br></br></br> 1.0|
| <b>[TE02]</b> Gerenciar Aulas   | <b>[EP04]</b> Controlar Agendas                        | <b>[US11]</b> Eu, como administrador, quero ter a opção de agendar as aulas dos alunos, para que sejam registradas na agenda do professor. <br> <b>[US12]</b>  Eu como administrador, devo registrar novas aulas com alunos e professores para ter controle de organização.<br> <b>[US13]</b> Eu, como administrador, quero ter a opção de visualizar a agenda do professor para escolher a data para agendamento de aulas.<br><b>[US14]</b>Eu, como professor, devo atualizar minha agenda para novas aulas que serão ministradas por mim. | 5.0 </br></br></br></br> 5.0 </br></br></br></br> 4.0 </br></br></br></br> 4.0 | 4.0 </br></br></br></br> 4.0 </br></br></br></br> 4.0 </br></br></br></br> 4.0| 5.0 </br></br></br></br> 5.0 </br></br></br></br> 4.0 </br></br></br></br> 4.0| 5.0 </br></br></br></br> 5.0 </br></br></br></br> 4.0 </br></br></br></br> 4.0|
| <b>[TE02]</b> Gerenciar Aulas   | <b>[EP05]</b> Controlar Faltas e Notas                 | <b>[US15]</b> Eu, como professor, quero ter o controle de frequência dos alunos na aula para que eu saiba quem precisa repor as aulas.|4.0|3.0|4.0|3.67|
| <b>[TE03]</b> Gerenciar Finanças | <b>[EP06]</b> Registrar Mensalidades dos Alunos                    | <b>[US16]</b> Eu, como administrador, quero poder registrar o pagamento da mensalidade de cada aluno na plataforma <br>| 4.0|3.0|4.0|3.67|
| <b>[TE03]</b> Gerenciar Finanças | <b>[EP07]</b> Gerir Contratos                   | <b>[US17]</b> Eu, como administrador, quero gerar um contrato de prestação de serviços para cada aluno no ato da matrícula <br> <b>[US18]</b> Eu, como administrador, quero verificar a situação de cada aluno em relação ao cumprimento ou descumprimento do contrato, para ter noção dos alunos que estão se tornando inadimplentes, seja por falta de pagamento ou por não renovação do contrato.  | 5.0 </br></br></br> 4.0| 3.0 </br></br></br> 3.0 | 4.0 </br></br></br> 3.0 | 4.0 </br></br></br> 3.33|
| <b>[TE04]</b> Comunicar             | <b>[EP08]</b> Postar no Mural de Avisos                            | <b>[US19]</b> Eu, como administrador, quero me comunicar com os devidos alunos e/ou responsáveis para avisá-los de algum impasse que possa surgir.| 5.0 | 4.0 | 3.0| 3.67|

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
| <b>[US01] [US02] [US03] [US04] [US05] [US06] </b>| O administrador deve ser capaz de gerenciar os usuários na plataforma, ou seja, professores e alunos.                                                                               |
| <b>[US07] [US08]</b>| O usuário deverá ser capaz de acessar a plataforma e recuperar seu acesso caso o perca.                                                                                    |
| <b>[US11] [US12] [US13] [US14]</b>| Os professores devem atualizar suas agendas constantemente, enquanto o administrador deve ter acesso ao registro dessas agendas para marcar novas aulas.                                                                               |
| <b>[US17]</b> | O administrador deve ser capaz de gerar um contrato personalizado para novos alunos através da plataforma.                                              |


## MVP 2
| Requisitos                          | Justificativa                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Gestão de Pagamentos e Mensalidades | O super-usuário deve ser capaz de acompanhar o fluxo de pagamento de cada aluno.                                                     |
| Controle de Frequência de Alunos    | O super-usuário, professores e alunos deve ser capazes de acompanhar a frequência dos alunos nas aulas.                              |
| Central de Comunicação              | O super-usuário deve ser capaz de enviar mensagens de texto para os alunos e responsáveis via WhatsApp e Email.                      |
| Relatório de Inadimplência             | O super-usuário deve ser  capaz de verificar quais alunos estão se tornando inadimplentes por falta de pagamento ou não renovação do contrato. |
| Agenda dos Professores                          | Os professores devem ter a capacidade de atualizar a sua agenda de disponibilidades para novas aulas, enquanto o super-usuário tem acesso à todas elas. |
| Gerenciamento de Salas de Aula e de Ensaio      | O super-usuário deve ser capaz de gerenciar as salas de aulas para remanejamento de turmas, aulas e ensaios musicais.                                   |
| Histórico de Aulas                  | O super-usuário deve ser capaz de visualizar todo o histórico de aulas ministradas e não ministradas devido a faltas ou reposições.  |