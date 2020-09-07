var server = 'http://www.liveulabs.com:49'
//var server = 'http://192.168.0.50:49'

function set_inscricao_eletiva(contato, projeto) {
    $.post(server + '/set_inscricao_eletiva', {
        id_contato: contato,
        id_projeto: projeto
    })
        .done((a) => {
            if (a == 'ok') {
                toasted('Inscrição feita com sucesso!')
                var grupo = get_data('grupo_selecionado')
                var tipo = 'eletivas'
                go_to_main_aulas(grupo, tipo)
            } else if (a == 'bad') {
                toasted('Inscrição não pode ser feita!')
                document.querySelector('.card-action').classList.remove('hide')
            } else {
                toasted('Erro A em set_inscricao_eletiva')
                document.querySelector('.card-action').classList.remove('hide')
            }
        })
        .fail((b) => {
            toasted('Erro B em set_inscricao_eletiva')
            document.querySelector('.card-action').classList.remove('hide')
        })
}

function get_consulta_eletivas(id_contato, cb, tela = null) {
    if (tela == null) {
        $.post(server + '/get_consulta_eletivas', {
            id_contato: id_contato
        })
            .done((a) => {
                cb(a)
            })
            .fail((b) => {
                toasted('Erro em get_consulta_eletivas')
            })
    } else {
        $.post(server + '/get_consulta_eletivas', {
            id_contato: id_contato
        })
            .done((a) => {
                cb(a, tela)
            })
            .fail((b) => {
                toasted('Erro em get_consulta_eletivas')
            })
    }
}

function get_saldo_eletivas(id_contato, cb, dados = null) {
    // POST para get_saldo_eletivas, passando o parâmetro recebido como id_contato em id_contato.
    $.post(server + '/get_saldo_eletivas', {
        id_contato: id_contato
    })
        .done((a) => {
            cb(a, dados)
        })
        .fail((b) => {
            toasted('Erro em get_saldo_eletivas')
        })
}

function busca_aulas(aula, cb) {
    $.post(server + '/get_aulas_learnets', aula)
        .done((a) => {
            set_data(aula.id_grupo, JSON.stringify(a))
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
        })
}

function get_cursos_tutorial() {
    $.post(server + '/get_cursos_tutorial')
        .done((a) => {
            set_data('cursos_tutorial', JSON.stringify(a))
        })
        .fail((b) => {
            console.log(b)
        })
}

function set_inscricao_tutorial(dados, cb) {
    $.post(server + '/set_inscricao_tutorial', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}

function get_certificados(dados, cb) {
    $.post(server + '/get_info_perfil', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}

function get_info_perfil(dados, cb) {
    $.post(server + '/get_info_perfil', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}

function update_info_perfil(dados, cb) {
    $.post(server + '/update_info_perfil', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}


function lib_pay(dados, cb) {
    $.post(server + '/lib_pay', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}

function set_log_tentativa_compra(dados, cb) {
    $.post(server + '/set_tentativa_compra_log', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}
/*
function get_modulo_aula_sales(dados, cb) {
    $.post(server + '/get_modulo_aula_sales', dados)
        .done((a) => {
            set_data('sales', JSON.stringify(a))
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
            cb('erro')
        })
}
*/

function get_catalogo_sales(dados, cb) {
    $.post(server + '/get_catalogo_sales_new', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}

function get_catalogo_sales_temp(dados, cb) {
    $.post(server + '/get_catalogo_sales_new_temp', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}

function get_filtra_cursos_sale(dados, cb) {
    $.post(server + '/get_filtra_cursos_sale', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}

function get_info_aula_sale(dados, cb) {
    $.post(server + '/get_info_aula_sale', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}

function marca_favorito_ondemand_sales(dados, cb) {
    $.post(server + '/set_favorito_ondemand_sale', dados)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}

function get_id_compra(id_projeto, cb) {
    $.post(server + '/get_id_compra', id_projeto)
        .done((a) => {
            if (cb)
                cb(a);
        })
        .fail((b) => {
            console.log(b)
            if (cb)
                cb(b);
        })
}

function set_trial_sales(dados, cb) {
    $.post(server + '/set_inscricao_sales', dados)
        .done((a) => {
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
            cb('erro')
        })
}

function busca_aulas_ondemand(aula, cb) {
    $.post(server + '/get_modulo_aula_ondemand', aula)
        .done((a) => {
            set_data(aula.id_projeto, JSON.stringify(a))
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
        })
}

function busca_aulas_ondemand_temp(aula, cb) {
    $.post(server + '/get_modulo_aula_ondemand_temp2', aula)
        .done((a) => {
            console.log(a)
            set_data(aula.id_projeto, JSON.stringify(a))
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
        })
}

function set_like_resposta(aula, cb) {
    $.post(server + '/set_like_resposta', aula)
        .done((a) => {
            set_data(aula.id_projeto, JSON.stringify(a))
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
        })
}

function set_resposta_ondemand(aula, cb) {
    $.post(server + '/set_resposta_ondemand', aula)
        .done((a) => {
            set_data(aula.id_projeto, JSON.stringify(a))
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
        })
}

function set_tempo_ondemand(dados, cb) {
    $.post(server + '/set_porcentagem_visualizado_new', dados)
        .done((a) => {
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
        })
}

//retorna todos os dados da aula + respostas + cuepoints + material aula
function get_aula_ondemand(aula, cb) {
    $.post(server + '/get_aula_completa_ondemand', aula)
        .done((a) => {
            console.log(a)
            set_data(aula.id_aula, JSON.stringify(a))
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
        })
}

function valida_nps_work_cap(dados, cb) {
    $.post(server + '/valida_nps_work_cap', dados)
        .done((a) => {
            cb(a)
        })
        .fail((err) => {
            alert(err)
        })
}

function set_nota_comentario(comentario, cb) {
    $.post(server + '/set_nota_comentario_new', comentario)
        .done((a) => {
            cb(a)
        })
        .fail((err) => {
            alert(err)
        })
}

function set_nota_comentario_ondemand(comentario, cb) {
    $.post(server + '/set_nota_comentario_ondemand', comentario)
        .done((a) => {
            cb(a)
        })
        .fail((err) => {
            toasted('Erro Inserir Nota/Comentario')
        })
}

function set_nota_modulo(comentario, cb) {
    $.post(server + '/set_nota_modulo', comentario)
        .done((a) => {
            cb(a)
        })
        .fail((err) => {
            alert(err)
        })
}

function set_nota_nps_mba(comentario, cb) {
    $.post(server + '/set_nota_nps_mba', comentario)
        .done((a) => {
            cb(a)
        })
        .fail((err) => {
            alert(err)
        })
}

function set_nota_nps_work_cap(comentario, cb) {
    $.post(server + '/set_nota_nps_work_cap', comentario)
        .done((a) => {
            cb(a)
        })
        .fail((err) => {
            alert(err)
        })
}

function set_checkin(user, cb) {
    $.post('http://www.liveulabs.com:49/set_presenca', user)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            alert(b)
        })
}

function get_notas(login, cb) {
    $.post(server + '/get_nota_info', login)
        .done((a) => {
            console.log(a)
            var valida_learnets = 0            
            for(var m=0; m<a.length;m++){
                if(a[m].tipo == 'learnets'){
                    valida_learnets = 1
                }
            }
            if(valida_learnets == 1){
                console.log('LEARNETSSSS')    
                console.log(login)
                if(login.id_grupo == 182){
                    for(var x=0; x<a.length; x++){
                        if(a[x].items){
                            var string = a[x].id
                            if(string.indexOf('oundatio') > -1){
                                var info = a[x].items    
                            }else{
                            }
                        }
                    }  
                }else{
                    for(var x=0; x<a.length; x++){
                        if(a[x].items){
                            var string = a[x].id
                            if(string.indexOf('oundatio') > -1){
    
                            }else{
                                var info = a[x].items
                            }
                        }
                    }                    
                }

                set_data(login.id_grupo + '_nota', JSON.stringify(info))
                cb('ok')
            }else{                
                var notas = []
                for (var i = 0; i < a.length; i++) {
                    var n_obj = {}
                    n_obj.dia = []
    
                    var choosen = null
                    for (var n_c = 0; n_c < notas.length; n_c++) {
                        if (notas[n_c].id_modulo == a[i].id_modulo) {
                            choosen = n_c
                            break
                        }
                    }
                    if (choosen != null) {
                        var dia = {}
                        dia.id_calendario = a[i].id_calendario
                        dia.dia = a[i].dia
                        dia.ano = a[i].ano
                        dia.presenca = a[i].presenca
                        //dia.data = a[i].data.replace('Z', '')
                        dia.semana = a[i].semana
                        notas[choosen].dia.push(dia)
    
                    } else {
                        n_obj.id_modulo = a[i].id_modulo
                        n_obj.descricao = a[i].descricao
                        n_obj.nota = a[i].nota
                        n_obj.limite = a[i].limite
                        var dia = {}
                        dia.id_calendario = a[i].id_calendario
                        dia.dia = a[i].dia
                        dia.ano = a[i].ano
                        dia.presenca = a[i].presenca
                        //dia.data = a[i].data.replace('Z', '')
                        dia.semana = a[i].semana
    
                        n_obj.dia.push(dia)
                        notas.push(n_obj)
                    }
                }
                set_data(login.id_grupo + '_nota', JSON.stringify(notas))
                cb('ok')
            }            
        })
        .fail((b) => {
            console.log(b)
        })
}

/*
function get_gps_pos(cb) {
    navigator.geolocation.getCurrentPosition(function (posicao) {
        if (posicao.coords.latitude < -23.593647 && posicao.coords.latitude > -23.596026) {
            if (posicao.coords.longitude < -46.684459 && posicao.coords.longitude > -46.687742) {
                cb({
                    status: 'ok',
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude
                })
            } else {
                cb({
                    status: 'bad'
                })
            }
        } else {
            cb({
                status: 'bad'
            })
        }
    }, function (error) {
        cb({
            status: 'err',
            error_c: error.code,
            error: error.message
        })
    }, {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    });
}
*/

function get_gps_pos(cb) {
    navigator.geolocation.getCurrentPosition(function (posicao) {
        //RJ
        if (posicao.coords.latitude < -22.943478 && posicao.coords.latitude > -22.948091) {
            if (posicao.coords.longitude < -43.179197 && posicao.coords.longitude > -43.186696) {
                cb({
                    status: 'ok',
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude
                })
                return
            } else {
                cb({
                    status: 'bad'
                })
                return
            }
        }
        //RJ2
        if (posicao.coords.latitude < -22.897597 && posicao.coords.latitude > -22.900384) {
            if (posicao.coords.longitude < -43.178200 && posicao.coords.longitude > -43.181065) {
                cb({
                    status: 'ok',
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude
                })
                return
            } else {
                cb({
                    status: 'bad'
                })
                return
            }
        }
        //MG 1 
        if (posicao.coords.latitude < -19.930172 && posicao.coords.latitude > -19.935084) {
            if (posicao.coords.longitude < -43.925021 && posicao.coords.longitude > -43.928840) {
                cb({
                    status: 'ok',
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude
                })
                return
            } else {
                cb({
                    status: 'bad'
                })
                return
            }
        }

        //MG 2 hotel
        if (posicao.coords.latitude < -19.936474 && posicao.coords.latitude > -19.942266) {
            if (posicao.coords.longitude < -43.930952 && posicao.coords.longitude > -43.936557) {
                cb({
                    status: 'ok',
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude
                })
                return
            } else {
                cb({
                    status: 'bad'
                })
                return
            }
        }

        //SP
        if (posicao.coords.latitude < -23.593647 && posicao.coords.latitude > -23.596026) {
            if (posicao.coords.longitude < -46.684459 && posicao.coords.longitude > -46.687742) {
                cb({
                    status: 'ok',
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude
                })
            } else {
                cb({
                    status: 'bad'
                })
            }
        } else {
            cb({
                status: 'bad'
            })
        }

    }, function (error) {
        cb({
            status: 'err',
            error_c: error.code,
            error: error.message
        })
    }, {
            maximumAge: 3000,
            timeout: 5000,
            enableHighAccuracy: true
        });
}


function get_pagamentos(dados, callback) {
    $.post(`${server}/get_pagamentos`, dados)
        .done(resposta => callback(resposta))
        .fail(erro => console.log(erro))
}

function get_recibo(id_pagamento, callback, callbackErro) {
    $.ajax({
        url: `${server}/get_recibo`,
        method: 'POST',
        data: {
            id_contato: get_data('geral').id,
            id_pagamento
        },
        async: false
    })
        .done(resposta => callback(resposta))
        .fail(erro => callbackErro ? callbackErro(erro) : console.log(erro))
}

function get_conversa_comentario_aula(aula, cb) {
    $.post(server + '/get_perguntas_resposta_avaliacao_aula', aula)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            console.log(b)
        })
}

function insert_comentario_conversa_aula(dados, cb) {
    $.post(server + '/set_resposta_conversa_aula', dados)
        .done((a) => {
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function get_qrcode_credencial(callback) {
    $.post(`${server}/qrcode`, { id_contato: getGeralId() })
        .done(resposta => callback(resposta))
        .fail(erro => console.log(erro))
}

function get_evento_info(id_projeto, callback) {
    $.post(`${server}/get_evento_info`, { id_projeto })
        .done(resposta => callback(resposta.evento))
        .fail(erro => console.log(erro))
}

function get_descricao_projeto(id_projeto, callback) {
    get_evento_info(id_projeto, evento_info => callback(evento_info))
}

function get_eventos_por_data(id_projeto, callback) {
    $.post(`${server}/get_evento_info`, { id_projeto })
        .done(resposta => callback(resposta.datas))
        .fail(erro => console.log(erro))
}

function set_avaliacao_palestra_evento(dados, callback) {
    $.post(`${server}/insert_avaliacao_palestra`, dados)
        .done(resposta => callback(resposta))
        .fail(erro => console.log(erro))
}

function set_avaliacao_evento(dados, callback) {
    $.post(`${server}/insert_avaliacao_evento`, dados)
        .done(resposta => callback(resposta))
        .fail(erro => console.log(erro))
}

function get_lista_perguntas(dados, callback) {
    $.post(`${server}/get_lista_perguntas`, dados)
        .done(resposta => callback(resposta))
        .fail(erro => console.log(erro))
}

function get_avaliacao_palestra_evento(dados, callback) {
    $.post(`${server}/get_avaliacao_palestra_evento`, dados)
        .done(resposta => callback(resposta))
        .fail(erro => console.log(erro))
}

function insert_score_pergunta_evento(dados, callback) {
    $.post(`${server}/insert_score_pergunta_evento`, dados)
        .done(resposta => callback(resposta))
        .fail(erro => callback('bad'))
}

function insert_pergunta_palestra(dados, callback) {
    $.post(`${server}/insert_pergunta_evento`, dados)
        .done(resposta => callback(resposta))
        .fail(erro => callback('bad'))
}

function insert_resposta_palestra(dados, callback) {
    $.post(`${server}/insert_resposta_pergunta_evento`, dados)
        .done(resposta => callback(resposta))
        .fail(() => callback('unsuccessful'))
}

function get_votou_evento(dados, callback) {
    $.post(`${server}/get_votou_evento`, dados)
        .done(resposta => callback(resposta))
        .fail(erro => callback('bad'))
}

function insert_post_evento(dados, cb) {
    $.post(server + '/insert_post_evento', dados)
        .done((a) => {
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function lista_post_all(dados, cb) {
    $.post(server + '/lista_posts_all', dados)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function insert_comentario_post_evento(dados, cb) {
    $.post(server + '/insert_comentario_post', dados)
        .done((a) => {
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function insert_like_post_evento(dados, cb) {
    $.post(server + '/insert_like_post', dados)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function apaga_post_evento(dados, cb) {
    $.post(server + '/apaga_post', dados)
        .done((a) => {
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function get_info_user(dados, cb) {
    $.post(server + '/get_info_aluno', dados)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function set_post_patrocinado_visualizado(dados, cb) {
    $.post(server + '/set_post_pat_visualizado', dados)
        .done((a) => {
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function get_check_notificacao(dados, cb) {
    $.post(server + '/get_tem_notificacao', dados)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function set_leitura_notificacao(dados, cb) {
    $.post(server + '/get_update_notificacao', dados)
        .done((a) => {
            cb('ok')
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function gera_hash(dados, cb) {
    $.post(server + '/gera_hash', dados)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function gera_hash_vazio(dados, cb) {
    $.post(server + '/gera_hash_vazio', dados)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function get_noticias(dados, cb) {
    $.post(server + '/get_noticias', dados)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function envia_checkin_evento(dados, cb) {
    $.post(server + '/set_checkin_evento', dados)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

function check_chekin_aula(dados, cb) {
    $.post(server + '/check_chekin_aula', dados)
        .done((a) => {
            cb(a)
        })
        .fail((b) => {
            console.log(b)
            cb('bad')
        })
}

