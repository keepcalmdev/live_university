var resposta_ondemand_full_screen = `
<div class="video-question card">

    <div class="card-content questao">
        <%= cuepoint.pergunta %>
    </div>

    <div id="box_resposta_video" class="video-answer">
        
    </div>

    <div class="card-action">        
            <textarea class="inputCustomizado materialize-textarea" value='<%=resposta_anterior%>' placeholder='<%=resposta_anterior%>' required></textarea>
            <button id="btn-resposta-ondemand" onclick="envia_resposta(this, <%= cuepoint.id_ondemand_video_cuepoints %>)" class="enviarValido material-icons">send</button>        
    </div>
</div>
`;

function envia_resposta(ele, id_cuepoint) {
    document.getElementById('btn-resposta-ondemand').classList.add('hide')
    ele = ele.parentNode.querySelector('textarea').value || '' 

    var resposta = {
        resposta: ele,
        id_cuepoint: id_cuepoint,
        id_contato: get_data('geral').id
    }
    set_resposta_ondemand(resposta, function (cb) {
        //alert(JSON.stringify(resposta))
        last_cuepoint.respondido = true
        document.getElementById('btn-resposta-ondemand').classList.remove('hide')
        document.querySelector('#box_resposta_ondemand_full_screen').innerHTML = ''
        
        if (last_cuepoint.fullscreen) {
            jwplayer('videoJw').setFullscreen()
        }
        jwplayer("videoJw").play()
    })
}