const filtro_home_sales = `
    <div id="filtro_home_sales">
        <ul>
            <% let abrirGrupo = true %>
            <% let indexFechamento = null %>
            <% filtros.forEach((item, index) => { %>
                <% if (abrirGrupo) { %>
                    <% abrirGrupo = false %>
                    <% indexFechamento = index + 2 %>
                    <div>
                <% } %>
                
                    <li>
                        <a href="#" id="a-<%= item.id_generico%>" id-generico="<%= item.id_generico%>" id-1="<%= item.id_area%>" id-2="<%= item.id_area2%>" onclick="select_filtro(this)">
                            <i id="i-<%= item.id_generico%>" id1="<%= item.id_area%>" id2="<%= item.id_area2%>" class="material-icons"><%= item.icon%></i>
                            <span id="s-<%= item.id_generico%>" id1="<%= item.id_area%>" id2="<%= item.id_area2%>"><%= item.nome %></span>
                        </a>
                    </li>

                <% if (index == indexFechamento || (index + 1) == filtros.length ) { %>
                    <% abrirGrupo = true %>
                    </div>
                <% } %>
            <% }) %>
        </ul>
    </div>
`

function select_filtro(elemento){
    var id_generico =  elemento.getAttribute('id-generico')
    var id_area =  elemento.getAttribute('id-1')
    var id_area2 =  elemento.getAttribute('id-2')
    reseta_selecao()    
    document.getElementById("a-" + id_generico).style.border = "1px solid #000";
    document.getElementById("i-" + id_generico).style.color = "black";
    document.getElementById("s-" + id_generico).style.color = "black"; 

    
    var lista_filtro = {}
    lista_filtro.id_area = id_area
    if(id_area2 > 0){
        lista_filtro.id_area2 = id_area2
    }
    hide_all_cards(lista_filtro)
}

function renderizarFiltroHomeSales(elemento) {
    document.querySelector(elemento).innerHTML = ejs.render(filtro_home_sales, {
        filtros: [
            {
                nome: 'Vendas',
                icon: 'attach_money',
                id_generico: '1',
                id_area: '11',
                id_area2: '0'
            },
            {
                nome: 'Supply',
                icon: 'autorenew',
                id_generico: '2',
                id_area: '2',
                id_area2: '5'
            },
            {
                nome: 'TI',
                icon: 'airplay',
                id_generico: '3',
                id_area: '10',
                id_area2: '0'
            },
            {
                nome: 'Marketing',
                icon: 'track_changes',
                id_generico: '4',
                id_area: '6',
                id_area2: '20'
            },
            {
                nome: 'Logística',
                icon: 'local_shipping',
                id_generico: '5',
                id_area: '5',
                id_area2: '0'
            },
            {
                nome: 'Compras',
                icon: 'shopping_cart',
                id_generico: '6',
                id_area: '2',
                id_area2: '0'
            },
            {
                nome: 'Fiscal',
                icon: 'group',
                id_generico: '7',
                id_area: '4',
                id_area2: '0'
            },
            {
                nome: 'RH',
                icon: 'group',
                id_generico: '8',
                id_area: '9',
                id_area2: '0'
            }     
        ]
    })
}

function hide_all_cards(lista_div){
    show_all()
    var divs = document.querySelectorAll('.card')
    //console.log(lista_div)
    
    if(lista_div.length == 2){
        var id_area1 = lista_div.id_area
        var id_area2 = lista_div.id_area2        

        for (var i =0; i < divs.length; i++){

            var id_areas_div = divs[i].getAttribute('id-area')
            var lista_split = id_areas_div.split(',')
            var verifica1 = lista_split.includes(id_area1)
            var verifica2 = lista_split.includes(id_area2)
            if(verifica1 == true || verifica2 == true ){

            }else{
                divs[i].classList.add('hide')  
            }

        }


    }else{
        var id_area_int = lista_div.id_area
        var id_area = id_area_int.toString()

        for (var i =0; i < divs.length; i++){

            var id_areas_div = divs[i].getAttribute('id-area')            
  
            if(id_areas_div.length > 2){
         
                var lista_split = id_areas_div.split(',')
                var verifica = lista_split.includes(id_area)
                if(verifica == true){

                }else{
                    divs[i].classList.add('hide')  
                }
            }else{
                if(id_areas_div == id_area_int){
        
                }else{
           
                    divs[i].classList.add('hide')
                }               

            } 
        }
    }    
}

function show_all(){
    var divs = document.querySelectorAll('.card')
    for (var i =0; i < divs.length; i++){
        divs[i].classList.remove('hide')
    }
}

function reseta_selecao(){
    for(var i = 1; i < 9; i++){        
        document.getElementById("a-" + i).style.border = "1px solid #eee";
        document.getElementById("i-" + i).style.color = "#c8c8c8";
        document.getElementById("s-" + i).style.color = "#c8c8c8";
    }
}