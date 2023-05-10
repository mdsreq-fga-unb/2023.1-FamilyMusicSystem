# Padrões de interface

|    Data    | Versão |                             Descrição                              |  Autor(es)   |
| :--------: | :----: | :----------------------------------------------------------------: | :----------: |
| 09/05/2023 |  0.1   | Criação e estruturação da primeira versão dos Padrões de interface | Maykon Júnio |

## Paleta de cores

<p style="text-indent: 50px;text-align: justify;">
A identidade visual da marca <b><i>Family Music School</i></b>, produzida em meados de 2022, foi a base para a escolha de cores, fontes e ícones. Contendo uma paleta de cores mais relacionada a tons pastéis (verde, amarelo e azul), mas tendo boa presença com tons de mais contraste (preto, branco e laranja), o produto tem a característica de aplicar dois temas, sendo um claro e o outro <b>escuro</b>.</p>

<p style="text-indent: 50px;text-align: justify;">Seguem as combinações de cada tema.</p>

### Tema claro

</br>
![cores-claro](https://github.com/mdsreq-fga-unb/2023.1-FamilyMusicSystem/assets/89596623/7a57ac2b-756c-4f90-a507-8fe8bb7a050a)
</br>

### Tema escuro

</br>
![cores-escuro](https://github.com/mdsreq-fga-unb/2023.1-FamilyMusicSystem/assets/89596623/010cda2d-3c2d-4755-96b7-daa06cb6e29c)
</br>

## Tipografia

<p style="text-indent: 50px;text-align: justify;">
A fonte selecionada para compor o projeto está de acordo com o guia de estilo da marca, casando de maneira satisfatório com o produto. A mesma está presente em 4 diferentes tipos de proporções, podendo ser observada abaixo.
</p>
<p align="center">
<img src="https://github.com/mdsreq-fga-unb/2023.1-FamilyMusicSystem/assets/89596623/f9b7ec1a-7db7-4900-8645-461bff29793e"/>
</p>

## Icones

<p style="text-indent: 50px;text-align: justify;">
Os icones utilizados no produto podem ser encontrados na biblioteca de ícones do Material Design Google, onde é permitido que os mesmos sejam amplamente incorporados em projetos sob a <a href="https://www.apache.org/licenses/LICENSE-2.0.txt">Apache License versão 2.0</a>.
Segue uma amostra do padrão de icones utilizados.
</p>
</br>
<p align="center">
<img src="https://github.com/mdsreq-fga-unb/2023.1-FamilyMusicSystem/assets/89596623/9f27bdbc-83bc-4345-98fc-10943e6c34d0"/>
</p>

## Componentes

<p style="text-indent: 50px;text-align: justify;">
O produto foi idealizado contendo quatro componentes estruturando a tela principal, sendo um <b><i>Header</i></b>, um <b><i>Content</i></b>, uma <b><i>SideBar</i></b> e um <b><i>Footer</i></b>. Vale destacar que todos os componentes foram projetados levando em consideração a teoria <b><i>8pt grid</i></b>, onde são aplicadas em todas as dimenções proporções multiplas de oito. Confira abaixo uma descrição de cada componente bem como a <b>tela de <i>login</i></b> da aplicação.
</p>

### Tela de Login

<p style="text-indent: 50px;text-align: justify;">
A funcionalidade destinada para a tela de login é a de autenticação de usuários pré-cadastrados no sistema pelo <i>Super-Usuário</i>. Também está presente nesta a funcionalidade de recuperação do senha, que após acessada abre um modal com mais informações de recuperação via email.
</p>

### Header

<p style="text-indent: 50px;text-align: justify;">
O Header do produto tem a função de conter itens que possam auxiliar o usuário durante a navegação do site, estando sempre fixos e de fácil acesso. A função de cada ferramenta pode ser descrita como:
<ul>
<li>
<b>Botão de ajuda</b> -> tem a função de abrir um modal com mais informações sobre o site, bem como um manual de uso de fácil acesso e o contato do <i>Super-Usuário</i>.
</li>
<li>
<b>Botão de sair</b> -> tem a função de abrir um modal de questionamento para confirmar a finalização de sessão, retornando para a tela de login após a confirmação.
</li>
<li>
<b>Botão de troca de tema</b> -> tem a função de trocar o tema.
</li>
<li>
<b>Botão do perfil do usuário</b> -> tem a função de expandir as informações do perfil do usuário atual.
</li>
</ul>
</p>

### SideBar

<p style="text-indent: 50px;text-align: justify;">
Componente de navegação localizado à esquerda da tela, tem como objeto conter os tópicos que derivam todos os outros. Elementos presentes no menu:
</p>

<p style="text-indent: 50px;text-align: justify;">
<ul>
<li>
<b>Home</b> -> destinado ao conteúdo principal com elementos de apresentação e redirecionamento;
</li>
<li>
<b>Alunos</b> -> destinado ao conteúdo ao acompanhamento de alunos, bem como cadastro, edição e visualização;
</li>
<li>
<b>Professores</b> -> destinado ao conteúdo ao acompanhamento de professores, bem como cadastro, edição e visualização;
</li>
<li>
<b>Salas</b> -> destinado ao conteúdo ao acompanhamento de salas, bem como cadastro, edição e visualização;
</li>
<li>
<b>Agenda</b> -> destinado ao conteúdo ao acompanhamento de agendamentos, onde são encontrados os horários definidos e CRUD;
</li>
<li>
<b>Mural</b> -> destinada para avisos aos usuários do sistema, bem como seu respectivo CRUD;
</li>
<li>
<b>Preferências</b> -> destinada para os ajustes do sistema, como o gerenciamento de cargos, a troca de senha e as informações do usuário;
</li>
</ul>
</p>

### Content

<p style="text-indent: 50px;text-align: justify;">
Componente onde será exibido o conteúdo do tópico selecionado, tem a função de ser o corpo da página maleável, sendo alterado de acordo com a escolha no menu de navegação.
</p>

### Footer

<p style="text-indent: 50px;text-align: justify;">
Componente destinado a conter as informções de Copyright, bem como o ano de desenvolvimento e redes sociais do cliente. 
</p>
