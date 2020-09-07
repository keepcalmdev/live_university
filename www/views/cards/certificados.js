var certificados_v = `
    <div class="home">
        <div class="row fundobacks">
            <div id="navbar">            
            </div>

            <div class="row" style="position: absolute;top:55px;width: 100%;">
                <main style="margin-top: 8%;">
                    <ul class="cursos">                       

                            <%for(var i=0;i<dados.length;i++){%>

                                <li class="collection-item avatar valign-wrapper">
                                    <div class="col s12">
                                        <a class="card-curso" id-projeto="<%=dados[i].id_projeto%>" nome-projeto="<%=dados[i].nome_projeto%>" carga-horaria="<%=dados[i].carga_horaria%>" href="javascript:void(0)" onclick="open_certificado(this)" style="width: 100%">
                                            <div class="card">
                                                <figure style="margin: 0;">
                                                    <div class="foto">
                                                        <img class='capa_ondemand' src="image/capas/<%= dados[i].id_projeto %>.svg" id="capa-<%=dados[i].id_projeto%>" alt="<%=dados[i].nome_projeto%>">     
                                                        <%
                                                        var capa_svg = new Image();

                                                        capa_svg.src = 'image/capas/'+dados[i].id_projeto+'.svg';

                                                        capa_svg.onerror = function(){
                                                            document.getElementById('capa-' + dados[i].id_projeto).src = 'image/capas/default.svg';
                                                        }
                                                       %>                                                                
                                                    </div>
                                
                                                    <figcaption class="grey-text text-darken-2"><%=dados[i].nome_projeto%></figcaption>
                                                </figure>
                                            </div>
                                        </a>
                                    </div>
                                </li>     
                            <%}%>                                                         
                    </ul>
                </main>
            </div>
        </div>
    </div>
`

function open_certificado(ele) {    
    require_loader('open')    
    var carga_horaria = ele.getAttribute('carga-horaria')
    var nome_projeto = ele.getAttribute('nome-projeto')
    var nome = get_data('geral').nome + ' ' + get_data('geral').sobrenome
    
    let options = {
        documentSize: 'A4',
        landscape: 'landscape',
        type: 'share',
        fileName: 'Certificado - '+ nome_projeto + '.pdf'
    }

    var regular = 'file:///android_asset/www/fonts/Futura-Regular.ttf';
    var condensed = 'file:///android_asset/www/fonts/Futura-Condensed.ttf';
    var futura = 'file:///android_asset/www/fonts/FUTURA-CONDENSED-NORMAL.ttf';
    if (device.platform == 'iOS') {
        regular = 'www/fonts/Futura-Regular.ttf';
        condensed = 'www/fonts/Futura-Condensed.ttf';
        futura = 'www/fonts/FUTURA-CONDENSED-NORMAL.ttf';
    }

    var payload = ejs.render(
        `
        <!DOCTYPE html>
        <html lang='pt-BR'>
            <head>
                <meta charset='utf-8'>
                <style> 
                    @font-face {
                        font-family: 'FuturaNome';                        
                        font-weight: 400;
                        src: url('<%= futura %>');;
                    }
                    @font-face {
                        font-family: 'Futura';
                        font-weight: 400;
                        src: url('<%= regular %>');
                    }
    
                    @font-face {
                        font-family: 'FuturaCondensed';
                        font-weight: 400;
                        src: url('<%= condensed %>');
                    }

                    @page{
                        margin-left: 0px;
                        margin-right: 0px;
                        margin-top: 0px;
                        margin-bottom: 0px;
                        padding:0px;
                    }
                    <% if (device == 'iOS') { %>
                        div {
                            text-align: center;
                            position: absolute;
                            top: 28%;
                            width: 100%;
                            font-size: 25px;
                            font-family: 'Futura';
                        }
                        img{
                            margin-left: 0.50%;
                            width: 98.82%;
                            height: auto;
                        }    
                    <% } else { %>
                        div {
                            text-align: center;
                            position: absolute;
                            width: 100%;
                            top: 30%;
                            font-size: 25px;
                            font-family: 'Futura';
                        }
                        img{
                            margin-left: 0.25%;
                            width: 99.5%;
                            height: auto;
                        }
                    <% } %>
                    h1{
                        
                        letter-spacing: 0px;
                    }
                </style>
            </head>
            <body style='margin: 0; padding: 0'>
                <div>
                    <h4 style="margin: 0 0 5px 0;">CERTIFICAMOS QUE</h4>
                    <h1 style="margin: 0 0 20px 0;"><%= nome %></h1>
                    <h4 style="margin: 10px 0 70px 0;"><br><br>CONCLUIU O TREINAMENTO ON DEMAND <br><%= curso %>.</h4>
                    <!--<h4>COM CARGA HORÁRIA TOTAL DE <%= carga %> HORAS.</h4> NECESSITA COLOCAR QUANDO N é ONDEMAND --> 
                </div>
                <img src='https://i.imgur.com/OoihDtW.jpg'>
            </body>
        </html>
            `, {
            regular: regular,
            condensed: condensed,
            futura: futura,
            nome: nome.toUpperCase(),
            curso: nome_projeto.toUpperCase(),
            carga: carga_horaria,
            device: device.platform
        });

    //console.log(payload);
    require_loader('close')
    pdf.fromData(payload, options)
        .then((stats) => console.log('status', stats))
        .catch((err) => console.err(err));
    require_loader('close')

}