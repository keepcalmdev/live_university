// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

document.addEventListener('deviceready', function () {
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});    

    window.plugins.OneSignal
        .startInit("40443e12-bdbc-4aaf-ab7c-20e131406769")
        .handleNotificationOpened(function (jsonData) {
            var dados = jsonData


            if (dados.notification.payload.additionalData.acao) {
                var codigo = dados.notification.payload.additionalData.acao
                switch (codigo) {
                    case '1':
                        set_data('destino', 1)
                        go_to_perfil()
                        break
                    case '2':
                        set_data('destino', 2)
                        chama_central_notificacao()
                        break
                }
            }
        })
        .endInit();


    // Call syncHashedEmail anywhere in your app if you have the user's email.
    // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
    // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);