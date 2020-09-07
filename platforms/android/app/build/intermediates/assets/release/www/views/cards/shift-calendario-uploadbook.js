var calendario_shift_v = `
`

var upload_book_shift_v = `
    <div class="card upload-book" onclick="active_input_book()">
    <i class="material-icons icon-upload-book">cloud_upload</i> 
    <label class="label-upload-shift">UPLOAD BOOK</label>
    <input class="hide" type="file" id="teste-book" onchange="chama_book(this, <%= id_grupos_shift%>)">
    </div>
`


function active_input_book(){
    document.getElementById("teste-book").click();
}

const months_v = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];

var shift_calendario_v = `
    <div class="card calendario">
        <div style="display: flex; justify-content: center;">
            <label class="label-calendario">Calendário</label>
        </div>
        <% calendarios.forEach(function(calendario){ %>
        <div class="card-content">
            <time>
                <h5><%= new Date(calendario.data_abreviada).getDate().toString().padStart(2,'0') %></h5>
                <%= months_v[new Date(calendario.data_abreviada).getMonth()] %>
            </time>
            <span>
                <label><%= calendario.aula %></label>
                <br>
                <label>Grupo: <%= calendario.nome_grupo %></label>
            </span>
            <span class="<%= calendario.nota == '-' ? '':'no-go' %>"><%= calendario.nota %></span>
        </div>
        <% }); %>
    </div>
`