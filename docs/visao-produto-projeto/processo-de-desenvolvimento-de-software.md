## Histórico de revisão

|    Data    | Versão |                     Descrição                      |                                Autor(es)                                 |
| :--------: | :----: | :------------------------------------------------: | :----------------------------------------------------------------------: |
| 16/04/2023 |  0.1   |        Criação e estruturação do documento         | Guilherme Santos, </br> Levi Braz, </br> Luan Mateus, </br> Maykon Junio |
| 30/04/2023 |  0.2   | Adicionando Definition of done e Defition of Ready |                               Maykon Junio                               |
| 16/05/2023 | 0.3 | Edição das abordagens XP utilizadas | Luana Ribeiro |

## Metodologia

<p style="text-indent: 50px;text-align: justify;"> A equipe utilizará o método Scrum e o XP (eXtreme Programming) para criar uma abordagem ágil e eficiente no desenvolvimento do presente projeto. O Scrum e o XP são métodos comprovados, que ajudam as equipes de desenvolvimento de software a trabalharem juntas de maneira mais eficaz, produzindo resultados de alta qualidade em um curto período de tempo. Segue abaixo algumas das funcionalidades que o time utilizara com o auxílio de cada um dos métodos e suas devidas práticas.
</p>

## Scrum

| Evento               | Descrição                                                                                                                                                                | Ferramenta |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| Daily Scrum          | Reunião diária com duração máxima de 15 minutos, na qual os membros da equipe devem discutir o progresso de trabalho da Sprint desde a última reunião diária             | Discord    |
| Sprint Planning      | Reunião realizada no inicio de cada sprint com o intuito de definir as Histórias de Usuário entregáveis na sprint que virá a seguir                                      | Discord    |
| Sprint Retrospective | Evento importante realizado pela equipe com intuito de refletir sobre o processo de trabalho da sprint passada, para identificar maneiras de melhorar as sprints futuras | Discord    |
| Sprint Review        | Evento realizado pela equipe para revisar todas as funcionalidades concluídas ao final da sprint com a participação do Product Owner (PO)                                | Discord    |
| Product Backlog      | Lista priorizada dos requisitos do produto que precisam ser desenvolvidos para atender aos objetivos do projeto                                                          | Miro       |

## Estratégias eXtremme Programming

| Estratégia              | Descrição                                                                                                                                                                                    | Ferramenta                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Toda a Equipe           | Faz com que a equipe possa trabalhar junta para resolver problemas e alcançar os objetivos do projeto, aumentando a produtividade e diminuindo conflitos entre os membros da equipe          | Discord                      |
| Pequenas Versões        | Torna o acompanhamento do progresso do projeto de forma mais clara e objetiva. Permite, também, que a equipe e o cliente identifiquem problemas com mais rapidez                             | VisualStudio Code            |
| Jogo de Planejamento    | Será utilizado no início de cada Sprint da metodologia SCRUM para priorizar as funcionalidades e definir as tarefas que serão realizadas para cumprir os objetivos                           | VisualStudio Code            |
| Testes de Cliente       | O cliente especifica um ou mais Testes de Cliente para cada história de usuário do sistema, descrevendo em detalhes como ele espera que cada história funcione                               | Google Meet                  |
| Propriedade Coletiva    | A prática de propriedade coletiva declara que qualquer membro da equipe pode alterar qualquer parte do código do sistema a qualquer momento                                                  | VisualStudio Code            |
| Padrões de Codificações | Definir um padrão de codificação aumenta a capacidade de entendimento do código entre os membros da equipe                                                                                   | VisualStudio Code            |
| Ritmo Sustentável       | Evita a sobrecarga de trabalho e o esgotamento físico e mental dos membros da equipe. O que sucede em uma boa qualidade do produto, diminuição na incidência de erros e prazos não cumpridos | VisualStudio Code            |
| Metáfora                | Para tornar mais claro o entendimento de toda a equipe sobre o projeto e suas funcionalidades                                                                                                | Discord                      |
| Integração Contínua     | Automatizar a compilação e os testes do código faz com que problemas (bugs) sejam detectados com maior facilidade                                                                            | VisualStudio Code \| Git Hub |
| Design Simples          | Um projeto com a prática de um design simples é benéfico, principalmente, para a manutenibilidade do projeto                                                                                 | VisualStudio Code            |
| Refatoração             | Prática que envolve a melhoria contínua do código existente sem alterar sua funcionalidade                                                                                                   | VisualStudio Code            |
| Testes Unitários        | A prática da refatoração torna o código inteligível, pode ajudar na diminuição de ocorrência de bugs e, também, podendo melhorar o desempenho do software                                    | Jest \| GitActions           |
| Programação em Pares    | Prática que permite que dois ou mais participantes trabalhem simultâneamente no mesmo código através de uma vídeo-chamada ou até chamada de voz                                              | VisualStudio Code \| Discord |
| TDD | Elaboração dos testes antes da implementação | GitActions | 

Para realizações das devidas sprints, a equipe utilizará as técnicas do XP listadas acima.

### Representação ScrumXP

<p align="center">

<img src="https://user-images.githubusercontent.com/89596623/233391050-4f6b04f9-ec8e-4cb1-81c0-5b83fab6b672.png">

</p>

### Definition of Ready

<p style="text-indent: 50px;text-align: justify;">
Antes de adicionar os requisitos no backlog da sprint a equipe deverá realizar o seguinte <b>Checklist</b> para identificar se a sprint está apta para iniciar.
</p>

- Todas as dependências e recursos necessários para a conclusão do Requisito foram identificados e estão disponíveis?
- O Requisito está priorizado corretamente em relação aos outros Requisitos do backlog?
- A equipe de desenvolvimento entendeu completamente o Requisito e seus objetivos?
- O Requisito tem detalhes suficientes, incluindo critérios de aceitação claros?
- O Requisito foi validado e aprovado pelo PO?
- O Requisito está devidamente representado por uma História de usuário?
- A equipe tem conhecimento e preparo necessários para iniciar a sprint?

### Definition of Done

<p style="text-indent: 50px;text-align: justify;">
Antes do review da sprint o seguinte <b>Checklist</b> deverá ser realizado pela equipe para garantir um padrão em determinar um item como finalizado.
</p>

- Foi desenvolvido e implementado de acordo com as especificações e critérios de aceitação definidos?
- Passou pelos testes de unidade, integração e aceitação?
- Foi integrada ao sistema principal sem causar impacto negativo em outras áreas do sistema?
- Todas as dependências da tarefa foram resolvidas?
- Está documentado para uso?
