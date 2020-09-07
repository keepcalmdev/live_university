const nav_home_sales = `
    <div id="nav_home_sales">
        <nav class="nav-extended default-bg-color"> 
            <div class="flex">
                <div class="flex-1 text-center">
                    <div class="caixa-icone pos-rel">
                        <div class="pos-abs w100vw">
                                <img class="cubo-branco-sales" src="image/icons/cubo01branco.svg" alt="">
                        </div>
                    </div>

                    <div class="caixa-mensagem flex fd-col ai-bas">
                        <span class="saudacao white-text">Olá, <span class="nome white-text"><%= titulo %></span></span>
                        <span class="saudacao-complementar white-text font-bold">Bem vindo!</span>
                    </div>
                </div>

                <div class="nav-buttons ai-bas">
                    <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                        <img src="img/icons/menu.svg" alt="">
                    </a>                 
                </div>
            </div>
        </nav>
    </div>
`

function renderizarNavHomeSales(elemento, titulo) {
    document.querySelector(elemento).innerHTML = ejs.render(nav_home_sales, { titulo })
}