var combo_box_v = `
<%

if(ativo){
    ativo = parseInt(ativo);
}else{
    var ativo = 0;
}

var modulos_count = [];

var modulo_ativo = data[ativo].id_ondemand_modulo;

%>
    <div class="combo_center combo-ondemand">
        <div class="combo">
            <div class="c_box">
                <div id="choose"></div>
                <i class="material-icons">keyboard_arrow_down</i>
            </div>
            <div class="option_box" style="height: 330px">
                <ul class="lista_in">
                    <% for(i=0; i < data.length; i++){ %>
                        <% if(modulos_count.includes(data[i].id_ondemand_modulo)){ %>
                        <% }else{ %>
                            <% if(data[i].id_ondemand_modulo == modulo_ativo){ %>
                                <li class="modulo_ativo" onclick="mudar_modulo(<%= projeto %>, <%= data[i].id_ondemand_modulo %>)"><%= data[i].modulo %></li>
                            <% }else{ %>
                                <li onclick="mudar_modulo(<%= projeto %>, <%= data[i].id_ondemand_modulo %>)"><%= data[i].modulo %></li>
                            <% } %>
                        <% } %>
                        <% modulos_count.push(data[i].id_ondemand_modulo) %>
                    <% } %>
                </ul>
            </div>
        </div>
    </div>

`;

function combo_box_init() {
    if(document.querySelector('.modulo_ativo')){
        var m = document.querySelector('.modulo_ativo').innerText
        document.querySelector('#choose').innerText = m
    } else {
        var m = document.querySelector('.lista_in li').innerText
        document.querySelector('.lista_in li').classList.add('modulo_ativo')
        document.querySelector('#choose').innerText = m
    }

    document.querySelectorAll('.c_box').forEach(function (ele) {
        ele.addEventListener('click', function (ev) {
            ele.parentNode.querySelector('.option_box').classList.add('show')
        })
    })

    document.querySelectorAll('.combo .lista_in li').forEach(function (ele) {
        ele.addEventListener('click', function (ev) {
            this.parentNode.parentNode.parentNode.querySelector('#choose').innerText = this.innerText
            this.parentNode.classList.remove('show')
        })
    })
}

function mudar_modulo(projeto, id) {
    window.scrollTo(0,0);
    go_to_modulo_ondemand(projeto, id);
}