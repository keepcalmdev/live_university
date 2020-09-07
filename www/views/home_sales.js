const home_sales_v = `
    <div id="navbar"></div>
    <div id="home-sales">
        <div class="row">

            <div class="input-field col s12 buscador-sales" onclick="focus_buscador()">
                <input disabled placeholder="O que você quer buscar? (Ex: Marketing)" id="search" type="text">
                <label class="active" for="search">Busque um curso ou uma aula</label>
            </div>

            <div class="input-field col s12 center btn-sales-esconder" style="display: none;">
                <a class="waves-effect waves-light btn btn-sales-search" onclick="buscar_manual_sales('form', 0, 'x')"><i class="material-icons right" style="color: #781866 !important;font-weight: bolder !important;">
                search</i>
                <span style="color: #781866 !important; font-weight: bolder !important;">
                Buscar</span></a>
            </div>

            <div class="input-field col s12 center btn-sales-voltar" style="display: none;">
                <a class="waves-effect waves-light btn btn-sales-search" onclick="go_to_home_sales()"><i class="material-icons right" style="color: #781866 !important;font-weight: bolder !important;">
                keyboard_return</i>
                <span style="color: #781866 !important; font-weight: bolder !important;">
                Voltar</span></a>
            </div>

        </div>

        <div class="container buscador-resultado" style="display: none">

            <span style="font-weight: bolder; color: gray; font-size: 130%;">
            Resultado Para: "<span id="textoresultado" style="color: gray;"></span>"
            </span>
        </div>    


        <div class="container buscador-mostrar" style="display: none">

            <span style="font-weight: bolder; color: #D6A134; font-size: 130%;">
            Áreas
            </span>

            <div class="row center">
                <div class="col s3 box-filtro" onclick="buscar_manual_sales('btn', 11, 'VENDAS')">
                    VENDAS
                </div>
                <div class="col s4 box-filtro" onclick="buscar_manual_sales('btn', 3, 'COMUNICAÇÃO')">
                    COMUNICAÇÃO
                </div>
                <div class="col s3 box-filtro" onclick="buscar_manual_sales('btn', 18, 'FINANÇAS')">
                    FINANÇAS
                </div>
                <div class="col s4 box-filtro" onclick="buscar_manual_sales('btn', 111, 'TECNOLOGIA')">
                    TECNOLOGIA
                </div>
                <div class="col s2 box-filtro" onclick="buscar_manual_sales('btn', 112, 'RH')">
                RH
                </div>
                <div class="col s4 box-filtro" onclick="buscar_manual_sales('btn', 113, 'MARKETING')">
                    MARKETING
                </div>
                <div class="col s3 box-filtro" onclick="buscar_manual_sales('btn', 4, 'FISCAL')">
                    FISCAL
                </div>
                <div class="col s4 box-filtro" onclick="buscar_manual_sales('btn', 2, 'COMPRAS')">
                    COMPRAS
                </div>
                <div class="col s3 box-filtro" onclick="buscar_manual_sales('btn', 114, 'LOGÍSTICA')">
                    LOGÍSTICA
                </div>
            </div>  
            <div class="row box-carregando-cinza" style="margin-top: 15%;" style="display: none;">
                <div class="col s12 center">
                    <img class="cubo-cinza" src="img/icons/cubo_cinza.png" alt="" style="width: 20%;">
                </div>
                <div class="col s12 center">
                    <p class="saving" style="margin-top: 0%;">Carregando<span>.</span><span>.</span><span>.</span></p>
                </div>
            </div>    
        </div>
        <div class="row buscador-esconder">
            <div class="col s12" style="padding: 0">
                <h3>Para você</h3>
                <div class='carousel' id="para-voce"></div>
            </div>

            <div class="col s12" style="padding: 0">
                <h3><%= area%></h3>
                <div class="carousel" id="categoria"></div>
            </div>

            <div class="col s12" style="padding: 0; margin-top: 20px">
                <h3>Você pode gostar destes também</h3>
                <div id="indicacao"></div>
            </div>
        </div>
        <div id="resultado" style="display: none">

        </div>
    </div>    
`

function buscar_manual_sales(origem, id, texto){
    var id_contato = get_data('geral') ? get_data('geral').id : 1
    if(id_contato > 1){
        var tipo = 1
    }else{
        var tipo = 0
    }
    var dados = {}
    if(origem == 'form'){
        dados.texto = document.getElementById('search').value
        dados.tipo = 'form'
        dados.id = 0      
        $('#textoresultado').html(`${dados.texto}`)  
    }else{
        dados.id = id
        dados.tipo = 'codigo'
        dados.texto = ''  
        $('#textoresultado').html(`${texto}`)      
    }    
    $('.box-carregando-cinza').show();

    get_filtra_cursos_sale(dados, function(resultado){
        $('.btn-sales-esconder').hide();
        $('.btn-sales-voltar').show();
        $('.buscador-resultado').show();
        $('.box-carregando-cinza').hide();
        $('.buscador-mostrar').hide();    
        document.querySelector('#resultado').innerHTML = ejs.render(sales_cards_horizontal_v, {cursos: resultado, tipo: tipo});               
        $('#resultado').show();

    })   
}

function focus_buscador(){
    $('.buscador-esconder').hide();
    $('.box-carregando-cinza').hide();    
    $("#search").prop("disabled", false);
    $('.buscador-mostrar').show();   
    $('.btn-sales-esconder').show();   
    
    //alert('escondendo')
}

function desfoco_buscador(){
    $('.buscador-esconder').show();
    $('.buscador-mostrar').hide();
    $("#search").prop("disabled", true);
    //alert('mostrando')
}

function go_to_home_sales() {
    require_loader('open')    
    var dados = {}
    var id_contato = get_data('geral') ? get_data('geral').id : 1
    dados.id_contato = id_contato

    if(id_contato > 1){
        resetSideNav();
    }

    get_catalogo_sales_temp(dados, function(gcs_sales){        
        console.log(gcs_sales)
        M.updateTextFields();      
           
        if(id_contato > 1){
            //console.log('tem id')
            change_view(home_sales_v, true, true, {area: gcs_sales.area_interesse[0].area}, navbar_comum_v_eletivas, { titulo: 'Cursos' });
        }else{
            //console.log('não tem id')
            change_view(home_sales_v, true, {area: 'Todos'});
            document.querySelector('#navbar').innerHTML = ejs.render(navbar_comum_v_eletivas_vazio, {titulo: 'Cursos'});
        }
        // renderizar componentes
        $(document).ready(() => {

        if(id_contato > 1){
            document.querySelector('#para-voce').innerHTML = ejs.render(sales_carousel_horizontal_v, {cursos: gcs_sales.pra_vc, tipo: 1});
            document.querySelector('#categoria').innerHTML = ejs.render(sales_carousel_vertical_v, {cursos: gcs_sales.area_interesse, tipo: 1});
            document.querySelector('#indicacao').innerHTML = ejs.render(sales_cards_horizontal_v, {cursos: gcs_sales.pode_gostar, tipo: 1});
        }else{
            document.querySelector('#para-voce').innerHTML = ejs.render(sales_carousel_horizontal_v, {cursos: gcs_sales.pra_vc, tipo: 0});
            document.querySelector('#categoria').innerHTML = ejs.render(sales_carousel_vertical_v, {cursos: gcs_sales.area_interesse, tipo: 0});
            document.querySelector('#indicacao').innerHTML = ejs.render(sales_cards_horizontal_v, {cursos: gcs_sales.pode_gostar, tipo: 0});
        }
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
            require_loader('close')
        });
    });

}

function favorita_curso_ondemand(ele){    
    var preenchido = ele.getAttribute('preenchido')
    var id_projeto = ele.getAttribute('id-projeto')
    var dados = {}
    dados.id_contato = get_data('geral').id
    dados.id_projeto = id_projeto
    if(preenchido == 1){
        dados.ativa = 0
    }else{
        dados.ativa = 1
    }

    require_loader('open')
    marca_favorito_ondemand_sales(dados, function(cb){

        if(ele.getAttribute('origem')){            
            if(preenchido == 0){
                $('#dentro').html('<i class="material-icons" style="transform: translateY(3px);font-size: 35px;">favorite</i>')          
                ele.setAttribute("preenchido", "1");
            }else{
                $('#dentro').html('<i class="material-icons" style="transform: translateY(3px);font-size: 35px;">favorite_border</i>')
                ele.setAttribute("preenchido", "0");
            }
        }else{            
            if(preenchido == 0){
                ele.src="img/icons/heart_preenchido.svg"            
                ele.setAttribute("preenchido", "1");
            }else{
                ele.src="img/icons/heart.svg"
                ele.setAttribute("preenchido", "0");
            }
        }
            require_loader('close')
    })   
}

function open_home_sale(ele){
    require_loader('open')
    //console.log(ele)
    var tipo = ele.getAttribute('tipo')
    var id_projeto = ele.getAttribute('id-projeto')
    dados = {}
    dados.id_projeto = id_projeto
    //dados.id_projeto = 5529//work //4630 evento
    if(tipo == 1){
        var favorito = ele.parentNode.querySelector('img').getAttribute('preenchido')
        get_info_aula_sale(dados, function(gias){
            //console.log(gias)
            change_view(home_sales_v_new, true, true, {
                curso: gias[0], 
                favorito: favorito,
                professores: gias[0].professores,
                modulos: gias[0].modulos,
                id_tipo_projeto: gias[0].id_tipo_projeto
            }, navbar_barra_roxa_sales, { titulo: 'Titulo' })
            $('body').css('background-image', 'url("img/sales/cheio_3438.png")')
            require_loader('close')
        })
    }else{
        get_info_aula_sale(dados, function(gias){
            //console.log(gias)
            change_view(home_sales_v_new, true, {
                curso: gias[0], 
                favorito: favorito,
                professores: gias[0].professores,
                modulos: gias[0].modulos,
                id_tipo_projeto: gias[0].id_tipo_projeto
            })
            document.querySelector('#navbar').innerHTML = ejs.render(navbar_barra_roxa_vazio, { titulo: 'Titulo' });
            $('body').css('background-image', 'url("img/sales/cheio_3438.png")')
            require_loader('close')
        })

    }

    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(document).scrollTop() > 250) { //ponto de mudança - 210 pixeis
              $('.nav-extended').attr('style', 'background-color: #781866 !important')
            } else {
              $('.nav-extended').attr('style', 'background-color: transparent !important')
              $('.nav-extended').attr('style', 'box-shadow: 0 0 0 0 !important;')
            }
          });          
    });

}

function comprar_sales(id_projeto){
    var id_contato = get_data('geral') ? get_data('geral').id : 1
    if(id_contato > 1){
        //logado
        comprar(id_projeto)
    }else{
        //deslogado
        load_cadastro_login(id_projeto)
    }
}

function inscrever_sales(id_projeto){
        var id_contato = get_data('geral') ? get_data('geral').id : 1
        if(id_contato > 1){
            //logado
            manda_load()
            var dados = {}
            dados.id_contato = get_data('geral').id
            dados.nome = get_data('geral').nome
            dados.id_login_portal = get_data('geral').id_login_portal ? get_data('geral').id_login_portal : 0
            dados.senha = get_data('geral').login.senha
            dados.id_projeto = id_projeto
            dados.email = get_data('geral').login.email
            
            set_trial_sales(dados, (cb) => {
                if(cb == 'ok'){            
                    $('body').css('background-image', '')
                    load_curso_ondemand_sales(id_projeto)
                    return
                }
                toasted('Ops! Erro na inscrição')
                go_to_home_sales()        
            })

        }else{
            //deslogado
            load_cadastro_login(id_projeto)
        }        
}    
