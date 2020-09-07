var courses_list_v = `

<div id='navbar'></div>

<div id='conteudo'  class='row' style='position: absolute;top:68px;width: 100%;'>

    <div class="card courses-list">
        <div class="card-content">
            <ul class="collection with-header">

            <li class="collection-header"><h6>Meus cursos</h6></li>
            
            <%
for(const eletiva of eletivas){
    var eletiva_n = 1;
    
    if(eletiva.id_tipo_projeto == 1 || eletiva.id_tipo_projeto == 16 || eletiva.id_tipo_projeto == 23 || eletiva.id_tipo_projeto == 27 || eletiva.id_tipo_projeto == 32 || eletiva.id_tipo_projeto == 34 || eletiva.id_tipo_projeto == 26)
    {
        eletiva_n = 1;
    }else if(eletiva.id_tipo_projeto == 6 || eletiva.id_tipo_projeto == 26 || eletiva.id_tipo_projeto == 21)
    {
        eletiva_n = 2;
    }

    var regra = (eletiva.id_tipo_projeto == 1) || (eletiva.id_tipo_projeto == 23) ? 'congressos' : 'workshop';

    if(regra == 'workshop' && tela == 'workshop'){
        if(eletiva.id_contato != null){
%>
                            <a href="#" class="collection-item" id-projeto='<%= eletiva.id_projeto %>' nome-projeto='<%= eletiva.nome_projeto%>' onclick='load_eletiva_info(this)' '>
                                <p class="item-title">
                                    <%= eletiva.nome_projeto %>
                                </p>
                                <div class="item-badges">
                                    <span class="item-number"><%= eletiva_n %></span>
                                    <i class="material-icons grey-text text-lighten-3">keyboard_arrow_right</i>
                                </div>
                            </a>
<%
        }
    }else if(regra == 'congressos' && tela == 'congressos'){
        if(eletiva.id_contato != null){
%>
                            <a href="#" class="collection-item" id-projeto='<%= eletiva.id_projeto %>' nome-projeto='<%= eletiva.nome_projeto%>' onclick='load_eletiva_info(this)' '>
                            <p class="item-title">
                                <%= eletiva.nome_projeto %>
                            </p>
                            <div class="item-badges">
                                <span class="item-number"><%= eletiva_n %></span>
                                <i class="material-icons grey-text text-lighten-3">keyboard_arrow_right</i>
                            </div>
                        </a>
<%
        }
    }
}
%>
            </ul>
        </div>
    </div>


    <div class="card courses-list">
        <div class="card-content">
            <ul class="collection with-header">

            <li class="collection-header"><h6>Eletivas</h6></li>

<%
for(const eletiva of eletivas){
    var eletiva_n = 1;
    if(eletiva.id_tipo_projeto == 1 || eletiva.id_tipo_projeto == 16 || eletiva.id_tipo_projeto == 23 || eletiva.id_tipo_projeto == 27){
        eletiva_n = 1;
    }else if(eletiva.id_tipo_projeto == 6 || eletiva.id_tipo_projeto == 26 || eletiva.id_tipo_projeto == 21){
        eletiva_n = 2;
    }

    var regra = (eletiva.id_tipo_projeto == 1) || (eletiva.id_tipo_projeto == 23) ? 'congressos' : 'workshop';

    if(regra == 'workshop' && tela == 'workshop'){
        if(eletiva.id_contato == null){
%>
                            <a href="#" class="collection-item" id-projeto='<%= eletiva.id_projeto %>' nome-projeto='<%= eletiva.nome_projeto%>' onclick='load_eletiva_info(this)' '>
                                <p class="item-title">
                                    <%= eletiva.nome_projeto %>
                                </p>
                                <div class="item-badges">
                                    <span class="item-number"><%= eletiva_n %></span>
                                    <i class="material-icons grey-text text-lighten-3">keyboard_arrow_right</i>
                                </div>
                            </a>
<%
        }
    }else if(regra == 'congressos' && tela == 'congressos'){
        if(eletiva.id_contato == null){
%>
                            <a href="#" class="collection-item" id-projeto='<%= eletiva.id_projeto %>' nome-projeto='<%= eletiva.nome_projeto%>' onclick='load_eletiva_info(this)' '>
                            <p class="item-title">
                                <%= eletiva.nome_projeto %>
                            </p>
                            <div class="item-badges">
                                <span class="item-number"><%= eletiva_n %></span>
                                <i class="material-icons grey-text text-lighten-3">keyboard_arrow_right</i>
                            </div>
                        </a>
<%
        }
    }
}
%>

            
            </ul>
        </div>
    </div>    
</div>
`;
    