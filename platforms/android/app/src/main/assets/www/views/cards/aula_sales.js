const aula_sales = `
    <section id="aula_sales">
        <div class="card">
            <div class="card-curso">
                <figure class="margin-0">
                    <div class="foto">
                        <img class='capa_ondemand' id="capa-<%= card.id_projeto%>" src="image/capas/<%= card.id_projeto%>.svg">

                        <%
                                var capa_svg = new Image();

                                capa_svg.src = 'image/capas/'+card.id_projeto+'.svg';

                                capa_svg.onerror = function(){
                                    document.getElementById('capa-' + card.id_projeto).src = 'image/capas/default.svg';
                                }

                            %>

                    </div>
                </figure>

                <div class="conteudo">
                    <button class="w100 white-text flex ai-cen jc-cen" onclick="inscrever_sales(<%= card.id_projeto%>)">
                        <i class="white-text material-icons">play_arrow</i>&nbsp;Assistir aula
                    </button>

                    <p class="margin-0 grey-text"><%= card.descricao_projeto%></p>
                </div>
            </div>
        </div>
    </section>
`
/*
function inscrever_sales(id_projeto){
    manda_load()
    var dados = {}
    dados.id_contato = get_data('geral').id
    dados.nome = get_data('geral').nome
    dados.id_login_portal = get_data('geral').id_login_portal ? get_data('geral').id_login_portal : 0
    dados.senha = get_data('geral').login.senha
    dados.id_projeto = id_projeto
    dados.email = get_data('geral').email

    console.log(dados)
    set_trial_sales(dados, (cb) => {
        if(cb == 'ok'){            
            load_curso_ondemand_sales(id_projeto)
            return
        }
        toasted('Ops! Erro na inscrição')
        go_to_home_sales()        
    })


}
*/

function renderizarAulaSales(dados) {
    document.querySelector(dados.element_aula).innerHTML = ejs.render(aula_sales, {
        card: dados
    })
}