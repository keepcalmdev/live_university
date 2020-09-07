var resposta_video = `
    <% for(var i=0; i < respostas.length ; i++){ %>
        <div class="resposta" hidden>
            <button id-contato='<%= respostas[i].id_contato%>' id-resposta='<%= respostas[i].id_ondemand_video_cuepoints%>' onclick="aula_resp_like(this)" class="material-icons like">thumb_up_alt</button>
            <button id-contato='<%= respostas[i].id_contato%>' id-resposta='<%= respostas[i].id_ondemand_video_cuepoints%>' onclick="aula_resp_dislike(this)" class="material-icons unlike">thumb_down_alt</button>
            <div class="resposta"><%- JSON.stringify(respostas[i].chat_message)%></div>
        </div>
    <% } %>
`;

function aula_resp_like(ele){
    var dados = {}
    dados.like = 1
    dados.id_contato = ele.getAttribute('id-contato')
    dados.id_resposta = ele.getAttribute('id-resposta')
    console.log(dados)

    set_like_resposta(dados, function(cb){        
    })
}   

function aula_resp_dislike(ele){
    var dados = {}
    dados.like = -1
    dados.id_contato = ele.getAttribute('id-contato')
    dados.id_resposta = ele.getAttribute('id-resposta')
    console.log(dados)

    set_like_resposta(dados, function(cb){        
    })
}
