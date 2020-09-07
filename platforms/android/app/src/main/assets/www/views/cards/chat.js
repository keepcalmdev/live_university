var chat = `
<div class="chat">
    <div class="row messages-container">

    </div>

    <div class="row input-container">
        <div class="input-field">
            <input onfocus="document.getElementsByClassName('send-button')[0].style.color = '#1DC4BD'" onfocusout="document.getElementsByClassName('send-button')[0].style.color = '#747474'" type="text" id="" class="" placeholder="Digite aqui sua mensagem">
        </div>
        <a class="send-button" href="#">
            <i class="material-icons">send</i>
        </a>
    </div>
</div>
`;

var message_sent = `
    <div class="row message sent">
        <div class="time">
        <span>Segunda feira, 16:40</span>
        </div>
        <div class="message-body">
        <div class="content">
            Não consegui realizar o checkin ontem
        </div>
        </div>
    </div>
`;

var message_received = `
    <div class="row message received">
        <div class="time">
        <span>Segunda feira, 16:40</span>
        </div>
        <div class="message-body">
        <div class="university-icon">
            <img src="/image/icons/menu.svg" alt="">
        </div>
        <div class="content">
            Olá João. Em qual aula você teve problemas?
        </div>
        </div>
    </div>
`;
