var new_home_item_v = `
    <% for(const curso of cursos) { %>
        <div class="curso-item carousel-item" id-projeto="<%= curso.id_projeto %>" data-area="<%= curso.desc_area %>">
            <div class="card curso curso-medio" id-projeto="<%= curso.id_projeto%>" onclick="open_home_sale(this)" style="background-image: url('image/fundo_card_pos_graduacao.svg')">
                <div class="heart"></div>
                <div class="live-mark"></div>
                <div class="titulo">
                    <%- titleize(curso.nome_projeto) %>
                </div>
            </div>
        </div>
    <% } %>
    <h3 style='display: none' class='area-vazia'>Não cursos para essa área</h3>
`