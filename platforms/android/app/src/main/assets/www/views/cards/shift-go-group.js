var shift_go_group_v = `
    <div class="card shift shift-go-group" onclick="load_edit_shift(<%= grupo.id+",'"+grupo.nome+"'" %>)">
        <div class="card-content">
            <div class="group-info">
                <span class="group-name"><%= grupo.nome %></span><br>
                <span class="member-count"><%= grupo.participantes %> participantes</span>
            </div>
            <i class="material-icons small">chevron_right</i>
        </div>
    </div>
`;

// 
function load_edit_shift(id_grupos_shift, nome_grupo){

    change_view(`<div id="navbar"></div><div id="shift3"></div>`, true, false, {}, nav_degrade_v, {
        titulo: nome_grupo
    });

    $.post(server + '/get_grupo_shift', {
        id_contato: get_data('geral').id,
        id_grupos_shift: id_grupos_shift
    })
    .done((a) => {
        console.log(a);
        document.querySelector("#shift3").innerHTML += ejs.render(shift_edit_empresa_v, {
            grupo: a.grupo, 
            orientadores: a.orientadores
        }) + ejs.render(shift_edit_participantes_v, {
            participantes: a.participantes,
            participantes_sem_grupo: a.alunos_sem_grupo,
            id_grupos_shift: a.grupo.id_grupos_shift
        }) + ejs.render(shift_historico_v, {
            historico: a.historico
        });        
        combo_box_orientador_init();
    })
    .fail((b) => {
        console.log('erro get_grupo_shift')
        console.log(b)
    });
}