var noticias_v = `
<div id="noticias">    
    <div class="container">      
      
    <%for(var i=0; i<lista.length; i++){%>
        <%if(lista[i].tipo == 'destaque'){%>  
        <section class="featured">
                <div class="row title">
                    <div class="col s12">
                        <h5>Em Destaque</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <div class="card">                        
                            <a href="<%=lista[i].link_redirect%>">
                                <div class="card-image">
                                    <img src="<%= lista[i].link_image%>">
                                    <span class="card-icon"><i class="small material-icons" style="color: white;">share</i></span>
                                </div>
                                <div class="card-content">
                                    <p><%= lista[i].conteudo%></p>
                                </div>
                            </a>    
                        </div>
                    </div>
                </div>
            </section>
            <%}%> 
    <%}%>  

    <section class="news">
    <div class="row title">
        <div class="col s12">
            <h5>Notícias</h5>
        </div>
    </div>         

    <%for(var j=0; j<lista.length; j++){%>
        <%if(lista[j].tipo == 'normal'){%>  
        <div class="row" style="margin-bottom: -5px;">
                        <div class="col s12">
                            <a href="<%=lista[j].link_redirect%>">
                                <div class="card card-left">
                                    <div class="card-image">
                                        <img src="<%= lista[j].link_image%>">
                                    </div>
                                    <div class="card-content">
                                        <span class="date"><%=lista[j].data_envio%></span>
                                        <p><%= lista[j].conteudo%></p>
                                    </div>
                                </div>
                            </a> 
                        </div>                    
                    </div>

        <%}%>  
        <%}%>  
        </section>

    </div>
</div>
`