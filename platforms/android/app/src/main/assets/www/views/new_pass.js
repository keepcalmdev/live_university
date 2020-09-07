var new_pass_v = `
<img class="image-background" src="./image/background.svg" alt="background">
  <div class="new-pass-v firstscreen-v background">
  <style>
        .input-field>i {
            margin-top: 2.5%;
        }

        .margin_up {
            margin-top: 56px !important;
        }
    </style>
    <div class="row fundobacks">
        <div class="row">
            <div class="input-field col s12 center">
                <div class="main">
                    <form class="login-form">
                        <input id="id_contato" class="hide" value="<%= id_contato%>">
                        <input id="email" class="hide" value="<%= email%>">
                        <div class="row margin_up">
                            <div class="input-field col s12 center">
                                <img src="image/criar_senha.svg" alt="" class="responsive-img valign" style="width: 80px;">
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12 center">
                                <h6>Crie uma senha, essa senha será utilizada também ao acesso ao portal do aluno</h6>
                            </div>
                        </div>

                        <div class="row margin">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">lock_outline</i>
                                <input id="password" type="password" class="validate">
                                <label for="password">Senha</label>
                            </div>
                        </div>

                        <div class="row margin">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">lock_outline</i>
                                <input id="re_password" type="password" class="validate">
                                <label for="re_password">Confirme a senha</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <a onclick="new_pass(this)"  class="btn btn-large waves-effect waves-light col s12" style="background-color: #DEA727;border-radius: 40px;">criar senha</a>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
`