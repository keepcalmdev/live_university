var shift_novo_participantes_v = `
    <div class="card card-list shift-novo-participantes">
        <ul>
            <li class="item no-border-bottom first">Novo participante</li>
            <% participantes.forEach(function(participante) { %>
                <% if (id_contato != participante.id_contato ) { %>
                <li class="row item" id="participante-<%= participante.id_contato %>">
                    <img class="responsive-img col s2" src="http://liveulabs.com:49/users/<%=participante.id_contato%>.jpg" alt="" style="border-radius: 50%;">
                    <!--<img class="responsive-img col s2" src="https://i.imgur.com/Zy3J7ut.png" alt="">-->
                    <span class="col s8"><%= participante.nome_completo %></span>
                    <img class="col s2" src="img/icons/grupos_novo.svg" onclick="toggle_shift_novo_participante(<%= participante.id_contato %>,1)"/>
                </li>
                <% } %>
            <% }); %>
        </ul>
    </div>
`

function toggle_shift_novo_participante(id_contato, action){
    if(total_participantes_adicionados() < 7 || action == 2){
        document.querySelector('#participante-'+id_contato).classList.toggle('hidden');
        document.querySelector('#participante-ad-'+id_contato).classList.toggle('hidden');
    }
}

function total_participantes_adicionados(){
    var total = document.querySelectorAll('.shift-novo-edit-participantes ul li').length;
    var hidden = document.querySelectorAll('.shift-novo-edit-participantes ul .hidden').length;
    return total - hidden;
}