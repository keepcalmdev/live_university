var home_v = `
    <div class="home">
        <div class="row fundobacks">
            <div id="navbar_comum">
            </div>

            <div class="row" style="position: absolute;top:55px;width: 100%;">
                <main style="margin-top: 8%;">
                    <ul class="cursos">
                        <% for (const curso of cursos) { %>
                            <% if(curso.id_tipo_projeto == 'ondemand'){ %>

                                <li class="collection-item avatar valign-wrapper">
                                    <div class="col s12">
                                        <div class="card">
                                            <a id-grupo="<%= curso.id_grupo%>" id-projeto="<%= curso.id_projeto%>" class="card-curso" href="javascript:void(0)" onclick="load_curso_ondemand(this)" style="width: 100%">
                                                <figure style="margin: 0;">
                                                    <div class="foto">
                                                        <img class='capa_ondemand' src="image/capas/<%= curso.id_projeto %>.svg" id='capa-<%= curso.id_projeto %>' alt="Curso de <%= curso.nome %>">

                                                        <%
                                                        var capa_svg = new Image();

                                                        capa_svg.src = 'image/capas/'+curso.id_projeto+'.svg';

                                                        capa_svg.onerror = function(){
                                                            document.getElementById('capa-' + curso.id_projeto).src = 'image/capas/default.svg';
                                                        }
                                                       %>

                                                        <i class="play material-icons">play_circle_outline</i>
                                                    </div>

                                                    <figcaption class="grey-text text-darken-2"><%= curso.grupo %></figcaption>
                                                </figure>
                                            </a>

                                            <% if(curso.certificado == 'sim'){ %>
                                                <div class="card-action">
                                                    <details>
                                                        <summary>Certificado <i class="material-icons"></i></summary>

                                                        <ul>                                                            
                                                            <li><a href="javascript:void(0)" onclick="abre_certificado(<%= curso.id_projeto%>)">Abrir Certificado</a></li>                                                            
                                                        </ul>
                                                    </details>
                                                </div>
                                            <% } %>
                                        </div>
                                    </div>
                                </li>

                            <% }else{ %>
                                <% if(curso.id_tipo_projeto == 1 || curso.id_tipo_projeto == 23){ %>

                                    <li class="collection-item avatar valign-wrapper">
                                        <div class="col s12">
                                            <div class="card">
                                                <a id-projeto="<%= curso.id_projeto%>" id-tipo="<%= curso.id_tipo_projeto%>" class="card-curso" href="javascript:void(0)" onclick="go_to_meus_eventos(<%= curso.id_projeto%>)" style="width: 100%;">
                                                    <figure style="margin: 0;">
                                                        <div class="foto">
                                                            <!--<img src="image/capas/default.svg" alt="Curso de <%= curso.nome %>">-->
                                                            <img class='capa_ondemand' src="image/capas/<%= curso.id_projeto %>.svg" id='capa-<%= curso.id_projeto %>' alt="Curso de <%= curso.nome %>">
                                                            <%
                                                            var capa_svg = new Image();

                                                            capa_svg.src = 'image/capas/'+curso.id_projeto+'.svg';

                                                            capa_svg.onerror = function(){
                                                                document.getElementById('capa-' + curso.id_projeto).src = 'image/capas/default.svg';
                                                            }
                                                           %>
                                                        </div>

                                                        <figcaption class="grey-text text-darken-2"><%= curso.grupo %></figcaption>
                                                    </figure>
                                                </a>

                                                <% if(curso.certificado == 'sim'){ %>
                                                    <div class="card-action">
                                                        <details>
                                                            <summary>Certificado <i class="material-icons"></i></summary>
    
                                                            <ul>                                                            
                                                                <li><a href="javascript:void(0)" onclick="abre_certificado(<%= curso.id_projeto%>)">Abrir Certificado</a></li>                                                            
                                                            </ul>
                                                        </details>
                                                    </div>
                                                <% } %>
                                            </div>
                                        </div>
                                    </li>

                                <%}else{%>
                                    <li class="collection-item avatar valign-wrapper">
                                        <div class="col s12">
                                            <div class="card">                                                
                                                <%if(curso.id_tipo_projeto == 16){%>

                                                    <a id-grupo="<%= curso.id_grupo%>" id-tipo="<%= curso.id_tipo_projeto%>" class="card-curso" href="javascript:void(0)" onclick="load_main_aulas(this)" style="width: 100%;">
                                                            <figure style="margin: 0;">
                                                                <div class="foto">
                                                                    <img src="image/capas/<%= curso.id_grupo%>.JPG" id='capa-<%= curso.id_grupo %>' alt="Curso de <%= curso.nome %>">
                                                                    
                                                                    <%
                                                                        var capa_svg = new Image();

                                                                        capa_svg.src = 'image/capas/'+curso.id_grupo+'.JPG';

                                                                        capa_svg.onerror = function(){
                                                                            document.getElementById('capa-' + curso.id_grupo).src = 'image/capas/default.svg';
                                                                        }
                                                                    %>   
                                                                </div>
        
                                                                <figcaption class="grey-text text-darken-2"><%= curso.grupo %></figcaption>
                                                            </figure>
                                                        </a>
        
                                                        <% if(curso.certificado == 'sim'){ %>
                                                            <div class="card-action">
                                                                <details>
                                                                    <summary>Certificado <i class="material-icons"></i></summary>
            
                                                                    <ul>                                                            
                                                                        <li><a href="javascript:void(0)" onclick="abre_certificado(<%=curso.id_projeto%>)">Abrir Diploma</a></li>                                                            
                                                                    </ul>
                                                                </details>
                                                            </div>
                                                        <% } %>

                                                <%}else{%>                                               


                                                    <%if(curso.id_tipo_projeto == 6 || curso.id_tipo_projeto == 21){%>

                                                            <a id-grupo="<%= curso.id_grupo%>" id-tipo="<%= curso.id_tipo_projeto%>" class="card-curso" href="javascript:void(0)" onclick="load_main_aulas(this)" style="width: 100%;">
                                                                <figure style="margin: 0;">
                                                                    <div class="foto">
                                                                        <img src="image/capas/<%= curso.id_grupo%>.JPG" id='capa-<%= curso.id_grupo %>' alt="Curso de <%= curso.nome %>">
                                                                        
                                                                        <%
                                                                            var capa_svg = new Image();

                                                                            capa_svg.src = 'image/capas/'+curso.id_grupo+'.JPG';

                                                                            capa_svg.onerror = function(){
                                                                                document.getElementById('capa-' + curso.id_grupo).src = 'image/capas/default.svg';
                                                                            }
                                                                        %>   
                                                                    </div>
            
                                                                    <figcaption class="grey-text text-darken-2"><%= curso.grupo %></figcaption>
                                                                </figure>
                                                            </a>
            
                                                            <% if(curso.certificado == 'sim'){ %>
                                                                <div class="card-action">
                                                                    <details>
                                                                        <summary>Certificado <i class="material-icons"></i></summary>
                
                                                                        <ul>                                                            
                                                                            <li><a href="javascript:void(0)" onclick="abre_certificado(<%=curso.id_projeto%>)">Abrir Diploma</a></li>                                                            
                                                                        </ul>
                                                                    </details>
                                                                </div>
                                                            <% } %>

                                                    <%}else{%>    

                                                        <a id-grupo="<%= curso.id_grupo%>" id-tipo="<%= curso.id_tipo_projeto%>" class="card-curso" href="javascript:void(0)" onclick="load_main_aulas(this)" style="width: 100%;">
                                                            <figure style="margin: 0;">
                                                                <div class="foto">
                                                                    <img src="image/capas/<%= curso.id_grupo%>.JPG" alt="Curso de <%= curso.nome %>">
                                                                </div>
        
                                                                <figcaption class="grey-text text-darken-2"><%= curso.grupo %></figcaption>
                                                            </figure>
                                                        </a>
        
                                                        <% if(curso.certificado == 'sim'){ %>
                                                            <div class="card-action">
                                                                <details>
                                                                    <summary>Certificado <i class="material-icons"></i></summary>
            
                                                                    <ul>                                                            
                                                                        <li><a href="javascript:void(0)" onclick="abre_certificado(<%=curso.id_projeto%>)">Abrir Diploma</a></li>                                                            
                                                                    </ul>
                                                                </details>
                                                            </div>
                                                        <% } %>

                                                    <%}%>

                                                <%}%>
                                            </div>
                                        </div>
                                    </li>
                                <%}%>
                            <% } %>

                        <% } %>

                        <!-- <a class="waves-effect waves-light btn" onclick="comprar(0)">COMPRAR</a> -->

                    </ul>
                </main>
            </div>
        </div>
    </div>
`

var home_v_vazio = `
    <div class="home">
        <div class="row fundobacks">
            <div id="navbar_comum">
            </div>
        </div>
    </div>
`

function abre_certificado (id_projeto){    
    var id_contato = get_data('geral').id
    window.open(`http://certificados.liveuniversity.com/certificado/${id_contato}/${id_projeto}`);
}