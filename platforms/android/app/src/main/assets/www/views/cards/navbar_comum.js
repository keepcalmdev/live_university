var navbar_comum_v = `
    <nav class="nav-extended default-bg-color"> 
        <div class="nav-wrapper">
            <div class="nav-text flex">
                <% if (typeof mostrar_voltar != "undefined" ? mostrar_voltar : false) { %>
                    <button type="button" class="voltar" onclick="back_to_main()">
                        <i class="material-icons white-text">keyboard_arrow_left</i>
                    </button>
                <% } %>

                <p class="limit-lines" data-keep-font-size="true" style="line-height:25px"><%= titulo %></p>
            </div>
            <div class="nav-buttons">
                <a href="#" class="notification-icon" onclick="chama_central_notificacao()">
                <img src="image/icons/inbox.svg" alt="" class="box-icon">                   
                </a>
                <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                    <img src="img/icons/menu.svg" alt="">
                </a>                 
            </div>
        </div>
    </nav>
`;

var navbar_comum_v_ondemand = `
    <nav class="nav-extended default-bg-color"> 
        <div class="nav-wrapper">
            <div class="nav-text flex">
                <% if (typeof mostrar_voltar != "undefined" ? mostrar_voltar : false) { %>
                    <button type="button" id-projeto="<%=id_projeto%>" id-modulo="<%= id_modulo %>" class="voltar" onclick="load_curso_ondemand(this)">
                        <i class="material-icons white-text">keyboard_arrow_left</i>
                    </button>
                <% } %>

                <p class=""><%= titulo %></p>
            </div>
            <div class="nav-buttons">
                <a href="#" class="notification-icon" onclick="chama_central_notificacao()">
                <img src="image/icons/inbox.svg" alt="" class="box-icon">   
                </a>
                <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                    <img src="img/icons/menu.svg" alt="">
                </a>                 
            </div>
        </div>
    </nav>
`;

var navbar_comum_v_ondemand_learnets = `
    <nav class="nav-extended default-bg-color"> 
        <div class="nav-wrapper">
            <div class="nav-text flex">
                <% if (typeof mostrar_voltar != "undefined" ? mostrar_voltar : false) { %>
                    <button type="button" class="voltar" onclick="change_view('back')">
                        <i class="material-icons white-text">keyboard_arrow_left</i>
                    </button>
                <% } %>

                <p class=""><%= titulo %></p>
            </div>
            <div class="nav-buttons">
                <a href="#" class="notification-icon" onclick="chama_central_notificacao()">
                <img src="image/icons/inbox.svg" alt="" class="box-icon">     
                </a>
                <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                    <img src="img/icons/menu.svg" alt="">
                </a>                 
            </div>
        </div>
    </nav>
`;

var navbar_comum_v_eletivas = `
    <nav class="nav-extended default-bg-color nav-eletivas"> 
        <div class="nav-wrapper">
            <div class="nav-text default-bg-color flex">
                <button type="button" class="default-bg-color voltar" onclick='change_view("back")'>
                    <i class="default-bg-color material-icons white-text">keyboard_arrow_left</i>
                </button>
                <p class=""><%= titulo %></p>
            </div>
            <div class="nav-buttons">
                <a href="#" class="notification-icon" onclick="chama_central_notificacao()">
                <img src="image/icons/inbox.svg" alt="" class="box-icon">      
                </a> 
                <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                    <img src="img/icons/menu.svg" alt="">
                </a>                 
            </div>
        </div>
    </nav>
`;

var navbar_comum_v_eletivas_vazio = `
    <nav class="nav-extended default-bg-color nav-eletivas"> 
        <div class="nav-wrapper">
            <div class="nav-text default-bg-color flex">
                <button type="button" class="default-bg-color voltar" onclick='change_view("back")'>
                    <i class="default-bg-color material-icons white-text">keyboard_arrow_left</i>
                </button>
                <p class=""><%= titulo %></p>
            </div>            
        </div>
    </nav>
`;

const navbar_comum_com_tabs_v = `
<div id="navbar_comum_com_tabs">
    <nav class="nav-extended default-bg-color">
        <div class="nav-wrapper">
            <div class="max-w-100 nav-text flex w100">
                <button type="button" class="voltar resetButtonStyle" onclick="loading_main()">
                    <i class="material-icons white-text">keyboard_arrow_left</i>
                </button>

                <p class="w-0 margin-0 flex-1"><%= titulo %></p>
            </div>

            <div class="nav-buttons">
                <a href="#" class="notification-icon" onclick="chama_central_notificacao()">
                <img src="image/icons/inbox.svg" alt="" class="box-icon">    
                </a>

                <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                    <img src="img/icons/menu.svg" alt="">
                </a>
            </div>
        </div>
    </nav>
</div>

<div id="submenutabs">
    <ul class="tabs tabs-transparent tabs-fixed-width default-bg-color flex">
        <% for (let tab of tabs) { %>
            <li class="tab flex-1">
                <a id="menu-calendario" class="<%= tab.ativo ? 'active' : '' %>" href="<%= tab.identificadorCss %>"><%= tab.etiqueta %></a>
            </li>
        <% } %>
    </ul>
</div>
`

var navbar_barra_roxa = `
        <nav class="nav-extended" style="box-shadow: none;">
            <div class="nav-wrapper">
                <div class="nav-text flex" style="width: 100%; max-width: 100%;">
                    <button type="button" class="voltar resetButtonStyle" onclick="change_view('back')"
                        style="margin-right: auto">
                        <i class="material-icons white-text" style="font-size: 45px;">keyboard_arrow_left</i>
                    </button>
                </div>
                <div class="nav-buttons">
                    <a href="#" class="notification-icon" style="margin-left: 10px; margin-right: 0;">
                    <img src="image/icons/inbox.svg" alt="" class="inbx-menu">     
                    </a>
                    <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                        <img src="img/icons/menu.svg" alt="">
                    </a>
                </div>
            </div>
        </nav>
`;

var navbar_barra_roxa_sales = `
        <nav class="nav-extended" style="box-shadow: none;">
            <div class="nav-wrapper">
                <div class="nav-text flex" style="width: 100%; max-width: 100%;">
                    <button type="button" class="voltar resetButtonStyle" onclick="change_view('back')"
                        style="margin-right: auto">
                        <i class="material-icons white-text" style="font-size: 45px;">keyboard_arrow_left</i>
                    </button>
                </div>
                <div class="nav-buttons">
                    <a href="#" class="notification-icon" style="margin-left: 10px; margin-right: 0;">
                    <img src="image/icons/inbox.svg" alt="" class="inbx-menu" style="margin-top: 0px !important;">     
                    </a>
                    <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                        <img src="img/icons/menu.svg" alt="">
                    </a>
                </div>
            </div>
        </nav>
`;

var navbar_barra_roxa_vazio = `
        <nav class="nav-extended" style="box-shadow: none;">
            <div class="nav-wrapper">
                <div class="nav-text flex" style="width: 100%; max-width: 100%;">
                    <button type="button" class="voltar resetButtonStyle" onclick="change_view('back')"
                        style="margin-right: auto">
                        <i class="material-icons white-text" style="font-size: 45px;">keyboard_arrow_left</i>
                    </button>
                </div>                
            </div>
        </nav>
`;