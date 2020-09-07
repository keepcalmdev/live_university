var new_home_logado = `
    <div class="new-home new-home-logado">
        <div id="new-home-nav"></div>
        <div class="row first">
            <div class="col s12" style="padding: 0">
                <h3>Meus Projetos</h3>
                <div class="carousel carousel-curso" id="meus-projetos">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12" style="padding: 0">
                <h3>Selecione sua área de atuação</h3>
                <div id="area" class="full-scroll-container">
                    <button class="solid scroll-item"   onclick="new_home_filter(this)">TODOS</button>
                    <button class="outline scroll-item" id="buttoni" onclick="new_home_filter(this)"><i class="material-icons">favorite</i></button>
                    <button class="outline scroll-item" onclick="new_home_filter(this)">VENDAS</button>
                    <button class="outline scroll-item" onclick="new_home_filter(this)">COMUNICAÇÃO</button>
                    <button class="outline scroll-item" onclick="new_home_filter(this)">FINANÇAS</button>
                    <button class="outline scroll-item" onclick="new_home_filter(this)">TECNOLOGIA</button>
                    <button class="outline scroll-item" onclick="new_home_filter(this)">RH</button>
                    <button class="outline scroll-item" onclick="new_home_filter(this)">MARKETING</button>
                    <button class="outline scroll-item" onclick="new_home_filter(this)">FISCAL</button>
                    <button class="outline scroll-item" onclick="new_home_filter(this)">COMPRAS</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12" style="padding: 0">
                <h3>Pós-Graduações</h3>
                <div class="carousel carousel-curso" id="pos-grad">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12" style="padding: 0">
                <h3>Destaques</h3>
                <div class="carousel carousel-curso" id="destaques">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12" style="padding: 0">
                <h3>Workshops</h3>
                <div class="carousel carousel-curso" id="workshops">
                </div>
            </div>
        </div>
    </div>
    
`

var new_home_item_v = `
    <% for(const curso of cursos) { %>
        <% if(curso.id_tipo_projeto == 'ondemand') { %>
            <div class="curso-item carousel-item" id-grupo="<%= curso.id_grupo %>" id-projeto="<%= curso.id_projeto %>" onclick="load_curso_ondemand(this)">
                <div class="card curso curso-medio" id='curso-<%= curso.id_projeto %>' style="background-image: url('image/capas/<%= curso.id_projeto %>.svg')">
                    <%
                        var capa_svg = new Image();

                        capa_svg.src = 'image/capas/'+curso.id_projeto+'.svg';

                        capa_svg.onerror = function() {
                            document.getElementById('curso-' + curso.id_projeto).style.backgroundImage = "url('image/fundo_card_mba.svg')";
                            var mark = document.createElement('div');
                            mark.className = 'live-mark';
                            document.getElementById('curso-' + curso.id_projeto).appendChild(mark);
                        }
                    %>
                    <div class="titulo">
                        <%= curso.grupo %>
                    </div>
                </div>
            </div>
        <% } else if (curso.id_tipo_projeto == 1 || curso.id_tipo_projeto == 23){ %>
            <div class="curso-item carousel-item" onclick="go_to_meus_eventos(<%= curso.id_projeto%>)">
                <div class="card curso curso-medio" id='curso-<%= curso.id_projeto %>' style="background-image: url('image/capas/<%= curso.id_projeto %>.svg')">
                    <%
                        var capa_svg = new Image();

                        capa_svg.src = 'image/capas/'+curso.id_projeto+'.svg';

                        capa_svg.onerror = function() {
                            document.getElementById('curso-' + curso.id_projeto).style.backgroundImage = "url('image/fundo_card_mba.svg')";
                            var mark = document.createElement('div');
                            mark.className = 'live-mark';
                            document.getElementById('curso-' + curso.id_projeto).appendChild(mark);
                        }
                    %>
                    <div class="titulo">
                        <%= curso.grupo %>
                    </div>
                </div>
            </div>
        <% } else if (curso.id_tipo_projeto == 16){%>
            <div class="curso-item carousel-item" id-grupo="<%= curso.id_grupo%>" id-tipo="<%= curso.id_tipo_projeto%>" onclick="load_main_aulas(this)">
                <div class="card curso curso-medio" id='curso-<%= curso.id_grupo %>' style="background-image: url('image/capas/<%= curso.id_grupo %>.svg')">
                    <%
                        var capa_svg = new Image();

                        capa_svg.src = 'image/capas/'+curso.id_grupo+'.svg';

                        capa_svg.onerror = function() {
                            document.getElementById('curso-' + curso.id_grupo).style.backgroundImage = "url('image/fundo_card_mba.svg')";
                            var mark = document.createElement('div');
                            mark.className = 'live-mark';
                            document.getElementById('curso-' + curso.id_grupo).appendChild(mark);
                        }
                    %>
                    <div class="titulo">
                        <%= curso.grupo %>
                    </div>
                </div>
            </div>
        <% } else { %>
            <div class="curso-item carousel-item" id-grupo="<%= curso.id_grupo%>" id-tipo="<%= curso.id_tipo_projeto%>" onclick="load_main_aulas(this)">
                <div class="card curso curso-medio" id='curso-<%= curso.id_grupo %>' style="background-image: url('image/capas/<%= curso.id_grupo %>.svg')">
                    <%
                        var capa_svg = new Image();

                        capa_svg.src = 'image/capas/'+curso.id_grupo+'.svg';

                        capa_svg.onerror = function() {
                            document.getElementById('curso-' + curso.id_grupo).style.backgroundImage = "url('image/fundo_card_mba.svg')";
                            var mark = document.createElement('div');
                            mark.className = 'live-mark';
                            document.getElementById('curso-' + curso.id_grupo).appendChild(mark);
                        }
                    %>
                    <div class="titulo">
                        <%= curso.grupo %>
                    </div>
                </div>
            </div>
        <% } %>
    <% } %>
    <h3 style='display: none' class='area-vazia'>Não cursos para essa área</h3>
`

var new_home_sales_v = ` 
<% for(const curso of cursos) { %>
    <div class="curso-item curso-sale carousel-item" id-projeto="<%= curso.id_projeto %>" data-area="<%= curso.desc_area %>" data-fav="<%= curso.favorito %>">
        <%if(curso.favorito == 1){%>
            <img class="heart" preenchido="1" id-projeto="<%= curso.id_projeto %>" src="img/icons/heart_preenchido.svg" alt="" onclick="favorita_curso_ondemand(this)">
        <%}else{%>
            <img class="heart" preenchido="0" id-projeto="<%= curso.id_projeto %>" src="img/icons/heart.svg" alt="" onclick="favorita_curso_ondemand(this)">
        <%}%>
        <div class="card curso curso-medio" id-projeto="<%= curso.id_projeto%>" tipo="1" onclick="open_home_sale(this)" style="background-image: url('image/fundo_card_pos_graduacao.svg')">
            <div class="live-mark"></div>
            <div class="titulo">
                <%- titleize(curso.nome_projeto) %>
            </div>
        </div>
    </div>
<% } %>
<h3 style='display: none' class='area-vazia'>Não cursos para essa área</h3>
`

var new_home_nav = `
    <div class="row">
        <div class="col s6 left-align"><img class="logo" src="image/logo_cubo_live_university.svg" alt="logo"></div>
        <div class="col s6 right-align valign-wrapper">
            <a href="#" class="notification-icon" onclick="chama_central_notificacao()">
                <i class="material-icons inbox">inbox</i>
            </a>
            <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                <i class="material-icons menu">menu</i>
            </a>
        </div>
    </div>
`

function load_new_home_logado(){
    require_loader('open');
    $.post(server + '/get_cursos_home', { id: get_data('geral').id })
        .done((data) => {
            console.log(data);
            const cursos = data.meus_projetos;
            const cursosPorData = cursos.sort((a, b) => {
                if (a.data_projeto && b.data_projeto) {
                    if (Date.parse(a.data_projeto) > Date.parse(b.data_projeto)) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    return 0;
                }
            })
            const cursosComMBAsPrimeiro = cursosPorData.sort((a, b) => {
                if (a.grupo.startsWith('MBA')) {
                    return -1;
                } else if (b.grupo.startsWith('MBA')) {
                    return 1;
                } else {
                    return 0;
                }
            });
            document.querySelector('#meus-projetos').innerHTML  = ejs.render(new_home_item_v, { cursos: cursosComMBAsPrimeiro });
            const { portifolio: { pos, destaques, workshop } } = data;
            document.querySelector('#pos-grad').innerHTML = ejs.render(new_home_sales_v, { cursos: pos });
            document.querySelector('#destaques').innerHTML = ejs.render(new_home_sales_v, { cursos: destaques });
            document.querySelector('#workshops').innerHTML = ejs.render(new_home_sales_v, { cursos: workshop });
            initialize_courses_carousel();

            $(function() {
                //caches a jQuery object containing the header element
                var nav = $("#new-home-nav");
                $(window).scroll(() => {
                    var scroll = $(window).scrollTop();
                    if (scroll >= 50) {
                        nav.addClass('border-shadow');
                    } else {
                        nav.removeClass("border-shadow");
                    }
                });
            });

            require_loader('close');
            }).fail(function (b) {
                require_loader('close');
                console.log({ b })
            })
}


function initialize_courses_carousel() {
    if ($('.carousel-curso').length > 0) {
        if ($('#pos-grad .carousel-item').length > 0) {
            $('#pos-grad').carousel({
                dist: 0,
                shift: 10,
                padding: 0,
                numVisible: 2,
                fullWidth: true,
                duration: 100,
                noWrap: true,
            });
            $('#pos-grad .area-vazia').css('display', 'none');
        } else {
            $('#pos-grad .area-vazia').css('display', 'block');
        }

        if ($('#workshops .carousel-item').length > 0) {
            $('#workshops').carousel({
                dist: 0,
                shift: 10,
                padding: 0,
                numVisible: 2,
                fullWidth: true,
                duration: 100,
                noWrap: true,
            });
            $('#workshops .area-vazia').css('display', 'none');
        } else {
            $('#workshops .area-vazia').css('display', 'block');
        }

        if ($('#destaques .carousel-item').length > 0) {
            $('#destaques').carousel({
                dist: -100,
                shift: 0,
                padding: 0,
                numVisible: 3,
            });
            $('#destaques .area-vazia').css('display', 'none');
        } else {
            $('#destaques .area-vazia').css('display', 'block');
        }

        if ($('#meus-projetos .carousel-item').length > 0) {
            $('#meus-projetos').carousel({
                dist: 0,
                shift: 10,
                padding: 0,
                numVisible: 2,
                fullWidth: true,
                duration: 100,
                noWrap: true,
            });
            $('#meus-projetos .area-vazia').css('display', 'none');
        } else {
            $('#meus-projetos .area-vazia').css('display', 'block');
        }
    }
}

function new_home_filter(e) {
    require_loader('open');
    const text = e.innerText;
    document.querySelectorAll('#area button').forEach(el => {
        if (el.innerText === text) {
            el.className = 'solid scroll-item';
        } else {
            el.className = 'outline scroll-item';
        }
    });
    document.querySelectorAll('.carousel-curso .curso-sale').forEach(e => {
        if ((e.dataset.area && e.dataset.area.toUpperCase() === text) || text === 'TODOS' || (text === 'favorite' && e.dataset.fav == 1)) {
            e.className = 'curso-item curso-sale carousel-item';
            e.style.display = 'block';
        } else {
            e.className = 'curso-item curso-sale';
            e.style.display = 'none';
        }
    });
    initialize_courses_carousel();
    require_loader('close');
}