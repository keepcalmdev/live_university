var screens = []
var versao_app = '5.8.7'
set_data('versao', JSON.stringify(versao_app))

var server = 'http://www.liveulabs.com:49'
//var server = 'http://192.168.0.50:49'

function goto_main() {
    screens = []
    if (!get_data('cursos') || navigator.onLine) {
        var dados = JSON.parse(window.localStorage.getItem('geral'))
        $.post(server + '/get_cursos', dados)
            .done((a) => {
                //set_data('eventos', JSON.stringify(a))
                // gera_qrcode(dados) ---- desativado pois ainda não temos eventos - pega os dados e imagem do QRCODE
                //baixa_imagem_externa(a)  --- desativado pois não baixamos imagem externa do app - somente usamos agora as do proprio
                set_data('cursos', JSON.stringify(a))
                cursos_lista = []
                window.location.href = "home.html"
            })
            .fail((b) => {
                alert(JSON.stringify(b))
            })
    } else {
        window.location.href = "home.html"
    }
    return
}

/*
function gera_qrcode(dados) {

    $.post(server + '/qrcode', {id_contato: dados.id})
        .done((a) => {

            var file = server + '/users/qr_' + dados.id + '.png'

            var fileTransfer = new FileTransfer();
            var uri = encodeURI(file);
            var fileURL = cordova.file.dataDirectory + file;

            fileTransfer.download(
                uri, fileURL,
                function (entry) {
                    console.log(JSON.stringify(entry))
                    console.log("download complete: " + entry.toURL());
                    link = entry.toURL()
                    set_data('qrcode', JSON.stringify(link))
                 },

                function (error) {
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("download error code" + error.code);

                    // imagem generica

                },

                false, {
                    headers: {
                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    }
                }
            );

        })
        .fail((b) => {
            alert('qrcode')
            alert(JSON.stringify(b))
        })
}
*/
var cursos_lista = []

/*
function baixa_imagem_externa(a) {
    //download_wallet() -- baixa imagem do wallet - desativado pois ainda não temos eventos
    for (var i = 0; i < a.length; i++) {
        download_image_fundo(a[i], a.length)
    }
}
*/

/*
function download_wallet() {
    var file = server + '/users/addwallet.png'
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(file);
    var fileURL = cordova.file.dataDirectory + file;

    fileTransfer.download(
        uri, fileURL,
        function (entry) {
            console.log(JSON.stringify(entry))
            console.log("download complete: " + entry.toURL());
            var endereco = entry.toURL()
            set_data('wallet', JSON.stringify(endereco))
        },
        function (error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);

            // imagem generica

        },
        false, {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}
*/
/*
function download_image_fundo(curso, maximo) {
    var file = curso.caminho
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(file);
    var fileURL = cordova.file.dataDirectory + file;

    fileTransfer.download(
        uri, fileURL,
        function (entry) {
            console.log(JSON.stringify(entry))
            console.log("download complete: " + entry.toURL());
            curso.caminho = entry.toURL()
            cursos_lista.push(curso)

            if (cursos_lista.length == maximo) {
                set_data('cursos', JSON.stringify(cursos_lista))
                cursos_lista = []
                window.location.href = "home.html"
            }

        },

        function (error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);

            // imagem generica

        },

        false, {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}
*/

function loading_tela_inicio() {
    
    manda_load();

    if (get_data('geral')) {
        goto_main()
        return
    } else {
        change_view(tela_01_v, false);
        if(msg = get_data_no_json("login_error")){
            toasted(msg);
            del_data("login_error");
        }
    }
}

function loading_tela_secundaria() {

    /*if (get_data('inicial')) {
        loading_main()
        return
    }else{
        loading_tela_tutorial()
    }
    */
   //manda_load();
   var tutorial = {}
   tutorial.inicial = 1
   tutorial.status = 0
   set_data('tutorial', JSON.stringify(tutorial))

   if (get_data('geral')) {
        goto_main()
        return
    }else{
        //loading_tela_tutorial()
        go_to_home_sales()
    }


}

function require_loader(action){
    if (action == 'open'){ //abre o loader
        $('#require-loader').fadeIn(500);
    }else if (action == 'close'){
        $('#require-loader').fadeOut(500);
    }
}

function loading_tela_tutorial(){
    console.log('loading tela tutorial....')
    var tutorial = {}
    tutorial.inicial = 1
    tutorial.status = 0
    set_data('tutorial', JSON.stringify(tutorial))
    get_cursos_tutorial()
    var template = ejs.render(inicial_v)
    document.querySelector('.maine-change').innerHTML = template;
}

function load_inicial_pos(){
    var lista_cursos = get_data('cursos_tutorial')
    var template = ejs.render(inicial_pos_v, {
        lista: lista_cursos
    })
    document.querySelector('.maine-change').innerHTML = template;
}

function load_inicial_rapido(){
    M.AutoInit();
    var lista_cursos = get_data('cursos_tutorial')
    var template = ejs.render(inicial_rapido_v, {
        lista: lista_cursos
    })
    document.querySelector('.maine-change').innerHTML = template;
}

function load_cadastro_login(id_projeto){
    $('body').css('background-image', '')
    var template = ejs.render(inicial_criar_login_v, {
        id_projeto: id_projeto
    })
    document.querySelector('.maine-change').innerHTML = template;
}

function inscricao_tutorial_trial(){
    var dados = {}
    dados.nome = document.getElementById('nome').value
    dados.email = document.getElementById('email').value
    dados.senha = document.getElementById('senha').value
    dados.id_projeto = document.getElementById('id_projeto').value

    if(dados.nome == ''){
        toasted('Ops! Nome em branco')
        return
    }
    if(dados.email == ''){
        toasted('Ops! Email em branco')
        return
    }
    if(dados.senha == ''){
        toasted('Ops! Senha em branco')
        return
    }

    validacaoEmail(dados.email, function(resposta){
        if(resposta == 'ok'){
            console.log('dados...')
            console.log(dados)
            manda_load()

            set_inscricao_tutorial(dados, (cb) => {
                console.log(cb)
                var tutorial = {}
                tutorial.status = 1
                del_data('tutorial')
                set_data('tutorial', JSON.stringify(tutorial))
                set_data('tutorial-info', JSON.stringify(cb))
                login()
            })
        }else{
            toasted('Ops! Email Invalido')
        }
    })

}

function validacaoEmail(field, cb) {
    usuario = field.substring(0, field.indexOf("@"));
    dominio = field.substring(field.indexOf("@")+ 1, field.length);

    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
    cb('ok');
    }
    else{
    cb('erro');
    }
}


function manda_load() {
    var versao = get_data('versao')
    document.querySelector('.maine-change').innerHTML = `
        <div style="background-color: #7b1b63;width: 100%;height: 100%;position: fixed;">
            <img src="image/loading.gif" alt="load" style="width: 60%;position: absolute;top: 25%;left: 50%;transform: translateX(-50%);">
            <span style="color: gray; position: absolute; bottom: 0; width: 100%;">v.${versao}</span>
        </div>
        `
}



function loading_main() {
    var tutorial = {}
    tutorial.inicial = 1
    tutorial.status = 0
    set_data('tutorial', JSON.stringify(tutorial))

    if (get_data('geral')) {
        goto_main()
        return
    }
    var template = ejs.render(login_v)
    document.querySelector('.maine-change').innerHTML = template;
}

function change_view(view, save, data) {
    $('body').css('background-image', '')
    if (view == 'back') {
        document.querySelector('.maine-change').innerHTML = screens.pop()

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

    } else {
        if (save) {
            var last_scr = document.querySelector('.maine-change').innerHTML
            screens.push(last_scr)
        }
        document.querySelector('.maine-change').innerHTML = ejs.render(view, data)
    }
    window.scrollTo(0, 0);
}

function toasted(texto) {
    var toastContent = '<span style="color: white !important;">' + texto + '</span>'
    M.toast({
        html: toastContent,
        displayLength: 2300
    })
}

function login() {

    var tutorial = get_data('tutorial')

    if(tutorial.status == 1){
        var login = {}
        var dados = get_data('tutorial-info')
        login.email = dados.email
        login.senha =  dados.senha

    }else{

        if (document.querySelector('.login-v #password').value.length < 4) {
            toasted('Campo senha incorreto')
            $('.login-v #password').addClass('invalid')
            return;
        } else {
            $('.login-v #password').addClass('valid')
        }

        if (document.querySelector('.login-v #email').value.indexOf('@') < 0) {
            toasted('Campo email incorreto')
            $('.login-v #email').addClass('invalid')
            return;
        } else {
            $('.login-v #email').addClass('valid')
        }

        if (document.querySelectorAll('.login-v .invalid').length > 0) {
            toasted('Verifique os campos em vermelho')
            return;
        }

        var login = {}
        login.email = document.querySelector('.login-v #email').value
        login.senha = document.querySelector('.login-v #password').value
        $('.login-v .btn-entrar').addClass('disabled')

    }

    $.post(server + '/login', login)
        .done(function (a) {
            if (a.status.split('|')[0] == 'bad') {
                toasted('Campo ' + a.status.split('|')[1] + ' incorreto')
                switch (a.status.split('|')[1]) {
                    case 'senha':
                        $('.login-v #password').addClass('invalid')
                        break;
                    case 'email':
                        $('.login-v #email').addClass('invalid')
                        break;
                }
                $('.login-v .btn-entrar').removeClass('disabled')
            } else {
                delete a.status
                a.login = login
                a.login.id = a.id
                // Manda tag para o OneSignal
                window.plugins.OneSignal.sendTags(a);
                download_image(a.foto, function (caminho) {
                    try {
                        a.foto = caminho + "?_r=" + Math.random()
                        a.linkedin = a.linkedin == null ? '' : a.linkedin
                        set_data('geral', JSON.stringify(a))
                        goto_main()
                    }catch(error){
                        console.log(error);
                        reset_data_with_error("Ops, algo deu errado");
                    }
                })
            }
        })
        .fail(function (b) {
            alert(JSON.stringify(b))
            $('.login-v .btn-entrar').removeClass('disabled')
        })
}


function lost_pass() {
    if (document.querySelector('.lost-pass-v #email').value.indexOf('@') < 0) {
        toasted('Campo email incorreto')
        $('.lost-pass-v #email').addClass('invalid')
        return;
    } else {
        $('.lost-pass-v #email').addClass('valid')
    }

    if (document.querySelectorAll('.lost-pass-v .invalid').length > 0) {
        toasted('Verifique os campos em vermelho')
        return;
    }

    $('.lost-pass-v .recuperar').addClass('disabled')
    var email = {}
    email.email = document.querySelector('.lost-pass-v #email').value
    $.post(server + '/recuperar_senha', email)
        .done((a) => {
            if (a.status == 'ok') {
                //alert(JSON.stringify(a))
                change_view(fim_lost_pass_v, false)
            } else {
                toasted('Ops! Algo Errado')
            }
            $('.lost-pass-v .recuperar').removeClass('disabled')
        }).fail(function (b) {
            alert(JSON.stringify(b))
            $('.lost-pass-v .recuperar').removeClass('disabled')
        })
}

function firsttime(ele) {
    if (document.querySelector('.first-time-v #email').value.indexOf('@') < 0) {
        toasted('Campo email incorreto')
        $('.first-time-v #email').addClass('invalid')
        return;
    } else {
        $('.first-time-v #email').addClass('valid')
    }

    if (document.querySelectorAll('.first-time-v .invalid').length > 0) {
        toasted('Verifique os campos em vermelho')
        return;
    }

    $(this).addClass('disabled')
    var email = {}
    email.email = document.querySelector('.first-time-v #email').value
    $.post(server + '/first_time', email)
        .done((a) => {
            if (a.status == 'ok' && a.id_contato) { //se nao tiver o id_contato, o email ainda não está pré-cadastrado na base.
                a.email = email.email
                change_view(new_pass_v, false, a)
            } else {
                if (a.status.split('|')[1] == 'email') {
                    toasted('Email não existe!')
                }else if (a.status.split('|')[1] == 'old') {
                    toasted('Já fez o primeiro acesso!')
                }else{
                    toasted('Há um problema com seu e-mail.')
                }

            }
            $(this).removeClass('disabled')
        }).fail(function (b) {
            alert(JSON.stringify(b))
            $(this).removeClass('disabled')
        })
}

function new_pass(ele) {
    if (document.querySelector('.new-pass-v #password').value.length < 4) {
        toasted('Campo senha incorreto')
        $('.new-pass-v #password').addClass('invalid')
        return;
    } else {
        $('.new-pass-v #password').addClass('valid')
    }

    if (document.querySelectorAll('.new-pass-v .invalid').length > 0) {
        toasted('Verifique os campos em vermelho')
        return;
    }

    var pass = document.querySelector('.new-pass-v #password').value
    var repass = document.querySelector('.new-pass-v #re_password').value

    if (pass != repass) {
        toasted('Senhas não coincidem')
        $('.new-pass-v #password').addClass('invalid')
        return;
    }

    $(this).addClass('disabled')

    var new_login = {}
    new_login.senha = pass
    new_login.re_senha = repass
    new_login.id_contato = document.querySelector('.new-pass-v #id_contato').value
    new_login.email = document.querySelector('.new-pass-v #email').value

    $.post(server + '/new_pass', new_login)
        .done((a) => {
            if (a == 'ok') {
                change_view(photo_upload_v, false, new_login)
            } else {
                toasted('Problema com a criação de senha')
            }
            $(this).removeClass('disabled')
        }).fail(function (b) {
            alert(JSON.stringify(b))
            $(this).removeClass('disabled')
        })

}

function open_certificados() {
    $('.modal').modal();
    $('#modalCertificados').modal('open');
}

/////////////// Upload de Imagem

function open_tipo() {
    $('.modal').modal();
    $('#modal1').modal('open');
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

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $('.preview')[0].src = imageUri
        $('.photo-upload-v #upload').removeClass('disabled')
        console.log(imageUri)
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
}

function load_galery() {
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $('.preview')[0].src = imageUri
        $('.photo-upload-v #upload').removeClass('disabled')
        console.log(imageUri)
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
}

function upload_image(id_contato) {
    var fileURL = document.querySelector('.preview').src
    var win = function (r) {
        var login = {}
        login.email = document.querySelector('.photo-upload-v #email').value
        login.senha = document.querySelector('.photo-upload-v #senha').value
        $.post(server + '/login', login)
            .done(function (a) {
                delete a.status
                a.login = login
                a.login.id = a.id

                download_image(a.foto, function (caminho) {
                    try { 
                        a.foto = caminho + "?_r=" + Math.random()
                        set_data('geral', JSON.stringify(a));
                        goto_main()
                    } catch(error) {
                        console.log(error);
                        reset_data_with_error("Ops, algo deu errado");
                    }
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
    params.id_contato = id_contato

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