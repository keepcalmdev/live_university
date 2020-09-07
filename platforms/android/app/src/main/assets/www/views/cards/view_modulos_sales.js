const view_modulos_sales = `
    <section id="view_modulos_sales">
        <% for (var x in aulas) { %>
            <ul class="modulo collapsible">
                <li class="pos-rel border-rad-inh">
                    <div class="decoracao pos-abs h100 top-0 left-0"></div>
                    <div class="collapsible-header padding-bottom-0 border-rad-inh">
                        <div class="cabecalho w100">
                            <div class="conteudo flex">
                                <img src="image/capas/default.svg">

                                <div class="flex-3 flex fd-col">
                                    <strong class="ellipses-3 margin-0">Módulo: <%= aulas[x].modulo%></strong>

                                    <p class="grey-text ellipses-2 margin-0"><%= aulas[x].descricao_modulo%></p>
                                </div>
                            </div>

                            <div class="text-right box-alternadorCorpo">
                                <i class="abrir material-icons margin-0">keyboard_arrow_down</i>
                                <i class="fechar material-icons margin-0">keyboard_arrow_up</i>
                            </div>
                        </div>
                    </div>

                    <div class="modulo-corpo collapsible-body">
                        <ul>
                            <% for (var y in aulas[x].aulas) { %>    
                                <li class="aula">
                                    <div class="conteudo flex">
                                        <div class="capaVideo pos-rel" onclick="inscrever_sales(<%= id_projeto%>)">
                                            <div class="box-iconePlay pos-abs right-0 bottom-0 flex">
                                                <i class="white-text material-icons">play_circle_outline</i>
                                            </div>
                                        </div>

                                        <div class="flex-1 flex fd-col">
                                        <strong class="ellipses-3"><%= aulas[x].aulas[y].aula%></strong>
                                            <span class="grey-text"><%= aulas[x].aulas[y].descricao%></span>
                                        </div>
                                    </div>
                                </li>
                            <% } %>
                        </ul>
                    </div>
                </li>
            </ul>
        <% } %>
    </section>
`

function renderizarViewModulosSales(dados) {
    var aulas = get_data('sales')
    //console.log(aulas)
    

    document.querySelector(dados.element_modulo).innerHTML = ejs.render(view_modulos_sales, {
        aulas: aulas,
        id_projeto: dados.id_projeto
    })
}