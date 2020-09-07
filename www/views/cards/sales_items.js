var sales_carousel_horizontal_v = `
    <% for(const curso of cursos) { %>
        <div class="carousel-item" id-projeto="<%= curso.id_projeto%>">
        <%if (tipo == 1){%>
        <div class="coracao">
                    <%if(curso.favorito == 1){%>
                        <img class="img-coracao" preenchido="1" id-projeto="<%= curso.id_projeto%>" src="img/icons/heart_preenchido.svg" alt="" onclick="favorita_curso_ondemand(this)">
                    <%}else{%>    
                        <img class="img-coracao" preenchido="0" id-projeto="<%= curso.id_projeto%>" src="img/icons/heart.svg" alt="" onclick="favorita_curso_ondemand(this)">
                    <%}%>    
            </div>  
        <%}%>    
            <div class="card curso curso-medio" tipo="<%= tipo%>" id-projeto="<%= curso.id_projeto%>" onclick="open_home_sale(this)" style="background-image: url('img/sales/cheio_<%= curso.id_projeto%>.png')">                
                <div class="content">                    
                    <div class="titulo">
                        <%- titleize(curso.nome_projeto) %>
                    </div>
                    <div class="info">
                        <b><%= curso.desc_area%></b> | 4.8 <i class="material-icons tiny">star_border</i> <!--| <i class="material-icons tiny">personal_video</i>-->
                    </div>
                </div>
            </div>
        </div>
    <% } %>
`

var sales_carousel_vertical_v = `
    <% for(const curso of cursos) { %>
        <div class="carousel-item">
        <%if (tipo == 1){%>
            <div class="coracao-ver">
            <%if(curso.favorito == 1){%>
                <img class="img-coracao-ver" preenchido="1" id-projeto="<%= curso.id_projeto%>" src="img/icons/heart_preenchido.svg" alt="" onclick="favorita_curso_ondemand(this)">
            <%}else{%>    
                <img class="img-coracao-ver" preenchido="0" id-projeto="<%= curso.id_projeto%>" src="img/icons/heart.svg" alt="" onclick="favorita_curso_ondemand(this)">
            <%}%>                      
            </div>  
        <%}%>                      
            <div class="card curso curso-vertical" tipo="<%= tipo%>" id-projeto="<%= curso.id_projeto%>" onclick="open_home_sale(this)" style="background-image: url('img/sales/ver_<%= curso.id_projeto%>.png')">
                <div class="content">
                    <div class="titulo">
                        <%- titleize(curso.nome_projeto) %>
                    </div>
                </div>
            </div>
        </div>
    <% } %>
`

var sales_cards_horizontal_v = `
    <% for(const curso of cursos) { %>
        <% const klass = curso.destaque ? 'curso-destaque' : 'curso-horizontal' %>
        <div class="card curso <%= klass %>" style="background-image: url('img/sales/hori_<%= curso.id_projeto%>.png')">
        <%if (tipo == 1){%>
            <div class="coracao-hori">
            <%if(curso.favorito == 1){%>
                <img class="img-coracao-hori" preenchido="1" id-projeto="<%= curso.id_projeto%>" src="img/icons/heart_preenchido.svg" alt="" onclick="favorita_curso_ondemand(this)">
            <%}else{%>    
                <img class="img-coracao-hori" preenchido="0" id-projeto="<%= curso.id_projeto%>" src="img/icons/heart.svg" alt="" onclick="favorita_curso_ondemand(this)">
            <%}%>                
            </div>  
        <% } %>
            <div class="clicavel-hori" tipo="<%= tipo%>" id-projeto="<%= curso.id_projeto%>" onclick="open_home_sale(this)" style="width: 100%; height: 95px;">            
                <div class="titulo">
                    <%- titleize(curso.nome_projeto) %>
                </div>
                <div class="info">
                    <b><%= curso.desc_area%></b> | 4.8 <i class="material-icons tiny">star_border</i> <!--| <i class="material-icons tiny">personal_video</i>-->
                </div>
                <% if (curso.mais_pedido == 1) { %>
                    <div class='adesivo'>
                        Mais Pedido
                    </div>
                <% } %>
            </div>    
        </div>
    <% } %>
`

const meses_v_sales = ["","JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];

function titleize(text) {
    var loweredText = text.toLowerCase();
    var words = loweredText.split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];

        var firstLetter = w[0];
        w = firstLetter.toUpperCase() + w.slice(1);

        words[a] = w;
    }
    return words.join(" ");
}

var home_sales_v_new = `
<div id="navbar"></div>
<div class="curso-header flow-text">
        <h5 class="white-text titulo"><%= curso.nome_projeto%></h5>
        <h6 class="info flex">
        <%= curso.desc_area%> | <%= curso.nota%> <i class="material-icons">star_border</i> <!--| <i class="material-icons">desktop_windows</i>-->
        </h6>
    </div>
    <div class="curso-body">
        <div class="card-panel white">
            <div class="panel-container">

            <%if(id_tipo_projeto == 21 || id_tipo_projeto == 1 || id_tipo_projeto == 2 || id_tipo_projeto == 4 || id_tipo_projeto == 9 || id_tipo_projeto == 12 || id_tipo_projeto == 23){%>

                <div class="curso-actions">
                    <a class="btn-flat start-now" href="<%- curso.link%>" target="_blank" style="width: 75%; padding-left: 61px; margin-left: 3%;"><i class="material-icons left" style="font-size: 35px; margin-left: -2%; margin-right: 1%;">
                    mode_edit
                    </i>
                    INSCREVA-SE
                    </a>
                    <%if(favorito == 1){%>
                        <a class="btn-floating btn-medium favorite" id="dentro" origem="dentro" preenchido="1" id-projeto="<%= curso.id_projeto%>" onclick="favorita_curso_ondemand(this)"><i class="material-icons" style="transform: translateY(3px);font-size: 35px;">favorite</i></a>
                    <%}else{%>
                        <a class="btn-floating btn-medium favorite" id="dentro" origem="dentro" preenchido="0" id-projeto="<%= curso.id_projeto%>" onclick="favorita_curso_ondemand(this)"><i class="material-icons" style="transform: translateY(3px);font-size: 35px;">favorite_border</i></a>
                    <%}%>                        
                </div>

                <h5 style="margin-top: -15px;">O que você vai ver</h5>

                <span>
                <%- curso.descricao_projeto%>
                </span>

                    
                    <div class="row" style="margin-top: 15%; margin-left: 3%;">
                        <div class="col s3">

                            <div class="divredondamenor center">
                                <div class="dentro">
                                    <i class="material-icons" style="color: #781866">event</i>
                                </div>
                            </div>
                
                            <div class="divredonda center">
                                <div class="dentro">
                                    <p><%= curso.dia%></p>
                                    <p><%- meses_v_sales[curso.mes]%></p>
                                </div>
                            </div>
                        </div>
                
                        <div class="col s9">
                            <p class="divredondatexto1">Você já tem data marcada pra
                                começar a dar o salto que sua carreira
                                precisa.</p>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 8%; margin-left: 3%;">
                        <div class="col s3">

                            <div class="divredondamenor center">
                                <div class="dentro">
                                    <i class="material-icons" style="color: #781866">place</i>
                                </div>
                            </div>
                
                            <div class="divredonda center">
                                <div class="dentro">
                                    <p class="textodentro"><%= curso.local%></p>                                    
                                </div>
                            </div>
                        </div>
                
                        <div class="col s9">
                            <p class="divredondatexto2">Carga horária diferenciada e sob
                            medida para o seu sucesso.</p>
                        </div>
                    </div>

                    <h5 style="margin-top: 40px;">Palestrantes</h5>

                    <div class="scrolling-wrapper">
                    <%for(professor of professores){%>
                        <div class="profile">
                            <img src="<%=professor.foto%>">
                            <a class="btn-flat btn-small"><%=professor.nome%></a>
                            <p><%= professor.formacao%></p>
                        </div>
                        <%}%>
                    </div>

                            <!--
                            <h5 style="margin-top: 70px;">Alunos Anteriores</h5>

                            <div class="previous-students flex">
                            <img class="left" src="./image/users/d.jpg">
                            <div>
                                <h5>Marília Gonçalves</h5>
                                <h6 class="info flex">
                                    9,7 <i class="material-icons">star_border</i> | 2018
                                </h6>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a
                                    page when. Various versions have been evolved over the years.</p>
                            </div>
                            </div>
                            
                            --> 
                            <a class="btn-flat btn-large students-expand" style="margin-top: 7%; margin-bottom: -7%; padding-top: 0px;"
                            onclick="window.plugins.socialsharing.share(null, null, null, '<%= curso.link_site%>')"
                            >COMPARTILHE</a>                           
                    </div>

                        <a class="btn-flat btn-large subscribe" href="<%- curso.link%>" target="_blank">Inscreva-se</a>
                    </div>




                <%}else{%>


                    <%if(id_tipo_projeto == 6 || id_tipo_projeto == 16){%>

                            <div class="curso-actions">
                                <a class="btn-flat start-now" href="<%- curso.link%>" target="_blank" style="width: 75%; padding-left: 61px; margin-left: 3%;"><i class="material-icons left" style="font-size: 35px; margin-left: -2%; margin-right: 1%;">
                                mode_edit
                                </i>
                                INSCREVA-SE
                                </a>
                                <%if(favorito == 1){%>
                                    <a class="btn-floating btn-medium favorite" id="dentro" origem="dentro" preenchido="1" id-projeto="<%= curso.id_projeto%>" onclick="favorita_curso_ondemand(this)"><i class="material-icons" style="transform: translateY(3px);font-size: 35px;">favorite</i></a>
                                <%}else{%>
                                    <a class="btn-floating btn-medium favorite" id="dentro" origem="dentro" preenchido="0" id-projeto="<%= curso.id_projeto%>" onclick="favorita_curso_ondemand(this)"><i class="material-icons" style="transform: translateY(3px);font-size: 35px;">favorite_border</i></a>
                                <%}%>                        
                            </div>
        
                            <h5 style="margin-top: -15px;">O que você vai ver</h5>
        
                            <span>
                <%- curso.descricao_projeto%>
                </span>

                    
                    <div class="row" style="margin-top: 15%; margin-left: 3%;">
                        <div class="col s3">

                            <div class="divredondamenor center">
                                <div class="dentro">
                                    <i class="material-icons" style="color: #781866">event</i>
                                </div>
                            </div>
                
                            <div class="divredonda center">
                                <div class="dentro">
                                    <p><%= curso.dia%></p>
                                    <p><%- meses_v_sales[curso.mes]%></p>
                                </div>
                            </div>
                        </div>
                
                        <div class="col s9">
                            <p class="divredondatexto1">Você já tem data marcada pra
                                começar a dar o salto que sua carreira
                                precisa.</p>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 8%; margin-left: 3%;">
                        <div class="col s3">

                            <div class="divredondamenor center">
                                <div class="dentro">
                                    <i class="material-icons" style="color: #781866">access_time</i>
                                </div>
                            </div>
                
                            <div class="divredonda center">
                                <div class="dentro">
                                    <p><%= curso.carga_horaria%>h</p>                                    
                                </div>
                            </div>
                        </div>
                
                        <div class="col s9">
                            <p class="divredondatexto2">Carga horária diferenciada e sob
                            medida para o seu sucesso.</p>
                        </div>
                    </div>

                    <h5 style="margin-top: 40px;">Professores</h5>

                    <div class="scrolling-wrapper">
                    <%for(professor of professores){%>
                        <div class="profile">
                            <img src="<%=professor.foto%>">
                            <a class="btn-flat btn-small"><%=professor.nome%></a>
                            <p><%= professor.formacao%></p>
                        </div>
                        <%}%>
                    </div>

                            <!--
                            <h5 style="margin-top: 70px;">Alunos Anteriores</h5>

                            <div class="previous-students flex">
                            <img class="left" src="./image/users/d.jpg">
                            <div>
                                <h5>Marília Gonçalves</h5>
                                <h6 class="info flex">
                                    9,7 <i class="material-icons">star_border</i> | 2018
                                </h6>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a
                                    page when. Various versions have been evolved over the years.</p>
                            </div>
                            </div>

                            <a class="btn-flat btn-large students-expand">Todas as Avaliações</a>
                            -->
                            <a class="btn-flat btn-large students-expand" style="margin-top: 7%; margin-bottom: -7%; padding-top: 0px;"
                            onclick="window.plugins.socialsharing.share(null, null, null, '<%= curso.link_site%>')"
                            >COMPARTILHE</a>
                    </div>

                        <a class="btn-flat btn-large subscribe" href="<%- curso.link%>" target="_blank">Inscreva-se</a>
                    </div>

                    <%}else{%>

                        <div class="curso-actions">
                            <a class="btn-flat start-now" onclick="inscrever_sales(<%= curso.id_projeto%>)"><i class="material-icons left" style="font-size: 35px; margin-left: -2%; margin-right: 1%;">
                            play_arrow
                            </i>
                            COMECE A ESTUDAR AGORA
                            </a>
                            <%if(favorito == 1){%>
                                <a class="btn-floating btn-medium favorite" id="dentro" origem="dentro" preenchido="1" id-projeto="<%= curso.id_projeto%>" onclick="favorita_curso_ondemand(this)"><i class="material-icons" style="transform: translateY(3px);font-size: 35px;">favorite</i></a>
                            <%}else{%>
                                <a class="btn-floating btn-medium favorite" id="dentro" origem="dentro" preenchido="0" id-projeto="<%= curso.id_projeto%>" onclick="favorita_curso_ondemand(this)"><i class="material-icons" style="transform: translateY(3px);font-size: 35px;">favorite_border</i></a>
                            <%}%>                        
                        </div>
    
                        <h5 style="margin-top: -15px;">O que você vai ver</h5>
    
                        <span>
                           <%- curso.descricao_projeto%>
                        </span>
    
    
                        <div class="tit-estrutura-curso" style="margin-top: 12%;">        
                            <h5>Estrutura do Curso</h5>    
                        </div>        
        
                        <%for(modulo in modulos){%>
                        <div class="estrutura-curso" style="margin-top: 4%; margin-bottom: 15%;">
                            <div class="subtitulo-estrutura-curso">
                                <%= modulos[modulo].modulo %>
                            </div>
                            <div class="div-texto-estrutura">
                                <%for (step of modulos[modulo].step){%>
                                    <li><%=step%></li>
                                <%}%>                        
                            </div>
                        </div>
                        <%}%>    
                        
                        <h5 style="margin-top: 40px;">Professores</h5>
    
                            <div class="scrolling-wrapper">
                            <%for(professor of professores){%>
                                <div class="profile">
                                    <img src="<%=professor.foto%>">
                                    <a class="btn-flat btn-small"><%=professor.nome%></a>
                                    <p><%= professor.formacao%></p>
                                </div>
                                <%}%>
                            </div>
    
                            <!--
                            <h5 style="margin-top: 70px;">Alunos Anteriores</h5>
            
                            <div class="previous-students flex">
                                <img class="left" src="./image/users/d.jpg">
                                <div>
                                    <h5>Marília Gonçalves</h5>
                                    <h6 class="info flex">
                                        9,7 <i class="material-icons">star_border</i> | 2018
                                    </h6>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a
                                        page when. Various versions have been evolved over the years.</p>
                                </div>
                            </div>
            
                            <a class="btn-flat btn-large students-expand">Todas as Avaliações</a>
                            -->
                        </div>
            
                        <a class="btn-flat btn-large subscribe" onclick="comprar_sales(<%= curso.id_projeto%>)">Inscreva-se</a>
                        </div>

                    <%}%>


                <%}%>    
                
            


                


                
    </div>
`


/*

    <div id="navbar_comum">
        <nav class="nav-extended">
            <div class="nav-wrapper">
                <div class="nav-text flex" style="width: 100%; max-width: 100%;">
                    <button type="button" class="voltar resetButtonStyle" onclick="back_to_main()"
                        style="margin-right: auto">
                        <i class="material-icons white-text" style="font-size: 45px;">keyboard_arrow_left</i>
                    </button>
                </div>
                <div class="nav-buttons">
                    <a href="#" class="notification-icon" style="margin-left: 10px; margin-right: 0;">
                        <img src="image/icons/inbox.svg" alt="" class="box-icon"> 
                    </a>
                    <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                        <img src="img/icons/menu.svg" alt="">
                    </a>
                </div>
            </div>
        </nav>
    </div>

    
</body>

</html>
*/