var new_home = `
<div class="new-home">
    <div class="row top" id="nav-deslogado">
        <div class="col s6 left-align"><img class="logo" src="image/logo_cubo_live_university.svg" alt="logo"></div>
        <div class="col s6 right-align valign-wrapper"><button onclick="loading_main()">Login</button></div>
    </div>
    <div class="row first">
        <div class="col s12" style="padding: 0">
            <h3>Selecione sua área de atuação</h3>
            <div id="area" class="full-scroll-container">
                <button class="solid scroll-item"   onclick="new_home_filter(this)">TODOS</button>
                <button class="outline scroll-item"   onclick="new_home_filter(this)">VENDAS</button>
                <button class="outline scroll-item" onclick="new_home_filter(this)">COMUNICAÇÃO</button>
                <button class="outline scroll-item" onclick="new_home_filter(this)">FINANÇAS</button>
                <button class="outline scroll-item" onclick="new_home_filter(this)">TECNOLOGIA</button>
                <button class="outline scroll-item" onclick="new_home_filter(this)">RH</button>
                <button class="outline scroll-item" onclick="new_home_filter(this)">MARKETING</button>
                <button class="outline scroll-item" onclick="new_home_filter(this)">FISCAL</button>
                <button class="outline scroll-item" onclick="new_home_filter(this)">COMPRAS</button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12" style="padding: 0">
            <h3>Pós-Graduações</h3>
            <div class="carousel carousel-curso" id="pos-grad">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12" style="padding: 0">
            <h3>Destaques</h3>
            <div class="carousel carousel-curso" id="destaques">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12" style="padding: 0">
            <h3>Workshops</h3>
            <div class="carousel carousel-curso" id="workshops">
            </div>
        </div>
    </div>
</div>
`

function new_home_load() {
    $.post(server + '/get_cursos_home', { id: 0 })
        .done((data) => {
            console.log(data);
            const { portifolio: { pos, destaques, workshop } } = data;
            document.querySelector('#pos-grad').innerHTML  = ejs.render(new_home_item_v, { cursos: pos });
            document.querySelector('#destaques').innerHTML = ejs.render(new_home_item_v, { cursos: destaques });
            document.querySelector('#workshops').innerHTML = ejs.render(new_home_item_v, { cursos: workshop });
            initialize_courses_carousel();
            $(function() {
                //caches a jQuery object containing the header element
                var nav = $("#nav-deslogado");
                $(window).scroll(() => {
                    var scroll = $(window).scrollTop();
                    if (scroll >= 50) {
                        nav.addClass('border-shadow');
                    } else {
                        nav.removeClass("border-shadow");
                    }
                });
            });
        }).fail(function (b) {
            console.log({ b })
        })
}

function initialize_courses_carousel() {
    if($('.carousel-curso').length > 0) {
        if($('#pos-grad .carousel-item').length > 0) {
            $('#pos-grad').carousel({
                dist: 0,
                shift: 10,
                padding: 0,
                numVisible: 2,
                fullWidth: true,
                duration: 100,
                noWrap: true,
            });
            $('#pos-grad .area-vazia').css('display', 'none');
        } else {
            $('#pos-grad .area-vazia').css('display', 'block');
        }

        if($('#workshops .carousel-item').length > 0) {
            $('#workshops').carousel({
                dist: 0,
                shift: 10,
                padding: 0,
                numVisible: 2,
                fullWidth: true,
                duration: 100,
                noWrap: true,
            });
            $('#workshops .area-vazia').css('display', 'none');
        } else {
            $('#workshops .area-vazia').css('display', 'block');
        }

        if($('#destaques .carousel-item').length > 0) {
            $('#destaques').carousel({
                dist: -100,
                shift: 0,
                padding: 0,
                numVisible: 3,
            });
            $('#destaques .area-vazia').css('display', 'none');
        } else {
            $('#destaques .area-vazia').css('display', 'block');
        }
    }
}

function new_home_filter(e) {
    require_loader('open');
    const text = e.innerText;
    document.querySelectorAll('#area button').forEach(el => {
        if (el.innerText === text) {
            el.className = 'solid scroll-item';
        } else {
            el.className = 'outline scroll-item';
        }
    });
    document.querySelectorAll('.carousel-curso .curso-item').forEach(e => {
        if (e.dataset.area.toUpperCase() === text || text === 'TODOS') {
            e.className = 'curso-item carousel-item';
            e.style.display = 'block';
        } else {
            e.className = 'curso-item';
            e.style.display = 'none';
        }
    });
    initialize_courses_carousel();
    require_loader('close');
}
