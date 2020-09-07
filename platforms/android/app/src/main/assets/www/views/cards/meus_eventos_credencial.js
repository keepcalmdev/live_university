const meus_eventos_credencial = `
<section id="credencial">
    <section class="dados card" onclick="chama_checkin_evento(<%=id_projeto%>, '<%=nome%>', '<%=empresa%>')">
        <input type="checkbox" id="qrcode-visivel">

        <article>
            <div class="flex ai-cen">
                <img id="foto-usuario" src='' class="foto" alt="Foto de perfil" />

                <div class="pessoal">
                    <h1 id="nome-usuario" class="margin-0"></h1>
                    <p id="nome-empresa" class="margin-0 grey-text"></p>
                </div>
            </div>

            <div class="box-qrcode flex jc-cen">
                <img class="h100" src="image/icon_checkin_qr_code.svg" alt="QRCode">
            </div>
            <h3>
                Check-in com QR Code
            </h3>
        </article>
    </section>

    <section class="sobre card">
        <h1 class="margin-0">Sobre o evento</h1>

        <p class="margin-bottom-0 grey-text"><%- descricaoProjeto %></p>
    </section>

    <!--<section class="feed card flex ai-cen">
        <i class="icone material-icons">share</i>
        <h1 class="margin-0 flex-1">Feed de notícias</h1>

        <a>
            <i class="material-icons grey-text text-lighten-1">chevron_right</i>
        </a>
    </section>

    <section class="agenda card flex ai-cen">
        <i class="icone material-icons">calendar_today</i>
        <h1 class="margin-0 flex-1">Agenda</h1>

        <a>
            <i class="material-icons grey-text text-lighten-1">chevron_right</i>
        </a>
    </section>-->
</section>
`

function renderizarMeusEventosCredencial(elemento, dados) {
    console.log('dados...')
    console.log(dados)
    var dados_user = {}
    var id_contato = get_data('geral').id
    dados_user.id_contato = id_contato
    get_info_user(dados_user, (dados_usuario) => {
        dados.nome = dados_usuario[0].nome
        dados.empresa = dados_usuario[0].empresa

        document.querySelector(elemento).innerHTML = ejs.render(meus_eventos_credencial, dados)

        var link_foto = 'http://liveulabs.com:49/users/' + id_contato + '.jpg'

        document.getElementById('foto-usuario').src = link_foto
        document.getElementById('nome-usuario').innerText = dados_usuario[0].nome
        document.getElementById('nome-empresa').innerText = dados_usuario[0].empresa

    })
}

function chama_wallet_evento(id_projeto, nome, empresa) {
    var id_contato = get_data('geral').id
    // http://liveulabs.com:8089/wallet?id_contato=802058&id_projeto=4605
    window.open(`http://liveulabs.com:8089/wallet?id_contato=${id_contato}&id_projeto=${id_projeto}`)
}

var tela_checkin_evento = `
<div id="skin">
<div id="back" onclick="volta_checkin_evento()"><i class="material-icons">chevron_left</i></div>
<div id="logo-live"><img src="image/cubo_logo_live_university.svg" /></div>
<div id="text">Escaneie o QR code</div>
<div id="line"></div>
<div id="overlay"></div>
`
var tela_credencial_finalizar = `
    <div id="credencial-finalizar">
        <div id="card-cred">
            <div id="infos">
                <span id="cred-nome">
                    <%= nome.toUpperCase() %>
                </span>
                <span id="cred-empresa">
                    <%= empresa.toUpperCase() %>
                </span>
            </div>
            <div id="card-hold">
                <img src="image/credencial_layout.png" />
            </div>
        </div>
        <div id="navega">
            <div id='inputs'>
                <div class="carousel carousel-slider">
                    <div class="input-field carousel-item">
                        <input placeholder="Nome para credencial" maxlength="22" id="name_input" type="text" value="<%= nome %>">
                        <label class="active" for="name">Nome para credencial (max 22 caracteres)</label>
                    </div>
                    <div class="input-field carousel-item">
                        <input placeholder="Empresa" id="empresa_input" maxlength="16" type="text" value="<%= empresa %>">
                        <label class="active" for="empresa">Empresa (max 16 caracteres)</label>
                    </div>
                </div>
            </div>
            <div id='botoes' data-level='0'>
                <button id="anterior" onclick="volta_checkin_evento_credencial()"> Anterior </button>
                <button id="proximo" onclik="credencial_go_empresa()"> Próximo </button>
            </div>
        </div>
    </div>
`

function volta_checkin_evento() {
    $('body').css('background-color', 'white');
    change_view('back')
}

function volta_checkin_evento_credencial(){
    QRScanner.destroy();
    $('body').css('background-color', 'white');
    change_view('back')
    change_view('back')
}

function volta_checkin_evento_nav() {
    if ($("#skin") != undefined) {
        QRScanner.destroy();
        $('body').css('background-color', 'white');
        document.removeEventListener("backbutton", volta_checkin_evento_nav);
    }

}

function chama_checkin_evento(id_projeto, nome, empresa) {
    while(nome.length > 22){
        nome = nome.substr(0,(nome.length - 1));
    }
    while(empresa.length > 16){
        empresa = empresa.substr(0,(empresa.length - 1));
    }

    var id_contato = get_data('geral').id

    QRScanner.prepare(onDone); // show the prompt


    function onDone(err, status) {
        if (err) {
            // here we can handle errors and clean up any loose ends.
            console.error(err);
            toasted('Erro acesso a Camera!')
        }
        if (status.authorized) {
            // W00t, you have camera access and the scanner is initialized.
            // QRscanner.show() should feel very fast.

            change_view(tela_checkin_evento, true, true, {}, false, {})
            document.addEventListener("backbutton", volta_checkin_evento_nav, false);
            $('body').css('background-color', 'transparent');
            QRScanner.show();
            QRScanner.scan(displayContents);
        } else if (status.denied) {
            // The video preview will remain black, and scanning is disabled. We can
            // try to ask the user to change their mind, but we'll have to send them
            // to their device settings with `QRScanner.openSettings()`.
            toasted('Sem acesso à Camera!')
        } else {
            // we didn't get permission, but we didn't get permanently denied. (On
            // Android, a denial isn't permanent unless the user checks the "Don't
            // ask again" box.) We can ask again at the next relevant opportunity.
            toasted('Sem acesso à Camera!')
        }
    }

    function displayContents(err, text) {
        if (err) {
            // an error occurred, or the scan was canceled (error code `6`)
            toasted('Sem acesso à Camera!')
        } else {
            // The scan completed, display the contents of the QR code:   
            console.log('TEXTO')
            console.log(text)
            if (id_projeto == text) {
                manda_load()

                QRScanner.destroy(function (status) {
                    var dados = {}
                    dados.id_contato = id_contato
                    dados.id_projeto_aberto = id_projeto
                    dados.id_projeto = text
                    open_finalizar_credencial(nome, empresa, text, id_projeto);
                });
            } else {
                volta_checkin_evento()
                toasted('QRCode Não Autorizado.')
            }
        }
    }
}

function open_finalizar_credencial(nome, empresa, text, id_projeto) {
    change_view(tela_credencial_finalizar, true, true, {
        nome: nome,
        empresa: empresa,
    }, false, {});
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {
        fullWidth: true,
        noWrap: true,
        onCycleTo: data => {
            if (data.outerText == "Empresa (max 16 caracteres)") {
                $('#botoes #anterior').prop('disabled', false);
                $('#botoes #proximo').text('Finalizar');
                $('#botoes').data('level', '1');
                $('#empresa_input').focus();
                $('#anterior').attr('onclick', 'volta_checkin_evento_nav();');
            } else {
                $('#botoes').data('level', '0');
                //$('#botoes #anterior').prop('disabled', true);
                $('#botoes #proximo').text('Próximo');
                $('#anterior').attr('onclick', 'volta_checkin_evento_credencial();');
                $('#name_input').focus();
            }
        }
    });
    $('#name_input').focus();
    $('#name_input').on('keyup', () => {
        $('#cred-nome').text($('#name_input').val().toUpperCase());
        var preenchido = $('#name_input').val()
        if (preenchido.length > 22) {
            document.getElementById('name_input').style.setProperty('color', 'red', 'important')
            document.getElementById('cred-nome').style.setProperty('color', 'red', 'important')
            $('#proximo').prop('disabled', true);
            document.getElementById('proximo').style.setProperty('color', 'gray', 'important')

        } else {
            document.getElementById('name_input').style.setProperty('color', 'black', 'important')
            document.getElementById('cred-nome').style.setProperty('color', 'black', 'important')
            $('#proximo').prop('disabled', false);
            document.getElementById('proximo').style.setProperty('color', '#781866', 'important')
        }
    });
    $('#empresa_input').on('keyup', () => {
        $('#cred-empresa').text($('#empresa_input').val().toUpperCase());
        var preenchido = $('#empresa_input').val()
        if (preenchido.length > 16) {
            document.getElementById('empresa_input').style.setProperty('color', 'red', 'important')
            document.getElementById('cred-empresa').style.setProperty('color', 'red', 'important')
            $('#proximo').prop('disabled', true);
            document.getElementById('proximo').style.setProperty('color', 'gray', 'important')
        } else {
            document.getElementById('empresa_input').style.setProperty('color', 'black', 'important')
            document.getElementById('cred-empresa').style.setProperty('color', 'black', 'important')
            $('#proximo').prop('disabled', false);
            document.getElementById('proximo').style.setProperty('color', '#781866', 'important')
        }
    });
    $('body').css('background-color', 'transparent');
    $('#botoes #anterior').on('click', () => {
        instances[0].prev();
        $('#botoes').data('level', '0');
        $('#botoes #anterior').prop('disabled', true);
        $('#botoes #proximo').text('Próximo');
        $('#name_input').focus();
    });
    $('#botoes #proximo').on('click', () => {
        const level = $('#botoes').data('level');
        if (level == '0') {
            instances[0].next();
            $('#botoes #anterior').prop('disabled', false);
            $('#botoes #proximo').text('Finalizar');
            $('#botoes').data('level', '1');
            $('#empresa_input').focus();
        } else {
            var dados = {}
            dados.id_contato = get_data('geral').id
            dados.id_projeto_origem = id_projeto
            dados.id_projeto = text
            dados.nome = $('#name_input').val().toUpperCase();
            dados.empresa = $('#empresa_input').val().toUpperCase();

            envia_checkin_evento(dados, (retorno) => {
                if(retorno == 'ok'){
                    go_to_meus_eventos(id_projeto)
                    toasted('Checkin Realizado com Sucesso')
                }else{
                    go_to_meus_eventos(id_projeto)
                    toasted('Erro no Checkin.')
                }
            })
        }
    });
}