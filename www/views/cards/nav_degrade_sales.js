const nav_degrade_sales = `
    <div id="nav_degrade_sales">
        <nav class="gradient combo-box-nav flex jc-sb ai-cen pos-fix">
            <a class="margin-top-0" onclick="go_to_home_sales()">
                <i class="material-icons">arrow_back_ios</i>
            </a>

            <h1 class="pos-rel flex-1 ellipsis"><%= titulo %></h1>

            <ul class="right margin-top-0">
                <li>
                    <a href="#">
                        <img src="image/icons/inbox.svg" alt="" class="inbx-menu"> 
                    </a>
                </li>
                <li>
                    <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                        <i class="menu material-icons">menu</i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
`

function renderizarNavDegradeSales(elemento, titulo) {
    document.querySelector(elemento).innerHTML = ejs.render(nav_degrade_sales, { titulo })
}