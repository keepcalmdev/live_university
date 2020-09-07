
/*function check_in(id) {
    if(document.querySelectorAll('#falta_avaliacao').length > 0){
        toasted('Ta faltando alguma avaliação!')
        return
    }
    get_gps_pos(function (sit) {
        if (sit.status == 'err') {
            toasted('Erro ao pegar sua localização')
            return
        }
        if (sit.status == 'bad') {
            toasted('Acho que você não está na Live =(')
            return
        }
        $('.lock a:first-child').attr('id-calendario', id)
        $('.lock').removeClass('hide')
    })
}

function check_on(ele) {
    var user = {}
    user.id_contato = get_data('geral').id
    user.id_calendario_aula = ele.getAttribute('id-calendario')

    $.post('http://www.liveulabs.com:49/set_presenca', user)
        .done((a) => {
            var grupo = document.querySelector('grupo').innerText
            var cc = get_data(grupo)
            for(var i = 0;i < cc.length; i++){
                if(cc[i].id_calendario_aulas == user.id_calendario_aula){
                    cc[i].presenca = true
                    break
                }
            }
            set_data(grupo, JSON.stringify(cc))

            var ncc = get_data(grupo + '_nota')
            for(var i = 0;i < ncc.length;i++){
                for(var i2 = 0;i2 < ncc[i].dia.length; i2++){
                    if(ncc[i].dia[i2].id_calendario == user.id_calendario_aula){
                        ncc[i].dia[i2].presenca = true
                        break
                    }
                }
            }
            set_data(grupo + '_nota', JSON.stringify(ncc))

            $(ele).addClass('hide')
            $('#check_ok').removeClass('hide')
            setTimeout(function () {
                foi();
                goo_to_cards(grupo)
            }, 1200);
        })
        .fail((b) => {
            alert(b)
        })

}

function foi() {
    $('.checkin.lock').addClass('hide')
    $('#check_ok').addClass('hide')
    $('#check').removeClass('hide')
}

function get_gps_pos(cb) {
    if(get_data('id_tipo_projeto').id == 25){
        cb({
            status: 'ok'
        })
        return
    }
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

function tab_changering(tab){
    if(tab == 'b'){
        set_data('scr_y', window.scrollY)
        window.scroll(0,0)
    } else if(get_data('scr_y')) {
        setTimeout(function(){
            window.scroll(0,get_data('scr_y'))
            del_data('scr_y')
        }, 1)
    }
}
*/