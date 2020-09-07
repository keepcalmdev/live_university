var screens = []
var atual_palestras = null
var versao_app = '5.8.7'
set_data('versao', JSON.stringify(versao_app))

var server = 'http://www.liveulabs.com:49'
//var server = 'http://192.168.0.50:49'

function comprar(id_projeto){
    //console.log('pedido compra...')
    require_loader('open')
    var inf = {}
    inf.id_projeto = id_projeto
    inf.id_contato = get_data('geral').id
    inf.fonte = 'App'

    /*gera_hash(inf, function (gh){
        console.log('logado...')
        console.log(gh[0].hash)
        if(gh[0].id_tipo_projeto == 31 || gh[0].id_tipo_projeto == 25){
            window.open(`https://pay.liveuniversity.com/planos?t_code=${gh[0].hash}`);
        }else{
            window.open(`https://pay.liveuniversity.com/?t_code=${gh[0].hash}`);
        }
        setTimeout(function (){
            back_to_main();
        },1000)
    })*/
    
    get_id_compra(inf, (gic_cb) =>{
            //console.log('pegou dados...')
            set_data('compra-' + id_projeto, JSON.stringify(gic_cb[0]))
            var compra = []
            var id_compra_temp = gic_cb[0].id_compra
            var id_projeto_compra = id_compra_temp.toString()
            compra.push(id_projeto_compra)
            //console.log(typeof id_projeto_compra)

        //console.log('comprando...')
        inAppPurchase
            .getProducts(compra)
            .then(function (products) {
                //console.log('produtos dados...')


                if(products.length == 0){
                    require_loader('close')
                    toasted('Ops! Produto Indisponível')
                    return
                }

                go_to_dados_vendas(id_projeto, products[0].productId, products[0].price)

            })
            .catch(function (err) {
                require_loader('close')
                console.log(err);
                if(err.code == -5){
                    require_loader('close')
                    return
                }
            });

    })
    
}

function go_to_dados_vendas(id_projeto, id_produto, preco) {
    var data = get_data('compra-'+id_projeto)
    var compra = {}
    compra.id_produto = id_produto
    compra.id_projeto = id_projeto
    compra.preco = preco
    set_data('pagamento-'+id_projeto, JSON.stringify(compra))
    var data_projeto = get_data('compra-' + id_projeto)

    var dados_log = {}
    dados_log.nome = get_data('geral').nome
    dados_log.email = get_data('geral').email

    set_log_tentativa_compra(dados_log, function(sltv_cb){

        $('.sidenav').sidenav('close');
        $('.sidenav').sidenav('destroy');
        require_loader('close')
        change_view(tela_dados_venda, true, true, {
            duration: data.duracao,
            subscription: data.subscricao,
            price: compra.preco,
            id_projeto: id_projeto,
            id_tipo_projeto: data_projeto.id_tipo_projeto
        }, nav_degrade_vendas, {
            titulo: data.nome_projeto
        })
        M.updateTextFields();

    })


}


function realizar_compra(id_projeto){
    require_loader('open')
    var compra = get_data('pagamento-' + id_projeto)
    var data_projeto = get_data('compra-' + id_projeto)

    if(data_projeto.id_tipo_projeto == 31){
        // pós ondemand - buy
        inAppPurchase
        .subscribe(compra.id_produto)
        .then(function (data) {
            console.log(data);
            var dados = {}
            dados.id_projeto = id_projeto
            dados.data = data
            dados.valor = compra.preco

            pay_app(dados)

        })
        .catch(function (err) {
            console.log(err);
            if(err.code == -5){
                require_loader('close')
                return
            }
            require_loader('close')
            toasted('Ops! Algo deu errado.');
        });

    }else{
        // workshop - buy
        inAppPurchase
        .buy(compra.id_produto)
        .then(function (data) {
            console.log(data);
            var dados = {}
            dados.id_projeto = id_projeto
            dados.data = data
            dados.valor = compra.preco

            inAppPurchase
            .consume(data.productType, data.receipt, data.signature);

            pay_app(dados)

        })
        .catch(function (err) {
            console.log(err);
            if(err.code == -5){
                require_loader('close')
                return
            }
            require_loader('close')
            toasted('Ops! Algo deu errado.');
        });

    }
}


function pay_app(info){
    toasted('Obrigado pela compra!');
    console.log(info)
    var dados = {}
    dados.id_contato = get_data('geral').id
    dados.id_projeto = info.id_projeto
    var temp_valor = info.valor
    dados.valor = Number(temp_valor.replace(/[^0-9]+/, '').replace(',','.'))
    dados.transactionId = info.data.transactionId

    //var mobile = device.platform

    lib_pay(dados, (lp_cb) =>{
        if(lp_cb == 'ok'){
            //inscrito no curso agora tem que carregar a pagina do curso....
            require_loader('close')
            load_curso_ondemand_sales(dados.id_projeto)
        }else{
            require_loader('close')
            toasted('Ops! Entre em contato conosco')
        }
    })

}

//YANN TRANSPARENTE
function sl(){
    let selection = window.getSelection(), el = document.activeElement, can_select = ["INPUT","TEXTAREA"];
    if(!can_select.indexOf(el.nodeName)) selection.modify('move', 'forward', "line");
}
// FIM YANN TRANSPARENTE

function chama_central_notificacao(){

    require_loader('open')
    $('.sidenav').sidenav('close');
    $('.sidenav').sidenav('destroy');
    
    $.post(server + '/get_lista_notificacao', {
        id_contato: get_data('geral').id
    })
    .done((a) => {
        console.log(a);
        change_view(central_notificacao_v, true, true,{
            dados: a
        }, navbar_comum_v_eletivas, {titulo: 'Notificações'});
            require_loader('close')            
    })
    .fail((b) => {
       console.log('erro get_minha_turma')
        console.log(b)
    });
    
}

function loading_main() {
    $('body').css('background-color', 'white');
    try{
      manda_load()
      var tutorial = get_data('tutorial')
      var tutorial_info = get_data('tutorial-info')
      var destino = get_data('destino')

      var todos_cursos = get_data('cursos')
      if(todos_cursos.length < 1){
          document.querySelector('.maine-change').innerHTML = ejs.render(home_v_vazio, {});

          document.querySelector('#navbar_comum').innerHTML = ejs.render(navbar_comum_v, {
              titulo: 'Meus Cursos'
          });

          document.querySelector('.navbar').innerHTML = ejs.render(menu_lateral, {
              login: get_data('geral')
          });

          $('.sidenav').sidenav({
              edge: 'right'
          });

          $(function(){
              $('.multilevel').on('click', function(){
                  $(this).next().toggleClass('d-none');
              });
          });

          window.scrollTo(0, 0);

      }else{
          for(var i = 0; i < todos_cursos.length; i++){
              if(todos_cursos[i].tipo_aluno.indexOf('MBA') > -1){
                  var tipo_aluno = 'MBA'
                  set_data('tipo_aluno', JSON.stringify(tipo_aluno))
              }
          }

          if(tutorial && tutorial.status == 1){

              var info = {}
              info.id_contato = get_data('geral').id
              info.id_projeto = tutorial_info.id_projeto
              info.id_modulo = ''
              console.log(info)
              load_curso_ondemand(info)

          }else{

              if(destino == 1 || destino == 2){
                
                    const cursosComMBAsPrimeiro = get_data('cursos').sort((a, b) => {
                        if (a.grupo.startsWith('MBA')) {
                            return -1;
                        } else if (b.grupo.startsWith('MBA')) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    document.querySelector('.maine-change').innerHTML = ejs.render(home_v, {
                        cursos: cursosComMBAsPrimeiro
                    });
                    document.querySelector('#navbar_comum').innerHTML = ejs.render(navbar_comum_v, {
                        titulo: 'Meus Cursos'
                    });
                    document.querySelector('.navbar').innerHTML = ejs.render(menu_lateral, {
                        login: get_data('geral')
                    });
                    $('.sidenav').sidenav({
                        edge: 'right'
                    });
                    $(function(){
                        $('.multilevel').on('click', function(){
                            $(this).next().toggleClass('d-none');
                        });
                    });
                    window.scrollTo(0, 0);

                if(destino == 1){
                    set_data('destino', 0)
                    go_to_perfil()
                }
                if(destino == 2){
                    set_data('destino', 0)
                    chama_central_notificacao()
                }

              }else{

                  var tipo_entrada = get_data('tipoentrada')
                  if(tipo_entrada == 'eletiva'){
                      const cursosComMBAsPrimeiro = get_data('cursos').sort((a, b) => {
                          if (a.grupo.startsWith('MBA')) {
                              return -1;
                          } else if (b.grupo.startsWith('MBA')) {
                              return 1;
                          } else {
                              return 0;
                          }
                      });
                      set_data('mbagrupo', JSON.stringify(cursosComMBAsPrimeiro[0].id_grupo))
                      document.querySelector('.maine-change').innerHTML = ejs.render(home_v, {
                          cursos: cursosComMBAsPrimeiro
                      });
                      document.querySelector('#navbar_comum').innerHTML = ejs.render(navbar_comum_v, {
                          titulo: 'Meus Cursos'
                      });
                      document.querySelector('.navbar').innerHTML = ejs.render(menu_lateral, {
                          login: get_data('geral')
                      });
                      $('.sidenav').sidenav({
                          edge: 'right'
                      });
                      $(function(){
                          $('.multilevel').on('click', function(){
                              $(this).next().toggleClass('d-none');
                          });
                      });
                      window.scrollTo(0, 0);

                      loading_eletiva_selecionada()

                  }else{

                      const cursosComMBAsPrimeiro = get_data('cursos').sort((a, b) => {
                          if (a.grupo.startsWith('MBA')) {
                              return -1;
                          } else if (b.grupo.startsWith('MBA')) {
                              return 1;
                          } else {
                              return 0;
                          }
                      });
                      set_data('mbagrupo', JSON.stringify(cursosComMBAsPrimeiro[0].id_grupo))
                      document.querySelector('.maine-change').innerHTML = ejs.render(home_v, {
                          cursos: cursosComMBAsPrimeiro
                      });
                      document.querySelector('#navbar_comum').innerHTML = ejs.render(navbar_comum_v, {
                          titulo: 'Meus Cursos'
                      });
                      document.querySelector('.navbar').innerHTML = ejs.render(menu_lateral, {
                          login: get_data('geral')
                      });
                      $('.sidenav').sidenav({
                          edge: 'right'
                      });
                      $(function(){
                          $('.multilevel').on('click', function(){
                              $(this).next().toggleClass('d-none');
                          });
                      });
                      window.scrollTo(0, 0);
                  }
              }



          }

          document.addEventListener("select",event=>{sl()});
          document.addEventListener("selectstart",event=>{sl()});
          document.addEventListener("selectionstart",event=>{sl()});
          document.addEventListener("touchstart",event=>{sl()});
          document.addEventListener("touchend",event=>{sl()});
          document.addEventListener("touchcancel",event=>{sl()});
          document.addEventListener("selectionchange",event=>{sl()});

      }
    }catch(error){
      console.log(error);
      reset_data_with_error("Ops, algo deu errado");
    }

    check_notificacao(function (cb){
        if(cb == 1){
            document.querySelector('.notification-icon').innerHTML += '<i class="material-icons" style="color: red; position: absolute; margin-left: 5px; margin-top: -7px; font-size: 18px;">brightness_1</i></div>'
        }else{
    
        }
    })  
}

function check_notificacao(cb){
    var dados_check = {}
    dados_check.id_contato = get_data('geral').id
    get_check_notificacao(dados_check, function (cbb){        
        if(cbb.status == 1){
            set_data('notificacao', 1)
            cb(1)
        }else{
            set_data('notificacao', 0)
            cb(0)
        }

    })
}

function change_view(view, save, nav_lat, data, nav, nav_data) {
    $('body').css('background-image', '')
    clearTimeout(atual_palestras)
    if (view == 'back') {
        document.querySelector('.maine-change').innerHTML = screens.pop()

        try {
            // tenta remover indicador para não haver duplicata quando chamada a função do Materialize
            document.querySelector('.tabs .indicator').remove()
        } catch (e) {}

        $('ul.tabs').tabs();

        //valida sales itens
        if($('#para-voce').length > 0){
            $('#para-voce').carousel({
                dist: 0,
                shift: 100,
                padding: 80,
                numVisible: 4,
                fullWidth: true,
                duration: 100,
            });
            $('#categoria').carousel({
                dist: 0,
                shift: -10,
                padding: -10,
                numVisible: 4,
                fullWidth: true,
                duration: 100,
            });
        }

        try {
        PullToRefresh.init({        
            triggerElement: document.querySelector('#tab_feed'),
            mainElement: document.querySelector('#tab_feed'),
            onRefresh() {
                try{
                    let id_projeto = document.getElementById('id_projeto_evento').innerHTML
                    require_loader('open')
                    document.querySelector('#tab_feed').innerHTML = ''
                    renderizar_feed('#tab_feed', id_projeto)
                    renderizarMeusEventosAgenda('#tab_agenda')
                    document.getElementById('alternador').style.marginTop = 0;                   

                } catch(err){

                }
            },
        });
        } catch(e){
            
        }


        
    } else {
        if (save) {
            var last_scr = document.querySelector('.maine-change').innerHTML
            screens.push(last_scr)
        }
        document.querySelector('.maine-change').innerHTML = ejs.render(view, data)
    }
    if (nav_lat) {
        document.querySelector('.navbar').innerHTML = ejs.render(menu_lateral, {
            login: get_data('geral')
        });
        $('.sidenav').sidenav({
            edge: 'right'
        });
        $(function(){
            $('.multilevel').on('click', function(){
                $(this).next().toggleClass('d-none');
            });
        });
    }
    if (nav) {
        document.querySelector('#navbar').innerHTML = ejs.render(nav, {
            titulo: nav_data.titulo,
            description: nav_data.description,
            tabs: nav_data.tabs,
            data: nav_data
        });
        //document.querySelector('#navbar').innerHTML = ejs.render(nav, { ...nav_data });
    }

    try {
        document.querySelector('#parada_hoje').previousElementSibling.scrollIntoView()
    } catch (e) {

    }

    // adiciona ou remove a ação personalizada de voltar dependendo do tamanho da pilha
    if(screens.length > 0) addBackKeyHandler();
    else removeBackKeyHandler();

    check_notificacao(function (cb){
        if(cb == 1){
            document.querySelector('.notification-icon').innerHTML += '<i class="material-icons" style="color: red; position: absolute; margin-left: 5px; margin-top: -7px; font-size: 18px;">brightness_1</i></div>'
        }else{
    
        }
    })  

    window.scrollTo(0, 0);    
}

function change_view_aula_in(view, save, nav_lat, data, nav, nav_data) {
    clearTimeout(atual_palestras)
    if (view == 'back') {
        document.querySelector('.maine-change').innerHTML = screens.pop()

        try {
            // tenta remover indicador para não haver duplicata quando chamada a função do Materialize
            document.querySelector('.tabs .indicator').remove()
        } catch (e) {}

        $('ul.tabs').tabs();
    }

    setTimeout(function(){
        document.querySelector('#parada_hoje').previousElementSibling.scrollIntoView();
        }, 200);
    
    
    // adiciona ou remove a ação personalizada de voltar dependendo do tamanho da pilha
    if(screens.length > 0) addBackKeyHandler();
    else removeBackKeyHandler();
}

function toasted(texto) {
    var toastContent = '<span style="color: white !important;">' + texto + '</span>'
    M.toast({
        html: toastContent,
        displayLength: 2300
    })
}

function back_to_main() {
    $('body').css('background-color', 'white');
    window.location.href = "index.html"
    /*screens = []
    $('.sidenav').sidenav('close');
    $('.sidenav').sidenav('destroy');
    loading_main()
    */
}

function manda_load() {
    var versao = get_data('versao')
    document.querySelector('.maine-change').innerHTML = `
        <div style="background-color: #7b1b63;width: 100%;height: 100%;position: fixed;">
            <img src="image/loading.gif" alt="load" style="width: 60%;position: absolute;top: 25%;left: 50%;transform: translateX(-50%);">
            <span style="color: gray; position: absolute; bottom: 0; width: 100%;">v.${versao}</span>
        </div>`
}



function load_friends_aula() {
    var user_data = {}
    user_data.id_contato = get_data('geral').id
    user_data.id_calendario = document.querySelector('load_friends').innerText
    $.post(server + '/get_friends', user_data)
        .done((friends_list) => {
            document.querySelector('[id-calendario-aula="' + user_data.id_calendario + '"] .users').style.display = ''
            friends_list.forEach(function (friend) {
                //if(get_data(friend.id_contato) == null || ){
                new_friends(friend)
                //} else {
                //    console.log(get_data(friend.id_contato).data)
                //    put_friends(get_data(friend.id_contato),friend.presenca)
                //}
            })
            console.log(friends_list)
        })
        .fail((b) => {
            console.log('erro load_friends')
            console.log(b)
        })
}

function load_curso_ondemand(ele){

    var tutorial = get_data('tutorial')

    if(tutorial.status == 1){
        var projeto = {}
        projeto.id_contato = get_data('geral').id
        projeto.id_projeto = ele.id_projeto
        console.log(projeto)

        busca_aulas_ondemand(projeto, (stst) => {

            var lista_aulas = get_data(ele.id_projeto)
            var aula = {}
            aula.id_aula = lista_aulas[0].id_ondemand_aula
            aula.id_projeto = ele.id_projeto
            aula.id_modulo = lista_aulas[0].id_ondemand_modulo
            aula.ordem = 0

            get_dados_aula_ondemand(aula)

        })


    }else{
        var aula = {}
        aula.id_contato = get_data('geral').id
        aula.id_projeto = ele.getAttribute('id-projeto')
        aula.id_modulo = ele.getAttribute('id-modulo')

        if (!navigator.onLine) {
            toasted('Liga a internet ai!')
            return
        } else {
            manda_load()
            busca_aulas_ondemand_temp(aula, (stst) => {
                go_to_modulo_ondemand(aula.id_projeto, aula.id_modulo)
                return
            })
        }
    }

}

function load_curso_ondemand_sales(id_projeto){

        var aula = {}
        aula.id_contato = get_data('geral').id
        aula.id_projeto = id_projeto
        aula.id_modulo = null

        if (!navigator.onLine) {
            toasted('Liga a internet ai!')
            return
        } else {
            manda_load()
            busca_aulas_ondemand(aula, (stst) => {
                go_to_modulo_ondemand(aula.id_projeto, aula.id_modulo)
                return
            })
        }

}

function get_dados_aula_ondemand_learnets(id_ondemand_aula, id_ondemand_projeto){
   
        manda_load()
        var aula = {}
        aula.id_contato = get_data('geral').id
        aula.id_aula = id_ondemand_aula
        aula.id_projeto = id_ondemand_projeto
        aula.id_modulo = 0
        aula.ordem = 0
        aula.iniciar = 0
    
    get_aula_ondemand(aula, function(cb){
        if (!navigator.onLine) {
            // verificando se tem dados da aula no banco
            toasted('Liga a internet ai!')
            return
        }else{

            go_to_aula_ondemand(aula)
        }
    })
}

function get_dados_aula_ondemand(ele){
    var tutorial = get_data('tutorial')

    if(tutorial.status == 1){
        var aula = {}
        aula.id_contato = get_data('geral').id
        aula.id_aula = ele.id_aula
        aula.id_projeto = ele.id_projeto
        aula.id_modulo = ele.id_modulo
        aula.ordem = ele.ordem
        aula.iniciar = 1

        var troca = {}
        troca.status = 2
        set_data('tutorial', JSON.stringify(troca))

    }else{
        manda_load()
        var aula = {}
        aula.id_contato = get_data('geral').id
        aula.id_aula = ele.getAttribute('id-aula')
        aula.id_projeto = ele.getAttribute('id-projeto')
        aula.id_modulo = ele.getAttribute('id-modulo')
        aula.ordem = ele.getAttribute('ordem')
        aula.iniciar = 0
    }

    get_aula_ondemand(aula, function(cb){
        if (!navigator.onLine) {
            // verificando se tem dados da aula no banco
            toasted('Liga a internet ai!')
            return
        }else{

            go_to_aula_ondemand(aula)
        }
    })
}

function chama_politica_privacidade(){
    $('.sidenav').sidenav('close');
    change_view(politica_privacidade_v, true, true, {}, navbar_comum_v_eletivas, {
        titulo: 'Política de Privacidade'
    })
}

function chama_termos_uso(){
    $('.sidenav').sidenav('close');
    change_view(termos_de_uso, true, true, {}, navbar_comum_v_eletivas, {
        titulo: 'Termos de Uso'
    })
}

function chama_certificados(origemMenu = true){
    require_loader('open')
    var dados = {}
    dados.id_contato = get_data('geral').id
    get_certificados(dados, function (a) {
        if (origemMenu === true)
        $('.sidenav').sidenav('close');

        change_view(certificados_v, true, true, {
            dados: a
        }, navbar_comum_v_eletivas, {
            titulo: 'Certificados'
        })

        require_loader('close')

    })
}

function load_main_aulas(ele) {
    var aula = {}
    // carregando dados do curso clicado
    aula.id_grupo = ele.getAttribute('id-grupo')
    //aula.id_tipo_projeto = ele.getAttribute('id-tipo')
    var id_tipo_projeto = ele.getAttribute('id-tipo')
    // colocando id_contato
    aula.id_contato = get_data('geral').id
    var tipo = 'normal'

    if (!navigator.onLine) {
        // verificando se tem dados da aula no banco
        if (!get_data(aula.id_grupo)) {
            toasted('Liga a internet ai!')
            return
        }
        manda_load()
        go_to_main_aulas(aula.id_grupo, tipo, id_tipo_projeto)
        return
    } else {
        manda_load()
        busca_aulas(aula, (stst) => {
            console.log(stst)
            if(id_tipo_projeto == 16){

                go_to_main_aulas(aula.id_grupo, tipo, id_tipo_projeto)
                return

            }else{                

                get_notas(aula, (ntnt) => {
                    go_to_main_aulas(aula.id_grupo, tipo, id_tipo_projeto)
                    return
                })                
            }           

        })
    }
}

function loading_eletiva_selecionada(){
    var aula = {}
    // carregando dados do curso clicado
    aula.id_grupo = get_data('mbagurpo')
    //aula.id_tipo_projeto = ele.getAttribute('id-tipo')
    // colocando id_contato
    aula.id_contato = get_data('geral').id
    var tipo = 'eletiva'
    manda_load()
    busca_aulas(aula, (stst) => {
        get_notas(aula, (ntnt) => {
            go_to_main_aulas(aula.id_grupo, tipo)
            return
        })
    })
}

// Adição do parâmetro id_modulo_atual que poderá ser utilizado para realizar a tarefa de mudar de módulo no ao selecionar outro módulo no combo_box
function go_to_modulo_ondemand(projeto, id_modulo_atual = null){    
    // reseta sidenav
    if(id_modulo_atual == null){
        screens = []
        $('.sidenav').sidenav('close');
        $('.sidenav').sidenav('destroy');
    }

    // busca nome do curso
    var nome_curso_r = ''
    for (var i = 0; i < get_data('cursos').length; i++) {
        if (get_data('cursos')[i].id_projeto == projeto) {
            nome_curso_r = get_data('cursos')[i].grupo
            break
        }
    }

//  Se um id foi passado no segundo parâmetro, esse código irá carregar a tela de acordo com o módulo selecionado, caso contrário o primeiro módulo da lista modulos_ondemand será selecionado como primeiro.
// Futuramente a lista modulos_ondemand deve ser alterada para ficar na ordem dos módulos

    let modulos_ondemand = get_data(projeto);
    let nav_titulo = modulos_ondemand[0].modulo;
    let modulo_atual_num = 0;

    if(id_modulo_atual != null){
        for(k=0; k<modulos_ondemand.length; k++){
            if(id_modulo_atual == modulos_ondemand[k].id_ondemand_modulo){
                nav_titulo = modulos_ondemand[k].modulo;
                modulo_atual_num = k;
            }
        }
    }

// Load menu lateral
    document.querySelector('.navbar').innerHTML = ejs.render(menu_lateral, {
        login: get_data('geral')
    });
// Load nav_degrade direto no maine-change
    document.querySelector('.maine-change').innerHTML = ejs.render(nav_degrade_v2, {
        titulo: nav_titulo
    });

//  LOAD COMBO BOX
    document.querySelector('.maine-change').innerHTML += ejs.render(combo_box_v, {
        data: modulos_ondemand,
        ativo: modulo_atual_num,
        projeto: projeto
    });

//  LOAD AULAS
    document.querySelector('.maine-change').innerHTML += ejs.render(lesson_v, {
        lista: modulos_ondemand,
        active: modulo_atual_num,
        id_projeto: projeto
    });

// Essa função interfere no LOAD AULAS se for posta antes dele, não sei o motivo.
    combo_box_init();

   //$('.tabs').tabs();
    $('.sidenav').sidenav({
        edge: 'right'
    });
    $(function(){
        $('.multilevel').on('click', function(){
            $(this).next().toggleClass('d-none');
        });
    });
    check_notificacao(function (cb){
        if(cb == 1){
            document.querySelector('.notification-icon').innerHTML += '<i class="material-icons" style="color: red; position: absolute; margin-left: 5px; margin-top: -7px; font-size: 18px;">brightness_1</i></div>'
        }else{
    
        }
    }) 

}

function go_to_aula_ondemand(aula){
        // reseta sidenav
        screens = []
        $('.sidenav').sidenav('close');
        $('.sidenav').sidenav('destroy');

        load_aula_ondemand(aula);

        $('.sidenav').sidenav({
            edge: 'right'
        });
}


function go_to_main_aulas(grupo, tipo, id_tipo_projeto) {
    set_data('grupo_selecionado', grupo)
    // reseta sidenav
    screens = []
    $('.sidenav').sidenav('close');
    $('.sidenav').sidenav('destroy');

    // busca nome do curso
    var nome_curso_r = ''
    for (var i = 0; i < get_data('cursos').length; i++) {
        if (get_data('cursos')[i].id_grupo == grupo) {
            nome_curso_r = get_data('cursos')[i].grupo
            break
        }
    }

    // renderiza aulas
    document.querySelector('.maine-change').innerHTML = ejs.render(cards_v, {
        grupo: grupo
    });

    document.querySelector('.navbar').innerHTML = ejs.render(menu_lateral, {
        login: get_data('geral')
    });

    document.querySelector('#navbar_comum').innerHTML = ejs.render(navbar_comum_v, {
        titulo: nome_curso_r
    });

    if(tipo == 'normal'){
        if(id_tipo_projeto == 16){
            document.querySelector('#submenutabs').innerHTML = ejs.render(submenutabs_workshop);
        }else{
            if(id_tipo_projeto == 6 || id_tipo_projeto == 21){
                document.querySelector('#submenutabs').innerHTML = ejs.render(submenutabs_capacitacao);
            }else{
                document.querySelector('#submenutabs').innerHTML = ejs.render(submenutabs);
            }
        }

    }else{
    document.querySelector('#submenutabs').innerHTML = ejs.render(submenutabs_views_eletivas);
    var tipo_entrada = 'normal'
    set_data('tipoentrada', JSON.stringify(tipo_entrada))
    }
    document.querySelector('#all_tabs').innerHTML = ejs.render(all_tabs, {
        notas: get_data(grupo + '_nota')
    });

    /// load calendario
    var aulas = get_data(grupo)
    for (a in aulas) {
        var aula = aulas[a]
        if (aula.id_calendario_aulas) {

            if(aula.aula.indexOf('ormatura') > 0 && !aula.nota){
                document.querySelector('#calendario').innerHTML += ejs.render(avaliacao_solta_NPS_MBA_v, {
                    aula: aula
                });
            }

            document.querySelector('#calendario').innerHTML += ejs.render(aula_v, {
                aula: aula,
                id_tipo_projeto: id_tipo_projeto
            });


        } else {
            document.querySelector('#calendario').innerHTML += ejs.render(avaliacao_solta_modulo_v, {
                aula: aula
            });
        }
    }

    if(id_tipo_projeto == 16){

    }else{
        /// load notas e faltas
        var nots = get_data(grupo + '_nota')
        if(nots[0].items){
            document.querySelector('#notasefaltas').innerHTML = ejs.render(notas_e_faltas_v_learnets, {
                notas: get_data(grupo + '_nota')
            });
            
        }else{
            if(id_tipo_projeto == 6 || id_tipo_projeto == 21 || id_tipo_projeto == 16){
                var notas_temp = []
                notas_temp.push(get_data(grupo + '_nota')[0])
                document.querySelector('#notasefaltas').innerHTML = ejs.render(notas_e_faltas_v, {
                    notas: notas_temp
                });
            }else{
                    document.querySelector('#notasefaltas').innerHTML = ejs.render(notas_e_faltas_v, {
                        notas: get_data(grupo + '_nota')
                    });
            }
            notasefaltas_init();
        }
    }

    check_notificacao(function (cb){
        if(cb == 1){
            document.querySelector('.notification-icon').innerHTML += '<i class="material-icons" style="color: red; position: absolute; margin-left: 5px; margin-top: -7px; font-size: 18px;">brightness_1</i></div>'
        }else{
    
        }
    })  

    if(id_tipo_projeto == 16 || id_tipo_projeto == 6 || id_tipo_projeto == 21){

    }else{
        /// load shift
        $.post(server + '/get_home_shift', {
            id_contato: get_data('geral').id
        })
        .done((a) => {
            if(a.length == 0){
                document.querySelector('#shift').innerHTML = ejs.render(shift_newgroup_v, {});
            }else if(a.length == 1){
                if (a[0].tipo == 'grupo'){
                    document.querySelector("#shift").innerHTML = '';
                    $.post(server + '/get_terminou_shift', {
                        id_grupos_shift: a[0].id_grupos_shift
                    })
                    .done((b) => {
                        if(b.length > 0){
                           var data_shift = new Date(b[0].data_limite)
                           var agora = new Date()
                           var timeDiff = Math.abs(agora.getTime() - data_shift.getTime());
                            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                           if(diffDays >=30){
                            $.post(server + '/get_avaliou_mba', {
                                id_contato: get_data('geral').id,
                                id_grupo: grupo
                            }).done((c) => {
                                if(c[0].avaliou == 1){
    
                                }else{
                                    console.log('avaliação time')
                                    var dados_avaliacao = {}
                                    dados_avaliacao.id_calendario_aulas = c[0].id_calendario_aulas
                                    document.querySelector('#calendario').innerHTML += ejs.render(avaliacao_solta_NPS_MBA_v, {
                                        aula: dados_avaliacao
                                    });
                                }
                            }).fail((b) => {
                                console.log('erro get_grupo_shift')
                            });
                           }
                        }
    
                        //document.querySelector("#shift").innerHTML = '';
                        $.post(server + '/get_grupo_shift', {
                            id_contato: get_data('geral').id,
                            id_grupos_shift: a[0].id_grupos_shift
                        }).done((a) => {
                            console.log(a)
                            document.querySelector("#shift").innerHTML = ejs.render(shift_calendario_v, {
                                calendarios: a.calendario
                            }) +
                            ejs.render(upload_book_shift_v, {
                                id_grupos_shift: a.grupo.id_grupos_shift
                                }) +
                            ejs.render(shift_edit_empresa_v, {
                            grupo: a.grupo,
                            orientadores: a.orientadores
                            }) +
                            ejs.render(shift_edit_participantes_v, {
                            participantes: a.participantes,
                            participantes_sem_grupo: a.alunos_sem_grupo,
                            id_grupos_shift: a.grupo.id_grupos_shift
                            }) +
                            ejs.render(shift_historico_v, {
                                historico: a.historico
                            });
                            combo_box_orientador_init();
                        }).fail((b) => {
                            console.log('erro get_grupo_shift')
                        });
    
                    }).fail((b) => {
                        console.log('erro get_grupo_shift')
                    });
    
                }else if(a[0].tipo == 'convite'){
                    document.querySelector('#shift').innerHTML += ejs.render(shift_accept_invite_v, {
                        convites: a
                    });
                }
            }
        })
        .fail((b) => {
            console.log('erro get_home_shift')
            console.log(b)
        });
        /// fim load shift
    }

    $("ul.tabs").on('click', 'a', function(){
        window.scrollTo(0,0)
    })

    $('.tabs').tabs();
    $('.sidenav').sidenav({
        edge: 'right'
    });
    $(function(){
        $('.multilevel').on('click', function(){
            $(this).next().toggleClass('d-none');
        });
    });


    // função em card-financeiro.js
    renderizarFinanceiro('#financeiro', grupo)

    // colocar na aula de hoje
    try {
        document.querySelector('#parada_hoje').previousElementSibling.scrollIntoView()
    } catch (e) {

    }

    // Pegar o id_contato
    let id_contato = get_data('geral').id;
    // Enviar o id_contato para a seguinte função, localizada em api.js

    if(id_tipo_projeto == 16 || id_tipo_projeto == 6 || id_tipo_projeto == 21){

        //verificar NPS para os projetos
        var inf = {}
        inf.id_contato = get_data('geral').id
        inf.id_grupo = grupo
        valida_nps_work_cap(inf, function(nps){
            console.log(nps[0].nps)
            if(nps[0].nps == 1){
                console.log('HORA DO NPS'),
                inf.id_calendario_aulas = nps[0].id_calendario_aulas
                document.querySelector('#calendario').innerHTML += ejs.render(avaliacao_solta_NPS_MBA_v, {
                    aula: inf,
                    nota: 10
                });
            }
        })


    }else{
        get_saldo_eletivas(id_contato, load_eletivas);
    }

    //RENDERIZA NOTICIAS
    var dads = { id_contato: get_data('geral').id }

    get_noticias(dads, function(re_noticias){   
        //console.log(re_noticias)     
        //console.log(document.querySelector('#noticias'))
        document.querySelector('#noticias').innerHTML = ejs.render(noticias_v, {
            lista: re_noticias      
        });
    })
}

function load_eletivas(creditos){
    document.querySelector('#eletivas').innerHTML = ejs.render(eletivas_workshopecongressos_v , {
        creditos: creditos
    });

}

function open_aula_notificacao(id_calendario_aula, id_grupo, id_notificacao){
    require_loader('open')
    $('#card-notificacao-' + id_notificacao).attr('style', 'font-weight: normal !important;')
    var aula = {}
    aula.id_grupo = id_grupo
    aula.id_contato = get_data('geral').id
    aula.id_notificacao = id_notificacao

    set_leitura_notificacao(aula, function (cb){
        busca_aulas(aula, (stst) => {            
            get_notas(aula, (ntnt) => {
                require_loader('close')
                load_aula(id_calendario_aula, id_grupo)
                return
            })
        })
    })

}
function abre_video_aula_ondemand(dados){
    console.log(dados)
    toasted('abrindo aula...')
}

function open_checkin_bloqueado(){
    chama_agradecimento('checkin-bloqueado', function(cb){        
    })
}

function load_aula(id_calendario_aula, id_grupo_raiz, id_tipo_projeto) {
    var dads = {}
    dads.id_calendario_aula = id_calendario_aula
    dads.id_contato = get_data('geral').id
    dads.mobile = device.model + '--' + device.uuid

    check_chekin_aula(dads, (dads_resp) =>{             
        
            if(id_grupo_raiz == 0){
                var id_grupo = document.querySelector('grupo').innerText
            }else{
                var id_grupo = id_grupo_raiz
            }
            var aula = get_data(id_grupo)[`_${id_calendario_aula}`]
            console.log('aula')
            console.log(aula)
            change_view(aula_in_v, true, false, {
                aula: aula
            }, nav_degrade_v, {
                titulo: aula.aula
            })
            if(aula.id_tipo_aula == 7){
                if(aula.id_ondemand_aula && aula.id_ondemand_projeto){
        
                    document.querySelector('status').innerHTML = ejs.render(action_v_ondemand, {
                        id_ondemand_aula: aula.id_ondemand_aula,
                        id_ondemand_projeto: aula.id_ondemand_projeto
                    });
                }
            }else{
        
        
                if(id_tipo_projeto == 16){            
                    if(aula.nota){
                        console.log('tem nota')
                    }else{
                        var data_aula = new Date(aula.data_completa)
                        data_aula.setDate(data_aula.getDate() + 1)
                        data_aula.setHours('00')
                        data_aula.setMinutes('00')
                        data_aula.setSeconds('00')
                        data_aula.setMilliseconds('00')
                        var data_atual = new Date()
                        data_atual.setHours('00')
                        data_atual.setMinutes('00')
                        data_atual.setSeconds('00')
                        data_atual.setMilliseconds('00')
                        console.log(data_atual)
                        console.log(data_aula)
                        if(data_atual >= data_aula){
                            console.log('entrou av data')
                            nota = {}
                            nota.id_calendario = aula.id_calendario_aulas
                            nota.id_contato = get_data('geral').id
                            nota.id_grupo = id_grupo
                            document.querySelector('status').innerHTML = ejs.render(avaliacao_solta_v, {
                                dados: nota,
                                id_tipo_projeto: id_tipo_projeto
                            });
                        }
                    }
        
                }
        
                //verifica se é aula formatura e exibe checkin
                if (aula.aula.indexOf('ormatura') > 0 && aula.presenca != 1) {
                        var checkin = {}
                        checkin.id_calendario_aula = aula.id_calendario_aulas
                        checkin.id_contato = get_data('geral').id
                        checkin.tipo_aula = aula.status_tipo_aula
                        checkin.id_grupo = id_grupo                
                        checkin.formatura = 1
                        if(dads_resp == 'ok'){
                            document.querySelector('status').innerHTML = ejs.render(action_v, {
                                dados: checkin
                            });     
                        }
                        if(dads_resp == 'ja'){
                            document.querySelector('status').innerHTML = ejs.render(action_v_jadeu, {
                                dados: checkin
                            });     
                        }
                }
        
        
                if (aula.status.indexOf('check') > 0) {
        
                    if(id_tipo_projeto == 16){
        
                    }else{
                        var checkin = {}
                        checkin.id_calendario_aula = aula.id_calendario_aulas
                        checkin.id_contato = get_data('geral').id
                        checkin.tipo_aula = aula.status_tipo_aula
                        checkin.id_grupo = id_grupo

                        if(dads_resp == 'ok'){
                            document.querySelector('status').innerHTML = ejs.render(action_v, {
                                dados: checkin
                            });     
                        }
                        if(dads_resp == 'ja'){
                            document.querySelector('status').innerHTML = ejs.render(action_v_jadeu, {
                                dados: checkin
                            });     
                        }               
                    }           
        
                    } else if (aula.status.indexOf('nota') > 0) {
                    var data_aula = new Date(aula.data_completa)
                    data_aula.setDate(data_aula.getDate() + 1)
                    data_aula.setHours('00')
                    data_aula.setMinutes('00')
                    data_aula.setSeconds('00')
                    data_aula.setMilliseconds('00')
                    var data_atual = new Date()
                    data_atual.setHours('00')
                    data_atual.setMinutes('00')
                    data_atual.setSeconds('00')
                    data_atual.setMilliseconds('00')
                    if(data_atual > data_aula){
                        console.log('entrou av data')
                        nota = {}
                        nota.id_calendario = aula.id_calendario_aulas
                        nota.id_contato = get_data('geral').id
                        nota.id_grupo = id_grupo
                        document.querySelector('status').innerHTML = ejs.render(avaliacao_solta_v, {
                            dados: nota,
                            id_tipo_projeto: id_tipo_projeto
                        });
                    }else{
                        console.log('entrou av 30%')
                        var dataInicio = new Date()
                        dataInicio.setHours(aula.horario_entrada.replace(aula.horario_entrada.substring(aula.horario_entrada.indexOf(":")), ''))
                        dataInicio.setMinutes('00')
                        dataInicio.setMinutes(dataInicio.getMinutes() + 60)
            
                        var dataFim = new Date()
            
            
                        if(dataFim > dataInicio){
                            nota = {}
                            nota.id_calendario = aula.id_calendario_aulas
                            nota.id_contato = get_data('geral').id
                            nota.id_grupo = id_grupo
                            document.querySelector('status').innerHTML = ejs.render(avaliacao_solta_v, {
                                dados: nota,
                                id_tipo_projeto: id_tipo_projeto
                            });
                        }
                    }
            
                }
        
                var dados_conversa = {}
                dados_conversa.id_calendario = id_calendario_aula
                dados_conversa.id_contato = get_data('geral').id
            
                get_conversa_comentario_aula(dados_conversa, function (gcca_results) {
                    if(gcca_results.length > 0){
                        document.querySelector('status').innerHTML += ejs.render(mensagens_aula_v, {
                            dados_conversa: gcca_results
                        });
                    }
                })
            }
        
            check_notificacao(function (cb){
                if(cb == 1){
                    document.querySelector('.notification-icon').innerHTML += '<i class="material-icons" style="color: red; position: absolute; margin-left: 5px; margin-top: -7px; font-size: 18px;">brightness_1</i></div>'
                }else{
            
                }
            })  

    })

}

////////////////////

var Rating = {
    select(element) {
        $(element).siblings('button').removeClass('active');
        $(element).addClass('active');
    }
}

function envia_checkin(user) {
    require_loader('open')
    user.mobile = device.model + '--' + device.uuid
    
    if (user.tipo_aula != 'presencial') {
        set_checkin(user, function (a) {
            require_loader('close')
            chama_agradecimento('checkin', function(cb){
                //alert(a)
                var d = document.createElement('div')
                d.setAttribute('id-grupo', user.id_grupo)
                load_main_aulas(d)
            })
        })
    } else {
        get_gps_pos(function (s) {
            if (s.status == 'ok') {
                set_checkin(user, function (a) {
                    require_loader('close')
                    //alert(a)
                    chama_agradecimento('checkin', function(cb){
                        var d = document.createElement('div')
                        d.setAttribute('id-grupo', user.id_grupo)
                        load_main_aulas(d)
                    })
                })
            } else {
                require_loader('close')
                toasted('Acho que não consegui te achar!')
            }
        })
    }



}

function envia_nota_aula(ele, dados, id_tipo_projeto) {
    ele = ele.parentNode.parentNode
    dados.nota = ele.querySelector('.nota [class="active"]')
    dados.comentario = ele.querySelector('.comentario textarea').value || ''

    if (!dados.nota) {
        toasted('Falou a Nota')
        return
    }

    dados.nota = dados.nota.innerText
    chama_agradecimento('avaliacao', function(cb){

        manda_load()

        set_nota_comentario(dados, function (x) {
            var d = document.createElement('div')
            d.setAttribute('id-grupo', dados.id_grupo)
            d.setAttribute('id-tipo', id_tipo_projeto)
            load_main_aulas(d)
        })

    })
}

function envia_nota_modulo(ele, dados) {
    ele = ele.parentNode.parentNode
    dados.nota = ele.querySelector('.nota [class="active"]')
    dados.comentario = ele.querySelector('.comentario textarea').value || ''
    dados.id_contato = get_data('geral').id
    dados.id_grupo = document.querySelector('grupo').innerText

    if (!dados.nota) {
        toasted('Faltou a Nota')
        return
    }

    dados.nota = dados.nota.innerText
    chama_agradecimento('avaliacao', function(cb){

        manda_load()
        set_nota_modulo(dados, function (x) {
            var d = document.createElement('div')
            d.setAttribute('id-grupo', dados.id_grupo)
            load_main_aulas(d)
        })
    })
}

function envia_nota_nps_mba(ele, dados) {
    require_loader('open')
    ele = ele.parentNode.parentNode
    dados.nota = ele.querySelector('.nota [class="active"]')
    dados.comentario = ele.querySelector('.comentario textarea').value || ''
    dados.id_contato = get_data('geral').id
    dados.id_calendario_aulas = dados.id_calendario_aulas

    if (!dados.nota) {
        require_loader('close')
        toasted('Faltou a Nota')
        return
    }

    dados.nota = dados.nota.innerText

    if(dados.id_grupo){
        set_nota_nps_work_cap(dados, function (x) {
            if(x == 'ok'){
                chama_agradecimento('avaliacao', function(cb){
                    document.querySelector('.av-mba-card').classList.add('hide')
                    require_loader('close')
                    toasted('Obrigado pela avaliação')
                })
            }else{
                require_loader('close')
                toasted('Ops! Algo deu errado :(')
            }
        })
    }else{
        set_nota_nps_mba(dados, function (x) {
            if(x == 'ok'){
                chama_agradecimento('avaliacao', function(cb){
                    document.querySelector('.av-mba-card').classList.add('hide')
                    require_loader('close')
                    toasted('Obrigado pela avaliação')
                })
            }else{
                require_loader('close')
                toasted('Ops! Algo deu errado :(')
            }
        })
    }

    require_loader('close')

}




function load_event(ele) {
    manda_load()
    setTimeout(function () {
        go_to_event(ele);
    }, 800);
}

function go_to_event(ele) {
    screens = []
    $('.sidenav').sidenav('close');
    $('.sidenav').sideav('destroy');

    id_projeto = ele.getAttribute('id-grupo');
    id_caminho = ele.getAttribute('id-caminho');
    var eventos = get_data('eventos')
    var qrcode = get_data('qrcode')
    var wallet = get_data('wallet')
    for (var i = 0; i < eventos.length; i++) {
        if (eventos[i].id_projeto == id_projeto) {
            document.querySelector('.maine-change').innerHTML = ejs.render(evento_v, {
                login: get_data('geral'),
                evento: eventos[i],
                caminho: id_caminho,
                qrcode: qrcode,
                wallet: wallet
            });

            $('.sidenav').sidenav({
                edge: 'right'
            });
            $('ul.tabs').tabs();
            $('ul.tabs').tabs('select_tab', 'test1');
        }
    }
}


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
function new_friends(friend) {
    $.post(server + '/get_foto_single', {
            id_contato: friend.id_contato
        })
        .done((a) => {
            if (a.status == 'ok') {
                var new_friend = {}
                new_friend.id_contato = friend.id_contato
                new_friend.data = friend.data_upload
                new_friend.foto = friend.foto
                download_image(a.foto, function (caminho) {
                    new_friend.foto = caminho + "?_r=" + Math.random()
                    set_data(new_friend.id_contato, JSON.stringify(new_friend))
                    put_friends(new_friend, friend.presenca)
                })
            } else {
                var div_users = document.querySelector('[id-calendario-aula="' + document.querySelector('load_friends').innerText + '"] .users')
                var new_user = document.createElement('div')
                new_user.className = 'center-align user-avi'
                if (friend.presenca) {
                    new_user.innerHTML = '<img style="border: 1.5px solid #92b632;" src="image/users/c.jpg" alt="" class="circle responsive-img">'
                    div_users.insertBefore(new_user, div_users.childNodes[0])
                } else {
                    new_user.innerHTML = '<img style="opacity: 0.5;" src="image/users/c.jpg" alt="" class="circle responsive-img">'
                    div_users.appendChild(new_user)
                }
            }
        })
        .fail((b) => {
            console.log('erro load_friends one')
            console.log(b)
        })
}

function put_friends(friend, presenca) {
    var div_users = document.querySelector('[id-calendario-aula="' + document.querySelector('load_friends').innerText + '"] .users')
    var new_user = document.createElement('div')
    new_user.className = 'center-align user-avi'
    if (presenca) {
        new_user.innerHTML = '<img style="border: 1.5px solid #92b632;" src="' + friend.foto + '" alt="" class="circle responsive-img">'
        div_users.insertBefore(new_user, div_users.childNodes[0])
    } else {
        new_user.innerHTML = '<img style="opacity: 0.5;" src="' + friend.foto + '" alt="" class="circle responsive-img">'
        div_users.appendChild(new_user)
    }
}

/*
function go_to_perfil() {
    set_data('destino', 0)
    $('.sidenav').sidenav('close');
    $('.sidenav').sidenav('destroy');
    change_view(perfil_v, true, false, {
        login: get_data('geral')
    })
    M.updateTextFields();
}
*/

function resetSideNav() {
    $('.sidenav').sidenav('close');
    $('.sidenav').sidenav('destroy');
}

/*
function update_information() {
    if (document.querySelectorAll('.valid, .invalid').length == 0 && document.querySelector('#foto_c').value == 'nao') {
        change_view('back', false, true)
        return
    }

    if (document.querySelector('.invalid')) {
        toasted('Verifique os campos em vermelho')
        return
    }
*/
function update_information(event) {
    require_loader('open')
    event.preventDefault()

    var nome = document.querySelector('#nome')
    var email = document.querySelector('#email')
    var fone = document.querySelector('#fone')
    var facebook = document.querySelector('#facebook')
    var linkedin = document.querySelector('#linkedin')
    var twitter = document.querySelector('#twitter')
    var instagram = document.querySelector('#instagram')
    var compartilha = document.querySelector('#compartilha')
    var nova_senha = document.querySelector('#nova_senha')
    var confirmar_nova_senha = document.querySelector('#confirmar_nova_senha')

    if (nome.value.length < 4) {
        //nome.className += ' invalid'
        require_loader('close')
        toasted('Campo nome incorreto')
        return
    }
    //if (email.value.length < 4) {
    //    email.className += ' invalid'
    if (!emailValido(email.value)) {
        require_loader('close')
        toasted('Campo email incorreto')
        return
    }
    //if (!foneValido(fone.value)) {
    //    toasted('Campo telefone incorreto')
    //    return
    //}
    if (nova_senha.value || confirmar_nova_senha.value) {
        if (nova_senha.value && nova_senha.value.length < 4) {
            require_loader('close')
            toasted('Senha deve conter mais que 3 caracteres')
            return
        }

        if (nova_senha.value !== confirmar_nova_senha.value) {
            require_loader('close')
            toasted('As senhas não conferem')
            return
        }
    }
    if (facebook.value && facebook.value.length < 4) {
        require_loader('close')
        toasted('Campo facebook incorreto')
        return
    }
    if (linkedin.value && linkedin.value.length < 4) {
        require_loader('close')
        toasted('Campo linkedin incorreto')
        return
    }
    if (twitter.value && twitter.value.length < 4) {
        require_loader('close')
        toasted('Campo twitter incorreto')
        return
    }
    if (instagram.value && instagram.value.length < 4) {
      require_loader('close')
      toasted('Campo instagram incorreto')
      return
    }

    var p = {
        id_contato: document.querySelector('#id').value,
        nome: nome.value.split(' ')[0],
        sobrenome: nome.value.split(' ').splice(1).join(' '),
        email: email.value,
        fone: fone.value ? fone.value.replace(/\(|\)|\-|\s/g, '').trim() : null,
        facebook: facebook.value,
        linkedin: linkedin.value,
        twitter: twitter.value,
        instagram: instagram.value,
        nova_senha: nova_senha.value,
        compartilhar_info: compartilhar_info.checked ? 1 : 0
    }

    console.log({p, compartilhar_info})

    var login = get_data('geral').login
    p.email_old = login.email
    var old_image = get_data('geral').foto
    update_info_perfil(p, function(resposta){
        if(resposta == 'ok'){
            require_loader('close')
            if (document.querySelector('#foto_c').value == 'sim') {
                upload_image(login)
                return
            }

            // delete a.status
            // a.login = login
            // a.login.id = a.id
            // a.foto = old_image

            //set_data('geral', JSON.stringify(p))
            change_view('back', false, true)
        }
    })
    // $.post(server + '/update_info_new', p)
    //     .done((a) => {
    //         if (a.status !== 'exist') {
    //             login.email = p.email
    //         }
    //     })
    //     .fail((b) => {
    //         console.log(b)
    //     })
    //     .always(() => {
    //         if (document.querySelector('#foto_c').value == 'sim') {
    //             upload_image(login)
    //             return
    //         }
    //         $.post(server + '/login', login)
    //             .done((a) => {
    //                 delete a.status
    //                 a.login = login
    //                 a.login.id = a.id
    //                 a.foto = old_image

    //                 set_data('geral', JSON.stringify(a))
    //                 change_view('back', false, true)
    //             })
    //     })
}

function emailValido(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email.toLowerCase());
}

function foneValido(fone) {
    return fone.length == 15;
}


function avaliar(id_calendario) {
    del_data('avaliar')
    var avaliar = {}
    avaliar.id_contato = get_data('geral').id
    avaliar.id_calendario = id_calendario
    avaliar.id_grupo = document.querySelector('grupo').innerText

    var cursos = get_data('cursos')
    for (var i = 0; i < cursos.length; i++) {
        if (cursos[i].id_grupo == avaliar.id_grupo) {
            avaliar.curso = cursos[i]
            break
        }
    }

    var aula = get_data(avaliar.id_grupo)
    for (var i = 0; i < aula.length; i++) {
        if (aula[i].id_calendario_aulas == avaliar.id_calendario) {
            avaliar.aula = aula[i]
            break
        }
    }

    set_data('avaliar', JSON.stringify(avaliar))
    window.location.href = "avalie.html"
}

function open_certificados() {
    $('.modal').modal();
    $('#modalCertificados').modal('open');
}

/////////////// Upload de Imagem

function open_tipo() {
    if (!estaEditando()) {
        return;
    }

    $('.modal').modal();
    $('#modal1').modal('open');
}

function estaEditando() {
    return document.querySelector('#editar').checked
}


function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        targetHeight: 250,
        targetWidth: 250,
        correctOrientation: true //Corrects Android orientation quirks
    }
    return options;
}

function load_camera() {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    /*
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $('#preview')[0].src = imageUri
        document.querySelector('#foto_c').value = 'sim'
        console.log(imageUri)
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
    */
    changeImage(options);
}

function load_galery() {
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);

    changeImage(options);
}

function changeImage(options) {
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $('#preview')[0].style.backgroundImage = `url(${imageUri})`;
        document.querySelector('#foto_c').value = 'sim';
        console.log(imageUri);
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
}

function upload_image(login) {
    //var fileURL = document.querySelector('#preview').src
    var backgroundImage = document.querySelector('#preview').style.backgroundImage
    var fileURL = backgroundImage.substring(4, backgroundImage.length - 1).replace(/["]+/g, '')
    var win = function (r) {
        $.post(server + '/login', login)
            .done(function (a) {
                delete a.status
                a.login = login
                a.login.id = a.id

                download_image(a.foto, function (caminho) {
                    a.foto = caminho + "?_r=" + Math.random()
                    set_data('geral', JSON.stringify(a))
                    //loading_main()
                    change_view('back', false, true)
                })

            })
            .fail(function (b) {
                alert(JSON.stringify(b))
            })

        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }

    var options = new FileUploadOptions();
    options.fileKey = "avatar";
    options.mimeType = "image/jpeg";
    options.fileName = fileURL.split('/').pop();

    var params = {};
    params.id_contato = login.id

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI(server + "/upload_image"), win, fail, options);
}

function download_image(file, cb) {
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(server + "/users/" + file);
    var fileURL = cordova.file.dataDirectory + file;

    fileTransfer.download(
        uri, fileURL,
        function (entry) {
            console.log(JSON.stringify(entry))
            console.log("download complete: " + entry.toURL());
            cb(entry.toURL())
        },

        function (error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);
            cb('erro')
        },

        false, {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}

//////// upload de imagem fim



// Chamada de Loader
function require_loader(action){
    if (action == 'open'){ //abre o loader
        $('#require-loader').fadeIn(500);
    }else if (action == 'close'){
        $('#require-loader').fadeOut(500);
    }
}
// Fim Chamada de Loader

$(function(){
    $('.multilevel').on('click', function(){
        $(this).next().toggleClass('d-none');
    });
});

function change_view_notification(ele){
    if(ele == 1){
        go_to_perfil()
    }

}

function go_to_minhaturma() {
    require_loader('open')
    $('.sidenav').sidenav('close');
    $('.sidenav').sidenav('destroy');

    $.post(server + '/get_minha_turma', {
        id_contato: get_data('geral').id
    })
    .done((a) => {
        console.log(a);
        change_view(minha_turma_v, true, true,
            {
                titulo: a[0].nome_projeto,
                colegas: a
            },navbar_comum_v_eletivas, 
            {
                titulo: 'Minha Turma'
            });
            require_loader('close')
        $(document).ready(function(){
            $('.collapsible').collapsible();        
            $('.phone_with_ddd').mask('(00) 00000-0000');            
        });
    })
    .fail((b) => {
        console.log('erro get_minha_turma')
        console.log(b)
    });
}

function go_to_faq() {

    /// load shift
    $.post(server + '/get_faq', { id_grupo: 0 })
    .done((categories) => {
        $('.sidenav').sidenav('close');
        $('.sidenav').sidenav('destroy');
        change_view(faq_v, true, false, {
            categories: categories
        })
    })
    .fail((b) => {
        console.log('erro get_faq')
        console.log(b)
    });
}

/*
function go_to_video(){
    $('.sidenav').sidenav('close');
    change_view(politica_privacidade, true, true, {id_projeto: 3066}, navbar_comum_v_eletivas, {
        titulo: 'Política de Privacidade'
    })

    $(document).ready(function() {
        var playerInstance = jwplayer("myElement");
        playerInstance.setup({
            file: "https://appliveuniversity.sfo2.digitaloceanspaces.com/small.mp4"
        });
    })

    $('#upload-input').on('change', function () {
        //upload(this, aula_ondemand.id_aula, dados.gabarito, aula.video_link)
        upload_arquivo_video(this)
    })

}
*/

function post_evento(tipo, id_projeto){
    require_loader('open')
    if(tipo == 'texto'){
        var texto_post = document.getElementById('texto-post').value

        if(texto_post.length < 10){
            require_loader('close')
            toasted('Ops! Texto muito curto')
            return
        }

        var dados = {}
        dados.id_contato = get_data('geral').id
        dados.id_projeto = id_projeto
        dados.tipo = tipo
        dados.texto = texto_post
        dados.link = ''

        insert_post_evento(dados, function (resposta) {
            if(resposta == 'bad'){
                require_loader('close')
                toasted('Ops! Algo deu errado')
                return
            }else{
                require_loader('close')
                toasted('Post Enviado!')
                go_to_meus_eventos(id_projeto)
                return
            }
        })
    } //fim if texto

    if(tipo == 'foto'){
        var texto_post = document.getElementById('texto-post').value

        if(texto_post.length == 0){
            texto_post = ''
        }

        var link_foto = document.querySelector('.preview-foto-post').src

        var dados = {}
        dados.id_contato = get_data('geral').id
        dados.id_projeto = id_projeto
        dados.tipo = tipo
        dados.texto = texto_post
        dados.link = link_foto

        insert_post_evento(dados, function (resposta) {
            if(resposta == 'bad'){
                require_loader('close')
                toasted('Ops! Algo deu errado')
                return
            }else{
                require_loader('close')
                toasted('Post Enviado!')
                go_to_meus_eventos(id_projeto)
                return
            }
        })
    } // fim tipo foto


}

function open_tipo_upload() {

    $('.modal').modal();
    $('#modal1').modal('open');

}

function load_foto_post() {

    $('.modal').modal();
    $('#modal1').modal('close');
    $('#modal3').modal('open');

}

function load_camera_post_foto(id_projeto) {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions_post(srcType);
    /*
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $('#preview')[0].src = imageUri
        document.querySelector('#foto_c').value = 'sim'
        console.log(imageUri)
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
    */
   changeImage_post(options, id_projeto);
}

function load_galery_post_foto(id_projeto) {
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions_post(srcType);
    changeImage_post(options, id_projeto);
}

function setOptions_post(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        targetHeight: 1200,
        targetWidth: 675,
        correctOrientation: true //Corrects Android orientation quirks
    }
    return options;
}



function changeImage_post(options, id_projeto) {

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $('#preview-teste')[0].style.backgroundImage = `url(${imageUri})`;

        var backgroundImage = document.querySelector('#preview-teste').style.backgroundImage
        var fileURL = backgroundImage.substring(4, backgroundImage.length - 1).replace(/["]+/g, '')

        var options = new FileUploadOptions();
        options.fileKey = "post-foto";
        options.mimeType = "image/jpeg";
        options.fileName = fileURL.split('/').pop();

        var params = {};
        params.id_contato = get_data('geral').id
        params.id_projeto = id_projeto

        options.params = params;
        var ft = new FileTransfer();

        var win = function (r) {
           if(r.response.indexOf('Error') > -1){
                require_loader('close')
                toasted('Ops! Algo deu errado')
                return
           }else{
               var link_foto = 'http://liveulabs.com:49/users/' + params.id_contato + '.jpg'
                change_view(new_post_foto_v, true, false, {
                    link_foto: link_foto,
                    id_projeto: id_projeto,
                    preview_foto: r.response
                })
                require_loader('close')
                /*
                var dados = {}
                dados.id_projeto = id_projeto
                dados.id_contato = get_data('geral').id
                dados.tipo = 'foto'
                dados.texto = r.response
                insert_post_evento(dados, function (resposta){
                    if(resposta == 'bad'){
                        require_loader('close')
                        toasted('Ops! Algo deu errado')
                        return
                    }else{
                        require_loader('close')
                        toasted('Post Enviado!')
                        go_to_meus_eventos(id_projeto)
                    }
                })
                */

           }
        }

        var fail = function (error) {
            require_loader('close')
            toasted('Ops! Algo deu errado no upload')
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
        require_loader('open')
        ft.upload(fileURL, encodeURI(server + "/upload_foto_post"), win, fail, options);

    }, function cameraError(error) {
        require_loader('close')
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
}

function load_camera_post_video(id_projeto) {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions_post(srcType);
    /*
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $('#preview')[0].src = imageUri
        document.querySelector('#foto_c').value = 'sim'
        console.log(imageUri)
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
    */
   changeImage_post(options, id_projeto);
}


/////////////////////////////////////// UPLOAD BOOK SHIFT
function chama_book(ele, id_grupos_shift){
    require_loader('open')
    upload_book(ele, id_grupos_shift)
}

function upload_book(ele, id_grupos_shift) {
    var id_contato = get_data('geral').id
    var files = $(ele).get(0).files;
    console.log(files[0])
    var nome_arquivo = files[0].name
    if(nome_arquivo.indexOf(".pdf") == -1){
        require_loader('close')
        toasted('Ops! Apenas formato .pdf')
        return
    }
    //console.log('arquivo upload...');

    if (files.length > 0) {
        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append('upload', file);
        }

        $.ajax({
            url: 'http://liveulabs.com:49/upload_book?id_contato=' + id_contato + '&id_grupos_shift=' + id_grupos_shift + '&date=' +
                new Date().toLocaleString().replace(/\/| |:/g, 'L'),
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
               console.log(data)
               if(data.status == 'ok'){
                require_loader('close')
                   toasted('Arquivo Enviado... Abrindo Link...')
                   setTimeout(function(){
                       window.open(data.caminho)
                    }, 2000);
               }else{
                    require_loader('close')
                   toasted('Ops! Erro no Upload')
               }
            }
        });
    }

}
// FIM UPLOAD BOOK SHIFT

// função para chamar modal de agradecimento

function chama_agradecimento(tipo, cb){
    $(document).ready(function(){$(".modal").modal();});

    if(tipo == 'checkin'){
        var icone = 'aula_nota'
        var frase = 'Checkin Realizado.<br> Tenha uma boa aula!'
        var vai = 1
        var width = 80
    }

    if(tipo == 'avaliacao'){
        var icone = 'rating'
        var frase = 'Obrigado pela sua avaliação!'
        var vai = 1
        var width = 80
    }

    if(tipo == 'checkin-bloqueado'){
        var icone = 'warning'
        var frase = `Ops! 🤦🏻‍♂<br>
        Você já usou esse celular para fazer check-in hoje!<br>
        Essa prenseça não foi efetivada. 😬🙄<br>
        🕵🏻‍♂🕵🏽‍♀`
        var vai = 1
        var width = 40
    }

    if(vai == 1){
        if(width == 40){
            var modal_agradecimento_v = `
            <div class="modal" id="agradecimento-checkin">
                <div class="modal-content" style="padding-bottom: 15%;">
                    <i class="material-icons dp48" onclick="$('.modal-overlay').trigger('click');">close</i>
                    <img src="img/icons/${icone}.svg" alt="" style="transform: translateX(7%); width: 40%; !important">
                    <br>
                    ${frase}                    
                </div>
            </div>
            `
        }else{
            var modal_agradecimento_v = `
            <div class="modal" id="agradecimento-checkin">
                <div class="modal-content">
                    <i class="material-icons dp48" onclick="$('.modal-overlay').trigger('click');">close</i>
                    <img src="img/icons/${icone}.svg" alt="" style="transform: translateX(7%);">
                    <br>
                    ${frase}
                </div>
            </div>
            ` 
        }
        

        document.querySelector('.div-modal').innerHTML = ejs.render(modal_agradecimento_v);

        var onCloseEnd = function() {
            cb('ok')
        };

        setTimeout(function(){
            $('#agradecimento-checkin').modal({
                onCloseEnd: onCloseEnd
            })
            $('#agradecimento-checkin').modal('open')

            //$('.modal').modal('')
        }, 1000)
    }

}

// Reescritura da ação do botão de voltar do sistema

// Adiciona um listener para o evento
function addBackKeyHandler(){
  document.addEventListener("backbutton", onBackKeyDown, false);
}

// Remove o listener, pois a tela inicial não está na pilha de telas
function removeBackKeyHandler(){
  document.removeEventListener("backbutton", onBackKeyDown, false);
}

// Executa o change_view para voltar uma tela quando o botão é pressionado.
function onBackKeyDown() {
  if (screens.length > 0) change_view('back', false, true);
}



// 2 linhas yann
$('body').on('DOMNodeInserted', function(){
	/*
	Todos os elementos que tiverem a classe limit-lines terão suas linhas limitadas automaticamente.
	Por padrão e se não atribuido o numero de linhas o texto será limitado a 2 linhas e também haverá
	uma redução no tamanho da fonte de 20%.

	Até 29/04/2019, os atributos disponíveis e manipuláveis são:
	data-lines (int) - onde é possível estipular o a quantidade de linhas a se limitar
	data-keeep-font-size (true/false) - que quando definido como true, evita a redução do tamanho da fonte
	se omitido, ou definido como false, permite a redução do tamanho da fonte.

	Exemplo de uso:
	<tag class="limit-lines" data-lines="3" data-keep-font-size="true">contents</tag>
	*/
	$('.limit-lines').each(function(i, e){
		// TODO Refatorar para novo Typed OM quando Houdini for melhor suportado.

		let numero_de_linhas = 2;
		if(typeof $(this).attr("data-lines") != "undefined")
			numero_de_linhas = $(this).attr("data-lines");
		// Calcula altura atual e esperada.
		let lh = window.getComputedStyle(e).getPropertyValue('line-height').replace(/px/, '');
		// let h = Number(lh) * 2 + 5;
		let h = Number(lh) * numero_de_linhas + 5;

		// Aborta se a altura estiver no padrão.
		if(e.scrollHeight <= h)
			return;

		if(typeof $(this).attr("data-keep-font-size") == "undefined" || $(this).attr("data-keep-font-size") != "true"){
			// Reduz a fonte para 80%.
			let fs = window.getComputedStyle(e).getPropertyValue('font-size').replace(/px/, '');
			e.style.fontSize = String(Number(fs) * 0.8) + 'px';
		}

		// Retorna se a altura ficou no padrão.
		if(e.scrollHeight <= h)
			return;

		// Adiciona elipses para cálculo correto da altura.
		e.firstChild.data = '... ' + e.innerText;

		// Remove palavras até que altura esteja correta.
		while(e.scrollHeight > h){
			let a = e.innerText.split(' ');
			a.pop();
			e.firstChild.data = a.join(' ');
		}

		// Move as elipses para o fim do texto.
		a = e.innerText.split(' ');
		let s = a.pop() + a.shift();
		a.push(s);
		e.firstChild.data = a.join(' ');
	});
});
//fim 2 linhas yann