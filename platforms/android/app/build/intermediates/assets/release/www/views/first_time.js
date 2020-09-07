var first_time_v = `
<img class="image-background" src="./image/background.svg" alt="background">
  <div class="first-time-v firstscreen-v background">
  <div class="row fundobacks">
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper" style="padding: 0 .75rem">
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
                                <img src="image/icon_bem_vindo.svg" alt="" class="responsive-img valign" style="width: 80px;">
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12 center">
                                <h5>Bem Vindo!</h5>
                                <h6>Digite seu e-mail cadastrado conosco</h6>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">person_outline</i>
                                <input id="email" type="email" class="validate">
                                <label for="email">Email</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <a onclick="firsttime(this)" class="btn btn-large waves-effect waves-light col s12" style="background-color: #DEA727;border-radius: 13px;">próximo</a>
                            </div>
                        </div>

                    </form>
                </div>
                <footer>
                    <div>
                        <i class="material-icons" style="position: relative;top: 5px;">fingerprint</i>
                        <a class="white-text" onclick="loading_main()">Já possui login?</a>
                    </div>
                    <div>
                        <i class="material-icons" style="position: relative;top: 5px;margin-top: 10px;">home</i>
                        <a class="white-text" href="index.html">Home</a>
                    </div>
                </footer>
            </div>
        </div>
    </div>
  </div>
`
