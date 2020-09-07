var inicial_v = `
<div class="container tela-inicial telas-inicial-1">

  <h4>Qual tipo de curso você quer começar?</h4>

  <ul class='center' >
    <li onclick="load_inicial_pos()">Pós-Graduação</li>
    <li onclick="load_inicial_rapido()">Curso Rápido</li>
  </ul>

  <div class="sou-aluno valign-wrapper" onclick="change_view(tela_01_v, false)">Home <i class="material-icons">keyboard_arrow_right</i></div>

</div>
`

var inicial_pos_v = `
<div class="container tela-inicial telas-inicial-2">

  <i class="material-icons" onclick="loading_tela_tutorial()">keyboard_arrow_left</i>

  <h4>Fantástico! <br/> Escolha a Pós que mais lhe interessa:</h4>

  <ul class='center'>
    <% for (var i = 0; i < lista.length; i++){%>
      <%if(lista[i].tipo == 1 && lista[i].status == 1 ){%>
        <li onclick="load_cadastro_login(<%=lista[i].id_projeto%>)"><%=lista[i].nome_projeto%></li>
      <%}%>
    <%}%>
  </ul>

  <div class="sou-aluno valign-wrapper" onclick="change_view(tela_01_v, false)">Home <i class="material-icons">keyboard_arrow_right</i></div>

</div>
`


var inicial_rapido_v = `
<div class="container tela-inicial telas-inicial-2">

  <i class="material-icons" onclick="loading_tela_tutorial()">keyboard_arrow_left</i>

  <h4>Fantástico! <br/> Escolha o que mais lhe interessa:</h4>

  <ul class='center'>
    <% for (var i = 0; i < lista.length; i++){%>
      <%if(lista[i].tipo == 2 && lista[i].status == 1 ){%>
        <li onclick="load_cadastro_login(<%=lista[i].id_projeto%>)"><%=lista[i].nome_projeto%></li>
      <%}%>
    <%}%>
  </ul>

  <div class="sou-aluno valign-wrapper" onclick="change_view(tela_01_v, false)">Home <i class="material-icons">keyboard_arrow_right</i></div>

</div>
`

var inicial_criar_login_v = `
<div class="container tela-inicial telas-inicial-3">  

  <h4 style="margin-top: 5%">Excelente Escolha!</h4>

  <h5>Digite seu nome e e-mail e crie uma senha para começar a assistir!</h5>

  <div class="row">
    <div class="col s12 input-field">
      <i class="material-icons prefix">person_outline</i>
      <label for="nome">Nome</label>
      <input type="text" id="nome">
    </div>
    <div class="col s12 input-field">
      <i class="material-icons prefix">email</i>
      <label for="email">E-mail</label>
      <input type="email" id="email">
    </div>
    <div class="col s12 input-field">
      <i class="material-icons prefix">lock</i>
      <label for="senha">Senha</label>
      <input type="password" id="senha">
    </div>
    <input class="hide" type="text" id="id_projeto" value="<%=id_projeto%>">
  </div>

  <div class="tela-inicial-video" onclick="inscricao_tutorial_trial()">
      Assistir a Aula
      <i class="right medium material-icons">play_circle_outline</i>
  </div>

  <div class="sou-aluno valign-wrapper" onclick="change_view('back')"><i class="material-icons">keyboard_arrow_left</i>Voltar</div>

</div>
`

