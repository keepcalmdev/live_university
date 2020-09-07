var shift_edit_empresa_v = `
    <div class="card shift shift-edit-empresa">
        <img class="action-button" src="img/icons/geral_editar.svg" alt=""/ onclick="toggle_edit_empresa()">
        <div class="action-button-icon hidden" onclick="shift_save_edit_group(<%= grupo.id_grupos_shift %>)"><i class="material-icons">save</i></div>
        <div class="card-content">
            <div class="input-group">
                <i class="material-icons">group</i>
                <span id="nome-grupo" class=""> <%= grupo.nome_grupo %> </span>
                <input class="hidden" type="text" name="grupo" placeholder="Nome do Grupo" value="<%= grupo.nome_grupo %>">
            </div>
            <div class="input-group">
                <img src="img/icons/grupos_empresa.svg" alt=""/>
                <span id="nome-empresa" class=""> <%= grupo.empresa %> </span>
                <input class="hidden" type="text" name="empresa" placeholder="Empresa ABC" value="<%= grupo.empresa %>">
            </div>
            <div class="input-group">
                <img src="img/icons/grupos_orientador.svg" alt=""/>
                <span id="nome-orientador" class=""> <%= grupo.professor %> </span>
                <div class="combo_center combo-orientador hidden">
                    <div class="combo">
                        <div class="c_box">
                            <div id="choose"></div>
                            <i class="material-icons">arrow_drop_down</i>
                        </div>
                        <div class="option_box">
                            <ul class="lista_in">
                                <% orientadores.forEach(function(orientador) { %>
                                    <% if (grupo.id_professor == orientador.id_professor){ %>
                                        <li data-id=<%= orientador.id_professor %> class="modulo_ativo"><%= orientador.nome %></li>
                                    <% }else{ %>
                                        <li data-id=<%= orientador.id_professor %> ><%= orientador.nome %></li>
                                    <% } %>
                                <% }); %>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="input-group">
                <img src="img/icons/grupos_trello.svg" alt=""/>
                <input class="hidden" type="text" name="trello" placeholder="trello.com/board-no-trello" value="<%= grupo.link_trello %>">
                <span class=""> Trello <a id="link-trello" href="<%= grupo.link_trello %>"><%= grupo.link_trello %></a> </span>
            </div>
        </div>
    </div>    
`

function toggle_edit_empresa(){
    //troca entre modo edição e modo visualização dos dados do grupo
    var elements = document.querySelectorAll(
        ".shift-edit-empresa .card-content .input-group input, "+
        ".shift-edit-empresa .card-content .input-group span, "+
        ".shift-edit-empresa .card-content .input-group .combo-orientador,"+
        ".shift-edit-empresa .action-button, "+ 
        ".shift-edit-empresa .action-button-icon");
    elements.forEach((element) => {
        element.classList.toggle("hidden");
    });
}

function shift_save_edit_group(id_grupos_shift){
    //salva os dados do grupo
    if(check_data_edit){
        toggle_edit_empresa(); //sai do modo edição 
        $.post(server + '/set_update_grupo_shift', { //envia dados pro servidor
            id_contato: get_data('geral').id,
            id_grupos_shift: id_grupos_shift,
            empresa: document.querySelector("input[name='empresa']").value,
            nome_grupo: document.querySelector("input[name='grupo']").value,
            id_professor: document.querySelector('.modulo_ativo').dataset.id, 
            link_trello: document.querySelector("input[name='trello']").value
        })
        .done((a) => {
            console.log(a);
            if(a == "ok"){ //caso sucesso, atualiza todos os dados da empresa
                document.querySelector("#link-trello").innerHTML = document.querySelector("input[name='trello']").value;
                document.querySelector("#nome-empresa").innerHTML = document.querySelector("input[name='empresa']").value;
                document.querySelector("#nome-grupo").innerHTML = document.querySelector("input[name='grupo']").value;
                document.querySelector("#nome-orientador").innerHTML = document.querySelector('.modulo_ativo').innerHTML;
            }else{
                toasted("Erro Interno");
            }
        })
        .fail((b) => {
            console.log('erro set_update_grupo_shift');
            console.log(b);
        });
    }
}

function check_data_edit(){
    // checa se os valores estão de acordo com as regras
    if (document.querySelector("input[name='grupo']").value === ""){
        toasted('O grupo deve ter um nome.')
        return false;
    } 
    
    if (document.querySelector('.modulo_ativo').dataset.id === undefined ){
        toasted('Escolha um orientador')
        return false; 
    } 

    if (document.querySelector("input[name='empresa']").value === "" ){
        toasted('Falta o nome da empresa')
        return false; 
    } 

    return true; 
}