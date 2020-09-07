var faq_v = `
    <nav class="faq">
        <div class="row">
            <i class="material-icons" onclick="change_view('back', false, true)">arrow_back_ios</i>
            <h1>Me ajuda aí</h1>
        </div>
    </nav>
    <div class="faq-content">        
        <div class="row">
            <div class="search-field">
                <input type="text" oninput='filtrar_faq()' placeholder="Qual é sua dúvida?" name="search">
                <i class="material-icons">search</i>
            </div>
        </div>
        <h3>Assuntos</h3>
        <% categories.forEach(function(category) { %>
            <div class="card card-faq" data-nome="<%= category.menu %>" onclick="abrir_subtopico_faq(<%= category.id_grupo %>,'<%= category.menu %>')">
                <div class="card-content">
                    <span><%= category.menu %></span>
                    <i class="material-icons">keyboard_arrow_right</i>
                </div>
            </div>
        <% }); %>
    </div>
`

var subtopico_faq_v = `
    <nav class="faq">
        <div class="row title-row">
            <i class="material-icons" onclick="change_view('back', false, true)">arrow_back_ios</i>
            <h1><%= title %></h1>
            <i class="material-icons search-icon" onclick="document.querySelector('.search-field').classList.toggle('d-none');">search</i>
        </div>        
    </nav>
    <div class="faq-content">
        <div class="row">
            <div class="search-field d-none">
                <input type="text" oninput='filtrar_faq()' placeholder="Qual é sua dúvida?" name="search">
                <i class="material-icons">search</i>
            </div>
        </div>
        <% categories.forEach(function(category) { %>
            <div class="card card-faq" data-nome="<%= category.menu %>" onclick="abrir_reposta(<%= category.goto_r %>, '<%= title %>', '<%= category.menu %>')">
                <div class="card-content">
                    <span><%= category.menu %></span>
                    <i class="material-icons">keyboard_arrow_right</i>
                </div>
            </div>
        <% }); %>
    </div>
`

var resposta_faq_v = `
    <nav class="faq topico-faq">
        <div class="row">
            <i class="material-icons" onclick="change_view('back', false, true)">arrow_back_ios</i>
            <h1><%= title %></h1>
        </div>
    </nav>
    <div class="topico-faq-content">
        <div class="card">
            <div class="shadow d-none"></div>
            <div class="card-title"><%= description %></div>
            <ul>
                <li><%- resposta %> </li>
            </ul>
            <div class="card-footer">
                <div class="row">
                    <span>Achou o que estava procurando?</span> 
                </div>   
                <div class="row">
                    <div class="col s6" onclick="open_modal_deslike()">
                        <img src="img/icons/geral_dislike.svg"> Não
                    </div>
                    <div class="col s6" onclick="vote_like_faq(<%= id_resposta %>)">
                        <img src="img/icons/geral_like.svg"> Sim
                    </div>
                </div>                
            </div>
            <div id="modal-nao" class="modal">
              <form action="#" id="form-chamado">
                <div class="modal-content">
                  <div class="row">
                    <div class="col s12 center-align">
                      <i class="material-icons large" style="color: #934684"> sentiment_very_dissatisfied </i>
                    </div>
                  </div>
                  <p class="center-align"> Poxa, que pena que não conseguimos te ajudar, me conta aí o que podemos melhorar nessa resposta, ou o que realmente estava procurando. </p>
                  <div class="center-align">
                    <textarea id="chamado-mensagem" rows="5" style="height: 7rem"></textarea>
                  </div>
                  <label class="left-align">
                    <input type="checkbox" id="abrir-chamado">
                    <span> Abrir um chamado no meajudaai </span>
                  </label>
                </div>
                <input type="hidden" id="chamado-id-resposta" value='<%= id_resposta %>'>
                <div class="modal-footer">
                  <button type="submit" class="modal-close waves-effect waves-light btn btn-primary">Salvar</button>
                </div>
              </form>
            </div>
            <div class="resultado" style="display:none;">
                <div class="sim">
                    <p>Obrigado pela resposta :)</p>
                </div>
                <!-- <div class="nao d-none">
                    <p>Poxa que pena :(</p>
                    <p>
                        Envie sua solicitação para o email
                        meajudaai@liveuniversity.com que em breve
                        entraremos em contato.</p>
                    <div class="center">
                        <a href="mailto:meajudaai@liveuniversity.com" class="btn-small"><i class="material-icons left">email</i>E-mail</a>
                    </div>                    
                </div> -->
            </div>
        </div>
    </div>
`

function abrir_subtopico_faq(id, title){
    require_loader('open')
    $.post(server + '/get_faq', { id_grupo: id })
    .done((categories) => {
        $('.search-field input').val('');
        $('.search-field input').trigger('input');
        change_view(subtopico_faq_v, true, false, {
            categories: categories,
            title: title
        })
        require_loader('close')
    })
    .fail((b) => {
        console.log('erro get_faq')
        console.log(b)
    });
}

function abrir_reposta(id, title, description){
    require_loader('open')
    $.post(server + '/get_faq', { id_grupo: id })
    .done((data) => {        
        $('.search-field input').val('');
        $('.search-field input').trigger('input');
        change_view(resposta_faq_v, true, false, {
            resposta: data[0].html,
            id_resposta: data[0].id_resposta,
            title: title,
            description: description
        })
        require_loader('close');
        console.log(document.querySelector('#modal-nao'));
        M.Modal.init(document.querySelector('#modal-nao'));
        $('#modal-nao').on('submit', e => { vote_faq_deslike(e) })
    })
    .fail((b) => {
        console.log('erro get_faq')
        console.log(b)
    });
}

function filtrar_faq(){
    var search = $('.search-field input').val().toLowerCase();
    $('.card-faq').each(function(index){
        if( $(this).data('nome').toLowerCase().includes(search)){
            $(this).show();
        }else{
            $(this).hide();
        }
    });
}

// 1 = like 
// other = deslike
function vote_like_faq(id){
    require_loader('open')
    var id_contato = get_data('geral').id
    $.post(server + '/set_like_faq', { id_resposta: id, id_contato: id_contato })
    .done((data) => {
        $('.shadow').toggleClass('d-none');
        $('.resultado').slideToggle();
        require_loader('close')
    })
    .fail((b) => {
        console.log('erro get_faq')
        console.log(b)
    });
}

function open_modal_deslike(){
    const modal = M.Modal.getInstance(document.querySelector('#modal-nao'));
    modal.open();
}

function vote_faq_deslike(e){
    require_loader('open')
    e.preventDefault();
    let chamado = $('#abrir-chamado').val() == 'on' ? 1 : 0;
    let mensagem = $('#chamado-mensagem').val();
    let id_resposta = $('#chamado-id-resposta').val();
    var id_contato = get_data('geral').id
    $.post(server + '/set_deslike_faq', { id_resposta, id_contato, mensagem, chamado })
    .done((data) => {
        const modal = M.Modal.getInstance(document.querySelector('#modal-nao'));
        modal.close();
        require_loader('close');
        toasted('Enviado com sucesso');
    })
    .fail((b) => {
        console.log('erro get_faq')
        console.log(b)
    });
}

function go_to_eletivas_faq(){
    var tipo = 'eletiva'
    set_data('tipoentrada', JSON.stringify(tipo))
    loading_main()
}