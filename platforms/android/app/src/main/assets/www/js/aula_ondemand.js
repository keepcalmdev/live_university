var cuepoints = null
var respostas = null
var last_cuepoint = {}

function load_aula_ondemand(aula_ondemand) {
    //console.log('id aula - ' + aula_ondemand.id_aula)
    const dados = get_data(aula_ondemand.id_aula);
    const aulas = get_data(aula_ondemand.id_projeto);

    /// load cuepoints
    cuepoints = dados.cuepoints.sort(function (a, b) {
        return a.second_cue_point - b.second_cue_point
    })
    last_cuepoint = {}

    //respostas
    respostas = dados.respostas


    const aula = dados.aula[0];

    document.querySelector('.maine-change').innerHTML = ejs.render(aula_ondemand_v);

    document.querySelector('#box_navbar_comum').innerHTML = ejs.render(navbar_comum_v_ondemand, {
        titulo: aula.aula,
        mostrar_voltar: true,
        id_projeto: aula_ondemand.id_projeto,
        id_modulo: aula_ondemand.id_modulo
    });

    const aulaAnterior = aulas.sort((a, b) => b.ordem - a.ordem)
        .find(_ => {
            if (_.id_ondemand_modulo == aula_ondemand.id_modulo) {
                return _.ordem < aula_ondemand.ordem
            } else {
                return false
            }
        });

    const aulaPosterior = aulas.sort((a, b) => a.ordem - b.ordem)
        .find(_ => {
            if (_.id_ondemand_modulo == aula_ondemand.id_modulo) {
                return _.ordem > aula_ondemand.ordem
            } else {
                return false
            }
        });

    document.querySelector('#box_menu_hor_aula').innerHTML = ejs.render(menu_hor_aula, {
        nomeAula: aula.aula,
        aulaAnterior: aulaAnterior ? aulaAnterior : null,
        aulaPosterior: aulaPosterior ? aulaPosterior : null,
        idProjeto: aula_ondemand.id_projeto
    });

    load_video_jw('#box_video_jw', aula.video_link)

    document.querySelector('#box_menu_arquivos_ondemand').innerHTML = ejs.render(menu_arquivos_ondemand, {
        arquivos: dados.material,
        id_aula: aula_ondemand.id_aula
    });


    document.querySelector('#box_avaliacao_solta').innerHTML = ejs.render(avaliacao_solta_ondemand, {
        dados,
        nota: aula.nota,
        id_aula: aula_ondemand.id_aula
    });

    document.querySelector('#box_avaliacao_solta').style.display = 'none';
    document.querySelector('#gabarito').className += ' grey'

    document.querySelector('.navbar').innerHTML = ejs.render(menu_lateral, {
        login: get_data('geral')
    });

    $(document).ready(() => {
        $('.collapsible').collapsible();
    })




    var myPlayer = jwplayer("videoJw");
    atribuirEventosPlayer();

    // função a cada segundo do jwplaer - post a cada 5% de aula assistida - Rafael
    function aula_time() {
        var myPlayer = jwplayer("videoJw");
        var tempoInt = Math.trunc(myPlayer.getPosition());
        var tempoTotalInt = Math.trunc(myPlayer.getDuration());
        var porcVidAtual = Math.trunc((tempoInt * 100) / tempoTotalInt);

        if ((porcVidAtual % 5 == 0)) {
            //console.log('enviando...: ' + porcVidAtual + ' id_aula: ' + aula_ondemand.id_aula);
            enviataxaaula(porcVidAtual, aula_ondemand.id_aula, aula_ondemand.id_projeto)
        }

        //video completo        
        if (((myPlayer.getPosition() * 100) / myPlayer.getDuration()) > 70) {

            //libera avaliação
            document.querySelector('#box_avaliacao_solta').style.display = 'block';
        }

        // parar no cuepoint
        for (var i = 0; i < cuepoints.length; i++) {
            if (tempoInt == cuepoints[i]['second_cue_point']) {
                if (last_cuepoint['second_cue_point'] != cuepoints[i]['second_cue_point']) {
                    last_cuepoint = cuepoints[i]
                    last_cuepoint.respondido = false
                    var lista_resposta = respostas[last_cuepoint.id_ondemand_video_cuepoints]

                    var minha_resposta_anterior = {}

                    lista_resposta.forEach(ele => {
                        if (ele.id_contato == get_data('geral').id && ele.id_ondemand_video_cuepoints == last_cuepoint.id_ondemand_video_cuepoints) {
                            minha_resposta_anterior.resposta = ele.chat_message
                            minha_resposta_anterior.status = 'ok'
                        } else {
                            minha_resposta_anterior.status = 'bad'
                        }
                    });

                    load_resposta_ondemand_full_screen('#box_resposta_ondemand_full_screen', last_cuepoint, lista_resposta, minha_resposta_anterior);
                    jwplayer("videoJw").seek(cuepoints[i]['second_cue_point'])
                    jwplayer("videoJw").pause()
                    break
                } else {
                    if (last_cuepoint['respondido'] == false) {
                        jwplayer("videoJw").seek(cuepoints[i]['second_cue_point'])
                        jwplayer("videoJw").pause()
                        break
                    }
                }
            }
        }

    }
    var inicio_video = 1
    function aula_meta(bufferChange){

        var visualizado = get_data(aula_ondemand.id_aula).aula[0].perc_tempo_visualizacao_max
        
        if (visualizado > 80){

        }else{
            if(inicio_video == 1){
                console.log('meta - ' + JSON.stringify(bufferChange))
                var total_video = bufferChange.duration
                console.log('total video - ' + total_video)                
                console.log('vizu - ' + visualizado)
                var conta = (total_video * visualizado) / 100                
                inicio_video = 0
                jwplayer("videoJw").seek(conta)
    
            }
        }        
    }

    function aula_play(play) {
        //console.log(play)              
        console.log('aula play')
        if (last_cuepoint['respondido'] == false && play.playReason == 'external') {
            jwplayer("videoJw").seek(last_cuepoint['second_cue_point'])
            jwplayer("videoJw").pause()
            return
        }
    }

    function aula_seek(seek) {
        console.log('aula seek')
        if (last_cuepoint['respondido'] == false && seek.offset > last_cuepoint['second_cue_point']) {
            jwplayer("videoJw").seek(last_cuepoint['second_cue_point'])
            jwplayer("videoJw").pause()
            return
        }
    }

    function aula_seeked() {
        console.log('aula seeked')
    }

    function aula_complete() {
        console.log('aula complete')
    }

    function aula_pause() {
        console.log('aula pause')
    }

    // atribui as funções criadas para as funções do jwplayer - Rafael
    function atribuirEventosPlayer() {
        myPlayer.on('time', aula_time); //a cada segundo ele executa essa função
        myPlayer.on('play', aula_play); //a cada play na aula (botão play)
        myPlayer.on('pause', aula_pause); //a cada pause
        myPlayer.on('seek', aula_seek); //quando pula a aula
        myPlayer.on('seeked', aula_seeked); //quando pula e carrega a aula
        myPlayer.on('complete', aula_complete); //quando termina a aula
        myPlayer.on('bufferChange', aula_meta);// muda o buffer 0 para 1
    }

    //se ja fez upload libera gabarito se não trava ele
    if (aula.upload_atividade > 0) {
        liberagabarito(dados.gabarito, aula.video_link)
    } else {
        document.querySelector('#gabarito').className += ' grey'
    }
    //escuta upload atividade e chama upload    
    $('#upload-input').on('change', function () {
        upload(this, aula_ondemand.id_aula, dados.gabarito, aula.video_link)
    })


    if(aula_ondemand.iniciar == 1){
        setTimeout(() => {
            jwplayer('videoJw').setFullscreen()
            jwplayer("videoJw").play()
        }, 3000);
    }

    check_notificacao(function (cb){
        if(cb == 1){
            document.querySelector('.notification-icon').innerHTML += '<i class="material-icons" style="color: red; position: absolute; margin-left: 5px; margin-top: -7px; font-size: 18px;">brightness_1</i></div>'
        }else{
    
        }
    })  
}

function load_aula_ondemand_learts(aula_ondemand) {
    //console.log('id aula - ' + aula_ondemand.id_aula)
    const dados = get_data(aula_ondemand.id_aula);
    const aulas = get_data(aula_ondemand.id_projeto);

    /// load cuepoints
    cuepoints = dados.cuepoints.sort(function (a, b) {
        return a.second_cue_point - b.second_cue_point
    })
    last_cuepoint = {}

    //respostas
    respostas = dados.respostas


    const aula = dados.aula[0];

    document.querySelector('.maine-change').innerHTML = ejs.render(aula_ondemand_v);

    document.querySelector('#box_navbar_comum').innerHTML = ejs.render(navbar_comum_v_ondemand_learnets, {
        titulo: aula.aula
    });

    document.querySelector('#box_menu_hor_aula').innerHTML = ejs.render(menu_hor_aula_learnets, {
        nomeAula: aula.aula
    });

    load_video_jw('#box_video_jw', aula.video_link)

    document.querySelector('#box_menu_arquivos_ondemand').innerHTML = ejs.render(menu_arquivos_ondemand, {
        arquivos: dados.material,
        id_aula: aula_ondemand.id_aula
    });


    document.querySelector('#box_avaliacao_solta').innerHTML = ejs.render(avaliacao_solta_ondemand, {
        dados,
        nota: aula.nota,
        id_aula: aula_ondemand.id_aula
    });

    document.querySelector('#box_avaliacao_solta').style.display = 'none';
    document.querySelector('#gabarito').className += ' grey'

    document.querySelector('.navbar').innerHTML = ejs.render(menu_lateral, {
        login: get_data('geral')
    });

    $(document).ready(() => {
        $('.collapsible').collapsible();
    })




    var myPlayer = jwplayer("videoJw");
    atribuirEventosPlayer();

    // função a cada segundo do jwplaer - post a cada 5% de aula assistida - Rafael
    function aula_time() {
        var myPlayer = jwplayer("videoJw");
        var tempoInt = Math.trunc(myPlayer.getPosition());
        var tempoTotalInt = Math.trunc(myPlayer.getDuration());
        var porcVidAtual = Math.trunc((tempoInt * 100) / tempoTotalInt);

        if ((porcVidAtual % 5 == 0)) {
            //console.log('enviando...: ' + porcVidAtual + ' id_aula: ' + aula_ondemand.id_aula);
            enviataxaaula(porcVidAtual, aula_ondemand.id_aula, aula_ondemand.id_projeto)
        }

        //video completo        
        if (((myPlayer.getPosition() * 100) / myPlayer.getDuration()) > 70) {

            //libera avaliação
            document.querySelector('#box_avaliacao_solta').style.display = 'block';
        }

        // parar no cuepoint
        for (var i = 0; i < cuepoints.length; i++) {
            if (tempoInt == cuepoints[i]['second_cue_point']) {
                if (last_cuepoint['second_cue_point'] != cuepoints[i]['second_cue_point']) {
                    last_cuepoint = cuepoints[i]
                    last_cuepoint.respondido = false
                    var lista_resposta = respostas[last_cuepoint.id_ondemand_video_cuepoints]

                    var minha_resposta_anterior = {}

                    lista_resposta.forEach(ele => {
                        if (ele.id_contato == get_data('geral').id && ele.id_ondemand_video_cuepoints == last_cuepoint.id_ondemand_video_cuepoints) {
                            minha_resposta_anterior.resposta = ele.chat_message
                            minha_resposta_anterior.status = 'ok'
                        } else {
                            minha_resposta_anterior.status = 'bad'
                        }
                    });

                    load_resposta_ondemand_full_screen('#box_resposta_ondemand_full_screen', last_cuepoint, lista_resposta, minha_resposta_anterior);
                    jwplayer("videoJw").seek(cuepoints[i]['second_cue_point'])
                    jwplayer("videoJw").pause()
                    break
                } else {
                    if (last_cuepoint['respondido'] == false) {
                        jwplayer("videoJw").seek(cuepoints[i]['second_cue_point'])
                        jwplayer("videoJw").pause()
                        break
                    }
                }
            }
        }

    }
    var inicio_video = 1
    function aula_meta(bufferChange){

        var visualizado = get_data(aula_ondemand.id_aula).aula[0].perc_tempo_visualizacao_max
        
        if (visualizado > 80){

        }else{
            if(inicio_video == 1){
                console.log('meta - ' + JSON.stringify(bufferChange))
                var total_video = bufferChange.duration
                console.log('total video - ' + total_video)                
                console.log('vizu - ' + visualizado)
                var conta = (total_video * visualizado) / 100                
                inicio_video = 0
                jwplayer("videoJw").seek(conta)
    
            }
        }        
    }

    function aula_play(play) {
        //console.log(play)              
        console.log('aula play')
        if (last_cuepoint['respondido'] == false && play.playReason == 'external') {
            jwplayer("videoJw").seek(last_cuepoint['second_cue_point'])
            jwplayer("videoJw").pause()
            return
        }
    }

    function aula_seek(seek) {
        console.log('aula seek')
        if (last_cuepoint['respondido'] == false && seek.offset > last_cuepoint['second_cue_point']) {
            jwplayer("videoJw").seek(last_cuepoint['second_cue_point'])
            jwplayer("videoJw").pause()
            return
        }
    }

    function aula_seeked() {
        console.log('aula seeked')
    }

    function aula_complete() {
        console.log('aula complete')
    }

    function aula_pause() {
        console.log('aula pause')
    }

    // atribui as funções criadas para as funções do jwplayer - Rafael
    function atribuirEventosPlayer() {
        myPlayer.on('time', aula_time); //a cada segundo ele executa essa função
        myPlayer.on('play', aula_play); //a cada play na aula (botão play)
        myPlayer.on('pause', aula_pause); //a cada pause
        myPlayer.on('seek', aula_seek); //quando pula a aula
        myPlayer.on('seeked', aula_seeked); //quando pula e carrega a aula
        myPlayer.on('complete', aula_complete); //quando termina a aula
        myPlayer.on('bufferChange', aula_meta);// muda o buffer 0 para 1
    }

    //se ja fez upload libera gabarito se não trava ele
    if (aula.upload_atividade > 0) {
        liberagabarito(dados.gabarito, aula.video_link)
    } else {
        document.querySelector('#gabarito').className += ' grey'
    }
    //escuta upload atividade e chama upload    
    $('#upload-input').on('change', function () {
        upload(this, aula_ondemand.id_aula, dados.gabarito, aula.video_link)
    })


    if(aula_ondemand.iniciar == 1){
        setTimeout(() => {
            jwplayer('videoJw').setFullscreen()
            jwplayer("videoJw").play()
        }, 3000);
    }

    check_notificacao(function (cb){
        if(cb == 1){
            document.querySelector('.notification-icon').innerHTML += '<i class="material-icons" style="color: red; position: absolute; margin-left: 5px; margin-top: -7px; font-size: 18px;">brightness_1</i></div>'
        }else{
    
        }
    })  
}


function upload(ele, id_aula, gabarito, video_link) {
    var id_contato = get_data('geral').id
    var files = $(ele).get(0).files;
    //console.log('arquivo upload...');

    if (files.length > 0) {
        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append('upload', file);
        }

        //formData.append('teste', 'oi')

        $.ajax({
            url: 'http://liveulabs.com:49/upload?id_contato=' + id_contato + '&id_aula=' + id_aula + '&date=' +
                new Date().toLocaleString().replace(/\/| |:/g, 'L'),
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                liberagabarito(gabarito, video_link)
            }
        });
    }

}

function upload_atividade(ele) {
    $("#upload-input")[0].click()
}

function liberagabarito(dados, video_link) {
    document.querySelector('#gabarito').classList.remove("grey")
    document.querySelector('#gabarito').onclick = function () {
        if (dados.tipo_feedback_atividade >= 0) {
            if (dados.tipo_feedback_atividade == 0) {
                //download gabarito
                console.log('here')
                $('#feedbacklink').attr("href", dados.endereco_arquivo)
                $("#feedbacklink")[0].click()
            } else {
                if (dados.tipo_feedback_atividade == 1) {
                    //video jw
                    load_video_jw('#box_video_jw', dados.endereco_arquivo)
                    document.getElementById('gabarito').innerHTML = '<i class="material-icons">settings_backup_restore</i> VOLTAR'
                    document.querySelector('#gabarito').onclick = function () {
                        document.getElementById('gabarito').innerHTML = '<i class="material-icons">playlist_add_check</i> GABARITO'
                        load_video_jw('#box_video_jw', video_link)
                        liberagabarito(dados, video_link)
                    }
                } else {
                    if (dados.tipo_feedback_atividade == 3) {
                        //console.log('video + gabarito')
                        load_video_jw('#box_video_jw', dados.endereco_arquivo.split('|')[0])
                        document.getElementById('gabarito').innerHTML = '<i class="material-icons">settings_backup_restore</i> VOLTAR'
                        document.querySelector('#gabarito').onclick = function () {
                            document.getElementById('gabarito').innerHTML = '<i class="material-icons">playlist_add_check</i> GABARITO'
                            load_video_jw('#box_video_jw', video_link)
                            liberagabarito(dados, video_link)
                        }
                        $('#feedbacklink').attr("href", dados.endereco_arquivo.split('|')[1])
                        $("#feedbacklink")[0].click()
                    }
                }
            }
        }
    }
}
// post para enviar percentual de aula - Rafael
function enviataxaaula(percent_aula, id_aula, id_projeto) {
    var envio = {}
    envio.id_contato = get_data('geral').id
    envio.id_aula = id_aula
    envio.percentual = percent_aula
    envio.email = get_data('geral').email   
    envio.id_projeto = id_projeto 

    set_tempo_ondemand(envio, (stst) => {
        //console.log('inserido - ' + id_aula + ' - ' + percent_aula + ' - ' + envio.id_contato)
    })
}

function load_resposta_ondemand_full_screen(identificadorElemento, cuepoint, respostas, resp_anterior) {
    if (jwplayer('videoJw').getFullscreen()) {
        last_cuepoint.fullscreen = true
        jwplayer('videoJw').setFullscreen()
    }


    if (resp_anterior.status == 'ok') {
        document.querySelector(identificadorElemento).innerHTML = ejs.render(resposta_ondemand_full_screen, {
            cuepoint: cuepoint,
            resposta_anterior: resp_anterior.resposta
        });
    } else {
        document.querySelector(identificadorElemento).innerHTML = ejs.render(resposta_ondemand_full_screen, {
            cuepoint: cuepoint,
            resposta_anterior: 'Resposta'
        });
    }

    document.querySelector('#box_resposta_video').innerHTML = ejs.render(resposta_video, {
        respostas: respostas
    });

    /// animação

    document.querySelector('#box_resposta_video').addEventListener('transitionend', function (event) {
        if (document.querySelector('#box_resposta_video').classList.contains('no_show')) {
            var div_show = document.querySelector('#box_resposta_video > div.resposta:not([hidden])')
            var div_hide = document.querySelector('#box_resposta_video > div.resposta:not([hidden]) + div.resposta[hidden]') || document.querySelector('#box_resposta_video > div.resposta[hidden]')

            div_hide.hidden = false
            if (div_show) {
                div_show.hidden = true
            }
            document.querySelector('#box_resposta_video').classList.remove('no_show')
        } else {
            setTimeout(() => {
                document.querySelector('#box_resposta_video').classList.add('no_show')
            }, 3000);
        }
    }, false)

    document.querySelector('#box_resposta_video > div.resposta[hidden]').hidden = false
    setTimeout(() => {
        document.querySelector('#box_resposta_video').classList.add('no_show')
    }, 3000);

    document.getElementById('btn-resposta-ondemand').classList.add('hide')

    $('textarea').bind('input propertychange', function() {            
        document.getElementById('btn-resposta-ondemand').classList.remove('hide')      
    });

}

function load_video_jw(identificadorElemento, link) {
    document.querySelector(identificadorElemento).innerHTML = ejs.render(video_jw);

    jwplayer('videoJw').setup({
        file: link,
        image: 'image/capas/thumb-ondemand.jpg',
        width: '100%',
        aspectratio: '16:9'
    })
    /*
        jwplayer().on('ready', () => {
            

            document.getElementById('mudo').checked = !jwplayer().getMute();
        })
    */
}

function envia_nota_aula_ondemand(ele, id_aula) {
    var info = {}
    ele = ele.parentNode.parentNode
    info.id_contato = get_data('geral').id
    var nota = ele.querySelector('.nota [class="active"]')
    info.comentario = ele.querySelector('.comentario textarea').value || ' '
    info.id_aula = id_aula
    //console.log(dados)

    if (!nota) {
        toasted('Falou a Nota')
        return
    }

    info.nota = nota.innerText

    set_nota_comentario_ondemand(info, function (x) {
        document.querySelector('#box_avaliacao_solta').classList.add('hide')
        toasted('Obrigado Pelo Feedback')
    })
}