var perfil_colega_v = `
    <section id="perfil" class="flex fd-col h100vh overflow-hidden">
        <div class="z-0">
            <div class="background">
                <a href="#" onclick="change_view('back', false, true)" class="voltar flex ai-cen">
                    <i class="material-icons white-text">chevron_left</i>
                    <span class="white-text">voltar</span>
                </a>
            </div>

            <!-- Define a altura em => #perfil .background + div -->
            <div></div>
        </div>

        <div class="dados flex-1 flex pos-rel">

            <div class="decoracaoRedonda"></div>

            <div class="w100 fd-col jc-sa z-1">

                <div id="preview" class="foto" style="background-image: url(<%= photo %>)">
                </div>

                <div style="margin-top: 50px">
                    <div class="dado">
                        <label for="nome">
                            <img class="icon" src="image/user.svg">
                            <span class="valor"><%- colega.nome  %></span>
                        </label>

                    </div>

                    <div class="dado">
                        <label for="email">
                            <img class="icon" src="image/email.svg">
                            <span class="valor"><%= colega.email %></span>
                        </label>

                    </div>
    
                    <div class="dado">
                        <label for="linkedin">
                            <img class="icon" src="image/linkedin.svg">
                            <span class="valor"><%= colega.linkedin %></span>
                        </label>

                    </div>
    
                    <div class="dado">
                        <label for="fone">
                            <img class="icon" src="image/phone-call.svg">
                            <span class="valor phone_with_ddd"><%= colega.telefone %></span>
                        </label>

                        
                    </div>
                </div>
            </div>
        </div>
    </section>
`