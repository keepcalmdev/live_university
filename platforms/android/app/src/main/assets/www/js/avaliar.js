var s_value = null
var mudanca = false;

function load_avaliar_main() {
    document.querySelector('.maine').innerHTML = ejs.render(avaliacao_v, get_data('avaliar'))
    start_slider()
}

function toasted(texto) {
    var $toastContent = $('<span style="color: white !important;">' + texto + '</span>');
    Materialize.toast($toastContent, 2300);
}

function avaliacao(ele) {
    $(ele).addClass('disabled')
    var avaliar = get_data('avaliar')
    var nota = document.getElementById('value_slide').innerText
    if (!nota) {
        toasted('Por favor escolha uma nota')
        $(ele).removeClass('disabled')
        return
    }

    var nota_ob = {}
    nota_ob.nota = nota
    nota_ob.id_contato = avaliar.id_contato
    nota_ob.id_calendario = avaliar.id_calendario
    console.log(nota_ob)
    $.post('http://www.liveulabs.com:49/set_nota', nota_ob)
        .done((a) => {
            console.log(a)
            var grupo = avaliar.id_grupo
            var cc = get_data(grupo)
            for (var i = 0; i < cc.length; i++) {
                if (cc[i].id_calendario_aulas == nota_ob.id_calendario) {
                    cc[i].nota = nota_ob.nota
                    break
                }
            }
            set_data(grupo, JSON.stringify(cc))

            document.querySelector('.maine').innerHTML = ejs.render(comentario_v, get_data('avaliar'))
        })
        .fail((b) => {
            alert(b)
            $(ele).removeClass('disabled')
        })

}

function start_slider() {
    s_value = document.getElementById('value_slide');

    noUiSlider.create(slider, {
        start: [5],
        range: {
            'min': 0,
            'max': 10
        }
    });

    slider.noUiSlider.on('start', function (values, handle) {
        mudanca = true;
    });

    slider.noUiSlider.on('update', function (values, handle) {
        if (mudanca) {
            var ss = parseFloat(values[handle])
            if (ss < 1) {
                ss = 1
            }
            if (ss > 9.2) {
                ss = 10
            }
            $('.nota').removeClass('hide')
            $('.nota').attr('src', 'image/boneco-avaliacao/' + Math.round(ss) + '.svg')

            s_value.innerHTML = Math.round(ss);
        }
    });
}

function send_comentario(ele) {
    $(ele).addClass('disabled')
    var comentario = document.querySelector('.textarea').innerText
    if (comentario.length == 0) {
        toasted('Esqueceu de deixar o comentário?')
        $(ele).removeClass('disabled')
        return
    }

    var com_obj = get_data('avaliar')
    com_obj.comentario = comentario
    $('.lock').removeClass('hide')

    $.post('http://www.liveulabs.com:49/set_comentario', com_obj)
        .done((a) => {
            console.log(a)
            setTimeout(function () {
                window.location.href = 'home.html'
            }, 1200);
        })
        .fail((b) => {
            alert(b)
            $(ele).removeClass('disabled')
        })
}