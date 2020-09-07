var notas_e_faltas_v = `
<%
if(notas){
    console.log(notas)
    for(i=0; i<notas.length; i++){
        if(notas[i].descricao == 'Formatura'){

        }else{

        

        let faltas = 0;

        for(g=0; g<notas[i].dia.length; g++){
            if(notas[i].dia[g].presenca == false){
            faltas++;
            }
        }

        let estourou_limite = '';
        if(faltas > notas[i].limite){
            estourou_limite = 'limite-estourado';
        }

        let aviso = '';
        if(faltas > notas[i].limite){
            aviso = 'Você estourou o limite de faltas!';
            }else if(faltas == notas[i].limite){
                var last_pos = notas[i].dia.length - 1
                console.log(notas[i].dia[last_pos])
                var ultima_data = notas[i].dia[last_pos].dia        
                var meia_mes = ultima_data.substring(3)
                var meia_dia = ultima_data.substring(0,2)
                var ano = notas[i].dia[last_pos].ano
                var meia_data = meia_mes + '/' + meia_dia + '/' + ano
                var data_final = new Date(meia_data)
                var data_atual = new Date()
                if(data_final > data_atual){
                    aviso = 'Cuidado! Você não pode mais faltar nesse módulo!';
                }else{
                    aviso = '';
                }

            }

%>

        <div id='<%= notas[i].id_modulo %>' class="notas-e-faltas card <%= estourou_limite %>">
            <div class="card-content">
                    <div class="notas-e-faltas-nota"><%= notas[i].nota %></div>
                    <div class="notas-e-faltas-aula"><%= notas[i].descricao %></div>
            </div>
            <div class="card-action">
                <div class="notas-e-faltas-diario">

    <%
    for(k=0; k<notas[i].dia.length; k++){

    let faltou = '';
    if(notas[i].dia[k].presenca == null){
    }else if(notas[i].dia[k].presenca == true){
        faltou = 'presente';
    }else if(notas[i].dia[k].presenca == false){
        faltou = 'faltou';
    }

    let dia_semana = '';

    switch(notas[i].dia[k].semana){
        case 'Seg':
            dia_semana = 'Segunda-Feira';
            break;
        case 'Ter':
            dia_semana = 'Terça-Feira';
            break;
        case 'Qua':
            dia_semana = 'Quarta-Feira';
            break;
        case 'Qui':
            dia_semana = 'Quinta-Feira';
            break;
        case 'Sex':
            dia_semana = 'Sexta-Feira';
            break;
        case 'Sab':
            dia_semana = 'Sábado';
            break;
        case 'Dom':
            dia_semana = 'Domingo';
    }

    %>

        <div id='<%= notas[i].dia[k].id_calendario %>' class="faltas-item <%= faltou %>">
                <div class="faltas-aula-data">
                    <div><%= dia_semana %></div>
                    <span><%= notas[i].dia[k].dia %></span>
                </div>
        </div>


    <%
    }
    %>
                </div>

                <div class="notas-e-faltas-aviso">
                    <%= aviso %>
                </div>
                <div class="notas-e-faltas-limite">
                    Limite de faltas: <span id='numero-de-faltas'><%- notas[i].limite %></span>
                </div>


            </div>
        </div>

<%
        }
    }
}
%>

`;

var notas_e_faltas_v_learnets = `
<%
if(notas){
    console.log(notas)
    for(i=0; i<notas.length; i++){     
        let faltas = 0    
        let estourou_limite = '';
        let aviso = '';

%>

<div class="notas-e-faltas card">
    <div class="row card-content" style="margin-bottom: 0%;">
        <div class="col s6 notas-e-faltas-nota" style="font-size: 17px !important;"><%= notas[i].key%></div>
        <div class="col s6 notas-e-faltas-aula" style="font-size:18px !important; color: #781866; display: flex; justify-content: flex-end;"><%= notas[i].summary.score.done%>/<%= notas[i].summary.score.total%></div>
    </div>
    <div class="card-action" style="min-height: 100px !important;">
        
            <div class="row">
            <%for(var j=0; j<notas[i].items.length; j++){%>
                <%if(notas[i].items[j].key){%>                    
                        <div class="row col s12 fundo_macromodulo_learnets">
                            <div class="row col s12 abre_macromodulo_learnets" style="margin-bottom: 0px !important;">
                                <div class="col s8" style="margin-left: -15px; margin-bottom: 10px;" onclick="exibe_esconde(<%=j%>)">
                                    <b><%= notas[i].items[j].key%>                                
                                </div>    
                                <div class="col s4" style="display: flex; justify-content: flex-end;padding-right: 0px !important;align-items: flex-end;">
                                    <%= notas[i].items[j].summary.score.done%>/<%= notas[i].items[j].summary.score.total%></b>
                                </div>      
                                <div class="row macromodulo" id="<%=j%>">
                                    <%for(var z=0; z<notas[i].items[j].items.length; z++){%>
                                        <div class="row col s12 fundo-aula-learnets">
                                            <div class="col s12">
                                                <%= notas[i].items[j].items[z].aula%>                                            
                                            </div>  
                                            <div class="col s6" style="margin-top: 5px;">
                                                <%var data_atual = new Date();
                                                var ano = data_atual.getFullYear();  
                                                %>
                                                <%= notas[i].items[j].items[z].dia%>/<%= ano%>
                                            </div>
                                            <div class="col s6" style="margin-top: 5px;">     
                                                <%if(notas[i].items[j].items[z].score_done == 0){
                                                    var score_done = 0
                                                }else{
                                                    var score_done = notas[i].items[j].items[z].score_done
                                                }%>     
                                                <%= notas[i].items[j].items[z].score_done%>/<%= notas[i].items[j].items[z].score%>
                                            </div>
                                        </div>
                                    <%}%>   
                                </div>
                            </div>                            
                        </div>                    
                <%}else{%>                        
                    <div class="row col s12 fundo-aula-learnets">
                        <div class="col s12">    
                            <%= notas[i].items[j].aula%>
                        </div>
                        <div class="col s6">
                            <%var data_atual = new Date();
                              var ano = data_atual.getFullYear();  
                            %>
                            Data: <%= notas[i].items[j].dia%>/<%= ano%>
                        </div>
                        <div class="col s6">  
                            <%if(notas[i].items[j].score_done == 0){
                                var score_done = 0
                            }else{
                                var score_done = notas[i].items[j].score_done
                            }%>                            
                            Score: <%= notas[i].items[j].score_done%>/<%= notas[i].items[j].score%>
                        </div>
                    </div>                    
                <%}%>    

<!--                <div class="faltas-item presente">
                    <div class="faltas-aula-data">
                        <div><%= notas[i].items[j].key%></div>
                        <span>Semana></span>
                    </div>
                </div> -->                
            <%}%>  
            
        </div>

        <div class="notas-e-faltas-aviso">
            Aulas Realizadas: <%= notas[i].summary.classes.done%>/<%= notas[i].summary.classes.total%>
        </div>
        <div class="notas-e-faltas-limite">
            <span id='numero-de-faltas'></span>
        </div>


    </div>
</div>

<%
    }
}
%>

`;

function notasefaltas_init(){
    var falta_items = document.querySelectorAll('.faltas-item');
    
    for(i=0; i<falta_items.length; i++){
// ITEM = FIGURA RETAUNGULAR QUE REPRESENTA O DIA EM QUE AS AULAS OCORRERAM
        // MOVER O DEDO SOBRE O ITEM
        falta_items[i].addEventListener('touchmove', function(e){
            expandir_item_falta(e);
        });
        // TOCAR NO ITEM
        falta_items[i].addEventListener('touchstart', function(e){
            expandir_item_falta(e);
        });
    };
    
    // TOCAR A TELA E ARRASTAR O DEDO PARA O ITEM
    window.addEventListener('touchmove', function(e){
        expandir_item_falta(e);
    });
    
    // TOCAR A TELA
    window.addEventListener('touchstart', function(e){
        let touch = e.touches[0];
        let px = touch.clientX;
        let py = touch.clientY;
        let target = document.elementFromPoint(px, py);
        if(target != null){
            if(target.classList.contains('notas-e-faltas-diario') == false && target.classList.contains('faltas-item') == false){
                console.log(target);
                let faltas_expandidas = document.querySelectorAll('.faltas-ativas');
                for(i=0; i<faltas_expandidas.length; i++){
                    faltas_expandidas[i].classList.remove('faltas-ativas');
                }
            }
        }
    });
    
    // EXPANDE OU ENCOLHE O ITEM DE ACORDO COM CONDIÇÕES
    function expandir_item_falta(e){
        let touch = e.touches[0];
        let px = touch.clientX;
        let py = touch.clientY;
        let target = document.elementFromPoint(px, py);
        // Se existe um alvo
        if(target != null){
            // Se o alvo é um item
            if(target.classList.contains('faltas-item')){
                // Se existe um item ativo nesse card
                if(target.parentElement.querySelector('.faltas-ativas')){
                    // Se o item ativo não é o alvo
                    if(target.parentElement.querySelector('.faltas-ativas') != target){
                        target.parentElement.querySelector('.faltas-ativas').classList.remove('faltas-ativas');
                        target.classList.add('faltas-ativas');
                    }
                // Se não existe um item ativo
                }else{
                    target.classList.add('faltas-ativas');
                }
            }
        }
    }
}