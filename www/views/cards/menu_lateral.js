var menu_lateral = `
    <ul id="slide-out" class="sidenav">
        <!--<a href="#" class="sidenav-close">
            <i class="material-icons white-text" style="font-size: 35px;">keyboard_arrow_right</i>
        </a>-->
        <li>
            <div class="user-view">

            <% if (login.foto.indexOf('erro') >= 0) { %>
                <% login.foto = 'image/users/c.jpg' %>
            <% } %>

                <div class="sidenav-info">
                    <% var nome = get_data('geral').nome + ' ' + get_data('geral').sobrenome %>
                    <p><%- nome %></p>                
                    <p><%- get_data('geral').login.email %></p>                    
                </div>

                <div class="circle user-pic" style="background-image: url(<%= login.foto%>)">
                    <a href="#"></a>
                </div>
                <span class="white-text user-email"><%=login.email%></span>
            </div>
        </li>
        <div class="sidenav-items-container">
            <li class="sidenav-item">
                <a onclick="back_to_main()">
                    <img src="img/icons/grupos_orientador.svg" alt="">
                    Meus Cursos
                </a>
            </li>            
            <li class="sidenav-item">
                <a onclick="go_to_perfil()">
                    <!-- <img src="img/icons/financeiro_cartao.svg" alt=""> -->
                    <i class="material-icons prefix" style="color: #934684;">person_outline</i>
                    Meu Perfil
                </a>
            </li>
            
            <% var tipo_aluno = get_data('tipo_aluno') %>    
            <% if(tipo_aluno == 'MBA'){%>

            <li class="sidenav-item" id="minha_turma">
                <a onclick="go_to_minhaturma()">
                    <!-- <img src="img/icons/financeiro_cartao.svg" alt=""> -->
                    <i class="material-icons prefix" style="color: #934684;">people_outline</i>
                    Minha Turma
                </a>
            </li>

            <%}else{%>

            <%}%>

            <li class="sidenav-item">
                <a onclick="go_to_home_sales()">                    
                    <i class="material-icons prefix" style="color: #934684;">add_shopping_cart</i>
                    Nossos Cursos
                </a>
            </li>

            <!--
            <li class="sidenav-item">
            <a onclick="chama_certificados()">                    
                <i class="material-icons prefix" style="color: #934684;">chrome_reader_mode</i>
                Certificados
            </a>
            </li>
            -->    

            <li class="sidenav-item">
                <a onclick="go_to_faq()">
                    <img src="img/icons/feed_comentarios.svg" alt="">
                    Me Ajuda Aí
                </a>
            </li>
            <!--<li class="sidenav-item">
            <a onclick="">
                <img src="img/icons/feed_comentarios.svg" alt="">
                <input type="file" id="teste-book" onchange="chama_book(this)">
            </a>
            </li>-->

            <!--<li class="sidenav-item">                
                <a class="multilevel"><i class="material-icons" style="color: #934684;">info_outline</i>Políticas</a>
                <ul class="sublevel d-none">
                    <li class="sidenav-item" style="transform: translateX(15%);" onclick="chama_politica_privacidade()"> Política de Privacidade  </li>
                    <li class="sidenav-item" style="transform: translateX(15%);" onclick="chama_termos_uso()"> Termos de Uso  </li>
                </ul>
            </li>-->
            
            <li class="sidenav-item bottom menu-redes left" style="bottom: 104px; border-top: 0px !important;">
                <div class="row center" style="width: 100%; margin-left: -4%; display: flex; align-items: center; justify-content: left;">
                    <div class="">
                        <a href="https://www.linkedin.com/school/liveuuniversity/" target="_blank">
                            <img src="img/icons/linnkedin-icon.png" class="redes-icon">
                        </a>
                    </div>
                    <div class="redes-icon">
                        <a href="https://web.facebook.com/liveuuniversity" target="_blank">
                            <img src="img/icons/face-icon.png" class="redes-icon">
                        </a>
                    </div>
                    <div class="redes-icon">
                        <a href="https://www.instagram.com/live_university" target="_blank">
                            <img src="img/icons/insta-icon.png" class="redes-icon">
                        </a>
                    </div>
                </div>
            </li>

            <li class="sidenav-item bottom menu-politicas hide" style="bottom: 110px;">
                <a onclick="chama_politica_privacidade()" style="justify-content: flex-start !important;">
                Privacidade                
                </a>

                <a onclick="chama_termos_uso()">
                Uso                    
                </a>
                <span style="position: absolute; margin-top: -11%; margin-left: -2%; color: gray;">v.<%- get_data('versao')%></span>
            </li>

            <li class="sidenav-item bottom">
                <a onclick="exibe_politicas()" style="justify-content: flex-start !important;">
                Politicas                
                </a>

                <a onclick="reset_data()">
                    Sair
                    <img src="img/icons/menu_sair.svg" alt="">
                </a>
            </li>
        </div>
    </ul>
`

$(function () {
    $('.multilevel').on('click', function () {
        $(this).next().toggleClass('d-none');
    });
})

function exibe_politicas() {
    var a = document.querySelector('.menu-politicas').classList.contains('hide')
    if (a) {
        $(".menu-politicas").removeClass("hide")
    } else {
        $(".menu-politicas").addClass("hide")
    }
}