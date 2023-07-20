## Documentação de Testes

### Unitário

- Analisar se o teste de cada funcionalidade está sendo realizado

| US | Requisitos Funcionais | Critérios de aceitação | Critérios ok? | Passou? | Obs |
| --- | --- | --- | --- | --- | --- |
| 1 | Eu, como administrador, quero ser capaz de realizar o cadastro de alunos para que possam ser matriculados. | - Campos obrigatórios precisam estar preenchidos para cadastramento de dados do aluno (Nome, Sobrenome, Data de Nascimento , CPF, RG e Gênero); </br>- O sistema deve verificar se não há outros alunos com o mesmo CPF, RG e e-mail | ✅ | ✅ |  |
| 2 | Eu, como administrador, quero ser capaz de realizar o cadastro de professores, para que seus dados sejam salvos. | - Campos obrigatórios precisam estar preenchidos para cadastramento de dados do professor (Nome, Sobrenome, Data de Nascimento , CPF, RG e Gênero);</br>- O sistema deve verificar se não há outro professor com o mesmo CPF, RG e e-mail; | ✅ | ✅ |  |
| 3 | Eu, como administrador, quero ser capaz de realizar a atualização do perfil de professores para manter seus dados sempre atualizados | - Campos obrigatórios precisam estar preenchidos para alteração de dados do professor (Nome, Sobrenome, Data de Nascimento , CPF, RG e Gênero);</br>- O sistema deve verificar se não há outro professor com o mesmo CPF, RG e e-mail; | ✅ | ✅ |  |
| 4 | Eu, como administrador, quero ser capaz de realizar a atualização do perfil de alunos para manter seus dados sempre atualizados | - Campos obrigatórios precisam estar preenchidos para alteração de dados do aluno (Nome, Sobrenome, Data de Nascimento , CPF, RG, PCD, Tipo de deficiência e Gênero);</br>- O sistema deve verificar se não há outro aluno com o mesmo CPF, RG e e-mail; | ✅ | ✅ |  |
| 5 | Eu, como administrador, quero ser capaz de remover o cadastro de professores, para remover do banco de dados os que não fazem mais parte da escola. | - O professor, com seus respectivos dados, devem ser excluídos da base de dados;</br>- Deve haver uma confirmação para o administrador conferir se realmente deseja excluir o perfil do professor | ✅ | ✅ |  |
| 6 | Eu, como administrador, quero ser capaz de remover o cadastro de alunos, para remover do banco de dados os que não fazem mais parte da escola. | - Deve haver uma confirmação para o administrador conferir se realmente deseja excluir o perfil do aluno</br>- O administrador removerá o aluno, mas suas aulas e presenças continuarão presentes na base de dados; | ✅ | ✅ |  |
| 7 | Eu, como administrador, quero poder acessar a plataforma com e-mail e senha para que eu tenha privacidade e meus dados estejam seguros. | - O usuário deverá ter um CPF e senha registrados para conseguir acessar o sistema.</br>- O usuário deverá receber uma confirmação de acesso, caso suas credenciais estejam corretas. | ✅ | ✅ |  |
| 8 | Eu, como administrador, quero recuperar minha senha, caso eu esqueça, para acessar a plataforma | - O usuário deverá fornecer seu e-mail, CPF e data de nascimento para que uma nova senha seja enviada via correio eletrônico;</br>- O usuário deverá trocar a senha temporária após entrar na aplicação; | ❌ |  |  |
| 9 | Eu, como administrador, quero ter a opção de cadastrar novas salas de aula na minha escola para hospedagem das turmas | - O administrador deverá informar as características da sala: nome da sala, descrição da sala e capacidade de alunos;</br>- O administrador não poderá hospedar uma aula numa sala que não foi criada;</br>- Não poderão haver salas com o mesmo número; | ✅ | ✅ |  |
| 10 | Eu, como administrador, quero ter a opção de gerenciar as salas de aula existentes na minha instituição, para possíveis alterações de turmas, aulas e ensaios musicais | - Não será possível editar uma sala não cadastrada; | ✅ | ✅ |  |
| 11 | Eu, como administrador, quero ter a opção de agendar as aulas dos alunos, para que sejam registradas na agenda do professor | - Não será possível registrar uma aula em uma sala não existente; | ✅ | ✅ |  |
| 12 | Eu, como administrador, quero ter a opção de editar as aulas dos alunos, para que sejam atualizadas na agenda, caso já tenham sido marcadas. | - Campos obrigatórios precisam estar preenchidos para alteração de dados da Agenda (Número da Sala, Data da Aula, Professor, Estudante);</br>- Deve ser perguntado se o administrador realmente deseja fazer essa alteração;</br>- O Administrador deve visualizar as alteraçōes realizadas;</br>- As alterações devem ser salvas no banco de dados; | ✅ | ✅ |  |
| 13 | Eu, como administrador, quero ter a opção de excluir as aulas dos alunos, para que sejam removidas da agenda. | - Deve haver uma confirmação para o administrador conferir se realmente deseja excluir a aula desejada;</br>- Deve ser exibido um alert confirmando a exclusão da aula; | ✅ | ✅ |  |
| 14 | Eu, como administrador, devo registrar novas aulas com alunos e professores para ter controle de organização | -Para agendar, devem ser solicitados: nome do professor, horário,nome do aluno;</br>- O horário escolhido deverá estar de acordo com o horário de funcionamento das aulas;</br>- O administrador deve realizar um agendamento de aula sem que o software permita horários que se choquem;</br>- As aulas agendadas devem ser registradas no banco de dados;</br>- O administrador deve ver a confirmação do agendamento; | ✅ | ✅ |  |
| 15 | Eu, como administrador, quero ter a opção de visualizar a agenda. | - O administrador deve conseguir filtrar as aulas agendadas por dia, mês e ano;</br>- Deve ser possível visualizar o nome do professor que dará a aula;</br>- Deve ser visível uma área para edição da aula agendada;</br>- Deve ser visível uma área para remoção da aula agendada; | ✅ | ✅ |  |
| 16 | Eu, como administrador, quero ter o controle de frequência dos alunos na aula para que eu saiba quem precisa repor as aulas | - O professor deve conseguir registrar a presença do aluno desejado;</br>- Deve ser exibido um alert ao registrar a presença para o aluno; | ✅ | ✅ |  |
| 17 | Eu, como administrador, quero poder registrar o pagamento da mensalidade de cada aluno na plataforma, para obter um controle dos pagamentos. | - Deve ser selecionado se a situação do aluno está em débito ou se já está pago; | ❌ |  |  |
| 18 | Eu, como administrador, quero gerar um contrato de prestação de serviços para cada aluno no ato da matrícula, para que esse processo não seja feito de forma manual. | - O Administrador deve conseguir gerar o contrato acessando a aba de ferramentas da plataforma;</br>- Devem ser preenchidos os campos obrigatórios (valor do contrato, quantidade de parcelas) para que o contrato seja gerado;</br>- O Contrato deve ser gerado em formato .pdf;</br>- Deve ser exibido o modelo de contrato antes do administrador gerar; | ✅ | ✅ |  |
| 19 | Eu, como administrador, quero que o contrato de cada aluno seja enviado por e-mail, para que o aluno tenha acesso às informações contidas no mesmo | - O contrato deve ser enviado via e-mail assim que o administrador cadastrar um novo aluno;</br>- O contrato deve ser enviado via e-mail até, no máximo 30 minutos; | ❌ |  |  |
| 20 | Eu, como administrador, quero verificar a situação de cada aluno em relação ao cumprimento ou descumprimento do contrato, para ter noção dos alunos que estão se tornando inadimplentes, seja por falta de pagamento ou por não renovação do contrato | -O administrador deve ser capaz de selecionar o aluno que esteja cumprindo ou não as informações de contrato; | ❌  |  |  |
| 21 | Eu, como administrador, quero me comunicar com os devidos alunos e/ou responsáveis para avisá-los de algum impasse que possa surgir. | - O Administrador deve ser capaz de escrever um comunicado;</br>- Campos obrigatórios precisam estar preenchidos para envio de comunicado (Título e Mensagem); | ❌ |  |  |
| 22 | Eu, como administrador, quero ter a oportunidade de deletar um comunicado para excluí-lo da plataforma | - O aviso deve ser excluídos da base de dados;</br>- Deve haver uma confirmação para o administrador conferir se realmente deseja excluir o aviso. | ❌ |  |  |
| 23 | Eu, como administrador, quero editar os avisos do mural para atualiza-los, caso mande algo por engano. | Campos obrigatórios precisam estar preenchidos para alteração de dados do aviso (Título e Mensagem); | ❌ |  |  |


### Sistema

- Testa o comportamento de todo um sistema, simulando sua utilização real
- Funcionamento como um todo
- Verifica se atende aos requisitos
- Verifica se atende aos padrões de qualidade
- O teste de sistema é realizado para verificar se o sistema de software completo, incluindo todos os componentes e módulos, funciona conforme o esperado. Ele é executado depois que todos os componentes do sistema são integrados e testados individualmente. O objetivo principal é identificar problemas de integração entre os componentes, garantir que o sistema funcione corretamente como um todo e verificar se atende aos requisitos especificados. O teste de sistema é realizado pelos desenvolvedores ou testadores antes de o software ser entregue para o teste de aceitação.
- RF e RNF

| US | Requisitos Funcionais | Critérios de aceitação | Critérios ok? | DoR | DoD | Obs. |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Eu, como administrador, quero ser capaz de realizar o cadastro de alunos para que possam ser matriculados. | - Campos obrigatórios precisam estar preenchidos para cadastramento de dados do aluno (Nome, Sobrenome, Data de Nascimento , CPF, RG, PCD, Tipo de deficiência e Gênero);</br>- O sistema deve verificar se não há outros alunos com o mesmo CPF, RG e e-mail | ❌ | ✅ |  ❌ |  |
| 2 | Eu, como administrador, quero ser capaz de realizar o cadastro de professores, para que seus dados sejam salvos. | - Campos obrigatórios precisam estar preenchidos para cadastramento de dados do professor (Nome, Sobrenome, Data de Nascimento , CPF, RG, PCD, Tipo de deficiência e Gênero);</br>- O sistema deve verificar se não há outro professor com o mesmo CPF, RG e e-mail; | ✅ | ✅ | ✅ |  |
| 3 | Eu, como administrador, quero ser capaz de realizar a atualização do perfil de professores para manter seus dados sempre atualizados | - Campos obrigatórios precisam estar preenchidos para alteração de dados do professor (Nome, Sobrenome, Data de Nascimento , CPF, RG e Gênero);</br>- O sistema deve verificar se não há outro professor com o mesmo CPF, RG e e-mail; | ✅ | ✅ | ✅ |  |
| 4 | Eu, como administrador, quero ser capaz de realizar a atualização do perfil de alunos para manter seus dados sempre atualizados. | - Campos obrigatórios precisam estar preenchidos para alteração de dados do aluno (Nome, Sobrenome, Data de Nascimento , CPF, RG, PCD, Tipo de deficiência e Gênero);</br>- O sistema deve verificar se não há outro aluno com o mesmo CPF, RG e e-mail; | ✅ | ✅ | ✅ |  |
| 5 | Eu, como administrador, quero ser capaz de remover o cadastro de professores, para remover do banco de dados os que não fazem mais parte da escola. | - O professor, com seus respectivos dados, devem ser excluídos da base de dados;</br>- Deve haver uma confirmação para o administrador conferir se realmente deseja excluir o perfil do professor | ✅ | ✅ | ✅ |  |
| 6 | Eu, como administrador, quero ser capaz de remover o cadastro de alunos, para remover do banco de dados os que não fazem mais parte da escola. | - Deve haver uma confirmação para o administrador conferir se realmente deseja excluir o perfil do aluno</br>- O administrador removerá o aluno, mas suas aulas e presenças continuarão presentes na base de dados; | ✅ | ✅ | ✅ |  |
| 7 | Eu, como administrador, quero poder acessar a plataforma com e-mail e senha para que eu tenha privacidade e meus dados estejam seguros. | - O usuário deverá ter um CPF e senha registrados para conseguir acessar o sistema.</br>- O usuário deverá receber uma confirmação de acesso, caso suas credenciais estejam corretas. | ✅ | ✅ | ✅ |  |
| 8 | Eu, como administrador, quero recuperar minha senha, caso eu esqueça, para acessar a plataforma | - O usuário deverá fornecer seu e-mail, CPF e data de nascimento para que uma nova senha seja enviada via correio eletrônico;</br>- O usuário deverá trocar a senha temporária após entrar na aplicação; | ✅ | ✅ | ✅ |  |
| 9 | Eu, como administrador, quero ter a opção de cadastrar novas salas de aula na minha escola para hospedagem das turmas | - O administrador deverá informar as características da sala: nome da sala, descrição da sala e capacidade de alunos;</br>- O administrador não poderá hospedar uma aula numa sala que não foi criada; | ✅ | ✅ | ✅ |  |
| 10 | Eu, como administrador, quero ter a opção de gerenciar as salas de aula existentes na minha instituição, para possíveis alterações de turmas, aulas e ensaios musicais | - Não será possível editar uma sala não cadastrada; | ✅ | ✅ | ✅ |  |
| 11 | Eu, como administrador, quero ter a opção de agendar as aulas dos alunos, para que sejam registradas na agenda do professor | - Não será possível registrar uma aula em uma sala não existente; | ✅ | ✅ | ✅ |  |
| 12 | Eu, como administrador, quero ter a opção de editar as aulas dos alunos, para que sejam atualizadas na agenda, caso já tenham sido marcadas. | - Campos obrigatórios precisam estar preenchidos para alteração de dados da Agenda (Número da Sala, Data da Aula, Professor, Estudante);</br>- O Administrador deve visualizar as alterações realizadas;</br>- As alterações devem ser salvas no banco de dados; | ✅ | ✅ | ✅ |  |
| 13 | Eu, como administrador, quero ter a opção de excluir as aulas dos alunos, para que sejam removidas da agenda do professor. | - Deve haver uma confirmação para o administrador conferir se realmente deseja excluir a aula desejada;</br>- Deve ser exibido um alert confirmando a exclusão da aula; | ✅ | ✅ | ✅ |  |
| 14 | Eu, como administrador, devo registrar novas aulas com alunos e professores para ter controle de organização | -Para agendar, devem ser solicitados: nome do professor, horário;</br>- O horário escolhido deverá estar de acordo com o horário de funcionamento das aulas;</br>- O administrador deve realizar um agendamento de aula sem que o software permita horários que se choquem;</br>- As aulas agendadas devem ser registradas no banco de dados;</br>- O administrador deve ver a confirmação do agendamento; | ✅ | ✅ | ✅ |  |
| 15 | Eu, como administrador, quero ter a opção de visualizar a agenda. | - O administrador deve conseguir filtrar as aulas agendadas por dia, mês e ano;</br>- Deve ser possível visualizar o nome do professor que dará a aula;</br>- Deve ser visível uma área para edição da aula agendada;</br>- Deve ser visível uma área para remoção da aula agendada; | ✅ | ✅ | ✅ |  |
| 16 | Eu, como administrador, quero ter o controle de frequência dos alunos na aula para que eu saiba quem precisa repor as aulas | - O Administrador deve conseguir registrar a presença do aluno desejado;</br>- Deve ser exibido um alert ao registrar a presença para o aluno; | ✅ | ✅ | ✅ |  |
| 17 | Eu, como administrador, quero poder registrar o pagamento da mensalidade de cada aluno na plataforma, para obter um controle dos pagamentos. | - Devem ser selecionado se a situação do aluno está em débito ou se já está pago; | ✅ | ✅ | ✅ |  |
| 18 | Eu, como administrador, quero gerar um contrato de prestação de serviços para cada aluno no ato da matrícula, para que esse processo não seja feito de forma manual. | - O Administrador deve conseguir gerar o contrato acessando a aba de ferramentas da plataforma;</br>- Devem ser preenchidos os campos obrigatórios (valor do contrato, quantidade de parcelas) para que o contrato seja gerado;</br>- O Contrato deve ser gerado em formato .pdf;</br>- Deve ser exibido o modelo de contrato antes do administrador gerar;- | ✅ | ✅ | ✅ |  |
| 19 | Eu, como administrador, quero que o contrato de cada aluno seja enviado por e-mail, para que o aluno tenha acesso às informações contidas no mesmo | - O contrato deve ser enviado via e-mail assim que o administrador cadastrar um novo aluno;</br>- O contrato deve ser enviado via e-mail até, no máximo 30 minutos; | ✅ | ✅ | ❌ | Débito Técnico; |
| 20 | Eu, como administrador, quero verificar a situação de cada aluno em relação ao cumprimento ou descumprimento do contrato, para ter noção dos alunos que estão se tornando inadimplentes, seja por falta de pagamento ou por não renovação do contrato | - O administrador deve ser capaz de visualizar o aluno que esteja cumprindo ou não as informações de contrato; | ✅ | ✅ | ✅ |  |
| 21 | Eu, como administrador, quero me comunicar com os devidos alunos e/ou responsáveis para avisá-los de algum impasse que possa surgir. | - O Administrador deve ser capaz de escrever um comunicado;</br>- Campos obrigatórios precisam estar preenchidos para envio de comunicado (Título e Mensagem); | ✅ | ✅ | ✅ |  |
| 22 | Eu, como administrador, quero ter a oportunidade de deletar um comunicado para excluí-lo da plataforma | - O aviso deve ser excluídos da base de dados;</br>- Deve haver uma confirmação para o administrador conferir se realmente deseja excluir o aviso. | ✅ | ✅ | ✅ |  |
| 23 | Eu, como administrador, quero editar os avisos do mural para atualiza-los, caso mande algo por engano. | Campos obrigatórios precisam estar preenchidos para alteração de dados do aviso (Título e Mensagem); | ✅ | ✅ | ✅ |  |

### Usabilidade

- Verifica se o usuário consegue entender e fazer uso da aplicação de maneira como foi acertada entre cliente e equipe técnica
- O teste de usabilidade avalia a facilidade de uso de um sistema ou software. Ele se concentra na experiência do usuário, testando a interface do usuário, a navegabilidade e a capacidade do software de atender às necessidades dos usuários de maneira eficaz e eficiente. Os testadores geralmente realizam testes com usuários reais, observando suas interações e coletando feedback para identificar problemas de usabilidade e possíveis melhorias.
- Teste de aceitação
- [https://docs.google.com/forms/d/e/1FAIpQLSffcmpjy3HfmzuOaGY8VeOQyE6M23c1rCxPgYdtssvA__Uexw/viewform?usp=sf_link](https://docs.google.com/forms/d/e/1FAIpQLSffcmpjy3HfmzuOaGY8VeOQyE6M23c1rCxPgYdtssvA__Uexw/viewform?usp=sf_link)

### Confiabilidade

- Verifica se o sistema consegue manter o padrão de desempenho estabelecido quando é utilizado dentro das funções previstas
- O teste de confiabilidade tem como objetivo avaliar a capacidade de um sistema ou software de manter seu desempenho em condições específicas e por um determinado período de tempo. Ele envolve a execução repetida de testes funcionais em diferentes ambientes e cenários para identificar falhas, erros de programação, vazamentos de memória ou problemas de estabilidade. O objetivo é garantir que o software seja robusto e confiável, mesmo em condições adversas ou durante períodos prolongados de uso.
- Sistema → Manual e caixa branca
- Analisar e escrever

| RNF | Requisitos | Passou? | Obs. |
| --- | --- | --- | --- |
| 08 | A aplicação deve proporcionar um ambiente suficientemente seguro para garantir que apenas aqueles registrados no sistema tenham acesso a ele. | ✅ |  |
| 09 | A aplicação deve possuir Política de Privacidade clara e transparente para com o cliente | ✅ |  |

### Suportabilidade

- Verifica a facilidade com a qual o software pode passar por mudanças
- O teste de suportabilidade (ou teste de manutenção) avalia a facilidade com que um sistema ou software pode ser mantido, atualizado e corrigido após ser implantado em produção. Ele se concentra na capacidade do software de ser modificado e mantido, sem afetar negativamente sua funcionalidade ou integridade. Os testadores geralmente realizam testes para verificar a capacidade de manutenção, a escalabilidade do sistema, a facilidade de aplicação de correções e atualizações, além da documentação adequada e outros aspectos relacionados à sustentabilidade a longo prazo do software.
- Manual; Caixa Branca

| RNF | Requisitos | Dor | DoD | Passou? | Obs. |
| --- | --- | --- | --- | --- | --- |
| [RNF07] | A aplicação deve ser compatível com as versões de até Junho de 2023 dos navegadores modernos como Chrome, Safari, Edge, Firefox, e Opera. | ✅ | ✅ | ✅ |  |

| Navegadores | É compatível? |
| --- | --- |
| Chrome | ✅ |
| Safari | ✅ |
| Edge  | ✅ |
| Firefox | ✅ |
| Brave | ✅ |