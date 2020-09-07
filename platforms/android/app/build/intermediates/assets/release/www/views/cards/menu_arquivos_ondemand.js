var menu_arquivos_ondemand = `
    <div class="card menu-arquivos-ondemand" id='modulo-x'>

        <div class="card-content menu-arquivos-icons valign-wrapper">
        <input class="hide" type="file" name="" id="upload-input" multiple>
        <a class="hide" id="feedbacklink" href="x"></a>
            <div class='col s6 valign-wrapper' id-aula='<%=id_aula%>' onclick='upload_atividade(this)'> 
                <img src="image/icons/geral_upload.svg" alt="">
                Upload
            </div>
            <div id='gabarito' class='col s6 valign-wrapper'>
                <i class="material-icons">playlist_add_check</i>
                Gabarito
            </div>
        
        </div>
        <% if (typeof arquivos != 'undefined' && arquivos.length > 0) { %>     
            <ul class="material-de-aula semMargin collapsible z-depth-0">
                <li>
                    <div class="cabecalho collapsible-header flex jc-fe">
                        <div class="flex">
                            <span>Material de aula</span>
                            <i class="alternadorCorpo abrir material-icons">keyboard_arrow_down</i>
                            <i class="alternadorCorpo fechar material-icons">keyboard_arrow_up</i>
                        </div>
                    </div>

                    <div class="corpo collapsible-body">
                        <strong class="grey-text text-darken-1">Arquivos:</strong>
                        <ul class="lista-de-anexos">
                            <% arquivos.forEach(arquivo => { %>
                                <li>
                                    <a href="<%= arquivo.link %>" target="_blank" class="grey-text text-darken-2"><%= arquivo.descricao %></a>
                                </li>
                            <% }) %>
                        </ul>
                    </div>
                </li>
            </ul>
        <% } %>
        
    </div>
`;