var shift_accept_invite_v = `
    <% convites.forEach(function(convite) { %>
        <div class="card shift shift-accept-invite" id="convite-<%= convite.id_convite %>">
            <div class="card-content">
                <div class="invite-info">
                    <span class="group-name"><%= convite.nome_grupo %></span><br>
                    <span class="invited-by">Convidado por <%= convite.remetente %></span>
                </div>
                <div class="invite-actions">
                    <% var params = convite.id_contato + "," + convite.id_convite + "," + convite.id_grupo_shift  %>
                    <img src="img/icons/geral_cancelar.svg" onclick="shift_recusar_convite(<%= params %>)" />
                    <img src="img/icons/geral_check.svg" onclick="shift_aceitar_convite(<%= params %>)" />
                </div>
            </div>
        </div>
    <% }); %>    
`;

function shift_recusar_convite(id_contato,id_convite, id_grupo_shift){
    $.post(server + '/set_recusa_shift', {
        id_contato: id_contato,
        id_convite: id_convite,
        id_grupos_shift: id_grupo_shift
    })
    .done((a) => {
        document.querySelector("#convite-"+id_convite).classList.toggle("hidden");
        if(document.querySelectorAll(".shift-accept-invite").length == document.querySelectorAll(".hidden").length){
            document.querySelector('#shift').innerHTML = ejs.render(shift_newgroup_v, {}); 
        }
        console.log(a);
    })
    .fail((b) => {
        console.log('erro set_recusa_shift')
        console.log(b)
    });
}

function shift_aceitar_convite(id_contato,id_convite, id_grupo_shift){
    $.post(server + '/set_aceita_convite_shift', {
        id_contato: id_contato,
        id_convite: id_convite,
        id_grupos_shift: id_grupo_shift
    })
    .done((a) => {
        // Recarrega tela do shift com o grupo após aceitar o convite
        $.post(server + '/get_home_shift', {
            id_contato: id_contato
        })
        .done((data) => {
            document.querySelector('#shift').innerHTML = ejs.render(shift_go_group_v, {
                grupo: 
                    {
                        nome: data[0].nome_grupo,
                        participantes: data[0].participantes,
                        id: data[0].id_grupos_shift
                    }
                });
            //carrega a tela do grupo
            load_edit_shift(data[0].id_grupos_shift,data[0].nome_grupo);
        })
        .fail((b) => {
            console.log('erro get_home_shift')
            console.log(b)
        })

    })
    .fail((b) => {
        console.log('erro set_aceita_convite_shift')
        console.log(b)
    });
}