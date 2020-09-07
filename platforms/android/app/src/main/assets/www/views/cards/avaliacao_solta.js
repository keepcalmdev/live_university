var avaliacao_solta_v = `
<div class="rating-mod card">
    <div hidden id="dados" dados='<%- JSON.stringify(dados) %>'></div>

    <div class="card-content nota">
        <label>Avalie a aula</label>
        <% for (let i = 1; i < 11; i++) { %>
            <button class="<%= nota ? nota == i ? 'active' : null : null %>"
                onclick="Rating.select(this)">
                <%= i %>
            </button>
        <% } %>
    </div>

    <div class="card-action comentario">
            <textarea class="inputCustomizado materialize-textarea" placeholder="Comentário" required></textarea>
            <button class="enviarValido material-icons" onclick='envia_nota_aula(this, <%- JSON.stringify(dados) %>, <%= id_tipo_projeto%>)'>send</button>
    </div>
</div>
`;

var avaliacao_solta_ondemand = `
<div class="rating-mod card">
    <div hidden id="dados"></div>

    <div class="card-content nota">
        <label>Avalie a aula</label>
        <% for (let i = 1; i < 11; i++) { %>
            <button class="<%= nota ? nota == i ? 'active' : null : null %>"
            onclick="Rating.select(this)">
            <%= i %>
            </button>
        <% } %>
    </div>

    <div class="card-action comentario">
            <textarea class="inputCustomizado materialize-textarea" placeholder="Comentário" required></textarea>
            <button class="enviarValido material-icons" onclick='envia_nota_aula_ondemand(this, <%- JSON.stringify(dados.aula[0].id_ondemand_aula) %>)'>send</button>
    </div>
</div>
`;

var avaliacao_solta_v_eventos = `
<div id="avaliacao-evento" class="rating-mod card eventosav">
    <div hidden id="dados" dados='<%- JSON.stringify(dados) %>'></div>

    <div class="card-content nota">
        <label>Avalie esta apresentação</label>
        <% for (let i = 1; i < 11; i++) { %>
            <button class="<%= nota ? nota == i ? 'active' : null : null %>"
                onclick="Rating.select(this)">
                <%= i %>
            </button>
        <% } %>
    </div>

    <div class="card-action comentario">
            <textarea class="inputCustomizado materialize-textarea" placeholder="Comentário" required></textarea>
            <button class="enviarValido material-icons" onclick='envia_nota_palestra_evento(this, <%- JSON.stringify(dados) %>)'>send</button>
    </div>
</div>
`;

var avaliacao_solta_do_evento = `
<div id="avaliacao-evento" class="rating-mod card eventosav av-evento-full">
    <div hidden id="dados" dados='<%- JSON.stringify(dados) %>'></div>

    <div class="card-content nota">
        <label>Numa escala de 0 a 10, qual é a probabilidade de você nos recomendar a um amigo?</label>
        <% for (let i = 1; i < 11; i++) { %>
            <button class="<%= nota ? nota == i ? 'active' : null : null %>"
                onclick="Rating.select(this)">
                <%= i %>
            </button>
        <% } %>
    </div>

    <div class="card-action comentario">
            <textarea class="inputCustomizado materialize-textarea" placeholder="Comentário" required></textarea>
            <button class="enviarValido material-icons" onclick='envia_nota_evento(this, <%- JSON.stringify(dados) %>)'>send</button>
    </div>
</div>
`;

var avaliacao_feed_evento = `
<i class="material-icons small" id="top-icon" style="color: #24C2C5;">star</i>
        <div class="card-content nota">
            <div hidden id="dados" dados='<%- JSON.stringify(dados) %>'></div>
            <div class="row valign-wrapper mb-xs">
                <div class="col s2">
                    <div class="img-rounded av-evento-img" style="background-color: #781866 !important"><img src="./image/cubo_branco.png" alt=""></div>
                </div>
                <div class="col s10">
                    Live University
                </div>
            </div>
            <div class="row text-description">
                <div class="col s12">
                    <p>Numa escala de 0 a 10, qual é a probabilidade de você nos recomendar a um amigo?</p>
                </div>
            </div>
            <div class="row nota-buttons">
                <div class="col s12" style="display:flex !important; justify-content: space-around !important;">
                    <% for (let i = 1; i < 11; i++) { %>
                        <button class="<%= nota ? nota == i ? 'active' : null : null %>"
                            onclick="Rating.select(this)">
                            <%= i %>
                        </button>
                    <% } %>
                </div>
            </div>
        </div>
        <div class="card-action action-send comentario">
            <textarea class="inputCustomizado materialize-textarea" placeholder="Comentário" required></textarea>
            <button class="enviarValido material-icons text-muted" onclick='envia_nota_evento(this, <%- JSON.stringify(dados) %>)'>send</button>
        </div>
        `