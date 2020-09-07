
var into_meus_eventos_agenda = `
<div id="navbar"></div>

<div class="intermediario2" style="padding-bottom: 18%; padding-top: 18%;">


<status id="status">
</status>

<div class="perguntinhas">
<perguntas id="perg">
</perguntas>
</div>

</div>
<div class="intermediario" style="padding-bottom: 18%;">
</div>



<div id="modal-pergunta" class="modal">
    <div class="modal-content">
        <span style="font-weight: bold;">Envie sua pergunta:</span><br>        
            <textarea id="textarea2" class="materialize-textarea" data-length="250" maxlength="250"></textarea> 
    </div>
    <div class="modal-footer rodape-enviar-pergunta">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat modal-close">Cancelar</a>
      <a href="#!" id="btn-enviar-pergunta-palestra" class="modal-close waves-effect waves-green btn-flat">Enviar</a>
    </div>
</div>



<div id="modal-resposta" class="modal">
    <div class="modal-content">
        <span style="font-weight: bold;">Responder</span><br>        
            <textarea id="textarearesp" class="materialize-textarea" data-length="250" maxlength="250"></textarea> 
    </div>
    <div class="modal-footer rodape-enviar-pergunta">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat modal-close">Cancelar</a>
      <a href="#!" id="btn-enviar-resposta-palestra" class="modal-close waves-effect waves-green btn-flat">Enviar</a>
    </div>
</div>
<enviarpergunta>
</enviarpergunta>
`;

var card_pergunta_evento = `

<% for(var i=0; i<perguntas.length; i++){ %>
    <div class="card card-pergunta" id="<%= 'pergunta-'+i %>">
        <div class="card-content">
            <div class="row">
                <div class="col s10">
                    <div class="row">
                        <div class="col s2">
                            <div class="img-rounded" style="background-image: url('<%= perguntas[i].link_foto%>');"></div>
                        </div>
                        <div class="col s9 nome-empresa-card-post" style="margin-left: 10px;">
                            <%- perguntas[i].nome %> <br>
                            <span class="text-muted"><%=perguntas[i].empresa%></span>
                            <!--get_palestrante_id(perguntas[i].id_agenda)-->
                        </div>
                    </div>
                    <% console.log(perguntas[i])%>
                    <div class="row" style="transform: translateY(-45%);">
                        <div class="col s12">
                            <% if(perguntas[i].pergunta.length > 88){%>
                            <p class="texto-post-texto" style="transform: translateY(35%);"><%- perguntas[i].pergunta %></p>
                            <%}else{%>
                            <p class="texto-post-texto"><%- perguntas[i].pergunta %></p>
                            <%}%>
                        </div>
                        
                    </div>
                    <div>
                        <span onclick="toggleRespostas(<%=perguntas[i].id_pergunta%>);" style="font-size: 16px; color: #000000"><%=perguntas[i].respostas.length > 0 ? perguntas[i].respostas.length == 1 ? "1 Resposta" : perguntas[i].respostas.length + " Respostas" : "Nenhuma Resposta"%></span>
                    </div>
                </div>
                <div class="col s2 center-align">
                    <% var score = ''; if(perguntas[i].score > 0){ score = '+' + perguntas[i].score.toString(); }else{ score = perguntas[i].score.toString()} %>
                    <% if(perguntas[i].votou == 0) {%>
                        <div class="text-center">
                            <i class="material-icons seta setacima" id-pergunta="<%= perguntas[i].id_pergunta%>" id-agenda="<%= perguntas[i].id_agenda%>" onclick="like_pergunta_evento(this)">expand_less</i>
                            <small class="score"><%= score %></small>
                            <i class="material-icons seta setabaixo" id-pergunta="<%= perguntas[i].id_pergunta%>" id-agenda="<%= perguntas[i].id_agenda%>" onclick="deslike_pergunta_evento(this)">expand_more</i>
                        </div>
                    <%}else{%>
                        <% if(perguntas[i].tipo_voto == 1){%>    
                            <div class="text-center">
                                <i class="material-icons seta setacima" style="color: #934684 !important;">expand_less</i>
                                <small class="score"><%= score %></small>
                                <i class="material-icons seta setabaixo">expand_more</i>
                            </div>
                        <%}else{%>
                            <div class="text-center">
                                <i class="material-icons seta setacima">expand_less</i>
                                <small class="score"><%= score %></small>
                                <i class="material-icons seta setabaixo" style="color: #934684 !important;">expand_more</i>
                            </div>
                        <%}%>
                    <%}%>
                </div>
                <br style="clear: both; overflow: hidden">
                <div id="respostas-<%=perguntas[i].id_pergunta%>" class="respostas-palestra card-action d-none">
                    <%for(var x = 0; x < perguntas[i].respostas.length; x++){%>
                        <div class="row resposta">
                            <div class="col s2">
                                <div class="img-rounded img-xs" style="background-image: url('http://liveulabs.com:49/users/<%=perguntas[i].respostas[x].id_contato%>.jpg');"></div>
                            </div>
                            <div class="col s10 ballon">
                                <p style="margin-right: 7px; margin-top: 14px; margin-bottom: 7px"><%=perguntas[i].respostas[x].resposta%></p>
                                <span><b>Palestrante</b></span>
                            </div>
                        </div>
                    <%}%>
                </div>
                <% if (dados.id_contato_palestrante == get_data('geral').id) { %>
                    <div class="text-center">
                        <p style="font-size: 18px; font-weight: bold; color: #781866" onclick="open_modal_responder_pergunta(<%=perguntas[i].id_agenda%>, <%=perguntas[i].id_pergunta%>);">Responder</p>
                    </div>
                <% } %>
            </div>
        </div>
    </div>
<%}%>
`;

var input_inserir_pergunta_palestra = `
<div class="float-pergunta-div">
    <div class="float-pergunta">
        <a class="btn-floating btn-large waves-effect waves-light my-float" style="background-color: #781866"><i class="material-icons" style="font-size: 280%;" onclick="open_modal_post_pergunta(<%=id_agenda%>)">help_outline</i></a>

        <% if(link_apresentacao.length > 2){ %>            
            <a href="<%=link_apresentacao %>" class="btn-floating btn-large waves-effect waves-light my-float" style="background-color: #781866;margin-left: 3%;"><i class="material-icons" style="font-size: 280%;">cloud_download</i></a>
        <%}%>
        

    </div>
</div>

<!-- <div class="enviar_mensagem_aula enviar_pergunta_palestra input-field">
<i class="material-icons prefix grey-text text-darken-2" id-agenda="<%=id_agenda%>" onclick="envia_pergunta_palestra(this)">send</i>
<input maxlength="100" id="resp-coment" class="grey-text text-darken-3" type="text" placeholder="Pergunta ? - Até 100 caracteres">
</div> -->
`

function toggleRespostas(id){
    $("#respostas-"+id).toggleClass('d-none');
}

function get_palestrante_id(id_agenda) {
    return get_data('palestra-' + id_agenda).id_contato;
}

function envia_nota_palestra_evento(ele, dados) {
    ele = ele.parentNode.parentNode
    dados.nota = ele.querySelector('.nota [class="active"]')
    dados.comentario = ele.querySelector('.comentario textarea').value || ''

    if (!dados.nota) {
        toasted('Falou a Nota')
        return
    }

    dados.nota = dados.nota.innerText
    dados.id_contato = get_data('geral').id

    require_loader('open')

    set_avaliacao_palestra_evento(dados, function (x) { 
        if(x == 'ok'){
            require_loader('close')
            chama_agradecimento('avaliacao', function(cb){
                //toasted('Obrigado Pela Avaliação')
                document.getElementById('avaliacao-evento').classList.add('hide')
            })
        }else{
            require_loader('close')
            toasted('Ops! Erro ao Enviar.')
        }
    })
}

function like_pergunta_evento(ele){
    require_loader('open')
    var info = {}
    info.id_contato = get_data('geral').id
    info.id_pergunta = parseInt(ele.getAttribute('id-pergunta'))
    info.score = 1    
    insert_score_pergunta_evento(info, function(ispe_results){
       if(ispe_results == 'bad'){
            require_loader('close')
           toasted('Ops! Erro ao votar')
           return
       } else{
           ele.style.color="#781866"
           ele.onclick = function() {
               return false;
             }
           var elemento = ele.parentNode
           elemento.querySelector('.setabaixo').onclick = function() {
               return false;
             }
       
           var score_atual = elemento.querySelector('.score').innerText
           var calculo = parseInt(score_atual)    
           calculo = calculo + 1
        
           if(calculo > 0){
               var final = '+' + calculo.toString()    
           }else{
               if(calculo == 0){
       
               }else{
                   var final = '-' + calculo.toString()    
               }
           }    
           elemento.querySelector('.score').innerText = final    
           
           toasted('Voto Enviado')
             
           var set_dt = 'palestra-' + parseInt(ele.getAttribute('id-agenda'))
           var dados = get_data(set_dt)           
           reload_chama_palestra(dados)
       }
    })


}

function deslike_pergunta_evento(ele){
    require_loader('open')
    var info = {}
    info.id_contato = get_data('geral').id
    info.id_pergunta = parseInt(ele.getAttribute('id-pergunta'))
    info.score = -1   
    insert_score_pergunta_evento(info, function(ispe_results){
       if(ispe_results == 'bad'){
            require_loader('close')
           toasted('Ops! Erro ao votar')
           return
       } else{
           ele.style.color="#781866"
           ele.onclick = function() {
               return false;
             }
           var elemento = ele.parentNode
           elemento.querySelector('.setacima').onclick = function() {
               return false;
             }
       
           var score_atual = elemento.querySelector('.score').innerText
           var calculo = parseInt(score_atual)
           calculo = calculo - 1
       
             if(calculo > 0){
                 var final = '+' + calculo.toString()    
             }else{
                 if(calculo == 0){
         
                 }else{
                     var final = calculo.toString()    
                 }
             }    
             elemento.querySelector('.score').innerText = final              
                
             toasted('Voto Enviado')

             var set_dt = 'palestra-' + parseInt(ele.getAttribute('id-agenda'))
             var dados = get_data(set_dt)
             console.log(dados)
             reload_chama_palestra(dados)
        }
    })
    
}

function envia_pergunta_palestra(ele){  
    require_loader('open')    

    var pergunta = document.getElementById('resp-coment').value
    if(pergunta.length < 10){
        require_loader('close')    
        toasted('Ops! Pergunta muito curta.')
        return
    }

    var comentario = {}
    comentario.pergunta = document.getElementById('resp-coment').value
    comentario.id_agenda = parseInt(ele.getAttribute('id-agenda'))
    comentario.id_contato = get_data('geral').id    
    insert_pergunta_palestra(comentario, function(ipp_results){
        if(ipp_results == 'bad'){
            toasted('Ops! Erro ao perguntar')
            require_loader('close')
            return
        }else{            
            toasted('Pergunta enviada')
            var set_dt = 'palestra-' + parseInt(ele.getAttribute('id-agenda'))
            var dados = get_data(set_dt)
            console.log(dados)
            reload_chama_palestra(dados)
            
        }
    })    
}

function open_modal_post_pergunta(id_agenda){
    $('.modal').modal();
    $('#modal-pergunta').modal('open');
    $('input#input_text, textarea#textarea2').characterCounter();        
    $('#textarea2').focus();   
    document.getElementById('textarea2').setAttribute('id-agenda', id_agenda)
    document.getElementById('btn-enviar-pergunta-palestra').onclick = function() {
        var pergunta = document.getElementById('textarea2').value
        if(pergunta.length < 5){
            toasted('Pergunta muito curta;')
            return
        }else{
            require_loader('open')
            var dados = {}
            dados.pergunta = pergunta
            dados.id_contato = get_data('geral').id
            dados.id_agenda = id_agenda
            console.log(dados)
            insert_pergunta_palestra(dados, function(ipp_results){
                if(ipp_results == 'bad'){
                    require_loader('close')
                    toasted('Ops! Erro ao perguntar')
                    return
                }else{            
                    toasted('Pergunta enviada')
                    var set_dt = 'palestra-' + id_agenda
                    var dados = get_data(set_dt)
                    console.log(dados)
                    reload_chama_palestra(dados)                    
                }
            })    
        }
    };
}

function open_modal_responder_pergunta(id_agenda, id_pergunta) {
    $('.modal').modal();
    $('#modal-resposta').modal('open');
    $('input#input_text, textarea#textarearesp').characterCounter();
    $('#textarearesp').focus();
    document.getElementById('textarearesp').setAttribute('id-agenda', id_agenda);
    document.getElementById('btn-enviar-resposta-palestra').onclick = function () {
        var resposta = document.getElementById('textarearesp').value;
        if (!resposta.length) {
            toasted('Digite uma resposta!');
            return;
        } else {
            require_loader('open');
            var dados = {};
            dados.id_contato = get_data('geral').id;
            dados.id_agenda = id_agenda;
            dados.id_pergunta = id_pergunta;
            dados.resposta = resposta;
            console.log(dados);
            insert_resposta_palestra(dados, function (cb_result) {
                if (cb_result == 'unsuccessful') {
                    require_loader('close');
                    toasted('Erro ao responder pergunta!');
                    return;
                } else {
                    toasted('Resposta enviada!');
                    var id_palestra = 'palestra-' + id_agenda;
                    var dados_palestra = get_data(id_palestra);
                    console.log(dados_palestra);
                    reload_chama_palestra(dados_palestra);
                }
            });
        }
    };
}