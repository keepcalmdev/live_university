var minha_turma_v = `
<div id="navbar">            
</div>

    <!--<div class="container">
        <div class="row">
            <div class="col-12">
                <div class="minha-turma-search">
                    <i class="material-icons color-primary">search</i> 
                    <input type="search" oninput='filtrar_colegas()' placeholder="Pesquisar contatos">
                </div>
            </div>
        </div>
    </div>-->

    <div class="container" style="margin-top: 23%;">
        <div class="minha-turma-colegas">
            <% colegas.forEach(function(colega){ %>
                <div class="colega card" data-nome='<%= colega.nome %>' style="margin-left: 0px !important; margin-right: 0px !important; border-radius: 5px !important;">
                    <div class="row mb-0 valign-wrapper">
                        <div class="col s2 ml-0">
                            <div class="img-circle" style="background-image: url('<%= colega.foto %>')">
                            </div>
                        </div>
                        <div class="col s8">
                            <p> <%= colega.nome %> </p>
                            <span class="empresa"><%= colega.empresa %></span>
                        </div>
                    </div>
                    <% if(colega.compartilha) { %>
                        <hr class="divisor">
                        <ul class="collapsible">
                            <li>
                                <div class="collapsible-header">MAIS INFORMAÇÕES<i class="material-icons">expand_more</i></div>
                                <div class="collapsible-body p-0">
                                    <div class="row">
                                        <div class="col s12">
                                            <div class="redesSociais">
                                                <label class="estatico">
                                                    <i class="fab fa-facebook-square"></i>
                                                    <span class="valor">/<%= colega.facebook %></span>
                                                </label>
                                            </div>
                                            <div class="redesSociais">
                                                <label class="estatico">
                                                    <i class="fab fa-linkedin"></i>
                                                    <span class="valor">/<%= colega.link_linkedin %></span>
                                                </label>
                                            </div>
                                            <div class="redesSociais">
                                                <label class="estatico">
                                                    <i class="fab fa-twitter-square"></i>
                                                    <span class="valor">/<%= colega.twitter %></span>
                                                </label>
                                            </div>
                                            <div class="redesSociais">
                                                <label class="estatico">
                                                    <i class="fab fa-instagram"></i>
                                                    <span class="valor">/<%= colega.instagram %></span>
                                                </label>
                                            </div>
                                            <div class="redesSociais">
                                                <label class="estatico">
                                                    <i class="fas fa-envelope"></i>
                                                    <span class="valor"><%= colega.email %></span>
                                                </label>
                                            </div>
                                            <div class="redesSociais">
                                                <label class="estatico">
                                                    <i class="fab fa-whatsapp"></i>
                                                    <span class="valor phone_with_ddd"><%= colega.telefone %></span>
                                                </label>
                                            </div>
                                        </div>
                                        <!--<div class="col s6">                                          
                                            
                                        </div>-->
                                    </div>
                                </div>
                            </li>
                        </ul>
                    <% } %>
                </div>
            <% }); %>
        </div>
    </div>
`

function ver_perfil_colega(id){
    require_loader('open')
    $('.minha-turma-search input').val('');
    $('.minha-turma-search input').trigger('input');
    /// load perfil
    $.post(server + '/get_info_colega_perfil', {
        id_contato: id
    })
    .done((a) => {
        console.log(a);
        change_view(perfil_colega_v, true, false, 
            {
                colega: a[0],
                photo: 'http://liveulabs.com:49/users/'+id+'.jpg'
            });

        $(document).ready(function () {
            $('.phone_with_ddd').mask('(00) 0000-0000');
        })
        require_loader('close')
    })
    .fail((b) => {
        console.log('erro get_info_colega_perfil')
        console.log(b)
    });
}

function filtrar_colegas(){
    var search = $('.minha-turma-search input').val().toLowerCase();
    $('.colega').each(function(index){
        if( $(this).data('nome').toLowerCase().includes(search)){
            $(this).show();
        }else{
            $(this).hide();
        }
    });
}