var modulo_ondemand_v = `
<br>
<%

if(ativo != null){
    ativo = parseInt(ativo);
}else{
    var ativo = 0;
}

var modulos_count = [];

%>
    <select id='<%= data[ativo].id_ondemand_modulo %>' class='combo-box-init'>
      <% for(i=0; i<data.length; i++){ %>

            <% var count = i + 1; %>

            <% if(modulos_count.includes(data[i].id_ondemand_modulo)){ %>
            <% }else{ %>

                <% if(i == ativo){ %>
                    <option value='<%= data[i].id_ondemand_modulo %>' selected ><%= data[i].modulo %></option>
                <% }else{ %>
                    <option value='<%= data[i].id_ondemand_modulo %>'> <%= data[i].modulo %> </option>
                <% } %>
                
                <% modulos_count.push(data[i].id_ondemand_modulo) %>
            <% } %>

        <% } %>
    </select>



<%
var modulo_ativo = lista[active].id_ondemand_modulo;

for(k=0; k<lista.length; k++){
    if(lista[k].id_ondemand_modulo == modulo_ativo){

if(k < 10){
    var count = '0' + (k + 1);
}else{
    var count = k + 1;
}

var icon = "video_play_white";
if(lista[k].assistiu_video == null){
    icon = "video_play_white";
}else if(lista[k].assistiu_video == 1 && (lista[k].upload_atividade == null || lista[k].upload_atividade == 0) ){
    icon = "video_alerta_white";
}else if(lista[k].assistiu_video == 1 && lista[k].upload_atividade > 0){
    icon = "video_check_white";
}

%>

        <div id='aula-<%= lista[k].id_ondemand_aula %>' class="card horizontal ondemand">
            <div class="ondemand-image" style="background-image: url(image/thumbnail.svg)">
                <a href=""></a>
                <a href=""></a>
                <img src="image/icons/video_check_white.svg" alt="">
            </div>
            <div class="card-stacked">
                <div class="ondemand-content">
                <div class="text">
                    <p class="ondemand-title">Aula <%= count %></p>
                    <p class="ondemand-time">20 min</p>
                </div>
                <div class="icon">
                    <img src="image/icons/<%= icon %>" alt="">
                </div>
                </div>
            </div>
        </div>

<%
    }
}
%>

<style>

<%
for(t=0; t<lista.length; t++){
    if(lista[t].id_ondemand_modulo == modulo_ativo){
    var percentage = "0";
if(lista[t].perc_tempo_visualizacao_max != null || lista[t].perc_tempo_visualizacao_max == "null"){
    var percentage = parseInt(lista[t].perc_tempo_visualizacao_max);
}

%>
    #aula-<%= lista[t].id_ondemand_aula %>:after{
        width: <%= percentage %>% !important;
    }

<%
    }
}
%>

</style>
`;