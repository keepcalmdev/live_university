function load_eletivas_list(tela){
    let id_contato = get_data('geral').id;
    get_consulta_eletivas(id_contato, load_eletivas_list_cb, tela);
}

function load_eletivas_list_cb(resposta, tela){    
    console.log(resposta)
    if (tela == 'workshop'){
        change_view(courses_list_v, true, false, {
            eletivas: resposta,
            tela: tela
        }, navbar_comum_v_eletivas, {
            titulo: 'Workshop e Capacitações'
        });
    }else{
        change_view(courses_list_v, true, false, {
            eletivas: resposta,
            tela: tela
        }, navbar_comum_v_eletivas, {
            titulo: 'Congressos'
        });
    }
}

function load_eletiva_info(el){
    let id_projeto = el.getAttribute('id-projeto');
    let id_contato = get_data('geral').id;
    get_single_eletiva(id_contato, id_projeto);
}

function get_single_eletiva(id_contato, id_projeto){
    get_consulta_eletivas(id_contato, (resposta) => {
        for(const eletiva of resposta){
            if(eletiva.id_projeto == id_projeto){
                load_eletiva_info_cb(eletiva, id_contato);
            }
        }
    });
}

function load_eletiva_info_cb(eletiva, id_contato){
    get_saldo_eletivas(id_contato, load_eletiva_info_cb_cb, {eletiva: eletiva, id_contato: id_contato});
}
    
function load_eletiva_info_cb_cb(saldo, dados){
    change_view(eletivas_dados_v, true, true, {
        eletiva: dados.eletiva,
        contato: dados.id_contato,
        saldo: saldo
    }, nav_degrade_v_eletivas, {
        titulo: dados.eletiva.nome_projeto
    });
}

function inscrever_eletiva(el){
    document.querySelector('.card-action').classList.add('hide')
    let contato = el.getAttribute('id-contato');
    let projeto = el.getAttribute('id-projeto');
    manda_load();
    set_inscricao_eletiva(contato, projeto);
}