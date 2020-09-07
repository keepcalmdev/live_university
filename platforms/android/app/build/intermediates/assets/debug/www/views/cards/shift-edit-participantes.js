var shift_edit_participantes_v = `
    <div class="card card-list shift-edit-participantes has-top-button">
    <img class="action-button" src="img/icons/geral_editar.svg" alt=""/ onclick="toggle_edit_participantes()">
    <div class="action-button-icon hidden" onclick="toggle_edit_participantes()"><i class="material-icons">save</i></div>
    <ul>
        <% participantes.forEach(function(participante){ %>
            <li class="row item" id="participante-<%= participante.id_contato %>">
                <img class="responsive-img col s2" src="http://liveulabs.com:49/users/<%= participante.id_contato %>.jpg" alt="" style="border-radius: 50%;">
                <span class="col s8"><%= participante.nome_aluno %></span>
                <img class="action col s2 invisible" src="img/icons/geral_cancelar.svg" onclick="update_participantes_shift('remove', <%= participante.id_contato %>, <%= id_grupos_shift %> )"/>
                <img class="action col s2 invisible hidden" src="img/icons/grupos_novo.svg" onclick="update_participantes_shift('add', <%= participante.id_contato %>, <%= id_grupos_shift %> )"/>
            </li>
        <% }); %>
        <% participantes_sem_grupo.forEach(function(participante){ %>
            <li class="row item novos hidden" id="participante-<%= participante.id_contato %>">
                <img class="responsive-img col s2" src="http://liveulabs.com:49/users/<%= participante.id_contato %>.jpg" alt="" style="border-radius: 50%;">
                <span class="col s8"><%= participante.nome_completo %></span>
                <img class="action col s2 invisible" src="img/icons/grupos_novo.svg" onclick="update_participantes_shift('add', <%= participante.id_contato %>, <%= id_grupos_shift %> )"/>
                <img class="action col s2 invisible hidden" src="img/icons/geral_cancelar.svg" onclick="update_participantes_shift('remove', <%= participante.id_contato %>, <%= id_grupos_shift %> )"/>
            </li>
        <% }); %>
    </ul>
    </div>
`

//alterna entre modo visualização e edição dos participantes do grupo
function toggle_edit_participantes(){
    var elements = document.querySelectorAll(
        ".shift-edit-participantes .action-button, "+ 
        ".shift-edit-participantes .action-button-icon,"+
        ".shift-edit-participantes ul .novos");
    elements.forEach( element => {
        element.classList.toggle("hidden");
    });

    var actions = document.querySelectorAll(".shift-edit-participantes ul li .action");
    actions.forEach( action => {
        action.classList.toggle("invisible");
    });
}

function update_participantes_shift(tipo,id_contato_editado,id_grupos_shift){
    $.post(server + '/set_update_participantes_shift', { //envia os dados pro servidor 
        tipo: tipo,
        id_contato: get_data('geral').id,
        id_contato_editado: id_contato_editado,
        id_grupos_shift: id_grupos_shift
    })
    .done((a) => {
        console.log(a);
        if(a == "ok"){ //caso sucesso, muda o status do item da lista.
            toggle_shift_edit_participante(id_contato_editado);
        }else{
            toasted("erro");
        }
    })
    .fail((b) => {
        console.log('erro set_update_participantes_shift');
        console.log(b);
    });
}


//faz a troca de visual de representação se está dentro ou fora do grupo
function toggle_shift_edit_participante(id_contato){ 
    elements = document.querySelectorAll("#participante-"+id_contato+" .action");
    elements.forEach( element => {
        element.classList.toggle("hidden");
    });
    elements = document.querySelectorAll("#participante-"+id_contato);
    elements.forEach( element => {
        element.classList.toggle("novos");
    });
}