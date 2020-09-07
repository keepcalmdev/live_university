var mensagens_aula_v = `
<div class="mensagens_aula">

        <div class="mensagem_aluno respondido hide">
        <div class="mensagem_aula resposta"></div>
        </div>  

        <% console.log(dados_conversa)%>
        <% for(var i=dados_conversa.length-1; i>-1; i--){%>
            <%if(dados_conversa[i].origem == 'aluno'){%>
                <div class="mensagem_aluno">
                <div class="mensagem_aula"><%= dados_conversa[i].comentario%></div>
                </div>
            <%}else{%>
                <div class="mensagem_universidade">
                <div class="mensagem_photo"><img src="./image/cubo_branco.png" alt=""></div>
                <div class="mensagem_aula"><%= dados_conversa[i].comentario%></div>
            </div>    
            <%}%>
        <%}%>          
       
</div>

<% var z = dados_conversa.length - 1%>
<% if(dados_conversa[z].origem == 'Live'){%>
<div class="enviar_mensagem_aula input-field">
    <i class="material-icons prefix grey-text text-darken-2" onclick="envia_coment(this, <%=dados_conversa[0].id_calendario_aula%>)">send</i>
    <input id="resp-coment" class="grey-text text-darken-3" type="text" placeholder="Digite aqui sua mensagem">
</div>
<%}%>
`

function envia_coment(ele, id_calendario_aula){
    require_loader('open')    
    var comentario = {}
    comentario.comentario = document.getElementById('resp-coment').value
    comentario.id_calendario = id_calendario_aula
    comentario.id_contato = get_data('geral').id

    insert_comentario_conversa_aula(comentario, function (iccs_cb){     
        if(iccs_cb == 'ok'){   
        document.querySelector('.enviar_mensagem_aula').classList.add('hide')
        document.querySelector('.respondido').classList.remove('hide')
        document.querySelector('.resposta').innerText = comentario.comentario
        require_loader('close')
        }else{
            toasted('Erro ao Enviar')
        }
    })

}