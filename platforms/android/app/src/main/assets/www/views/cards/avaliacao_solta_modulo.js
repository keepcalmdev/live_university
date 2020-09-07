
var avaliacao_solta_modulo_v = `
<div class="rating-mod card">
    
    <div hidden id="dados" dados='<%- JSON.stringify(aula) %>'></div>

    <div class="row valign-wrapper mb-xs" style="transform: translateX(-2%);padding: 12px 0px 0px 0px;">
            <div class="col s1">
                <div class="img-rounded av-evento-img" style="background-color: #781866 !important"><img src="./image/cubo_branco.png" alt="" style="transform: translateX(-3%);"></div>
            </div>
            <div class="col s11" style="transform: translateX(-63%);">
                Live University
            </div>
        </div>

    <div class="card-content nota" style="margin-top: -11px;">
        <label style="transform: translateX(-1.5%);">Avaliação de fim do módulo</label>
        <small style="transform: translateX(-1.5%);"><%= aula.modulo %></small>
        <% for(var n of Array(10).keys()){ %>
            <button onclick="Rating.select(this)"><%= n + 1 %></button>
        <% } %>
    </div>

    <div class="card-action comentario">
        <textarea class="materialize-textarea" placeholder="Comentário"></textarea>
        <button class="material-icons" onclick='envia_nota_modulo(this, <%- JSON.stringify(aula) %>)'>send</button>
    </div>
</div>
`


var avaliacao_solta_NPS_MBA_v = `
<div class="rating-mod card av-mba-card">
    
    <div hidden id="dados" dados='<%- JSON.stringify(aula) %>'></div>

    <div class="row valign-wrapper mb-xs" style="transform: translateX(-2%);padding: 12px 0px 0px 0px;">
            <div class="col s1">
                <div class="img-rounded av-evento-img" style="background-color: #781866 !important"><img src="./image/cubo_branco.png" alt="" style="transform: translateX(-3%);"></div>
            </div>
            <div class="col s11" style="transform: translateX(-63%);">
                Live University
            </div>
        </div>

    <div class="card-content nota" style="margin-top: -11px;">
        <label style="transform: translateX(-1.5%);">Numa escala de 0 a 10, qual é a probabilidade de você nos recomendar a um amigo?</label>        
        <% for(var n of Array(10).keys()){ %>
            <button onclick="Rating.select(this)"><%= n + 1 %></button>
        <% } %>
    </div>

    <div class="card-action comentario">
        <textarea class="materialize-textarea" placeholder="Comentário"></textarea>
        <button class="material-icons" onclick='envia_nota_nps_mba(this, <%- JSON.stringify(aula) %>)'>send</button>
    </div>
</div>
`
/*
`
<div class="rating-mod card">

    <div class="card-content nota">
        <label>Fim do módulo</label>
        <small><%= aula.modulo %></small>
        <% for(var n of Array(10).keys()){ %>
            <button onclick="Rating.select(this)"><%= n + 1 %></button>
        <% } %>
    </div>
</div>
`
*/
