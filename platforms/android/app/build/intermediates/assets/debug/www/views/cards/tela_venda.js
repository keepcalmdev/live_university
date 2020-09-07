var tela_dados_venda = `

<div id='navbar'></div>

<div class="container">
    <div class="card eletivas-dados">
        <div class="card-content nova-eletiva">
            <div class="row eletiva-row">
                <img src="image/icons/grupos_orientador.svg" alt="">
                <span><%= duration %></span>
            </div>

            <div class="row eletiva-row">
                <img src="image/icons/eventos_calendario.svg" alt="">
                <span><%= subscription %></span></span>
            </div>

            <div class="row eletiva-row">
                <i class="material-icons small text-purple">attach_money</i>
                <span style="transform: translateX(-4%);"><%= price %></span></span>
            </div>
        </div>
        <div class="card-action eletiva-button" onclick="realizar_compra(<%= id_projeto%>)">
            <a href="#">COMPRAR</a>
        </div>
    </div>

    <div class="row footer-vendas centered">
        <div class="col s7 centered" style="transform: translateX(6%);" onclick="chama_politica_privacidade()">
        <span style="color: #781866 !important;">Politica de Privacidade</span>
        </div>
        <div class="col s5 centered" style="transform: translateX(3%);" onclick="chama_termos_uso()">
        <span style="color: #781866 !important;">Termos de Uso</span>
        </div>
    </div>
</div>

<div class="container info-adicionais">
    <div class="card-action eletiva-button">
        <span class="centered"><br>Informações Adicionais</span>
    </div>
    <ul style="padding: 0px 16px;">
        <li>• O pagamento será cobrado em sua conta do iTunes / PlayStore.</li><br>
        <li>• A assinatura é renovada automaticamente, a menos que a renovação automática seja desativada pelo menos 24 horas antes do final do período atual.</li><br>
        <li>• A conta será cobrada para renovação dentro de 24 horas antes do final do período atual e identificará o custo da renovação.</li><br>
        <li>• As assinaturas podem ser gerenciadas pelo usuário e a renovação automática pode ser desativada nas configurações da sua conta no iTunes / PlayStore.</li><br>
        <li>• Você não perderá nada de suas aulas de avaliação gratuita.</li><br>
    <ul>
</div>
<!--
<div class="container footer-mensagem-vendas">
    <div class="row">
        <span>* A renovação automática deverá ser desabilitada por conta do comprador.</span>
    </div>
    <div class="row">
        <% if(id_tipo_projeto == 31){%>
            <span>** A assinatura pode ser cancelada a qualquer momento pelo comprador.</span>
        <%}else{%>
        <%}%>    
    </div>
</div>
-->


`;

function chama_politica(){
    window.open(`https://liveuniversity.com/politica-de-privacidade-app/`)
}

function chama_termos(){
    window.open(`https://liveuniversity.com/termos-de-uso/`)
}