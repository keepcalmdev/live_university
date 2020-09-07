
var action_v_jadeu = `
<div class="action card" style="top: 0px;">
    <div hidden id="dados" dados='<%- JSON.stringify(dados) %>'></div>

    <div onclick='open_checkin_bloqueado()' class="card-content">
        <div hidden id="dados" dados="<%- JSON.stringify(dados) %>"></div>
        <img src="img/icons/aula_presente.svg" alt="" />
        <i class="material-icons" id="mba-bloqueado-icon">error</i>        
        <%if(dados.formatura){%>
            <label>Check-in - Bloqueado</label>
        <%}else{%>    
            <label>Check-in - Bloqueado</label>
        <%}%>
        <i class="material-icons">chevron_right</i>
    </div>

    <!--<div onclick='pega_localizacao()' class="card-content">
        <div hidden id="dados"></div>
        <img src="img/icons/aula_presente.svg" alt="" />
        <label>Não Te Achei ? Clique Aqui !</label>
        <i class="material-icons">location_off</i>
    </div>-->
    
</div>
`;


var action_v = `
<div class="action card" style="top: 0px;">
    <div hidden id="dados" dados='<%- JSON.stringify(dados) %>'></div>

    <div onclick='envia_checkin(<%- JSON.stringify(dados) %>)' class="card-content">
        <div hidden id="dados" dados="<%- JSON.stringify(dados) %>"></div>
        <img src="img/icons/aula_presente.svg" alt="" />
        <%if(dados.formatura){%>
            <label>Confirmar Presença</label>
        <%}else{%>    
            <label>Fazer check-in</label>
        <%}%>
        <i class="material-icons">chevron_right</i>
    </div>

    <!--<div onclick='pega_localizacao()' class="card-content">
        <div hidden id="dados"></div>
        <img src="img/icons/aula_presente.svg" alt="" />
        <label>Não Te Achei ? Clique Aqui !</label>
        <i class="material-icons">location_off</i>
    </div>-->
    
</div>
`;


var action_v_ondemand = `
<div class="action card" style="top: 0px;">          
    <div onclick='get_dados_aula_ondemand_learnets(<%= id_ondemand_aula%>, <%= id_ondemand_projeto%>)' class="card-content">        
        <img style="width: 40px; height: 40px;" src="img/icons/play.svg" alt="" />
        <label>Abrir Aula Ondemand</label>
        <i class="material-icons">chevron_right</i>
    </div>

    <!--<div onclick='pega_localizacao()' class="card-content">
        <div hidden id="dados"></div>
        <img src="img/icons/aula_presente.svg" alt="" />
        <label>Não Te Achei ? Clique Aqui !</label>
        <i class="material-icons">location_off</i>
    </div>-->
    
</div>
`;


