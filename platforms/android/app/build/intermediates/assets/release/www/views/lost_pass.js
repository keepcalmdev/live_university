var lost_pass_v = `
<img class="image-background" src="./image/background.svg" alt="background">
    <div class="lost-pass-v firstscreen-v background">
    <div class="row fundobacks">
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <div class="row margin left">
                        <a  onclick="change_view('back')"><i class="material-icons left margin">chevron_left</i>voltar</a>
                    </div>
                </div>
            </nav>
        </div>
        <div class="row">
            <div class="input-field col s12 center">
                <div class="main">
                    <form class="login-form">
                        <div class="row margin">
                            <div class="input-field col s12 center">
                                <img src="image/esqueci_senha.svg" alt="" class="responsive-img valign" style="width: 80px;">
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12 center">
                                <h6>Digite seu email cadastrado,</h6>
                                <h6>que eu mando a senha para você!</h6>
                            </div>
                        </div>

                        <div class="row margin_up">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">person_outline</i>
                                <input id="email" type="email" class="validate">
                                <label for="email">e-mail</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <a onclick="lost_pass()"  class="btn btn-large waves-effect waves-light col s12 recuperar" style="background-color: #DEA727;border-radius: 40px;">recuperar</a>
                            </div>
                        </div>

                    </form>
                </div>
                <footer>
                    <div>
                        <i class="material-icons" style="position: relative;top: 5px;">home</i>
                        <a class="white-text" href="index.html">Home</a>
                    </div>
                </footer>
            </div>
        </div>
    </div>
    </div>
`