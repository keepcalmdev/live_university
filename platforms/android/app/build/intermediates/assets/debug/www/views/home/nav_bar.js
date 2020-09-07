var nav_bar_v = `
    <div class="menu-lateral">
        <ul id="slide-out" class="side-nav">
            <li>
                <div class="user-view">
                    <div class="background">
                        <img src="image/bg_mernu.png" style="width: 350px;">
                    </div>
                    <% if (login.foto.indexOf('erro') >= 0) { %>
                        <% login.foto = 'image/users/c.jpg' %>
                    <% } %>
                    <a href="#!user"><img class="circle" src="<%= login.foto%>"></a>
                    <div style="padding: 5px 0px 10px 3px;">
                        <p class="white-text"><%- login.nome + ' ' + login.sobrenome %></p>
                        <p class="white-text">ID: <%= login.id %></p>
                        <p class="white-text"><%= login.email %></p>
                    </div>
                </div>
            </li>
            <div class="menu-nav">
                <li><a onclick="back_to_main()" ><i class="material-icons">school</i>Meus Cursos</a></li>
                <li><a onclick="go_to_perfil()" ><i class="material-icons">person</i>Perfil</a></li>
                <li><a href="mailto:meajudaai@liveuniversity.com"><i class="material-icons">help</i>Me Ajuda Aí?</a></li>
                <!-- mailto:meajudaai@liveuniversity.com -->
            </div>
            <li><a  onclick="reset_data(); window.location.href = 'index.html'" class="btn waves-effect waves-light col s12" style="background-color: #781866;border-radius: 40px;width: 120px;position: absolute;top: 80%;">Sair</a></li>
        </ul>
    </div>
`