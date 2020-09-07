cards_v = `
    <grupo class="hide"><%= grupo %></grupo>
    <div class="cards-v row fundobacks">

        <div id="navbar_comum">            
        </div>

        <div id="submenutabs">            
        </div>

        <div id="all_tabs">
        </div>    
  </div>
`


evento_v = `
<div class="row fundobacks">
    <div style="position: fixed;background-color: #781866;z-index: 99;width: 100%;">
        <nav>
            <div class="nav-wrapper" style="padding: 0 2rem">
                <div class="row margin left">
                    <a class="white-text" ><%= evento.tipo_projeto%></a>
                </div>
            </div>
            <a  data-activates="slide-out" class="btn-medium button-collapse right"><i class="material-icons white-text">menu</i></a>
        </nav>
    </div>
    <div class="row" style="position: absolute;top:55px;width: 100%;">
        <div class="main" style="margin-top: 0%;">
            <div class="row" style="border-style: solid;border-width: 1px;padding: 1.5%;margin-bottom: 0%;">         
                <div class="row" style="border-style: solid;border-width: 1px;border-color: #cccccc;margin-bottom: 0%;">
                    <div class="row" style="border-bottom: solid;border-width: 1px;border-color: #cccccc;">                    
                        <div class="row">
                            <img src="<%= caminho%>" alt="" style="height: 165px;">
                        </div>                        
                        <div class="row">
                            <div class="row" style="margin-left: 3%;font-size: 120%;margin-top: -6.7%; line-height: 120%;">
                                <%= evento.grupo%>
                            </div>
                            <div class="row" style="font-size: 70%;margin-left: 3.5%;margin-top: -5.9%;">
                                <%= evento.dia%> de <%= evento.mes%> de <%= evento.ano%>
                            </div>
                        </div>
                        
                        <div class="row col s12" style="margin-left: -4.5%;margin-bottom: -7.5%;margin-top: -3%;">
                            <div class="row col s9">
                                <div class="row" style="line-height: 100%;">
                                    <div class="row" style="font-size: 70%;margin-left: 3%;margin-top: -6%;font-weight: bold;">
                                        LOCAL
                                    </div>
                                    <div class="row" style="font-size: 90%;margin-left: 3%;margin-top: -10%;margin-bottom: -2%;">
                                        <%= evento.local_projeto%><br>   
                                        <%= evento.logradouro%>, <%= evento.numero%> - <%= evento.bairro%> 
                                    </div>
                                </div>
                            </div>
                            <div class="row col s3 center">
                                <i class="Small material-icons" style="margin-left: 16%;margin-top: -14%;font-size: 250%;">query_builder</i>
                            </div>   
                        </div>
                    </div>
                    
                    <div class="col s12" style="margin-left: -4%;">
                        <div class="row col s8">
                            <div class="row">
                                <div class="row" style="font-size: 70%;margin-left: 3%;margin-top: -2%;font-weight: bold;">
                                    NOME PARTICIPANTE
                                </div>
                                <div class="row" style="font-size: 100%;margin-left: 3%;margin-top: -12%;margin-bottom: -2%;">
                                    <%= evento.nome%>
                                </div>
                            </div>
                            <div class="row">
                                <div class="row" style="font-size: 70%;margin-left: 4%;margin-top: -2%;font-weight: bold;">
                                    EMPRESA
                                </div>
                                <div class="row" style="font-size: 100%;margin-left: 4%;margin-top: -12%;margin-bottom: -2%;">
                                    <%= evento.abreviado %>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row col s3" style="transform: translateX(46.5%);margin-top: 1.5%;">
                            <a href="#!user"><img class="circle circle_eve" src="<%= login.foto%>"></a>
                        </div>
                        
                    </div>
                    
                    <div class="row" style="margin-bottom: 0%;">
                        <div class="row center" style="margin-top: 7%;">
                            <img src="<%= qrcode%>" alt="" style="height: 200px;">
                        </div>
                        <div class="row center">
                            <a href="http://liveulabs.com:8089/wallet?id_contato=<%= login.id%>&id_projeto=<%= evento.id_projeto%>">    
                                <img src="<%= wallet%>" alt="" style="height: 50px;">
                            </a>
                        </div>
                        
                    </div>
                </div>                
            </div>     
        </div>
    </div>
</div>
`

var temp = `<div class="row" style="position: absolute;top:110px;width: 100%;">
<div class="row">
  <div id="test1">
    <div class="row">
      <!-- Tela 1 -->
      <% var parada_hoje = true %>
      <% var load_friends_on = false %>
      <% var calendario_friends = null %>
      <% var avaliar_status = false %>

      <% for(var i = 0; i < aulas.length; i++){ %>
          <% var opop = '' %>
          <% var hoje = new Date() %>
          <% hoje = (hoje.getDate() * 1) + ((hoje.getMonth() + 1) * 30) + (hoje.getFullYear() * 365) %>
          <% var data = aulas[i].data.split('/') %>
          <% data = (data[0] * 1) + (data[1] * 30) + (data[2] * 365) %>
          <% if(hoje > data){ %>
              <% data = -1 %>
          <% } else if( hoje == data ) { %>
              <% data = 0 %>
          <% } else { %>
              <% data = 1 %>
          <% } %>

          <% if(aulas[i+1] && (data == 0 || data == 1)  && parada_hoje) { %>
              <div class="col s12 m12" id="parada_hoje"></div>
              <% parada_hoje = false %>
          <% } %>
          <% if((i + 1) == aulas.length && parada_hoje) { %>
              <div class="col s12 m12" id="parada_hoje"></div>
              <% parada_hoje = false %>
          <% } %>
          <div class="col s12 m12">
              <div class="card" id-calendario-aula="<%= aulas[i].id_calendario_aulas %>">
                  <div class="card-image">
                      <% if(data == -1) { %>
                          <% if(aulas[i].presenca == null){ %>
                              <img src="image/vermelho.png" class="circle_icon">
                              <a class="btn-floating halfway-fab red"><i class="material-icons">event_busy</i></a>
                          <% } else if(aulas[i].nota == null) { %>
                              <img src="image/amarelo.png" class="circle_icon">
                              <a onclick="avaliar(<%= aulas[i].id_calendario_aulas %>)" class="btn-floating halfway-fab yellow pulse"><i class="material-icons">priority_high</i></a>
                              <% opop = 'avaliar' %>
                              <% avaliar_status = true %>
                          <% } else { %>
                              <% if (aulas[i].nota == 0.11) { %>
                                      <img src="image/verde.png" class="circle_icon">
                                      <a class="btn-floating halfway-fab green">
                                          <div class="center-align white-text">-</div>
                                      </a>
                              <% } else { %>
                                      <img src="image/verde.png" class="circle_icon">
                                      <a class="btn-floating halfway-fab green">
                                          <div class="center-align white-text"><%= aulas[i].nota %></div>
                                      </a>
                              <% } %>
                          <% } %>
                      <% } else if (data == 1) { %>
                          <img src="image/azul.png" class="circle_icon">
                          <a class="btn-floating halfway-fab blue"><i class="material-icons">event_available</i></a>
                      <% } else if (data == 0 && avaliar_status) { %>
                          <img src="image/azul.png" class="circle_icon">
                          <a class="btn-floating halfway-fab blue"><i class="material-icons">event_available</i></a>
                      <% } else { %>
                          <% if(aulas[i].presenca == null && periodo == 1) { %>
                              <img src="image/amarelo.png" class="circle_icon">
                              <a onclick="check_in(<%= aulas[i].id_calendario_aulas %>)" class="btn-floating halfway-fab yellow pulse"><i class="material-icons">place</i></a>
                              <% opop = 'checkin' %>
                          <% } else if (aulas[i].presenca == null && periodo == 2 && new Date().getHours() >= 19) { %>
                              <img src="image/amarelo.png" class="circle_icon">
                              <a onclick="check_in(<%= aulas[i].id_calendario_aulas %>)" class="btn-floating halfway-fab yellow pulse"><i class="material-icons">place</i></a>
                              <% opop = 'checkin' %>
                          <% } else if (aulas[i].presenca == true && aulas[i].nota == null) { %>
                              <img src="image/amarelo.png" class="circle_icon">
                              <a onclick="avaliar(<%= aulas[i].id_calendario_aulas %>)" class="btn-floating halfway-fab yellow pulse"><i class="material-icons">priority_high</i></a>
                              <% opop = 'avaliar' %>
                              <% avaliar_status = true %>
                          <% } else if (aulas[i].presenca == true && aulas[i].nota != null) { %>
                              <img src="image/verde.png" class="circle_icon">
                              <a class="btn-floating halfway-fab green">
                                  <div class="center-align white-text"><%= aulas[i].nota %></div>
                              </a>
                          <% } else { %>
                              <img src="image/azul.png" class="circle_icon">
                              <a class="btn-floating halfway-fab blue"><i class="material-icons">event_available</i></a>
                          <% } %>
                      <% } %>
                  </div>
                  <div class="card-content">
                      <div class="div_data">
                          <p class="data">
                              <i class="material-icons data_icon">event</i>
                                  <span><%= aulas[i].data %></span>
                                  &nbsp
                              <i class="material-icons data_icon">access_time</i>
                                  <span>
                                      <%= aulas[i].horario_entrada + ' - ' %> 
                                      <%= aulas[i].horario_saida %>
                                  </span>
                          </p>
                          <h6 class="professor"><i class="material-icons data_icon">record_voice_over</i> <%= aulas[i].professor%></h6>
                      </div>
                      <div>
                          <h7 class="tituloa"><%= aulas[i].modulo%></h7>
                          <h6 class="titulob"><%= aulas[i].aula%></h6>
                      </div>
                  </div>
                  <div class="arquivos">
                      <% for(var a = 0;a < aulas[i].arquivos.length;a++) { %>
                          <div class="arquivo" onclick="window.location.href='<%= aulas[i].arquivos[a].caminho %>'">
                              <i class="material-icons">cloud_download</i><%= aulas[i].arquivos[a].arquivo %>
                          </div>
                      <% } %>
                  </div>

                  <div class="users" style="padding: 8px; display:none;">
                  </div>
                  
                  <!-- Parte de Baixo -->
                  <% if(opop == 'avaliar') { %>
                      <div class="card-action center" id="falta_avaliacao">
                          <a onclick="avaliar(<%= aulas[i].id_calendario_aulas %>)" >Avaliação pendente</a>
                      </div>
                      <% load_friends_on = true %>
                      <% calendario_friends = aulas[i].id_calendario_aulas %>
                  <% } %>

                  <% if(opop == 'checkin' && !avaliar_status) { %>
                      <div class="card-action center">
                          <a onclick="check_in(<%= aulas[i].id_calendario_aulas %>)" >Check-in na aula</a>
                      </div>
                      <% load_friends_on = true %>
                      <% calendario_friends = aulas[i].id_calendario_aulas %>
                  <% } %>

              </div>
          </div>
      <% } %>

      <% if(load_friends_on) { %>
          <load_friends style="display:none"><%= calendario_friends %></load_friends>
      <% } %>

      <!-- FIM Tela 1 -->
    </div>
  </div>
  <div id="test2" class="col s12" style="padding: 0px; margin-top: -15px">
      <!-- aba2 ************************************************* -->
      <div class="row">
      <!-- inside -->
      <% for(var i = 0; i < notas.length; i++) { %>
      <% var faltas = notas[i].dia.reduce( (a,b) => { %>
      <%     if(b.presenca == false){ %>
      <%         return a + 1 %>
      <%     } else { %>
      <%         return a %>
      <%     } %>
      <% }, 0) %>

      <% if(faltas > notas[i].limite || (notas[i].nota != null && notas[i].nota < 5) ) { %>
          <div class="col s12 m12 notfalbad" style="margin-top: 20px;">
              <div class="row" style="border: 1px solid #EEEEEE; border-top: 4px solid #912D2C;">
      <% } else if (notas[i].nota != null) { %>
          <div class="col s12 notfalok" style="margin-top: 20px;">
              <div class="row" style="border: 1px solid #EEEEEE; border-top: 4px solid #92b632;">
      <% } else { %>
          <div class="col s12 notfal" style="margin-top: 20px;">
              <div class="row" style="border: 1px solid #EEEEEE; border-top: 4px solid #334491;">
      <% } %>
              <div class="fundo white col s12 container">
                  <div class="row">
                          <div class="col s12">
                              <div class="row modulo">
                                  <h6><%= notas[i].descricao %></h6>
                              </div>
                          </div>
                  </div>

                  <div class="col s12" style="padding: 0px !important;height: 65px;">
                      <div class="col s10" style="padding: 0px !important;">
                          <div class="magic">
                          <% notas[i].dia.forEach(function(dia){ %>
                                  <% if(dia.presenca == false){ %>
                                      <div class="red">
                                  <% } else if(dia.presenca == true){ %>
                                      <div class="green">
                                  <% } else { %>
                                      <div class="blue">
                                  <% } %>

                                  <div style="text-align: center; display:none">
                                      <div class="semana"><%= dia.semana %></div>
                                      <div class="dia"><%= dia.dia %></div>
                                      <div class="ano"><%= dia.ano %></div>
                                  </div>
                              </div>

                          <% }) %>
                          </div>
                      </div>
                      <div class="col s2" style="text-align: center;padding: 0px;">
                          <div style="background-color: white;height: 65px;border-radius: 2px;">
                              <div class="row">
                                  <span style="font-size: 0.6rem;margin: 0px;">NOTA</span>
                              </div>
                              <div class="row">
                                  <% if(notas[i].nota != null) { %>
                                      <span style="font-size: 2.5rem;margin: 0px;font-family: Nunito;top: -12px;position: relative;"><%= notas[i].nota %></span>
                                  <% } else { %> 
                                      <span style="font-size: 2.5rem;margin: 0px;font-family: Nunito;top: -12px;position: relative;">-</span>
                                  <% } %>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div class="row">
                      <div class="gray col s12 rodape">
                          <h6>Limite de Faltas: <%= notas[i].limite %></h6>
                      </div>
                  </div>

              </div>
          </div>
      </div>

      <% if(faltas == notas[i].limite) { %>
          <div class="col s12 alerta">
              <i class="material-icons red-text" style="vertical-align: middle;">event_busy</i>
              <span class="red-text">CUIDADO!!! Você não pode mais faltar nesse módulo!</span>
          </div>
      <% } %>

      <% if(faltas > notas[i].limite) { %>
          <div class="col s12 alerta">
              <i class="material-icons red-text" style="vertical-align: middle;">event_busy</i>
              <span class="red-text">Você estourou o limite de faltas!</span>
          </div>
      <% } %>

      <% } %>

      <!-- end inside -->
      </div>
      <!-- end aba 2 -->

  </div>
</div>
</div>`