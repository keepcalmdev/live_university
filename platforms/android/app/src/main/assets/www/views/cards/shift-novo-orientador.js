var shift_novo_orientador_v = `
    <div class="card shift shift-novo-orientador">
        <div class="action-button-icon" onclick="criar_grupo()"><i class="material-icons">save</i></div>
        <div class="card-content">
            <div class="input-group">
                <i class="material-icons">group</i>
                <input type="text" name="grupo" placeholder="Nome do Grupo">
            </div>
            <div class="input-group">
                <img src="img/icons/grupos_empresa.svg" alt=""/>
                <input type="text" name="empresa" placeholder="Empresa ABC">
            </div>
            <div class="input-group">
                <img src="img/icons/grupos_orientador.svg" alt=""/>
                <div class="combo_center combo-orientador">
                    <div class="combo">
                        <div class="c_box">
                            <div id="choose"></div>
                            <i class="material-icons">arrow_drop_down</i>
                        </div>
                        <div class="option_box">
                            <ul class="lista_in">
                                <li class="modulo_ativo gray">Selecionar orientador</li>
                                <% orientadores.forEach(function(orientador) { %>
                                    <li data-id=<%= orientador.id_professor %> ><%= orientador.nome %></li>
                                <% }); %>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="input-group">
                <img src="img/icons/grupos_trello.svg" alt=""/>
                <input type="text" name="trello" placeholder="trello.com/board-no-trello">
            </div>
        </div>
    </div>
    
`

function combo_box_orientador_init() {
    var m;
    var lista = document.querySelector(".lista_in");


    if(document.querySelector('.modulo_ativo')){
        var m = document.querySelector('.modulo_ativo').innerText;
    } else {
        var m = document.querySelector('.lista_in li').innerText;
        document.querySelector('.lista_in li').classList.add('modulo_ativo');
    }
    change_choose(m);

    document.querySelector('.c_box').addEventListener('click', function (ev) {
            lista.classList.add('show');
    });

    document.querySelectorAll('.combo .lista_in li').forEach(function (ele) {
        ele.addEventListener('click', function (ev) {
            change_choose(this.innerText);
            lista.classList.remove("show");
            document.querySelector(".modulo_ativo").classList.remove("modulo_ativo");
            this.classList.add("modulo_ativo");
        });
    });
}

function change_choose(text){
    var choose = document.querySelector("#choose");
    choose.innerHTML = text; 
    if (text == "Selecionar orientador")choose.style.color = "#c3c3c3";
    else choose.style.color = "#000";
}

function check_data_novo(){
    if (document.querySelector("input[name='grupo']").value === ""){
        toasted('Crie um nome do grupo')
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

    var contacts = [0,0,0,0];
    var i = 0 ;
    var elements = document.querySelectorAll(".shift-novo-edit-participantes ul li");
    elements.forEach(element => {
        if (!element.classList.contains("hidden") && !element.classList.contains('first'))
            contacts[i++] = element.dataset.id; 
    });
    console.log(contacts);
    if(i < 2){
        toasted('Ops! de 3 a 5 participantes somente.')
        return false;
    }

    return true; 
}

function criar_grupo(){
    document.querySelector(".action-button-icon").classList.toggle("hidden");

    if(check_data_novo()){   
        var contacts = [0,0,0,0];
        var i = 0 ;
        var elements = document.querySelectorAll(".shift-novo-edit-participantes ul li");
        elements.forEach(element => {
            if (!element.classList.contains("hidden") && !element.classList.contains('first'))
                contacts[i++] = element.dataset.id; 
        });
        
        $.post(server + '/set_create_grupo_shift', {
            nome_grupo: document.querySelector("input[name='grupo']").value,
            empresa: document.querySelector("input[name='empresa']").value === "" ? " " : document.querySelector("input[name='empresa']").value,
            id_professor: document.querySelector('.modulo_ativo').dataset.id,
            id_projeto: 0,
            link_trello: document.querySelector("input[name='trello']").value === "" ? " " : document.querySelector("input[name='trello']").value , 
            id_contato: get_data('geral').id,
            id_contato_2: contacts[0],
            id_contato_3: contacts[1],
            id_contato_4: contacts[2],
            id_contato_5: contacts[3]
        })
        .done((a) => {
            console.log(a); 
            document.querySelector(".action-button-icon").classList.toggle("hidden");
            if (a == 'ok'){
                console.log('criado');
                console.log(a);
                //volta a tela
                change_view('back', false, true);
                //recria a home do shift 
                $.post(server + '/get_home_shift', {
                    id_contato: get_data('geral').id
                })
                .done((b) => {
                    console.log('recriando');
                    console.log(b);
                    if(b.length == 0){
                        document.querySelector('#shift').innerHTML = ejs.render(shift_newgroup_v, {}); 
                    }else if(b.length == 1){
                        if (b[0].tipo == 'grupo'){
                            document.querySelector('#shift').innerHTML = ejs.render(shift_go_group_v, {
                                grupo: 
                                    {
                                        nome: b[0].nome_grupo,
                                        participantes: b[0].participantes,
                                        id: b[0].id_grupos_shift
                                    }
                                });
                        }

                    //entra no grupo 
                    load_edit_shift(b[0].id_grupos_shift, b[0].nome_grupo);
                    }
                })
                .fail((b) => {
                    console.log('erro get_home_shift')
                    console.log(b)
                });
            }else{
                toasted('Ocorreu um erro.')
            }
        })
        .fail((b) => {
            console.log('erro set_create_grupo_shift')
            console.log(b)
        })
    }else{
        document.querySelector(".action-button-icon").classList.toggle("hidden");
    }
}