var tela_01_v = `
<img class="image-background" src="./image/background.svg" alt="background">
<div class="first-time-v firstscreen-v background">
<div class="row fundobacks">
      <div class="row">
          <div class="input-field col s12 center">
              <div class="main">
                  <form class="login-form">
                      <div class="row">
                          <div class="input-field col s12 center">
                              <h5>Bom ver você aqui.</h5>
                          </div>
                      </div>
                      <div class="row margin">
                          <div class="input-field col s12 center" style="margin-top: 0px; margin-bottom: 0px;">
                              <img src="image/rocket.svg" alt="" class="responsive-img valign" style="width: 120px;">
                          </div>
                      </div>
                      <div class="row">
                          <div class="input-field col s12 center">
                              <h5>Como posso te ajudar?</h5>
                          </div>
                      </div>

                      <div class="row" style="margin-bottom: 0px;">
                          <div class="input-field col s12">
                              <a onclick="loading_main()"  class="btn btn-large waves-effect waves-light col s12" style="background-color: #DEA727;">Já sou aluno</a>
                          </div>
                      </div>

                      <div class="row" style="margin-bottom: 0px;">
                          <div class="input-field col s12">
                              <a onclick="change_view(first_time_v, true)"  class="btn btn-large waves-effect waves-light col s12" style="background-color: #DEA727;">Vou participar de um evento</a>
                          </div>
                      </div>
                      <div class="row" style="margin-bottom: 0px;">
                          <div class="input-field col s12">
                              <a onclick="loading_tela_secundaria()" class="btn btn-large waves-effect waves-light col s12" style="background-color: #DEA727;">Quero conhecer os cursos e eventos</a>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
</div>
`