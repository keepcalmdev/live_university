var feed_events_v = `    
    <!-- Novo post -->
    <div class="row valign-wrapper div-oqueestapensando">
        <div class="col s2 oque-foto">            
            <div class="img-rounded" style="background-image: url(<%=link_foto%>);"></div>
        </div>
        <div class="col s8 oque-texto" style="padding-top: 4px;">
            <input type="text" id="input-new-post" onclick="loadNewPost(<%=id_projeto%>)" placeholder="Em que esta pensando?" >
        </div>
        <div class="col s2 oque-icone">
            <i class="material-icons center-align small" onclick="load_foto_post()">add_a_photo</i>
        </div>
    </div>

    <div id="preview-teste" class="hide"></div>

    <!-- Card de Avaliação -->
    <div class="card card-avaliacao">
        <!-- MESSIAS A AVALIACAO QUE FEZ ESTA NO \www\views\cards\avaliacao_solta.js -->
        <AvEvento></AvEvento>
    </div>
    <div class="card-agenda-feed">
        <agendafeed></agendafeed>
    </div>

    <!-- Aqui começa a putaria-->

        <% for(var i=0; i < posts.length; i++){%>
            <%if(posts[i].tipo == 'texto'){%>
                <!-- Post de Texto -->
                    <div class="card card-post" id="<%= 'post-'+i %>">
                            <%if(posts[i].id_contato == id_contato){%>
                                <i class="material-icons small" id="top-icon" style="color: #8C8C8C !important" onclick="exclui_post_evento(<%=posts[i].id_post%>, <%=id_projeto%>)">delete_forever</i>
                            <%}%>
                        <div class="card-content">
                            <div class="row">
                                <div class="col s2">
                                    <div class="img-rounded" style="background-image: url('http://liveulabs.com:49/users/<%=posts[i].id_contato%>.jpg');"></div>
                                </div>
                                <div class="col s10 nome-empresa-card-post">
                                    <%=posts[i].nome%> <br>
                                    <span class="text-muted"><%=posts[i].empresa%></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    <p class="text-muted texto-post-texto"><%=posts[i].texto%></p>
                                </div>
                            </div>
                        </div>
                        <div class="card-action no-border actions">
                            <div class="row valign-wrapper">
                                <div class="col s8 text-muted" onclick="toggleComments(<%= i %>)">
                                    <span id="score-<%=posts[i].id_post%>" style="color: #8C8C8C !important"><%=posts[i].likes%></span> Gostaram - <%-posts[i].comentarios.length%> Comentaram
                                </div>
                                <div class="col s4 right-align">
                                    <i class="material-icons text-muted comment-icon" onclick="toggleComments(<%= i %>)">forum</i>
                                    <%if(posts[i].votou == 1){%>
                                        <i class="material-icons text-muted like-icon" style="color: #781866 !important">thumb_up</i>
                                    <%}else{%>
                                        <i id="btn-like-<%=posts[i].id_post%>" class="material-icons text-muted like-icon" onclick="da_like_post_evento(<%= posts[i].id_post%>, this)">thumb_up</i>
                                    <%}%>       

                                </div>
                            </div>
                        </div>
                        <div class="card-action comments" style="display:none">

                            <%for(var x=0; x<posts[i].comentarios.length;x++){%>
                            
                                <div class="row comment">
                                    <div class="col s2">
                                        <div class="img-rounded img-xs" style="background-image: url('http://liveulabs.com:49/users/<%=posts[i].comentarios[x].id_contato%>.jpg');"></div>
                                    </div>
                                    <div class="col s10 ballon">
                                        <p class="text-muted"><%=posts[i].comentarios[x].comentario%></p>
                                        <span><b><%=posts[i].comentarios[x].nome%></b></span>
                                    </div>
                                </div>
                            <%}%>    

                        </div>
                        <div class="card-action action-send" style="display:none">
                            <textarea id="btn-<%= posts[i].id_post%>" class="inputCustomizado materialize-textarea" placeholder="Comentário" required></textarea>
                            <button class="enviarValido material-icons text-muted" onclick='envia_comentario_post(<%= posts[i].id_post%>, <%= posts[i].id_projeto%>)'>send</button>
                        </div>
                    </div>
            <%}%>

            <%if(posts[i].tipo == 'pat - texto'){%>
                <!-- Post Patrocinado de Texto -->
                    <div class="card card-post" id="<%= 'post-'+i %>">
                            <%if(posts[i].id_contato == id_contato){%>
                                <i class="material-icons small" id="top-icon" style="color: #8C8C8C !important" onclick="exclui_post_evento(<%=posts[i].id_post%>, <%=id_projeto%>)">delete_forever</i>
                            <%}%>
                        <div class="card-content" id="pat-<%=posts[i].id_post%>">
                            <div class="row">
                                <div class="col s2">
                                    <div class="img-rounded" style="background-image: url('http://liveulabs.com:49/users/<%=posts[i].id_contato%>.jpg');"></div>
                                </div>
                                <div class="col s10 nome-empresa-card-post">
                                    <%=posts[i].nome%> <br>
                                    <span class="text-muted"><%=posts[i].empresa%></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    <p class="text-muted texto-post-texto"><%=posts[i].texto%></p>
                                </div>
                            </div>
                        </div>
                        <div class="link-patrocinado margem-link">
                            <a href="<%=posts[i].link_externo%>" class="waves-effect waves-light btn-flat text-right">
                                <i class="material-icons right white-text">chevron_right</i>
                                <strong class="white-text">Patrocinado</strong>
                            </a>
                        </div>
                        <div class="card-action no-border actions">
                            <div class="row valign-wrapper">
                                <div class="col s8 text-muted" onclick="toggleComments(<%= i %>)">
                                    <span id="score-<%=posts[i].id_post%>" style="color: #8C8C8C !important"><%=posts[i].likes%></span> Gostaram - <%-posts[i].comentarios.length%> Comentaram
                                </div>
                                <div class="col s4 right-align">
                                    <i class="material-icons text-muted comment-icon" onclick="toggleComments(<%= i %>)">forum</i>
                                    <%if(posts[i].votou == 1){%>
                                        <i class="material-icons text-muted like-icon" style="color: #781866 !important">thumb_up</i>
                                    <%}else{%>
                                        <i id="btn-like-<%=posts[i].id_post%>" class="material-icons text-muted like-icon" onclick="da_like_post_evento(<%= posts[i].id_post%>, this)">thumb_up</i>
                                    <%}%>       

                                </div>
                            </div>
                        </div>
                        <div class="card-action comments" style="display:none">

                            <%for(var x=0; x<posts[i].comentarios.length;x++){%>
                            
                                <div class="row comment">
                                    <div class="col s2">
                                        <div class="img-rounded img-xs" style="background-image: url('http://liveulabs.com:49/users/<%=posts[i].comentarios[x].id_contato%>.jpg');"></div>
                                    </div>
                                    <div class="col s10 ballon">
                                        <p class="text-muted"><%=posts[i].comentarios[x].comentario%></p>
                                        <span><b><%=posts[i].comentarios[x].nome%></b></span>
                                    </div>
                                </div>
                            <%}%>    

                        </div>
                        <div class="card-action action-send" style="display:none">
                            <textarea id="btn-<%= posts[i].id_post%>" class="inputCustomizado materialize-textarea" placeholder="Comentário" required></textarea>
                            <button class="enviarValido material-icons text-muted" onclick='envia_comentario_post(<%= posts[i].id_post%>, <%= posts[i].id_projeto%>)'>send</button>
                        </div>
                    </div>
            <%}%>
            
            <%if(posts[i].tipo == 'foto'){%>
                <!-- Post de Video/Imagem -->
                    <div class="card card-post" id="<%= 'post-'+i %>">
                        <%if(posts[i].id_contato == id_contato){%>
                            <i class="material-icons small" id="top-icon" style="color: #8C8C8C !important" onclick="exclui_post_evento(<%=posts[i].id_post%>, <%=id_projeto%>)">delete_forever</i>
                        <%}%>    
                        <div class="card-content">
                            <div class="row">
                                <div class="col s2">
                                    <div class="img-rounded" style="background-image: url('http://liveulabs.com:49/users/<%=posts[i].id_contato%>.jpg');"></div>
                                </div>
                                <div class="col s10">
                                    <%=posts[i].nome%> <br>
                                    <span class="text-muted"><%=posts[i].empresa%></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    <p class="text-muted"><%=posts[i].texto%></p>
                                </div>
                            </div>
                        </div>
                        <div class="card-image">            
                            <img src="<%=posts[i].link%>">
                        </div>
                        <div class="card-action no-border actions">
                            <div class="row valign-wrapper">
                                <div class="col s8 text-muted" onclick="toggleComments(<%= i %>)">
                                <span id="score-<%=posts[i].id_post%>" style="color: #8C8C8C !important"><%=posts[i].likes%></span> Gostaram - <%-posts[i].comentarios.length%> Comentaram
                                </div>
                                <div class="col s4 right-align">
                                    <i class="material-icons text-muted comment-icon" onclick="toggleComments(<%= i %>)">forum</i>
                                    <%if(posts[i].votou == 1){%>
                                        <i class="material-icons text-muted like-icon" style="color: #781866 !important">thumb_up</i>
                                    <%}else{%>
                                        <i id="btn-like-<%=posts[i].id_post%>" class="material-icons text-muted like-icon" onclick="da_like_post_evento(<%= posts[i].id_post%>, this)">thumb_up</i>
                                    <%}%>
                                </div>
                            </div>
                        </div>
                        <div class="card-action comments" style="display:none">
                            <%for(var x=0; x<posts[i].comentarios.length;x++){%>
                                <div class="row comment">
                                    <div class="col s2">
                                        <div class="img-rounded img-xs" style="background-image: url('http://liveulabs.com:49/users/<%=posts[i].comentarios[x].id_contato%>.jpg');"></div>
                                    </div>
                                    <div class="col s10 ballon">
                                        <p class="text-muted"><%=posts[i].comentarios[x].comentario%></p>
                                        <span><b><%=posts[i].comentarios[x].nome%></b></span>
                                    </div>
                                </div>
                            <%}%>    
                        </div>
                        <div class="card-action action-send" style="display:none">
                            <textarea id="btn-<%= posts[i].id_post%>" class="inputCustomizado materialize-textarea" placeholder="Comentário" required></textarea>
                            <button class="enviarValido material-icons text-muted" onclick='envia_comentario_post(<%= posts[i].id_post%>, <%= posts[i].id_projeto%>)'>send</button>
                        </div>
                    </div>
            <%}%> 
            
            <%if(posts[i].tipo == 'pat - foto'){%>
                <!-- Post Patrocinado de Imagem -->
                    <div class="card card-post" id="<%= 'post-'+i %>">
                        <%if(posts[i].id_contato == id_contato){%>
                            <i class="material-icons small" id="top-icon" style="color: #8C8C8C !important" onclick="exclui_post_evento(<%=posts[i].id_post%>, <%=id_projeto%>)">delete_forever</i>
                        <%}%>    
                        <div class="card-content" id="pat-<%=posts[i].id_post%>">
                            <div class="row">
                                <div class="col s2">
                                    <div class="img-rounded" style="background-image: url('http://liveulabs.com:49/users/<%=posts[i].id_contato%>.jpg');"></div>
                                </div>
                                <div class="col s10">
                                    <%=posts[i].nome%> <br>
                                    <span class="text-muted"><%=posts[i].empresa%></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    <p class="text-muted"><%=posts[i].texto%></p>
                                </div>
                            </div>
                        </div>
                        <div class="card-image">            
                            <img src="<%=posts[i].link%>">
                        </div>
                        <div class="link-patrocinado margem-link">
                            <a href="<%=posts[i].link_externo%>" class="waves-effect waves-light btn-flat text-right">
                                <strong class="white-text">Patrocinado</strong>
                                <i class="material-icons right white-text">chevron_right</i>
                            </a>
                        </div>
                        <div class="card-action no-border actions">
                            <div class="row valign-wrapper">
                                <div class="col s8 text-muted" onclick="toggleComments(<%= i %>)">
                                <span id="score-<%=posts[i].id_post%>" style="color: #8C8C8C !important"><%=posts[i].likes%></span> Gostaram - <%-posts[i].comentarios.length%> Comentaram
                                </div>
                                <div class="col s4 right-align">
                                    <i class="material-icons text-muted comment-icon" onclick="toggleComments(<%= i %>)">forum</i>
                                    <%if(posts[i].votou == 1){%>
                                        <i class="material-icons text-muted like-icon" style="color: #781866 !important">thumb_up</i>
                                    <%}else{%>
                                        <i id="btn-like-<%=posts[i].id_post%>" class="material-icons text-muted like-icon" onclick="da_like_post_evento(<%= posts[i].id_post%>, this)">thumb_up</i>
                                    <%}%>       
                                </div>
                            </div>
                        </div>
                        <div class="card-action comments" style="display:none">
                            <%for(var x=0; x<posts[i].comentarios.length;x++){%>
                                
                                <div class="row comment">
                                    <div class="col s2">
                                        <div class="img-rounded img-xs" style="background-image: url('http://liveulabs.com:49/users/<%=posts[i].comentarios[x].id_contato%>.jpg');"></div>
                                    </div>
                                    <div class="col s10 ballon">
                                        <p class="text-muted"><%=posts[i].comentarios[x].comentario%></p>
                                        <span><b><%=posts[i].comentarios[x].nome%></b></span>
                                    </div>
                                </div>
                            <%}%>    
                        </div>
                        <div class="card-action action-send" style="display:none">
                            <textarea id="btn-<%= posts[i].id_post%>" class="inputCustomizado materialize-textarea" placeholder="Comentário" required></textarea>
                            <button class="enviarValido material-icons text-muted" onclick='envia_comentario_post(<%= posts[i].id_post%>, <%= posts[i].id_projeto%>)'>send</button>
                        </div>
                    </div>
            <%}%>

            <%if(posts[i].tipo == 'pat - video'){%>
                <!-- Post Patrocinado de Video -->
                    <div class="card card-post" id="<%= 'post-'+i %>">
                        <%if(posts[i].id_contato == id_contato){%>
                            <i class="material-icons small" id="top-icon" style="color: #8C8C8C !important" onclick="exclui_post_evento(<%=posts[i].id_post%>, <%=id_projeto%>)">delete_forever</i>
                        <%}%>    
                        <div class="card-content" id="pat-<%=posts[i].id_post%>">
                            <div class="row">
                                <div class="col s2">
                                    <div class="img-rounded" style="background-image: url('http://liveulabs.com:49/users/<%=posts[i].id_contato%>.jpg');"></div>
                                </div>
                                <div class="col s10">
                                    <%=posts[i].nome%> <br>
                                    <span class="text-muted"><%=posts[i].empresa%></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    <p class="text-muted"><%=posts[i].texto%></p>
                                </div>
                            </div>
                        </div>
                        <div id="<%= posts[i].id_post %>" class="responsive-video" poster="#">                            
                        </div>
                        <div class="link-patrocinado margem-link">
                            <a href="<%=posts[i].link_externo%>" class="waves-effect waves-light btn-flat text-right">
                                <i class="material-icons right white-text">chevron_right</i>
                                <strong class="white-text">Patrocinado</strong>
                            </a>
                        </div>

                        <div class="card-action no-border actions">
                            <div class="row valign-wrapper">
                                <div class="col s8 text-muted" onclick="toggleComments(<%= i %>)">
                                <span id="score-<%=posts[i].id_post%>" style="color: #8C8C8C !important"><%=posts[i].likes%></span> Gostaram - <%-posts[i].comentarios.length%> Comentaram
                                </div>
                                <div class="col s4 right-align">
                                    <i class="material-icons text-muted comment-icon" onclick="toggleComments(<%= i %>)">forum</i>
                                    <%if(posts[i].votou == 1){%>
                                        <i class="material-icons text-muted like-icon" style="color: #781866 !important">thumb_up</i>
                                    <%}else{%>
                                        <i id="btn-like-<%=posts[i].id_post%>" class="material-icons text-muted like-icon" onclick="da_like_post_evento(<%= posts[i].id_post%>, this)">thumb_up</i>
                                    <%}%>       
                                </div>
                            </div>
                        </div>
                        <div class="card-action comments" style="display:none">
                            <%for(var x=0; x<posts[i].comentarios.length;x++){%>
                                
                                <div class="row comment">
                                    <div class="col s2">
                                        <div class="img-rounded img-xs" style="background-image: url('http://liveulabs.com:49/users/<%=posts[i].comentarios[x].id_contato%>.jpg');"></div>
                                    </div>
                                    <div class="col s10 ballon">
                                        <p class="text-muted"><%=posts[i].comentarios[x].comentario%></p>
                                        <span><b><%=posts[i].comentarios[x].nome%></b></span>
                                    </div>
                                </div>
                            <%}%>    
                        </div>
                        <div class="card-action action-send" style="display:none">
                            <textarea id="btn-<%= posts[i].id_post%>" class="inputCustomizado materialize-textarea" placeholder="Comentário" required></textarea>
                            <button class="enviarValido material-icons text-muted" onclick='envia_comentario_post(<%= posts[i].id_post%>, <%= posts[i].id_projeto%>)'>send</button>
                        </div>
                    </div>
                   
            <%}%>

        <%}%>    

    <!-- Aqui termina a putaria-->
  
    <style>
    .responsive-video {
        display: block;
        background: black;
        background-color: black;
    }

    .link-patrocinado i {
        font-size: 32px !important;
        margin-left: 0px;
        padding-left: 0px;
        
    }

    .card.card-post .patrocinado.controles {
        margin-left: 7px;
        margin-right: 7px;
        margin-bottom: 16px;
    }

    .card.card-post .patrocinado.controles a {
        padding: 0px;
    }

    .card.card-post .patrocinado.controles img {
        margin-top: 5px;
        margin-left: 4px;
        margin-right: 4px;
        width: 24px;
        height: 24px;
    }

    .card.card-post .patrocinado.controles .range-field {
        width: 100%;
        margin: 0px;
    }

    .card.card-post .link-patrocinado .btn-flat {
        background-color: #1dc4bd;
        width: 100%;
        height: 40px;
        border-radius: 0px;
        font-size: 18px;
        padding-top: 2px;
        padding-right: 0px;
        text-transform: none;
    }

    .card.card-post .margem-link {
        margin-bottom: 18px;
    }

    #modal3 {
        top: 40% !important;
        transform: translateY(-40%) !important;
        padding: 20px !important;
        border-radius: 10px;
        -webkit-box-shadow: 0px 0px 10px 1px rgba(255,255,255,0.5);
        -moz-box-shadow: 0px 0px 10px 1px rgba(255,255,255,0.5);
        box-shadow: 0px 0px 10px 1px rgba(255,255,255,0.5);
    }


    #modal3 .row {
    margin: 25px 0px;
    }

    #modal3>i{
        position: absolute;
        top: 15px;
        right: 15px;
        color: #ccc;
    }

    #modal3>h5{
        text-align: center;
        font-size: 1.3rem;
        font-weight: 600;
        margin-top: 10px; 
        margin-bottom: 30px;
        color: #781866;
    }

    #modal3 hr{
    border: 0.1px solid #ccc;
    }

    #modal3 a{
        color: black;
        font-size: 1.3rem;
    }

    #modal3 .s3{
        left: 0;
        text-align: center;
        right: 0;
    }

    #modal3 .s3 i{
        font-size: 2.8rem;
        color: #934684;
    }
</style>

     <!-- MODAIS --->


    <div id="modal1" class="modal tipo-foto">
        <div class="row" style="margin-top: 0; !important">            
            <div class="col s6" style="text-align: center;">
                <div class="row">
                    <a onclick="load_foto_post()" class="modal-action modal-close">
                        <i class="material-icons white-text" style="font-size: 3rem;">photo_library</i>
                    </a>
                </div>
                <div class="row white-text">
                    Foto 
                </div>
            </div>
        </div>  
    </div>    
    
   

    <div id="modal3" class="modal tipo-foto">
    <i class="material-icons modal-close">close</i>
    <h5>Foto de Perfil</h5>
    <div class="row valign-wrapper border-bottom">
        <div class="col s3">
            <i class="medium material-icons">photo_camera</i>
        </div>
        <div class="col s9">
            <a onclick="load_camera_post_foto(<%=id_projeto%>)" class="modal-action modal-close">
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
            <a onclick="load_galery_post_foto(<%=id_projeto%>)" class="modal-action modal-close">
                Escolher da Galeria
            </a>
        </div>
    </div>
    </div>

 

`

var new_post_v = `
    <div id="navbar_comum">
        <nav class="nav-extended default-bg-color"> 
            <div class="nav-wrapper" style="padding: 0 20px;">
                <div class="nav-text flex" style="margin-left: -14px;">
                    <i class="material-icons white-text" onclick="change_view('back', false, true)" style="font-size: 30px !important">keyboard_arrow_left</i>
                    <p class="" style="margin-left: 10px; margin-top: 1px;">Criar Publicação</p>
                </div>
                <div class="nav-buttons">
                    <a href="#" class="" onclick="post_evento('texto', <%=id_projeto%>)">
                        PUBLICAR
                    </a>
                </div>
            </div>
        </nav>
    </div>
    <div id="new-post-content">
        <div class="row">
            <div class="col s2">
                <div class="img-rounded" style="background-image: url(<%=link_foto%>);"></div>
            </div>
            <div class="col s10">
                <% var nome = get_data('geral').nome%>
                <b><%= nome%></b> <br>
                <a class="btn"><i class="material-icons left">group</i> Todos</a>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <textarea id="texto-post" placeholder="No que você está pensando?"></textarea>
            </div>
        </div>
    </div>
    
`

var new_post_foto_v = `
    <div id="navbar_comum">
        <nav class="nav-extended default-bg-color"> 
            <div class="nav-wrapper" style="padding: 0 20px;">
                <div class="nav-text flex" style="margin-left: -14px;">
                    <i class="material-icons white-text" onclick="change_view('back', false, true)" style="font-size: 30px !important">keyboard_arrow_left</i>
                    <p class="" style="margin-left: 10px; margin-top: 1px;">Criar Publicação</p>
                </div>
                <div class="nav-buttons">
                    <a href="#" class="" onclick="post_evento('foto', <%=id_projeto%>)">
                        PUBLICAR
                    </a>
                </div>
            </div>
        </nav>
    </div>
    <div id="new-post-content">
        <div class="row">
            <div class="col s2">
                <div class="img-rounded" style="background-image: url(<%=link_foto%>);"></div>
            </div>
            <div class="col s10">
                <% var nome = get_data('geral').nome%>
                <b><%= nome%></b> <br>
                <a class="btn"><i class="material-icons left">group</i> Todos</a>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <textarea id="texto-post" placeholder="No que você está pensando?"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <img id="center" class="preview-foto-post" src="<%=preview_foto%>">
            </div>
        </div>
    </div>
    
`

function toggleComments(id){
    $("#post-"+id+" .comments").toggle();
    $("#post-"+id+" .action-send").toggle();
    $("#post-"+id+" .actions .comment-icon").toggleClass('active');
}

function loadNewPost(id_projeto){
    var id_contato = get_data('geral').id
    var link_foto = 'http://liveulabs.com:49/users/' + id_contato + '.jpg'
    change_view(new_post_v, true, false, {
        link_foto: link_foto,
        id_projeto: id_projeto
    })
    $("#texto-post").trigger('focus')
}

function renderizar_feed(tab_feed, id_projeto){
    var id_contato = get_data('geral').id
    var link_foto = 'http://liveulabs.com:49/users/' + id_contato + '.jpg'
    var dados = {}
    dados.id_projeto = id_projeto
    dados.id_contato = id_contato
    
    lista_post_all(dados, function (lp_results) {
        console.log(lp_results)
        document.querySelector(tab_feed).innerHTML = ejs.render(feed_events_v, {
            id_projeto: id_projeto,
            link_foto: link_foto,
            posts: lp_results,
            id_contato: id_contato
        }); 
        document.getElementById('id_projeto_evento').innerHTML = id_projeto   
        $('.tabs').tabs();        
        PullToRefresh.init({        
            triggerElement: document.querySelector('#tab_feed'),
            mainElement: document.querySelector('#tab_feed'),
            onRefresh() {
                require_loader('open')
                document.querySelector('#tab_feed').innerHTML = ''
                renderizar_feed('#tab_feed', id_projeto)
                renderizarMeusEventosAgenda('#tab_agenda')
            },
        });

        if(get_data('av-evento-'+id_projeto) == 1){
            var nota = null 
            var info = {}
            info.id_contato = get_data('geral').id
            info.id_projeto = id_projeto
            document.querySelector('AvEvento').innerHTML = ejs.render(avaliacao_feed_evento, {
                dados: info,
                nota: nota
            });
        }else{

        }

        $( document ).ready(function() {
                var lista_posts_patrocinados = []
                for(var i=0; i<lp_results.length; i++){
                    if(lp_results[i].tipo.includes('pat')){
                        lista_posts_patrocinados.push(lp_results[i].id_post)
                    }
                    if(lp_results[i].tipo == 'pat - video'){
                        console.log(lp_results[i])
                        console.log(lp_results[i].link)
                        var id = lp_results[i].id_post.toString()
                        console.log(id)
                        jwplayer(id).setup({
                            file: lp_results[i].link,
                            image: lp_results[i].capa,
                            width: '100%',
                            aspectratio: '16:9'
                        })
                    }
                }
                console.log(lista_posts_patrocinados)

                
                $(window).scroll(function () {
                    function Utils() {
                    }

                    Utils.prototype = {
                        constructor: Utils,
                        isElementInView: function (element, fullyInView) {
                            var pageTop = $(window).scrollTop();
                            var pageBottom = pageTop + $(window).height();
                            var elementTop = $(element).offset().top;
                            var elementBottom = elementTop + $(element).height();
                    
                            if (fullyInView === true) {
                                return ((pageTop < elementTop) && (pageBottom > elementBottom));
                            } else {
                                return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
                            }
                        }
                    };
                    
                    var Utils = new Utils();
                    
                    for(var j=0; j<lista_posts_patrocinados.length; j++){
                        //console.log(lista_posts_patrocinados[j].toString())
                        var div = '#pat-' + lista_posts_patrocinados[j].toString()

                        var isElementInView = Utils.isElementInView($(div), false);

                        if (isElementInView) {
                            //console.log('in view - ' + div);

                            if(get_data(div) == 1){

                            }else{
                                //console.log('chama api de conexão - ' + div)
                                set_data(div, 1)
                                var dados = {
                                    id_post: lista_posts_patrocinados[j],
                                    id_projeto: id_projeto,
                                    id_contato: get_data('geral').id
                                }
                                set_post_patrocinado_visualizado(dados, function (cb){
                                    //console.log('pos query')
                                    if(cb == 'ok'){
                                        
                                    }else{

                                    }
                                })
                                
                            }

                        } else {
        
                        }
                        
                    }

                    
                });
                
        });
            

        require_loader('close')
    })
}

function envia_comentario_post (id_post, id_projeto){
    require_loader('open')
    var comentario = document.getElementById('btn-' + id_post).value
    if(comentario.length < 2){
        require_loader('close')
        toasted('Comentario muito curto')
        return
    }

    var dados = {}
    dados.id_post = id_post
    dados.id_contato = get_data('geral').id
    dados.comentario = comentario
    console.log(dados)

    insert_comentario_post_evento(dados, function (icpe_results){
        if(icpe_results == 'bad'){
            require_loader('close')
            toasted('Ops! Algo deu errado')
            return
        }else{
            require_loader('close')
            toasted('Comentario enviado')
            manda_load()
            go_to_meus_eventos(id_projeto)
        }
    })
}

function da_like_post_evento(id_post, ele){
    require_loader('open')
    var dados_like = {}
    dados_like.id_post = id_post
    dados_like.id_contato = get_data('geral').id    
    
    insert_like_post_evento(dados_like, function (ilpe_results){
        console.log(ilpe_results)
        if(ilpe_results == 'bad'){
            require_loader('close')
            toasted('Ops! Algo deu errado')
            return
        }else{            
            document.getElementById('btn-like-'+id_post).setAttribute( 'style', 'color: #781866 !important' );
            document.getElementById('score-'+id_post).innerText = ilpe_results[0].qtd
            document.getElementById('btn-like-'+id_post).removeAttribute("onclick");
            require_loader('close')
        }
    })
}

function exclui_post_evento(id_post, id_projeto){
    require_loader('open')
    dados_exclui = {}
    dados_exclui.id_post = id_post
    dados_exclui.id_contato = get_data('geral').id
    apaga_post_evento(dados_exclui, function(ape_results){
        if(ape_results == 'bad'){
            require_loader('close')
            toasted('Ops! Algo deu errado')
            return
        }else{
            require_loader('close')
            toasted('Post apagado')
            manda_load()
            go_to_meus_eventos(id_projeto)
        }
    })
}

function play_video(video_id) {
    let video = $("#"+video_id)[0];
    let target = $("#progresso-"+video_id)[0];
    video.play();
    video.ontimeupdate = function () {
        let progresso = video.currentTime * 100 / video.duration;
        target.value = progresso.toString();
    };
}

function pause_video(video_id) {
    $("#"+video_id)[0].pause();
}

function toggle_mute_video(video_id) {
    let video = $("#"+video_id)[0];
    video.muted = (video.muted == false) ? true : false;
}

function fullscreen_video(video_id) {
    $("#"+video_id)[0].requestFullscreen();
}