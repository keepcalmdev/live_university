
$('body').on('DOMNodeInserted', function(){

    $('.2-lines').each(function(i, e){
        // TODO Refatorar para novo Typed OM quando Houdini for melhor suportado.

        // Calcula altura atual e esperada.
        let lh = window.getComputedStyle(e).getPropertyValue('line-height').replace(/px/, '');
        let h = Number(lh) * 2 + 5;

        // Aborta se a altura estiver no padrão.
        if(e.scrollHeight <= h)
            return;

        // Reduz a fonte para 80%.
        let fs = window.getComputedStyle(e).getPropertyValue('font-size').replace(/px/, '');
        e.style.fontSize = String(Number(fs) * 0.8) + 'px';

        // Retorna se a altura ficou no padrão.
        if(e.scrollHeight <= h)
            return;

        // Adiciona elipses para cálculo correto da altura.
        e.firstChild.data = '... ' + e.innerText;

        // Remove palavras até que altura esteja correta.
        while(e.scrollHeight > h){
            let a = e.innerText.split(' ');
            a.pop();
            e.firstChild.data = a.join(' ');
        }

        // Move as elipses para o fim do texto.
        a = e.innerText.split(' ');
        let s = a.pop() + a.shift();
        a.push(s);
        e.firstChild.data = a.join(' ');
    });

});
