shift_historico_v = `
<div class="card card-list shift-historico">
    <ul>
        <li>Histórico</li>
        <% historico.forEach(function(historia){%>
            <li><%= historia.remetente + " " + historia.obervacao %></li>
        <% }); %>
    </ul>
</div>
`