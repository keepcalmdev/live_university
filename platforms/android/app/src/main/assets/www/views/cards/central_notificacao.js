var central_notificacao_v = `

<div id="navbar">
</div>

<div class="central-notif">    

    <% if(Date.prototype.diff){         
    }else{
        Object.defineProperty(Date.prototype,"diff",{
            writable: false, configurable: false, enumerable: true,
    
            /**
             * Returns the difference between two Date objects.
             * @param {Date} The date to compare to.
             * @return {Object}
             * @throws {TypeError}
             */
            value: function(date) {
                if (date instanceof Date){
                    var ms = this-date;
                    var diff = {};
    
                    for ( diff.years = 0; ms>=31536000000; diff.years++, ms -= 31536000000);
                    for ( diff.months = 0; ms>=2628000000; diff.months++, ms -= 2628000000);
                    for ( diff.days = 0; ms>=86400000; diff.days++, ms -= 86400000);
                    for ( diff.hours = 0; ms>=3600000; diff.hours++, ms -= 3600000);
                    for ( diff.minutes = 0; ms>=60000; diff.minutes++, ms -= 60000);
                    for ( diff.seconds = 0; ms>=1000; diff.seconds++, ms -= 1000);
                    diff.milliseconds = ms;
    
                    return diff;
                }
    
                throw new TypeError("invalid date");
            }
        });
    }
    %>

    <% dados.forEach(function(dado){ %>       
            <% var data = dado.data_ocorrencia %>
            <% data = data.replace(/Z/g, "");%>           

            <% var date = new Date(); %>
            <% var diff = date.diff(new Date(data)) %>           
            
            <% var date = new Date(); %>
            <% var diff = date.diff(new Date(data)) %>
            <% 
            if(diff.months > 0){
                var horarios = diff.months + ' Mês(es)'
            }else{
                if(diff.days > 0){
                    if(diff.days == 1){
                        var horarios = 'Ontem'
                    }else{
                        var semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
                        var d = new Date(data)
                        var horarios = semana[d.getDay()] + ' | ' + diff.days + 'd'
                    }                  
                }else{
                    if(diff.hours > 0){
                        var horarios = diff.hours + 'h'
                    }else{
                        if(diff.minutes > 0){
                            var horarios = diff.minutes + 'min'
                        }else{
                            var horarios = '0min'
                        }
                    }
                }
            }            
            %>

            

            <%if(dado.status == 1){%>
                <%if(dado.tem_acao == 1){%>
                    <div id="card-notificacao-<%= dado.id_notificacao%>" onclick="<%= dado.acao%>;" class="negritao">    
                <%}else{%>
                    <div id="card-notificacao-<%= dado.id_notificacao%>" onclick="clicou_notif(<%= dado.id_notificacao%>);" class="negritao">    
                <%}%>   
            <%}else{%>
                <div id="card-notificacao-<%= dado.id_notificacao%>">    
            <%}%>
        
        <hr>
            <div class="horario-notif right-align text-muted right-align right"><%= horarios%></div><br>
                <div id="notificacao-001" class="n-row">
                    <div class="n-col-left icone-notif">
                        <i class="material-icons notify-icon-tamanho"><%= dado.icone%></i>
                    </div>
                <div class="n-col-right texto-notificacao">
                    <div class="titulo-notif font-bold"><p><%= dado.titulo%></p></div>
                    <div class="descr-notif"><p><%= dado.texto%></p></div>
                </div>
            </div>
        </div>
    <% }); %>    
    <hr>

    <div id="modal-leitura-notificacao" class="modal">
        <div class="modal-content center" style="margin-bottom: 2%;">
            <span style="font-weight: bold;">Marcar como lida ?</span><br>                        
        </div>
        <div class="center" style="margin-top: -6%; margin-bottom: 4%;">
        <i class="material-icons modal-close" style="color: red; font-size: 35px;">clear</i>
        <i class="material-icons modal-close" style="color: green; font-size: 35px; margin-left: 10%;" onclick="le_notificacao()">check</i>        
        </div>
    </div>
    
</div>

<style>

    #modal-leitura-notificacao {
        top: 30% !important;
        border-radius: 13px !important;
    }    

    .notify-icon-tamanho {
        font-size: 230%;
    }

    .texto-notificacao {
        font-size: 13px;
    }

    .central-notif {
        margin-top: 100px;
    }

    .central-notif .horario-notif {
        font-size: 11px;
        margin-right: 9px;
    }

    .central-notif .n-col-left {
        display: table-cell;
        vertical-align: middle;
        width: 20%;
    }

    .central-notif .n-col-right {
        display: table-cell;
        vertical-align: middle;
        width: 80%;
    }

    .central-notif .icone-notif i {
        margin-left: 21px;
        margin-right: 21px;
        margin-top: -7px;
        color: #781866;
    }

    .central-notif .titulo-notif p {
        display: inline;
        margin-top: 2px;
        margin-bottom: -11px;
        color: #781866;
    }

    .central-notif .descr-notif p {
        margin-top: 0;
        margin-right: 21px;
        min-width: 200px;
    }

    .central-notif hr {
        background-color: lightgray;
        color: lightgray;
        opacity: 0.25;
        /* width: 100%; */
    }

    .central-notif .n-row {
        display: table-row;
        width: 100%;
        height: 100%;        
    }
    .negritao{
        font-weight: bolder !important;
    }
</style>
`;

var id_notificacao_global = 0 

function clicou_notif(notif_id) {
    //alert("notificacao-" + notif_id);
    id_notificacao_global = notif_id
    $('.modal').modal();
    $('#modal-leitura-notificacao').modal('open');
}

function le_notificacao(){
    require_loader('open')

    var dados = {}
    dados.id_notificacao = id_notificacao_global
    dados.id_contato = get_data('geral').id

    set_leitura_notificacao(dados, function (cb){
        if(cb == 'ok'){
            require_loader('close')
            $('#card-notificacao-' + id_notificacao_global).attr('style', 'font-weight: normal !important;')
            toasted('Notificação Lida')
        }else{
            require_loader('close')
            toasted('Ops, Algo deu errado !')
        }
    })

}
