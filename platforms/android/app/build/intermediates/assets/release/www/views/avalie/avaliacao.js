var avaliacao_v = `
    <div class="arrumar-fundo"></div>
    <div class="row fundobacks maine">
        <div style="background-color: #781866;z-index: 99;width: 100%;">
            <nav>
                <div class="nav-wrapper" style="padding: 0 2rem">
                    <div class="row margin left">
                        <a href="home.html" class="white-text"><i class="material-icons left margin white-text">chevron_left</i><%= curso.grupo %></a>
                    </div>
                </div>
            </nav>
        </div>
        <div class="row background" style="position: absolute;top:60px;width: 100%;">
            <div class="input-field center">
                <div class="row white-text-inside" style="margin-bottom:5%;">
                    <h5>Avalie a aula</h5>
                    <h6><%= aula.aula %></h6>
                </div>

                <div class="row hide">
                    <h1 id="value_slide"></h1>
                </div>

                <div class="row">
                    <img class="nota" src="image/boneco-avaliacao/inicial.svg" alt="">
                </div>

                <div class="row" id="slider">

                </div>

                <div class="input-field col s8 offset-s2" style="margin: 10% none;">
                    <a onclick="avaliacao(this)"  class="btn btn-large waves-effect waves-light col s12" style="background-color: #4bb0b8;border-radius: 40px;">Avaliar</a>
                </div>

            </div>
        </div>
    </div>
`