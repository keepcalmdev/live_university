const meus_eventos_v = `
<section id="navbar"></section>

<!-- TAG TESTE SCROLLUP -->
<span id="id_projeto_evento" style="display: none;"></span>

<section id="all_tabs" style="
    margin-top: 116px;
">
    <div id="tab_feed"></div>

    <div id="tab_agenda"></div>

    <div id="tab_credencial"></div>
</section>
`

function go_to_meus_eventos(id_projeto) {    
    
    clearTimeout(atual_palestras)   
    manda_load();
    resetSideNav();    

    let dadosCredencial = {};

    get_descricao_projeto(id_projeto, resposta => {
        //var dados = {}
        //dados.id_projeto = id_projeto
        if(!resposta){
            var resposta = {}
            resposta.descricao_projeto = ''
        }
        set_data('id-projeto-'+id_projeto, JSON.stringify(resposta))
        set_data('id-projeto-envento', JSON.stringify(resposta))
        console.log('debug eventos:')
        console.log(resposta)
        dadosCredencial.descricaoProjeto = resposta.descricao_projeto
        dadosCredencial.id_projeto = id_projeto

        change_view(meus_eventos_v, true, true, null, navbar_comum_com_tabs_v, 
            { 
                titulo: resposta.nome_projeto,
                tabs: [
                    {
                        etiqueta: 'Feed',
                        identificadorCss: '#tab_feed',
                        ativo: true
                    },
                    {
                        etiqueta: 'Agenda',
                        identificadorCss: '#tab_agenda'
                    },
                    {
                        etiqueta: 'Credencial',
                        identificadorCss: '#tab_credencial' 
                    }
                ]
            }
        )
    
        M.updateTextFields();
    
        $(document).ready(() => {
            $('.tabs').tabs()
    
            renderizarMeusEventosAgenda('#tab_agenda')
            require_loader('open')
            
            get_qrcode_credencial(resposta => {
                dadosCredencial.linkQRCode = resposta   
                    
                    renderizarMeusEventosCredencial('#tab_credencial', dadosCredencial)
                    
                
                    renderizar_feed('#tab_feed', id_projeto)

                    $('body').css('background-color', 'white');
                  
            })
        });

    })      

}