var lesson_v = `
<div style="margin-top: 270px"></div>
<%
var modulo_ativo = lista[active].id_ondemand_modulo;
var trial = lista[active].trial;
var assistir_trial = lista[active].assistir_trial
var limite_trial = lista[active].limite_trial;
var count = 0;
for(k=0; k<lista.length; k++){
    if(lista[k].id_ondemand_modulo == modulo_ativo){

count ++;

var icon = "video_play_white";
if(lista[k].assistiu_video == null){
    icon = "video_play_white";
}else if(lista[k].assistiu_video == 1 && lista[k].upload_atividade == 0){
    icon = "video_alerta_white";
}else if(lista[k].assistiu_video == 1 && lista[k].upload_atividade > 0){
    icon = "video_check_white";
}

%>
<% if(trial == 1){ %>
    <%
    if(lista[k].status_aula == 'trial'){
    %>

        <div id='aula-<%= lista[k].id_ondemand_aula %>' ordem='<%= lista[k].ordem %>' id-aula='<%= lista[k].id_ondemand_aula %>' id-projeto='<%= id_projeto %>' onclick='get_dados_aula_ondemand(this)' id-modulo="<%= modulo_ativo %>" class="card horizontal ondemand">
        <div class="ondemand-image" style="background-image: url(image/thumbnail.svg)">        
        <a href=""></a>
        <a href=""></a>
        <img src="image/icons/<%= icon %>.svg" alt="">
        <div class="aula-ondemand-count"><%= count %></div>

    <% }else{ %>      
            
            <div id='aula-<%= lista[k].id_ondemand_aula %>' ordem='<%= lista[k].ordem %>' id-aula='<%= lista[k].id_ondemand_aula %>' id-projeto='<%= id_projeto %>' onclick='comprar(<%= id_projeto %>)' id-modulo="<%= modulo_ativo %>" class="card horizontal ondemand">
            <div class="ondemand-image" style="background-image: url(image/thumbnail_trial.svg)">    
            <a href=""></a>
            <a href=""></a>            
            <div class="aula-ondemand-count"><img src="image/icons/shopping.svg" alt="" style="position: initial !important;"></div>        
            
    <% } %>    

<% }else{ %>
    <div id='aula-<%= lista[k].id_ondemand_aula %>' ordem='<%= lista[k].ordem %>' id-aula='<%= lista[k].id_ondemand_aula %>' id-projeto='<%= id_projeto %>' onclick='get_dados_aula_ondemand(this)' id-modulo="<%= modulo_ativo %>" class="card horizontal ondemand">
    <div class="ondemand-image" style="background-image: url(image/thumbnail.svg)">
    <a href=""></a>
    <a href=""></a>
    <img src="image/icons/<%= icon %>.svg" alt="">
    <div class="aula-ondemand-count"><%= count %></div>
<% } %>

    
    
    </div>
    <div class="card-stacked">
    <div class="ondemand-content">
    <div class="text">
    <!-- <p class="ondemand-title">Aula <%= count %></p> -->
    <p class="ondemand-title"><%= lista[k].aula %></p>
    <!-- <p class="ondemand-time">20 min</p> -->
    </div>
    <div class="icon">
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