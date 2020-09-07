var financeiro_v = `
    <section class="financeiro">
        <div class="row">
            <% financas.forEach(financa => { %>
                <div class="col s12 padding-0">
                    <article id="financa-<%= financa.id_pagamento %>" class="item tooltipped">
                        <div class="card white">
                            <div class="card-content" onclick="open_boleto(<%= financa.id_pedido%>, <%= financa.id_pagamento%>, <%= financa.id_status_pagamento%>, <%= financa.id_debito_meiopagamento%>)">
                                <div class="flex ai-cen">
                                    <div class="flex-1 grid">
                                        <img src="<%= financa.caminho_icone %>">
                                    </div>

                                    <div class="descricao flex-6">
                                        <p>
                                            <span class="valor">R$ <%= financa.valor_formatado %></span><br>
                                            <span class="texto grey-text"><%= financa.descricao %></span>
                                            <span class="data grey-text"><%= financa.data_vencimento_formatada %></span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <% if(financa.status == statusFinanca.PAGO){ %>
                                <div class="card-action">
                                    <details>
                                        <summary>Recibo / NF <i class="material-icons"></i></summary>

                                        <ul>
                                            <li>
                                                <a href="javascript:void(0)"
                                                onclick="acessarFinanca(this)"
                                                data-status="<%= financa.status %>"
                                                data-id-pagamento="<%= financa.id_pagamento %>"
                                                data-id-pedido="<%= financa.id_pedido %>"
                                                data-id-meio-pagamento="<%= financa.id_debito_meiopagamento %>">Recibo</a>
                                            </li>
                                            <% if(financa.link_nf){ %>
                                                <li><a href="javascript:void(0)" onclick="window.open('<%= financa.link_nf %>')">Nota Fiscal</a></li>
                                            <% } %>
                                        </ul>
                                    </details>
                                </div>
                            <% } %>
                        </div>
                    </article>
                </div>
            <% }) %>
        </div>
    </section>
`

const statusFinanca = Object.freeze({
    PAGO: 1,
    NAO_PAGO: 2,
    ATRASADO: 3
})

function renderizarFinanceiro(idElemento, grupo) {
    var dados = {}
    dados.id_contato = get_data('geral').id
    dados.id_grupo = grupo
        
    get_pagamentos(dados, function(resposta) {
        console.log(resposta)
        let financas = obterFinancas(resposta);
        // ordena da data_vencimento mais antiga para a mais nova
        financas.sort((a, b) => a.data_vencimento - b.data_vencimento)

        document.querySelector(idElemento).innerHTML = ejs.render(financeiro_v, { financas, statusFinanca })

        const financaMesVigente = obterFinancaMesVigente(financas)
        definirScrollEmFinancaMesVigente(financaMesVigente);
    })
}

function definirScrollEmFinancaMesVigente(financaMesVigente) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === "class") {
                const attributeValue = $(mutation.target).prop(mutation.attributeName);
                if (attributeValue == 'active' && financaMesVigente) {
                    document.querySelector('body').scrollTop =
                        document.querySelector(`#financa-${financaMesVigente.id_pagamento}`).offsetTop - 120;
                }
            }
        });
    });
    observer.observe(document.getElementById('financeiro'), { attributes: true });
}

function obterFinancaMesVigente(financas) {
    let hoje = new Date()

    const financaComDataVencimentoIgualAHoje = financa => financa.data_vencimento.toLocaleDateString() == hoje.toLocaleDateString()
    const financaComDataVencimentoNoMesVigente = financa => {
        let dataVencimento = financa.data_vencimento
        return dataVencimento.getMonth() == hoje.getMonth() && dataVencimento.getFullYear() == hoje.getFullYear()
    }

    let financaMesVigente = financas.find(financaComDataVencimentoIgualAHoje)
    financaMesVigente = financaMesVigente ? financaMesVigente : financas.find(financaComDataVencimentoNoMesVigente)

    return financaMesVigente
}

function obterFinancas(resposta) {
    return resposta.map(item => {
        const status = obterStatusFinanca(item)

        return {
            id_pagamento: item.id_pagamento,
            id_pedido: item.id_pedido,
            status,
            data_vencimento: new Date(item.data_vencimento),
            data_vencimento_formatada: formatarDate(new Date(item.data_vencimento)),
            valor_formatado: valorParaReal(item.valor),
            descricao: obterDescricao(status),
            caminho_icone: obterCaminhoIcone(status, item.id_debito_meiopagamento),
            id_debito_meiopagamento: item.id_debito_meiopagamento,
            link_nf: item.link_nf,
            id_status_pagamento: item.id_status_pagamento
        }
    })
}

function obterDescricao(status) {
    switch (status) {
        case statusFinanca.PAGO:
            return 'Pago'
        case statusFinanca.ATRASADO:
            return 'Em Atraso'
        case statusFinanca.NAO_PAGO:
            return null
        default:
            console.log('Valor de status inválido')
            return
    }
}

function obterStatusFinanca(financa) {
    if (financa.id_status_pagamento == 6) {
        return statusFinanca.PAGO
    } else
    if (financa.id_status_pagamento == 1 && new Date(financa.data_vencimento) < new Date()) {
        return statusFinanca.ATRASADO
    } else {
        return statusFinanca.NAO_PAGO
    }
}

function obterCaminhoIcone(status, id_debito) {
    const icons = '../www/image/icons'

    //boleto
    if(id_debito == 7){
        switch (status) {
            case statusFinanca.PAGO:
                return `${icons}/financeiro_recibo.svg`
            case statusFinanca.NAO_PAGO:
                return `${icons}/financeiro_boleto.svg`
            case statusFinanca.ATRASADO:
                return `${icons}/financeiro_atrasado.svg`
            default:
                console.log('Valor de status inválido')
                return
        }
    }

    //cartao
    if(id_debito == 3){
        switch (status) {
            case statusFinanca.PAGO:
                return `${icons}/financeiro_recibo.svg`
            case statusFinanca.NAO_PAGO:
                return `${icons}/financeiro_cartao.svg`
            case statusFinanca.ATRASADO:
                return `${icons}/financeiro_atrasado.svg`
            default:
                console.log('Valor de status inválido')
                return
        }
    }

    //doc
    if(id_debito == 1){
        switch (status) {
            case statusFinanca.PAGO:
                return `${icons}/financeiro_recibo.svg`
            case statusFinanca.NAO_PAGO:
                return `${icons}/financeiro_cartao.svg`
            case statusFinanca.ATRASADO:
                return `${icons}/financeiro_atrasado.svg`
            default:
                console.log('Valor de status inválido')
                return
        }
    }

}

function valorParaReal(valor) {
    let numero = valor.toFixed(2).split('.')
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.')
    return numero.join(',')
}

function formatarDate(date) {
    date.setDate(date.getDate() + 1)
    let dia = date.getDate().toString()
    dia = dia.length == 1 ? '0' + dia : dia
    let mes = (date.getMonth() + 1).toString()
    mes = mes.length == 1 ? '0' + mes : mes

    let ano = date.getFullYear()

    return `${dia}/${mes}/${ano}`
}

function open_boleto(id_pedido, id_pagamento, id_status, meio_pagamento){
    if(meio_pagamento == 7 && id_status != 6){
        window.open(`http://boleto.liveuniversity.com:8145/boleto/${id_pedido}/${id_pagamento}`)
    }
}

function acessarFinanca(elemento) {
    const status = parseInt(elemento.getAttribute('data-status'))
    const idPagamento = parseInt(elemento.getAttribute('data-id-pagamento'))
    const idPedido = parseInt(elemento.getAttribute('data-id-pedido'))
    const id_meio_pagamento = parseInt(elemento.getAttribute('data-id-meio-pagamento'))

    if(id_meio_pagamento == 7){
        switch (status) {
            case statusFinanca.PAGO:
                get_recibo(idPagamento,
                    resposta => window.open(resposta),
                    erro => {
                        console.log(erro)
                        M.toast({html: 'Erro ao gerar recibo'})
                    }
                )
                break
            case statusFinanca.NAO_PAGO:
            case statusFinanca.ATRASADO:
                window.open(`http://sic.febracorp.org.br/cadastro/geraboleto-1157.php?id_pagamento=${idPagamento}&id_pedido=${idPedido}`)
                break
            default:
                console.log('Valor do status inválido')
        }
    }else{
        switch (status) {
            case statusFinanca.PAGO:
                get_recibo(idPagamento,
                    resposta => window.open(resposta),
                    erro => {
                        console.log(erro)
                        M.toast({html: 'Erro ao gerar recibo'})
                    }
                )
                break
            case statusFinanca.NAO_PAGO:
            case statusFinanca.ATRASADO:
            default:
                console.log('Valor do status inválido')
        }
    }
}