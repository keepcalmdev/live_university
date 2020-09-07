var login_v = `
<img class="image-background" src="./image/background.svg" alt="background">
<div class="login-v background">
<div class="row fundobacks">
  <div class="input-field col s12 center">
    <form class="login-form">
      <div class="row margin logo">
        <div class="input-field col s12 center">
          <img src="image/logo.svg" alt="" class="responsive-img valign profile-image-login">
        </div>
      </div>
      <div class="row margin">
        <div class="input-field col s12">
          <i class="material-icons prefix">person_outline</i>
          <input id="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row margin">
        <div class="input-field col s12">
          <i class="material-icons prefix">lock_outline</i>
          <input id="password" type="password" class="validate">
          <label for="password">Senha</label>
        </div>
      </div>
      <div class="row margin_up">
        <div class="input-field col s12">
          <a  onclick="login()" class="btn btn-large waves-effect waves-light col s12 btn-entrar">Entrar</a>
          <!-- <a  onclick="open_certificado()" class="btn btn-large waves-effect waves-light col s12 btn-entrar">Entrar</a> -->
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 m6 l6">
          <p class="margin medium-small"><a onclick="change_view(first_time_v, true)"  class="white-text">Primeiro acesso</a></p>
        </div>
        <div class="input-field col s6 m6 l6">
          <p class="margin right-align medium-small"><a onclick="change_view(lost_pass_v, true)"  class="white-text">Esqueci a senha</a></p>
        </div>
      </div>
    </form>
    <footer>
        <div>
            <i class="material-icons alunoFooter">home</i>
            <a class="white-text" href="index.html">Home</a>
        </div>
    </footer>
  </div>
</div>
</div>
`