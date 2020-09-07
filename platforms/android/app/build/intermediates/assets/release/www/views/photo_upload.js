var photo_upload_v = `
  <style>
        .input-field>i {
            margin-top: 2.5%;
        }
        /*.tipo-foto {
            position: fixed;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 110px !important;
        }*/
    </style>
<img class="image-background" src="./image/background.svg" alt="background">
    <div class="photo-upload-v firstscreen-v row background">
        <div class="row">
            <div class="input-field col s12 center">
                <div class="main">
                    <form class="login-form" action="http://www.liveulabs.com:49/teste" >
                        <input id="senha" class="hide" value="<%= senha%>">
                        <input id="email" class="hide" value="<%= email%>">
                        <div class="row margin_up">
                            <div class="input-field col s12 center">
                                <div class="cropper">
                                    <img class="preview" onclick="open_tipo()" src="image/foto.svg" alt="" class="responsive-img valign" style="width: 250px;height: 250px;border-radius: 50%;">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <h5>Escolha sua foto</h5>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <a onclick="upload_image(<%= id_contato %>)" id="upload"  class="btn btn-large waves-effect waves-light col s12 disabled" style="background-color: #DEA727;border-radius: 40px;">finalizar</a>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    <style>
        #modal1 {
            top: 40% !important;
            transform: translateY(-40%) !important;
            padding: 20px !important;
            border-radius: 10px;
            -webkit-box-shadow: 0px 0px 10px 1px rgba(255,255,255,0.5);
            -moz-box-shadow: 0px 0px 10px 1px rgba(255,255,255,0.5);
            box-shadow: 0px 0px 10px 1px rgba(255,255,255,0.5);
        }
        
        
        #modal1 .row {
           margin: 25px 0px;
        }

        #modal1>i{
            position: absolute;
            top: 15px;
            right: 15px;
            color: #ccc;
        }

        #modal1>h5{
            text-align: center;
            font-size: 1.3rem;
            font-weight: 600;
            margin-top: 10px; 
            margin-bottom: 30px;
            color: #781866;
        }

        #modal1 hr{
          border: 0.1px solid #ccc;
        }

        #modal1 a{
            color: black;
            font-size: 1.3rem;
        }

        #modal1 .s3{
            left: 0;
            text-align: center;
            right: 0;
        }
        
        #modal1 .s3 i{
            font-size: 2.8rem;
            color: #934684;
        }
    </style>
    <div id="modal1" class="modal tipo-foto">
        <i class="material-icons modal-close">close</i>
        <h5>Foto de Perfil</h5>
        <div class="row valign-wrapper border-bottom">
            <div class="col s3">
                <i class="medium material-icons">photo_camera</i>
            </div>
            <div class="col s9">
                <a onclick="load_camera()" class="modal-action modal-close">
                    Tirar Nova Foto
                </a>
            </div>
        </div>
        <hr>
        <div class="row valign-wrapper">
            <div class="col s3">
                <i class="medium material-icons">photo_library</i>
            </div>
            <div class="col s9">
                <a onclick="load_galery()" class="modal-action modal-close">
                    Escolher da Galeria
                </a>
            </div>
        </div>
    </div>
`