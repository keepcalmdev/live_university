var aula_v = `
<div
    <% var id = aula.status.indexOf('hoje') > -1 ? 'parada_hoje' : '' %>
    <% if(id == '') { id = aula.status.indexOf('nota') > -1 ? 'parada_hoje' : '' } %>
    <% if(id == '') { id = aula.status.indexOf('futuro') > -1 ? 'parada_hoje' : '' } %>
    id="<%= id %>"
    class="lesson card <%= aula.status %>"
    onclick="load_aula(<%= aula.id_calendario_aulas %>, 0, <%= id_tipo_projeto%>)"
>

    <%switch(aula.status){
        case 'falta': var icone = 'aula_falta'; break;
        case 'falta nota': icone = 'checkin_sem_avaliacao'; break;
        case 'hoje': icone = 'aula_presente'; break;
        case 'hoje checkin': icone = 'aula_presente'; break;
        case 'presenca': icone = 'aula_nota'; break;
        case 'futuro': icone = 'aula_futuro'; break;
        case 'online': icone = 'play'; break;
    }%>

    <%  var classe = 'nenhuma' %>

    <% if(aula.aula.indexOf('Formatura') > -1){%>
    <% icone = 'formatura' %>
    <% classe = 'formatura-icone-fora' %>
    <%}%>
    
    <div class="card-content">
        <img src="img/icons/<%=icone%>.svg" alt="" class="<%= classe%>" />
        <label><%= aula.aula %></label>
        <%if(id_tipo_projeto == 16 || id_tipo_projeto == 6 || id_tipo_projeto == 21){%>
        <%}else{%>    
        <small><%= aula.modulo %></small>
        <%}%>

        <time><%= aula.data %><br /><%= aula.horario_entrada %></time>
    </div>


    <% if(typeof messages == 'object'){ %>
        <div class="card-action">
            <a href="#">Ver Mensagens</a>
        </div>
    <% } %>
</div>
`;
