var shift_newgroup_v = `
    <div class="card shift shift-newgroup" onclick="load_newshift()">
        <div class="card-content">
            <img src="img/icons/grupos_novo.svg" alt="" />
            <span class="create-shift">Criar novo grupo</span>
            <i class="material-icons small">chevron_right</i>
        </div>
    </div>
`;


// 
function load_newshift(){
    change_view(`<div id="navbar"></div><div id="shift2"></div>`, true, false, {}, nav_degrade_v, {
        titulo: 'Criar Grupo'
    })

    //carrega os orientadores
    $.post(server + '/get_orientadores_shift', {})
    .done((orientadores) => {
        console.log(orientadores);
        var shift2 = document.querySelector("#shift2");


        //renderiza o primeiro bloco de edição
        shift2.innerHTML += ejs.render(shift_novo_orientador_v, {
            orientadores: orientadores
        });

        //carrega os alunos sem grupo
        $.post(server + '/get_alunos_sem_grupo', {
            id_contato: get_data('geral').id
        })
        .done((participantes) => {
            console.log(participantes);

            //renderiza lista de possíveis participantes
            shift2.innerHTML += ejs.render(shift_novo_participantes_v, {
                participantes: participantes,
                id_contato: get_data('geral').id 
            });

            //renderiza bloco de participantes adicionados, inicialmente vazio.
            shift2.innerHTML += ejs.render(shift_novo_edit_participantes_v, {
                participantes: participantes
            });


            combo_box_orientador_init();
        })
        .fail((b) => {
            console.log('erro get_alunos_sem_grupo')
            console.log(b)
        })
    })
    .fail((b) => {
        console.log('erro get_orientadores_shift')
        console.log(b)
    })
}