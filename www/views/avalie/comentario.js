var comentario_v = `
    <div class="comentario">
        <div class="row fundobacks maine">
            <div style="position: fixed;background-color: #781866;z-index: 99;width: 100%;">
                <nav>
                    <div class="nav-wrapper" style="padding: 0 2rem">
                        <div class="row margin left">
                            <a  class="white-text"><%= curso.grupo %></a>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="row" style="position: absolute;top:55px;width: 100%;">
                <div class="input-field col s12 center">
                    <div class="row">
                        <h6>Me conte como poderiamos melhorar ainda mais!</h6>
                    </div>
                    <div class="row container">
                        <div class="textarea" contenteditable="true">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s8 offset-s2" style="margin: 10% none;">
                            <a onclick="send_comentario(this)"  class="btn btn-large waves-effect waves-light col s12" style="background-color: #4bb0b8;border-radius: 40px;">Avaliar</a>
                        </div>
                    </div>
                    <div class="row">
                        <a href="home.html" style="text-decoration: underline;color:#4bb0b8 !important; font-size: 14px;">Pular</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
`