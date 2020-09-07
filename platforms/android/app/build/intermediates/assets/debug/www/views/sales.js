/*
const sales_v = `
    <div id="navbar"></div>

    <div class="row">
        <div class="col s12">
            <div id="aula"></div>
        </div>

        <div class="col s12">
            <div id="view_modulos"></div>
        </div>
    </div>
`

function go_to_sales(ele) {
    manda_load()
    var dados = {}
    dados.id_projeto = ele.getAttribute('id-projeto');
    console.log(dados.id_projeto)
    dados.nome_curso = ele.getAttribute('nome-aula');
    dados.descricao_projeto = ele.getAttribute('descricao-projeto');
    dados.element_aula = '#aula'
    dados.element_modulo = '#view_modulos'
    
    get_modulo_aula_sales(dados, (gmas_cb) =>{
        if(gmas_cb != 'ok'){
            toasted('Ops! Não consegui carregar...')
            return
        }               
        
        resetSideNav();
        
        change_view(sales_v, true, true, null, nav_degrade_sales, { titulo: dados.nome_curso })
        
        M.updateTextFields();
        
        // renderizar componentes e inicializar collapsible
        $(document).ready(() => {
            renderizarAulaSales(dados)
            renderizarViewModulosSales(dados)
            
            $('.collapsible').collapsible()
        });
    })
}
*/