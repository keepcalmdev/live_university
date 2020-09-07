const meus_eventos_agenda = `
<section id="agenda" class="pos-rel">
    <div class="decoration pos-abs w100 top-0 left-0 z-n1 default-gradient"></div>

    <div id="agenda-alternador" class="alternador flex ai-cen">
        <button class="<%= !existeDataAnterior() ? 'invisivel' : '' %> padding-0 resetButtonStyle flex ai-cen" onclick="mostrarDataAnterior()">
            <i class="material-icons white-text">skip_previous</i>
        </button>

        <h1 class="margin-0 flex-1 text-center white-text"><%= dataExibicao %></h1>

        <button class="<%= !existeDataPosterior() ? 'invisivel' : '' %> padding-0 resetButtonStyle flex ai-cen" onclick="mostrarDataPosterior()">
            <i class="material-icons white-text">skip_next</i>
        </button>
    </div>

    <status id="status-agenda">
    </status>

    <ul class="margin-0">
        <% eventos.forEach(evento => { %>

                <li>
                    <%if(evento.tipo == 'Credenciamento' || evento.tipo == 'Break'){%>
                        <section class="item-completo card flex ai-start" id-projeto="<%= evento.id_projeto%>" hora="<%=evento.hora%>" id-agenda="<%=evento.id_agenda%>" nome-empresa="<%=evento.empresa%>" nome-agenda="<%=evento.nome_agenda%>" palestrante="<%=evento.palestrante%>">
                        <div class="horario text-center flex fd-col jc-cen">
                            <span class="hora"><%= evento.horas %></span>
                            <span class="minuto">:<%= evento.minutos %></span>
                        </div>

                        <div class="flex-1">
                            <div class="box-nome-evento flex ai-end">
                                <h1 class="margin-0 nome-evento flex-1" style="max-width: 19ch;"><%= evento.nome_agenda %></h1>

                    <%}else{%>
                        <% let trilha = '' %>
                        <% if (evento.tipo == 'Trilha Verde'){ %>
                          <% trilha = 'trilha-verde' %>
                        <% } else if (evento.tipo == 'Trilha Roxa') { %>
                          <% trilha = 'trilha-roxa' %>
                        <% } %>
                        <section class="item-completo card flex ai-start <%= trilha %>" id-projeto="<%= evento.id_projeto%>" hora="<%=evento.hora%>" id-agenda="<%=evento.id_agenda%>" nome-empresa="<%=evento.empresa%>" nome-agenda="<%=evento.nome_agenda%>" palestrante="<%=evento.palestrante%>" avaliar="<%=evento.avaliacao%>" id-palestrante="<%=evento.id_contato_palestrante%>" onclick="chama_palestra(this)">

                            <div class="horario text-center flex fd-col jc-cen">
                                <span class="hora"><%= evento.horas %></span>
                                <span class="minuto">:<%= evento.minutos %></span>
                            </div>

                            <div class="flex-1">
                                <div class="box-nome-evento flex ai-end">
                                <%if(evento.tipo.lenght > 2){%>
                                    <h1 class="margin-0 nome-evento flex-1" style="max-width: 19ch;"><%= evento.nome_agenda %></h1>
                                <%}else{%>
                                    <h1 class="margin-0 nome-evento flex-1"><%= evento.nome_agenda %></h1>
                                <%}%>

                                        <i class="icone material-icons grey-text text-lighten-1" style="transform: translateY(30%);">navigate_next</i>

                    <%}%>

                                <% if(evento.tipo == 'Trilha Roxa' || evento.tipo == 'Trilha Verde'){%>
                                <% var tipo = ''%>
                                <%}else{%>
                                <% var tipo = evento.tipo%>
                                <%}%>
                                <span class="indicador-painel pos-abs top-0 right-0 text-uppercase" style="top: -10px !important; right: 1px !important;"><%= tipo%></span>
                            </div>

                            <hr class="divisoria" />

                            <footer>
                                <p class="participantes grey-text text-darken-1 margin-bottom-0">


                                    <%if(evento.palestrante.indexOf(',') == -1){%>
                                        <%if(evento.palestrante.length > 2){%>
                                            <span><%= evento.palestrante %> - <%= evento.empresa %></span>
                                        <%}else{%>
                                        <%}%>
                                    <%}else{%>
                                        <% var nome_split = evento.palestrante.split(',')%>
                                        <% var empresa_split = evento.empresa.split(',')%>

                                        <%for(var i=0; i < nome_split.length; i++){%>
                                            <% var palestrante = nome_split[i] + ' - ' + empresa_split[i]%>
                                            <span><%= palestrante%><br /></span>
                                        <%}%>
                                    <%}%>

                                </p>
                            </footer>
                        </div>
                    </section>
                </li>

        <% }) %>
    </ul>
</section>
`

const meus_eventos_agenda_feed = `
    <ul class="margin-0">       
        <% eventos.forEach(evento => { %>
                <li>
                    <%if(evento.tipo == 'Credenciamento' || evento.tipo == 'Break'){%>
                        <section class="item-completo card flex ai-start" id-projeto="<%= evento.id_projeto%>" hora="<%=evento.hora%>" id-agenda="<%=evento.id_agenda%>" nome-empresa="<%=evento.empresa%>" nome-agenda="<%=evento.nome_agenda%>" palestrante="<%=evento.palestrante%>">
                        <div class="horario text-center flex fd-col jc-cen">
                            <span class="hora"><%= evento.horas %></span>
                            <span class="minuto">:<%= evento.minutos %></span>
                        </div>

                        <div class="flex-1">
                            <div class="box-nome-evento flex ai-end">
                                <h1 class="margin-0 nome-evento flex-1" style="max-width: 19ch;"><%= evento.nome_agenda %></h1>

                    <%}else{%>
                        <% let trilha = '' %>
                        <% if (evento.tipo == 'Trilha Verde'){ %>
                          <% trilha = 'trilha-verde' %>
                        <% } else if (evento.tipo == 'Trilha Roxa') { %>
                          <% trilha = 'trilha-roxa' %>
                        <% } %>
                        <section class="item-completo card flex ai-start <%= trilha %>" id-projeto="<%= evento.id_projeto%>" hora="<%=evento.hora%>" id-agenda="<%=evento.id_agenda%>" nome-empresa="<%=evento.empresa%>" nome-agenda="<%=evento.nome_agenda%>" palestrante="<%=evento.palestrante%>" avaliar="<%=evento.avaliacao%>" id-palestrante="<%=evento.id_contato_palestrante%>" onclick="chama_palestra(this)">

                            <div class="horario text-center flex fd-col jc-cen">
                                <span class="hora"><%= evento.horas %></span>
                                <span class="minuto">:<%= evento.minutos %></span>
                            </div>

                            <div class="flex-1">
                                <div class="box-nome-evento flex ai-end">
                                <%if(evento.tipo.lenght > 2){%>
                                    <h1 class="margin-0 nome-evento flex-1" style="max-width: 19ch;"><%= evento.nome_agenda %></h1>
                                <%}else{%>
                                    <h1 class="margin-0 nome-evento flex-1"><%= evento.nome_agenda %></h1>
                                <%}%>

                                        <i class="icone material-icons grey-text text-lighten-1" style="transform: translateY(30%);">navigate_next</i>

                    <%}%>

                                <% if(evento.tipo == 'Trilha Roxa' || evento.tipo == 'Trilha Verde'){%>
                                <% var tipo = ''%>
                                <%}else{%>
                                <% var tipo = evento.tipo%>
                                <%}%>
                                <span class="indicador-painel pos-abs top-0 right-0 text-uppercase" style="top: -10px !important; right: 1px !important;"><%= tipo%></span>
                            </div>

                            <hr class="divisoria" />

                            <footer>
                                <p class="participantes grey-text text-darken-1 margin-bottom-0">


                                    <%if(evento.palestrante.indexOf(',') == -1){%>
                                        <%if(evento.palestrante.length > 2){%>
                                            <span><%= evento.palestrante %> - <%= evento.empresa %></span>
                                        <%}else{%>
                                        <%}%>
                                    <%}else{%>
                                        <% var nome_split = evento.palestrante.split(',')%>
                                        <% var empresa_split = evento.empresa.split(',')%>

                                        <%for(var i=0; i < nome_split.length; i++){%>
                                            <% var palestrante = nome_split[i] + ' - ' + empresa_split[i]%>
                                            <span><%= palestrante%><br /></span>
                                        <%}%>
                                    <%}%>

                                </p>
                            </footer>
                        </div>
                    </section>
                </li>
            <% }) %>
    </ul>
`



function renderizarMeusEventosAgenda(elemento, data) {
    var dados_full = get_data('id-projeto-envento')
    var id_projeto = dados_full.id_projeto
    //console.log(dados_full)
    get_eventos_por_data(id_projeto, datas => {
        // pega a data atual e configura para padrão dd/mm/yyyy
        let dataDeHoje = new Date()
        dataDeHoje = dataDeHoje.getDate().toString().padStart(2, '0') + "/" + (dataDeHoje.getMonth()+1).toString().padStart(2, '0') + "/" +dataDeHoje.getFullYear()

        // seta a data como a data de hoje se uma data não tiver sido setada, se a data de hoje não tiver incluida, pega a primeira data.
        data = data ? data : Object.keys(datas).includes(dataDeHoje) ? dataDeHoje : Object.keys(datas)[0]

        localStorage.setItem('__meus_eventos_data_visivel', data)
        localStorage.setItem('__meus_eventos_datas', Object.keys(datas))
        const eventos = datas[data].map(evento => {
            const dataEvento = new Date(evento.hora)

            const horas = String(dataEvento.getUTCHours());
            evento.horas = horas.length == 1 ? `0${horas}` : horas

            const minutos = String(dataEvento.getUTCMinutes());
            evento.minutos = minutos.length == 1 ? `0${minutos}` : minutos

            return evento
        })

        const dataArray = data.split('/')
        const dataExibicao = `${dataArray[0]} de ${mes[parseInt(dataArray[1])]} de ${dataArray[2]}`
        console.log(eventos)
        document.querySelector(elemento).innerHTML = ejs.render(meus_eventos_agenda, {
            dataExibicao,
            eventos
        })

        //console.log(eventos)
        var lista_eventos = []
        for (var z=0; z < eventos.length; z++){
            //console.log(eventos[z])
            var data_da_agenda = new Date(eventos[z].data_evento.replace(/Z/g, ""))
            var hora_eventos = new Date(eventos[z].hora.replace(/Z/g, ""))
            var data_agora = new Date()
            var data_evento_amanha = new Date(eventos[z].data_evento.replace(/Z/g, ""))
            data_evento_amanha.setDate(data_da_agenda.getDate() + 1)
            
            if(data_agora > data_da_agenda && data_agora < data_evento_amanha){
                console.log('entrou data')
                //hora proxima agenda
                var cont = z + 1
                if(eventos[cont]){
                    if(eventos[z].hora == eventos[cont].hora){
                        cont = cont + 1
                        if(eventos[cont]){
                            var hora_proxima = new Date(eventos[cont].hora.replace(/Z/g, ""))
                        }else{
                            var hora_proxima = new Date(eventos[z].hora.replace(/Z/g, ""))
                            hora_proxima.setHours(hora_eventos.getHours() + 1) 
                        }
                    }else{
                        var hora_proxima = new Date(eventos[cont].hora.replace(/Z/g, "")) 
                    }
                }else{
                    var hora_proxima = new Date(eventos[z].hora.replace(/Z/g, ""))
                    hora_proxima.setHours(hora_eventos.getHours() + 1) 
                }             
                                
                //verifica para mostrar
                if(data_agora > hora_eventos && data_agora < hora_proxima){
                    //exibe
                    console.log('exibindo....')                    
                    lista_eventos.push(eventos[z])
                }
                
            } 
            
            var fim = eventos.length - 1
            if(z == fim){                
                renderiza_agenda_no_feed(lista_eventos)                    
            }

        }        

        // desliza a tela até o horário mais próximo
        $("ul.tabs").on('click', 'a', function(){
          setTimeout(function(){
            const horaAtual = (new Date()).getHours()
            const spanHoras = document.querySelectorAll('span.hora')
            var diferenca = 24
            var selected = 0
            //console.log('hora atual --- ' + horaAtual)

            var data_projeto = new Date(dados_full.data_projeto)
            var data_hoje = new Date();
            data_hoje.setHours('00')
            data_hoje.setMinutes('00')
            data_hoje.setSeconds('00')
            data_projeto.setHours('00')
            data_projeto.setMinutes('00')
            data_projeto.setSeconds('00')
            data_projeto.setDate(data_projeto.getDate() + 1)
            //console.log(data_projeto)
            //console.log(data_hoje)

            if(data_hoje < data_projeto){

            }else{

                spanHoras.forEach(function(valor, index){
                    var a_diff = Math.abs(parseInt(valor.innerHTML) - horaAtual)
                    //console.log('dif- '+ a_diff)
                    if (a_diff > 0 && a_diff <= 1) {
                        selected = index;
                    }

                  });
                  if(selected > 0){
                    //console.log('select -- '+ selected)
                    selected = spanHoras[selected-3];
                    selected.scrollIntoView();
                  }
            }

          },500);
        });


        var datas_eventos = Object.keys(datas)
        //console.log(datas_eventos.length)

        var ultimo_dia_evento = datas_eventos[datas_eventos.length - 1].toString()
        var dateParts = ultimo_dia_evento.split("/")
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], 14,00,00,00)
        var hoje = new Date()

        var info_votou = {}
        info_votou.id_contato = get_data('geral').id
        info_votou.id_projeto = id_projeto        
        get_votou_evento(info_votou, function (resposta) {
            //console.log(resposta[0].qtd)
            if(resposta[0].qtd == 0){
                if(dados_full.avaliacao_evento == 'avaliar'){
                    var info = {}
                    info.id_contato = get_data('geral').id
                    info.id_projeto = id_projeto

                    var nota = null
                    document.querySelector('status').innerHTML = ejs.render(avaliacao_solta_do_evento, {
                    dados: info,
                    nota: nota
                    });

                    if(get_data('av-evento-' + id_projeto)){
                        if(get_data('av-evento-' + id_projeto) == 0){

                        }else{
                            set_data('av-evento-' + id_projeto, 1)
                            document.querySelector('AvEvento').innerHTML = ejs.render(avaliacao_feed_evento, {
                                dados: info,
                                nota: nota
                            });
                        }
                    }else{
                        set_data('av-evento-' + id_projeto, 1)
                        document.querySelector('AvEvento').innerHTML = ejs.render(avaliacao_feed_evento, {
                            dados: info,
                            nota: nota
                        });
                    }



                }else{
                    //set_data('av-evento-' + id_projeto, 0)
                    //console.log('não exibe')
                }
            }
        require_loader('close')
        })
    })
}

function renderiza_agenda_no_feed(eventos){
    setTimeout(function(){
        console.log(eventos)        
        document.querySelector('agendafeed').innerHTML = ejs.render(meus_eventos_agenda_feed, {                        
            eventos
        })
    },500)
}

function envia_nota_evento(ele, dados){
    require_loader('open')
    ele = ele.parentNode.parentNode
    dados.nota = ele.querySelector('.nota [class="active"]')
    dados.comentario = ele.querySelector('.comentario textarea').value || ''
    dados.nota = dados.nota.innerText
    console.log(dados)
    set_avaliacao_evento(dados, function (sae_results) {
        if(sae_results == 'bad'){
            require_loader('close')
            toasted('Ops! Algo deu Errado !')
        }else{
            require_loader('close')
            chama_agradecimento('avaliacao', function(cb){
                document.getElementById('avaliacao-evento').classList.add('hide')
                document.querySelector('.card-avaliacao').classList.add('hide')
                set_data('av-evento-' + dados.id_projeto, 0)
                //toasted('Obrigado pela Nota')
            })

        }
    })
}

function existeDataAnterior() {
    const dataVisivel = localStorage.getItem('__meus_eventos_data_visivel')
    const datas = localStorage.getItem('__meus_eventos_datas').split(',')

    return datas.indexOf(dataVisivel) > 0
}

function mostrarDataAnterior() {
    console.log({localStorage})
    const dataVisivel = localStorage.getItem('__meus_eventos_data_visivel')
    const datas = localStorage.getItem('__meus_eventos_datas').split(',')
    const posicaoDataVisivel = datas.indexOf(dataVisivel)

    renderizarMeusEventosAgenda('#tab_agenda', datas[posicaoDataVisivel - 1])
}

function existeDataPosterior() {
    const dataVisivel = localStorage.getItem('__meus_eventos_data_visivel')
    const datas = localStorage.getItem('__meus_eventos_datas').split(',')
    const posicaoDataVisivel = datas.indexOf(dataVisivel)

    return datas[posicaoDataVisivel + 1] != null
}

function mostrarDataPosterior() {
    console.log({localStorage})
    const dataVisivel = localStorage.getItem('__meus_eventos_data_visivel')
    const datas = localStorage.getItem('__meus_eventos_datas').split(',')
    const posicaoDataVisivel = datas.indexOf(dataVisivel)

    renderizarMeusEventosAgenda('#tab_agenda', datas[posicaoDataVisivel + 1])



    /*
    <% if (evento.tipo != 'Painel') { %>
                <li>
                    <div class="item card flex ai-cen">
                        <div class="horario text-center flex fd-col jc-cen">
                            <span class="hora"><%= evento.horas %></span>
                            <span class="minuto">:<%= evento.minutos %></span>
                        </div>

                        <div class="flex-1">
                            <h1 class="margin-0"><%= evento.nome_agenda %></h1>
                            <p class="margin-0 grey-text text-darken-1"><%= evento.palestrante %> - <%= evento.empresa %></p>
                        </div>

                        <a class="flex ai-cen">
                            <i class="material-icons grey-text text-lighten-1">navigate_next</i>
                        </a>
                    </div>
                </li>
            <% } else { %>

    <% } %>

    */
}

function chama_palestra(dados){
    clearTimeout(atual_palestras)
    require_loader('open')
    var id_agenda = dados.getAttribute('id-agenda')
    var id_projeto = dados.getAttribute('id-projeto')
    var nome_agenda = dados.getAttribute('nome-agenda')
    var palestrante = dados.getAttribute('palestrante')
    var empresa = dados.getAttribute('nome-empresa')
    var avaliacao = dados.getAttribute('avaliar')
    var hora = dados.getAttribute('hora')    
    var id_contato_palestrante = dados.getAttribute('id-palestrante') 
    var completo = {}
    completo.completo = palestrante + ' - ' + empresa
    completo.id_projeto = id_projeto
    var info = {}
    info.id_agenda = id_agenda
    info.id_projeto = id_projeto
    info.id_contato = get_data('geral').id
    info.nome_agenda = nome_agenda
    info.palestrante = palestrante
    info.empresa = empresa
    info.hora = hora
    info.id_contato_palestrante = id_contato_palestrante
          
    var set_dt = 'palestra-' + id_agenda
    set_data(set_dt, JSON.stringify(info))

    get_avaliacao_palestra_evento(info, function (gape_results){
        change_view(into_meus_eventos_agenda, true, true, {}, nav_degrade_into_agenda_eventos, {
            titulo: nome_agenda,
            palestrantes: palestrante,
            empresas: empresa,
            link_apresentacao: gape_results[0].link_apresentacao
        })

        if(gape_results[0].qtd == 0){

            if(avaliacao == 'avaliar'){
                var nota = null
                document.querySelector('status').innerHTML = ejs.render(avaliacao_solta_v_eventos, {
                    dados: info,
                    nota: nota
                });
            }

        }else{

        }

        get_lista_perguntas(info, function (glp_results){

            document.querySelector('perguntas').innerHTML = ejs.render(card_pergunta_evento, {
                dados: info,
                nota: nota,
                perguntas: glp_results
            });

            document.querySelector('enviarpergunta').innerHTML = ejs.render(input_inserir_pergunta_palestra, {
                id_agenda: id_agenda,
                link_apresentacao: gape_results[0].link_apresentacao
            })

            require_loader('close')

            PullToRefresh.init({
                triggerElement: document.querySelector('.intermediario2'),
                mainElement: document.querySelector('.perguntinhas'),
                onRefresh() {
                    require_loader('open')
                    document.querySelector('enviarpergunta').innerHTML = ''
                    get_avaliacao_palestra_evento(info, function (gape_results){
                        if(gape_results[0].qtd == 0){

                            if(avaliacao == 'avaliar'){
                                var nota = null
                                document.querySelector('status').innerHTML = ejs.render(avaliacao_solta_v_eventos, {
                                    dados: info,
                                    nota: nota
                                });
                            }

                        }else{

                        }

                        get_lista_perguntas(info, function (glp_results){

                            document.querySelector('perguntas').innerHTML = ejs.render(card_pergunta_evento, {
                                dados: info,
                                nota: nota,
                                perguntas: glp_results
                            });

                            document.querySelector('enviarpergunta').innerHTML = ejs.render(input_inserir_pergunta_palestra, {
                                id_agenda: id_agenda
                            })

                            require_loader('close')

                            //reload_x_time(id_agenda)

                        })
                    })
                },
            });

            //reload_x_time(id_agenda)

        })
    })
}

function reload_chama_palestra(dados){
    clearTimeout(atual_palestras)
    require_loader('open')
    var id_agenda = dados.id_agenda
    var id_projeto = dados.id_projeto
    var nome_agenda = dados.nome_agenda
    var palestrante = dados.palestrante
    var empresa = dados.empresa
    var hora = dados.hora
    var completo = {}
    completo.completo = palestrante + ' - ' + empresa
    completo.id_projeto = id_projeto
    var info = {}
    info.id_agenda = id_agenda
    info.id_projeto = id_projeto
    info.id_contato = get_data('geral').id
    info.nome_agenda = nome_agenda
    info.palestrante = palestrante
    info.empresa = empresa
    info.hora = hora
    var nav_data = {
        titulo: nome_agenda,
        palestrantes: palestrante,
        empresas: empresa
    }


    document.querySelector('.maine-change').innerHTML = ejs.render(into_meus_eventos_agenda, {})

    get_avaliacao_palestra_evento(info, function (gape_results){
        document.querySelector('#navbar').innerHTML = ejs.render(nav_degrade_into_agenda_eventos, {
            titulo: nav_data.titulo,
            description: nav_data.description,
            tabs: nav_data.tabs,
            data: nav_data,
            link_apresentacao: gape_results[0].link_apresentacao
        });

        if(gape_results[0].qtd == 0){

            var now_time = new Date();
            var time_palestra = new Date(hora.replace('Z', ''));

            if(time_palestra < now_time){
                var nota = null
                document.querySelector('status').innerHTML = ejs.render(avaliacao_solta_v_eventos, {
                    dados: info,
                    nota: nota
                });
            }

        }else{

        }

        get_lista_perguntas(info, function (glp_results){

            document.querySelector('perguntas').innerHTML = ejs.render(card_pergunta_evento, {
                dados: info,
                nota: nota,
                perguntas: glp_results
            });

            document.querySelector('enviarpergunta').innerHTML = ejs.render(input_inserir_pergunta_palestra, {
                id_agenda: id_agenda
            })

            require_loader('close')
            
            PullToRefresh.init({        
              triggerElement: document.querySelector('.intermediario2'),
              mainElement: document.querySelector('.perguntinhas'),
              onRefresh() {
                  require_loader('open')
                  document.querySelector('enviarpergunta').innerHTML = ''
                  get_avaliacao_palestra_evento(info, function (gape_results){        
                      if(gape_results[0].qtd == 0){            
              
                          if(avaliacao == 'avaliar'){
                              var nota = null
                              document.querySelector('status').innerHTML = ejs.render(avaliacao_solta_v_eventos, {
                                  dados: info,
                                  nota: nota
                              });
                          }
              
                      }else{
                                     
                      }
              
                      get_lista_perguntas(info, function (glp_results){            
              
                          document.querySelector('perguntas').innerHTML = ejs.render(card_pergunta_evento, {
                              dados: info,
                              nota: nota,
                              perguntas: glp_results
                          });
              
                          document.querySelector('enviarpergunta').innerHTML = ejs.render(input_inserir_pergunta_palestra, {
                              id_agenda: id_agenda
                          })
              
                          require_loader('close')              
                                          
                          //reload_x_time(id_agenda)
              
                      })
                  })
              },
          });

            //reload_x_time(id_agenda)


        })
    })
}

function reload_x_time(id_agenda){
    atual_palestras= setTimeout(function() {
        toasted('Atualizando...')
        var set_dt_reload = 'palestra-' + id_agenda
        var dados_reload = get_data(set_dt_reload)
        reload_chama_palestra(dados_reload)
      }, 60000);
}