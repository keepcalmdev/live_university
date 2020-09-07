var aula_in_v = `
<div id="navbar">            
</div>

<div class="lesson-info card">

    <div class="card-content">
        <div class="icone-aula-in">
        <% if(aula.nota){ %>

            <%if(aula.aula.indexOf('ormatura') > 0){%>
                <img src="img/icons/formatura.svg" alt="" class="formatura-icone-dentro"/>                    
            <%}else{%>
                <span><%= aula.nota%></span>
            <%}%>
            

        <%}else{%>

            <% if(aula.status == 'futuro'){ %>
                
                <%if(aula.aula.indexOf('ormatura') > 0){%>
                    <img src="img/icons/formatura.svg" alt="" class="formatura-icone-dentro"/>                    
                <%}else{%>
                    <img src="img/icons/aula_futuro.svg" alt="" />
                <%}%>
                
            <%}else{%>
                    
                <% if(aula.status == 'hoje' || aula.status == 'hoje checkin'){ %>

                    <img src="img/icons/aula_presente.svg" alt="" />

                <%}else{%>
                            
                    <img src="img/icons/checkin_sem_avaliacao.svg" alt="" />

                <%}%>
            <%}%>
        <%}%>
        </div>

        <small><%= aula.professor %></small>
        <label class="limit-lines" data-keep-font-size="true" data-lines="2"><%= aula.modulo %></label>        

        <time><%= aula.data %><br /><%= aula.horario_entrada %></time>
    </div>

    <% if(typeof aula.arquivos == 'object'){ %>
        <div class="card-action">
            <details>
                <summary>Material de Aula <i class="material-icons"></i></summary>
                <label>Arquivos:</label>
                <ul>
                    <% for(let f of aula.arquivos){ %>
                        <li><a href="<%= f.caminho %>"><%= f.nome_arquivo %></a></li>
                    <% } %>
                </ul>
            </details>
        </div>
    <% } %>
</div>
<status>
</status>
`;
