var perfil_v = `
<div id="perfil" class="flex fd-col h100vh overflow-hidden">
    <div class="z-0" style="height: 150px">
        <div class="background">
            <div style="display: flex">
                <a href="#" onclick="change_view('back', false, true)" class="voltar flex ai-cen">
                    <i class="material-icons white-text" style="font-size: 30px !important;">chevron_left</i>
                </a>
                <div class="iconesTop">
                    <div class="voltar flex ai-cen">
                        <label for="editar" class="gatilhoEditar" style="margin-right: -10px;">
                            <i class="material-icons white-text" style="font-size: 20px;">edit</i>
                        </label>
                        <a href="#" data-target="slide-out" class="sidenav-trigger icone-menu-div">
                            <img src="img/icons/menu.svg" alt="" class="icone-menu">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="dados flex-1 flex pos-rel" style="overflow: auto;">
        <% if (login.foto.indexOf('erro') >= 0) { %>
            <% login.foto = 'image/users/c.jpg' %>
        <% } %>

        <form class="w100 fd-col jc-sa z-1" onsubmit="update_information(event)">
            <input class="hide" id="id" type="text" value="<%= login.id %>">
            <input class="hide" id="foto_c" type="text" value="nao">

            <input type="checkbox" id="editar" />

            <div id="preview" class="foto" style="background-image: url(<%= login.foto %>)" onclick="open_tipo()">
                <button type="button" class="editar zerarButton" onclick="open_tipo()">
                    <img src="image/camera.svg" class="icone">
                </button>
            </div>

            <div class="margin-0">
                <div class="row scoreCertificadoWrapper">
                    <% if (login.score) { %>
                        <div class="col <% if (login.certificados) { %>s6<% } else{ %>s12<% } %> center-align">
                            <h3 class="titulo"><%= login.score || 0 %></h3>
                            <span class="legenda">Score</span>
                        </div>
                        <% if (login.certificados) { %>
                            <div class="col s6 center-align" onclick="open_certificados()">
                                <h3 class="titulo"><%= login.certificados || 0 %></h3>
                                <span class="legenda">
                                    Certificado<% if (login.certificados && login.certificados > 1) { %>s<% } %>
                                </span>
                            </div>
                        <% } %>
                    <% } else { %>
                        <% if (login.certificados) { %>
                        <div class="col s12 center-align" onclick="open_certificados()">
                            <h3 class="titulo"><%= login.certificados || 0 %></h3>
                            <span class="legenda">
                                Certificado<% if (login.certificados && login.certificados > 1) { %>s<% } %>
                            </span>
                        </div>
                        <% } %>
                    <% } %>
                </div>
                <div class="divider"></div>
                <div class="dado">
                    <label class="titulo">
                    <span>CADASTRO</span>
                    </label>
                </div>
                <div class="informacoes">
                    <label for="nome" class="estatico">
                        <span><%- login.Nome + ' ' + login.Sobrenome %></span>
                    </label>
                    <div class="input-field">
                        <label for="nome">Nome</label>
                        <input type="text" id="nome" value="<%- login.Nome + ' ' + login.Sobrenome %>" required />
                    </div>
                </div>
                <div class="informacoes">
                    <label for="email" class="estatico">
                        <span><%- login.email %></span>
                    </label>
                    <div class="input-field">
                        <label for="email">E-mail</label>
                        <input type="text" id="email" value="<%- login.email %>" required />
                    </div>
                </div>
                <div class="informacoes">
                    <label for="fone" class="estatico">
                        <span class="phone_with_ddd"><%- login.telefone %></span>
                    </label>
                    <div class="input-field">
                        <label for="fone">WhatsApp</label>
                        <input type="text" id="fone" class="phone_with_ddd" value="<%- login.telefone %>" required />
                    </div>
                </div>
                <div class="informacoes">
                    <div class="input-field">
                        <label for="nova_senha">Nova senha</label>
                        <input type="password" id="nova_senha" />
                    </div>
                </div>
                <div class="informacoes">
                    <div class="input-field">
                        <label for="confirmar_nova_senha">Confirmar nova senha</label>
                        <input type="password" id="confirmar_nova_senha" />
                    </div>
                </div>
                <div class="dado">
                    <label class="titulo">
                        <span>REDES SOCIAIS</span>
                    </label>
                </div>
                <div class="redesSociais">
                    <label class="estatico">
                        <i class="fab fa-facebook-square"></i>
                        <span class="valor">/<%= login.facebook %></span>
                    </label>
                    <div class="input-field">
                        <label for="facebook">Facebook</label>
                        <input type="text" id="facebook" value="<%- login.facebook %>" />
                    </div>
                </div>
                <div class="redesSociais">
                    <label class="estatico">
                        <i class="fab fa-linkedin"></i>
                        <span class="valor">/<%= login.link_linkedin %></span>
                    </label>
                    <div class="input-field">
                        <label for="linkedin">LinkedIn</label>
                        <input type="text" id="linkedin" value="<%- login.link_linkedin %>" />
                    </div>
                </div>
                <div class="redesSociais">
                    <label class="estatico">
                        <i class="fab fa-twitter-square"></i>
                        <span class="valor">/<%= login.twitter %></span>
                    </label>
                    <div class="input-field">
                        <label for="twitter">Twitter</label>
                        <input type="text" id="twitter" value="<%- login.twitter %>" />
                    </div>
                </div>
                <div class="redesSociais">
                    <label class="estatico">
                        <i class="fab fa-instagram"></i>
                        <span class="valor">/<%= login.instagram %></span>
                    </label>
                    <div class="input-field">
                        <label for="instagram">Instagram</label>
                        <input type="text" id="instagram" value="<%- login.instagram %>" />
                    </div>
                </div>
                <div class="informacoes" style="margin-bottom: 100px;">
                    <div class="input-field">
                    <label>
                        <input id="compartilhar_info" type="checkbox" <%= login.compartilha === 1 ? "checked" : '' %> />
                        <span>Autorizo divulgar minhas informações pessoais para minha turma de MBA</span>
                    </label>
                    </div>
                </div>
            </div>


            <div class="botoesWrap">
                <button class="btn-flat botaoCancelar" type="button" onclick="cancelar_edicao()">Cancelar</button>
                <button class="btn-flat botaoSalvar" type="submit">Salvar</button>
            </div>


            <div class="intermediaria_perfil" style="height: 20px"></div>
        </form>
    </div>
</div>
<style>
    #modal1 {
        top: 40% !important;
        transform: translateY(-40%) !important;
        padding: 20px !important;
        border-radius: 10px;
        -webkit-box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.5);
        -moz-box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.5);
        box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.5);
    }


    #modal1 .row {
        margin: 25px 0px;
    }

    #modal1>i {
        position: absolute;
        top: 15px;
        right: 15px;
        color: #ccc;
    }

    #modal1>h5 {
        text-align: center;
        font-size: 1.3rem;
        font-weight: 600;
        margin-top: 10px;
        margin-bottom: 30px;
        color: #781866;
    }

    #modal1 hr {
        border: 0.1px solid #ccc;
    }

    #modal1 a {
        color: black;
        font-size: 1.3rem;
    }

    #modal1 .s3 {
        left: 0;
        text-align: center;
        right: 0;
    }

    #modal1 .s3 i {
        font-size: 2.8rem;
        color: #934684;
    }

    .elipsi-nome-cert {
        white-space: nowrap;
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

<div id="modal1" class="modal tipo-foto">
    <i class="material-icons modal-close">close</i>
    <h5>Foto de Perfil</h5>
    <div class="row valign-wrapper border-bottom">
        <div class="col s3">
            <i class="medium material-icons">photo_camera</i>
        </div>
        <div class="col s9">
            <a onclick="load_camera()" class="modal-action modal-close">
                Tirar Nova Foto
            </a>
        </div>
    </div>
    <hr>
    <div class="row valign-wrapper">
        <div class="col s3">
            <i class="medium material-icons">photo_library</i>
        </div>
        <div class="col s9">
            <a onclick="load_galery()" class="modal-action modal-close">
                Escolher da Galeria
            </a>
        </div>
    </div>
</div>

<!--<div id="modal1" class="modal tipo-foto">
<div class="row">
<div class="col s6" style="text-align: center;">
<div class="row">
<a onclick="load_camera()" class="modal-action modal-close">
<i class="material-icons white-text" style="font-size: 3rem;">photo_camera</i>
</a>
</div>
<div class="row white-text">
CAMERA
</div>
</div>
<div class="col s6" style="text-align: center;">
<div class="row">
<a onclick="load_galery()" class="modal-action modal-close">
<i class="material-icons white-text" style="font-size: 3rem;">photo_library</i>
</a>
</div>
<div class="row white-text">
GALERIA
</div>
</div>
</div>
</div>-->

<div id="modalCertificados" class="modal" style="border-radius: 09px;">
    <div class="row">
        <div class="certificado">
            <div>
                <label>
                    <span> Certificados </span>
                </label>
            </div>
        </div>
        <div class="linkCertificado">
            <div>
                <% for (var j=0; j<login.certificados_full.length; j++){%>
                    <label>
                        <a class="elipsi-nome-cert" id-projeto="<%=login.certificados_full[j].id_projeto%>"
                            nome-projeto="<%=login.certificados_full[j].nome_projeto%>"
                            carga-horaria="<%=login.certificados_full[j].carga_horaria%>" href="javascript:void(0)"
                            onclick="open_certificado(this)"> <%= login.certificados_full[j].nome_projeto%>.pdf </a>
                    </label>
                <%}%>
            </div>
        </div>
    </div>
</div>
`

function cancelar_edicao(){
    document.getElementById("editar").checked = false;
}


function go_to_perfil() {
    require_loader('open')
    var dados = {}
    dados.id_contato = get_data('geral').id

    get_info_perfil(dados, function (results) {
        results[0].email = get_data('geral').email
        results[0].foto = get_data('geral').foto
        results[0].id = dados.id_contato
        
        console.log(results[0])

        console.log(dados);
        
        set_data('destino', 0)
        $('.sidenav').sidenav('close');
        $('.sidenav').sidenav('destroy');
        /*
        change_view(perfil_v, true, true, {
        login: results[0]
        })
        */
        //document.querySelector('.maine-change').innerHTML = ejs.render(navbar_perfil_new, {});
        change_view(perfil_v, true, true, {
            login: results[0]
        });
        
        $(document).ready(function () {
            $('.phone_with_ddd').mask('(00) 00000-0000');
        })
        
        M.updateTextFields();
        require_loader('close')
        
    })
}
