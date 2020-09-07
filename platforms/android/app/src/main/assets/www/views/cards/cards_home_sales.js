const cards_home_sales = `
    <div id="cards_home_sales">
        <% cards.forEach(card => { %>
            <div class="card" id-area="<%= card.id_area%>" id-projeto="<%= card.id_projeto%>" descricao-projeto="<%= card.descricao_projeto%>" nome-aula="<%= card.nome%>" onclick="go_to_sales(this)">
                <div class="card-curso">
                    <figure>
                        <div class="foto">
                            <img class='capa_ondemand' id="capa-<%= card.id_projeto%>" src="image/capas/<%= card.id_projeto%>.svg" alt="">

                            <%
                                var capa_svg = new Image();

                                capa_svg.src = 'image/capas/'+card.id_projeto+'.svg';

                                capa_svg.onerror = function(){
                                    document.getElementById('capa-' + card.id_projeto).src = 'image/capas/default.svg';
                                }

                            %>

                            <i class="play material-icons">play_circle_outline</i>
                        </div>

                        <figcaption class="grey-text text-darken-2"><%= card.nome %></figcaption>
                    </figure>
                </div>
            </div>
        <% }) %>
    </div>
`

function renderizarCardsHomeSales(elemento) {
    var lista = []

    get_catalogo_sales(function(results){
        console.log(results)
        for(var i = 0; i < results.length; i++){
            var a = {}
            a.nome = results[i].nome_projeto
            a.id_projeto = results[i].id_projeto
            a.id_tipo_projeto = results[i].id_tipo_projeto
            a.valor = results[i].valor
            a.descricao_projeto = results[i].descricao_projeto
            a.id_area = results[i].id_area
            lista.push(a)
        }

        document.querySelector(elemento).innerHTML = ejs.render(cards_home_sales, {
            cards: lista
        })


    })        
       
}