var menu_hor_aula = `
    <div class="navegador-de-setas">
        <% if (aulaAnterior != null && aulaAnterior.trial != 1) { %>
            <button id-aula="<%= aulaAnterior.id_ondemand_aula %>" id-modulo="<%= aulaAnterior.id_ondemand_modulo %>" ordem="<%= aulaAnterior.ordem %>" id-projeto="<%= idProjeto %>" type="button" class="zerarButton" onclick="get_dados_aula_ondemand(this)">
                <i class="material-icons white-text">skip_previous</i>
            </button>
        <% } else { %>
            <button disabled type="button" class="zerarButton">
                <i class="material-icons grey-text">skip_previous</i>
            </button>
        <% } %>
        <div class="navegador-de-setas-texto">
            <%= nomeAula %>
        </div>
        <% if (aulaPosterior != null && aulaPosterior.trial != 1) { %>
            <button id-aula="<%= aulaPosterior.id_ondemand_aula %>" id-modulo="<%= aulaPosterior.id_ondemand_modulo %>" ordem="<%= aulaPosterior.ordem %>" id-projeto="<%= idProjeto %>" type="button" class="zerarButton" onclick="get_dados_aula_ondemand(this)">
                <i class="material-icons white-text">skip_next</i>
            </button>
        <% } else { %>
            <button disabled type="button" class="zerarButton">
                <i class="material-icons grey-text">skip_next</i>
            </button>
        <% } %>
    </div>
`;

var menu_hor_aula_learnets = `
    <div class="navegador-de-setas">
            <button disabled type="button" class="zerarButton">
                <i class="material-icons grey-text">skip_previous</i>
            </button>
        <div class="navegador-de-setas-texto">
            <%= nomeAula %>
        </div>
            <button disabled type="button" class="zerarButton">
                <i class="material-icons grey-text">skip_next</i>
            </button>
    </div>
`;