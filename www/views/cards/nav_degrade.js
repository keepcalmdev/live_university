var nav_degrade_v = `
    <nav class="gradient">
        <a href="#" onclick="change_view_aula_in('back', false, true)">
            <i class="material-icons" style="font-size: 18px;">arrow_back_ios</i>
        </a>
        <h1 class="2-lines"><%= titulo %></h1>
        <ul class="right">
            <li><a href="#" class="notification-icon" onclick="chama_central_notificacao()"><img src="image/icons/inbox.svg" alt="" class="inbx-menu"> </a></li>
            <li>
                <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                    <i class="material-icons">menu</i>
                </a>
            </li>
        </ul>
    </nav>
`;

var nav_degrade_v2 = `
    <nav class="gradient combo-box-nav">
        <a onclick="back_to_main()">
            <i class="material-icons" style="font-size: 18px;">arrow_back_ios</i>
        </a>
        <h1><%= titulo %></h1>
        <ul class="right">
            <li><a href="#" class="notification-icon" onclick="chama_central_notificacao()"><img src="image/icons/inbox.svg" alt="" class="inbx-menu"> </a></li>
            <li>
                <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                    <i class="material-icons">menu</i>
                </a>
            </li>
        </ul>
    </nav>
`;


var nav_degrade_v_eletivas = `
    <nav class="gradient">
        <a href="#" onclick="change_view('back', false, true)">
            <i class="material-icons" style="font-size: 18px;">arrow_back_ios</i>
        </a>
        <h1 class="2-lines"><%= titulo %></h1>
        <ul class="right">
            <li><a href="#" class="notification-icon" onclick="chama_central_notificacao()"><img src="image/icons/inbox.svg" alt="" class="inbx-menu"> </a></li>
            <li>
                <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                    <i class="material-icons">menu</i>
                </a>
            </li>
        </ul>
    </nav>
`;


var nav_degrade_vendas = `
    <nav class="gradient">
        <a href="#" onclick="change_view_aula_in('back', false, true)">
            <i class="material-icons" style="font-size: 18px;">arrow_back_ios</i>
        </a>
        <h1 class="3-lines nav-degrade-title" style="top: 90px !important;"><%= titulo %> <span></span></h1>
        <ul class="right">
            <li><a href="#" class="notification-icon" onclick="chama_central_notificacao()"><img src="image/icons/inbox.svg" alt="" class="inbx-menu"> </a></li>
            <li>
                <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                    <i class="material-icons">menu</i>
                </a>
            </li>
        </ul>
    </nav>
`;

var nav_degrade_into_agenda_eventos = `
    <nav class="gradient">
        <a href="#" onclick="change_view('back', false, true)">
            <i class="material-icons" style="font-size: 18px;">arrow_back_ios</i>
        </a>
        <h1 class="2-lines in-agenda-titulo" style="top: 80px !important;"><%= titulo %></h1>
        <h2 class="in-agenda-palestrantes" style="top: 130px !important;">
            <% if (typeof data.palestrantes == 'undefined'){ %>

            <% } else if (data.palestrantes.indexOf(',') == -1){ %>

                <% if(data.palestrantes.length > 1){%>
                    <%= data.palestrantes %> - <%= data.empresas %>
                <%}else{%>
                <%}%>
            <% } else { %>
                <% palestrantes = data.palestrantes.split(',') %>
                <% empresas = data.empresas.split(',') %>

                <%for(var i=0; i < palestrantes.length; i++){%>
                  <%= palestrantes[i] + ' - ' + empresas[i] %><br />
                <%}%>
            <% } %>
        </h2>

        <ul class="right">
            <li><a href="#" class="notification-icon" onclick="chama_central_notificacao()"><img src="image/icons/inbox.svg" alt="" class="inbx-menu"> </a></li>
            <li>
                <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                    <i class="material-icons">menu</i>
                </a>
            </li>
        </ul>      
    </nav>
`;