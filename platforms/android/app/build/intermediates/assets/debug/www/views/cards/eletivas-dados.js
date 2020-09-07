var eletivas_dados_v = `

<div id='navbar'></div>

<div class="container">



<%

var regra = (eletiva.id_tipo_projeto == 1) || (eletiva.id_tipo_projeto == 23) ? 'congressos' : 'workshop';

var eletiva_n = 'null';

if(eletiva.id_tipo_projeto == 1 || eletiva.id_tipo_projeto == 16 || eletiva.id_tipo_projeto == 23 || eletiva.id_tipo_projeto == 27 || eletiva.id_tipo_projeto == 32 || eletiva.id_tipo_projeto == 34 || eletiva.id_tipo_projeto == 26)
{
    eletiva_n = 1;
}else if(eletiva.id_tipo_projeto == 6 || eletiva.id_tipo_projeto == 26 || eletiva.id_tipo_projeto == 21)
{
    eletiva_n = 2;
}

var subscribe_ok = false;

if(regra == 'congressos'){
  if(saldo[0].Congresso >= eletiva_n){
    subscribe_ok = true;
  }
}else if(regra == 'workshop'){
  if(saldo[0].WorkShopCapacitacao >= eletiva_n){
    subscribe_ok = true;
  }
}

%>

    <div class="card eletivas-dados">
        <div class="card-content">
            <div class="row">
                <i class='material-icons medium purple-text'>business</i>
                <p class='grey-text text-darken-2'>
                    Escola: <span class='grey-text text-darken-2'><%= eletiva.Escola %></span>
                </p>
            </div>


            <div class="row">
                <img src="image/icons/eventos_calendario.svg" alt="">
                <p class='grey-text text-darken-2 lighten-2'>
                    Início: <span id='eletivas-eventos-inicio' class='grey-text text-darken-2'><%= eletiva.data_brasil %></span>
                <br/>
                    Fim: <span id="eletivas-eventos-fim" class='grey-text text-darken-2'><%= eletiva.data_fim %></span>
                </p>
            </div>
            <div class="row">


                <img src="image/icons/eventos_datas.svg" alt="">
                <p class='grey-text text-darken-2'>
                    Dias: <span id='eletivas-evento-dias' class='grey-text text-darken-2'><%= eletiva.dias_semana %></span>
                </p>
            </div>
        </div>

        <%
        if(eletiva.id_contato == null && subscribe_ok == true){
        %>
            <%
            if(eletiva.eletiva == 2){
            %>
                <div class="card-action" id-projeto='<%= eletiva.id_projeto %>' id-contato='<%= contato %>'>
                    <a id='eletivas-inscrever' href="#">ESGOTADO</a>
                </div>
            <%
            }else{
            %>
                <div class="card-action" id-projeto='<%= eletiva.id_projeto %>' id-contato='<%= contato %>' onclick='inscrever_eletiva(this)' >
                    <a id='eletivas-inscrever' href="#">ME INSCREVER</a>
                </div>
            <%}%>



        <%
        }else{
        %>
            <%
            if(eletiva.eletiva == 2){
            %>
                <div class="card-action" id-projeto='<%= eletiva.id_projeto %>' id-contato='<%= contato %>'>
                    <a id='eletivas-inscrever' href="#">ESGOTADO</a>
                </div>
            <%
            }
            %>
        <%
        }
        %>
    </div>
</div>

`;