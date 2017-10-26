$(function () {
    document.title = "Caviartt";

    /* FUNCIONALIDAD HOME */

    /* OLVIDA EL SCROLL AL RECARGAR LA PAGINA PARA APARECER SIEMPRE ARRIBA (influye en la aparicion de los videos de los trabajos) */
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    /* FUNCIONALIDAD LOGO REPRODUCTOR */
    $(".vid-item").on("click", function (e) {
        let contenedor_reproductor = document.getElementById("div_reproductor");
        if (contenedor_reproductor.firstElementChild.nodeName != 'IFRAME') {
            //si el iframe NO ha sido creado
            contenedor_reproductor.style.paddingBottom = "52.6%";
            contenedor_reproductor.innerHTML = "<iframe id=\"vid_frame\" src=\"\" frameborder=\"0\" allowfullscreen></iframe>";
        }
        let clase_elemento = $(e.target)[0].className;
        let titulo_video = document.getElementById("titulo_video");
        let reproductor = document.getElementById("vid_frame");
        if (clase_elemento == '' || clase_elemento.includes('play-icon')) {
            //El evento click se ha hecho en la imagen o en el icono del play
            titulo_video.innerHTML = $(e.target)[0].parentNode.nextElementSibling.textContent;
            reproductor.src = $(e.target)[0].parentNode.parentNode.dataset.src;
        } else if (clase_elemento.includes('vid-item')) {
            //el evento click se ha hecho en el contenedor del video
            reproductor.src = $(e.target)[0].dataset.src;
            titulo_video.innerHTML = $(e.target)[0].textContent;
        } else if (clase_elemento.includes('desc')) {
            //el evento del click se ha hecho en las letras del video
            reproductor.src = $(e.target)[0].parentNode.dataset.src;
            titulo_video.innerHTML = $(e.target)[0].textContent;
        }
        //te dirige al reproductor en '0,8 segundos
        $('html, body').animate({
            scrollTop: ($("#vid_frame").offset().top - 30)
        }, 800);
        //animacion zoomIn al ver nuevo video
        contenedor_reproductor.className = "vid-container animated zoomIn";
        contenedor_reproductor.addEventListener("animationend", function () {
            contenedor_reproductor.className = "vid-container";
        }, false);
    });

    /* FUNCIONALIDAD FLECHAS REPRODUCTOR */
    $(".arrow-right").bind("click", function (event) {
        event.preventDefault();
        $(".vid-list-container").stop().animate({
            scrollLeft: "+=180"
        }, 750);
    });
    $(".arrow-left").bind("click", function (event) {
        event.preventDefault();
        $(".vid-list-container").stop().animate({
            scrollLeft: "-=180"
        }, 750);
    });

    /* ELIGE UNA FRASE ALEATORIAMENTE CADA VEZ QUE ENTRA EN LA PAGINA */
    let frases = ['"por eso fuma, fuma fuma sólo vuela"', '"Caviar looks smart but Caviart is Art"', '"vive por y para los tuyos, bitch"', '"money, i need that money, money"'];
    let random_num = Math.round(Math.random() * ((frases.length - 1) - 0) + parseInt(0));
    $('#random-frase').text(frases[random_num]);

    /* VIDEOS DE TRABAJOS APARECEN CON SCROLL */
    var videos_aparecidos = false;
    var scroll_active = $('.scroll-born');//span = scroll de fila
    $(window).scroll(function () {
        if (scroll_active.length != 0) {
            if (!videos_aparecidos && $(window).scrollTop() > ($(scroll_active[0]).offset().top - 300)) {
                //entra SOLO cuando no se han mostrado todos los videos Y el scroll de la pagina es mayor al scroll-born(span) de la fila indicada
                for (let i = 0; i < scroll_active.length; i++) {
                    if ($(window).scrollTop() > ($(scroll_active[i]).offset().top - 500)) {
                        //primer video
                        let video_1_fila = $(scroll_active[i])[0].nextElementSibling;
                        comprobarBusqueda(video_1_fila);
                        let video_2_fila = $(scroll_active[i])[0].nextElementSibling.nextElementSibling;
                        if (video_2_fila != null) {
                            //verifica si existe un segundo video en la fila
                            comprobarBusqueda(video_2_fila);
                            let video_3_fila = $(scroll_active[i])[0].nextElementSibling.nextElementSibling.nextElementSibling;
                            if (video_3_fila != null) {
                                //verifica si existe un tercer video
                                comprobarBusqueda(video_3_fila);
                            }
                        }
                        $(scroll_active[i]).addClass("scroll-dead");
                        $(scroll_active[i]).removeClass("scroll-born");
                        if (scroll_active.length != 1) {
                            scroll_active.splice(i, 1);
                            //elimina un scroll-born para coger el offset.top del siguiente scroll-born
                        }
                        let videos_trabajos = $('.vid-item-trabajos');
                        for (let q = 0; q < videos_trabajos.length; q++) {
                            //cuando hayan aparecido todos los videos, se bloquea la ejecucion de esta funcion
                            //para liberar recursos
                            if (videos_trabajos[q].className.includes('video-visible-animation')) {
                                videos_aparecidos = true;
                            } else {
                                videos_aparecidos = false;
                            }
                        }
                    }
                }
            }
        }
    });
    /* ELIMINA LA ANIMACION DE LOS VIDEOS DE LA SECCION TRABAJOS UNA VEZ HA ACABADO LA ANIMACION AL SER VISIBLES */
    function finalizarAnimacion(video) {
        video.addEventListener("animationend", function () {
            $(video).removeClass('video-visible-animation');
        });
    }
    /* COMPRUEBA SI SE HA HECHO UNA BUSQUEDA DE VIDEO ANTES DE QUE APAREZCAN LOS VIDEOS DE LA SECCION TRABAJOS */
    function comprobarBusqueda(video) {
        let busqueda = document.getElementById("busqueda").value.trim().toLowerCase();
        if (!$(video)[0].children[1].textContent.toLowerCase().includes(busqueda)) {
            $(video).css('opacity', '0');
        } else {
            $(video).css('opacity', '1');
            $(video).addClass('video-visible-animation');
            finalizarAnimacion(video);
        }
    }
    /* BUSQUEDA DE VIDEO POR TITULO */
    $("#busqueda").on('keyup', function () {
        let busqueda = document.getElementById("busqueda").value.trim().toLowerCase();
        let encontrado = 0;
        for (let i = 0; i < $('.title-vid-trabajo').length; i++) {
            if ($('.title-vid-trabajo')[i].textContent.toLowerCase().includes(busqueda)) {
                $($('.title-vid-trabajo')[i].parentNode).css('display', 'grid');
                encontrado++;
            } else {
                $($('.title-vid-trabajo')[i].parentNode).css('display', 'none');
            }
        }
        if (encontrado == 0) {
            $('#nofound').css('display', 'block');
        } else {
            $('#nofound').css('display', 'none');
        }
    });

    /* SCROLL */
    $('.caviart-scroll').on('click', function (e) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var posX = Math.round($($(e.target)[0].hash).offset().top);
            console.log("mobile");
        } else {
            let anchoPantalla = screen.width;
            if (anchoPantalla <= '968') {
                var posX = Math.round($($(e.target)[0].hash).offset().top);
            } else {
                var posX = Math.round($($(e.target)[0].hash).offset().top);
            }

        }
        console.log(posX);
        
        $('html, body').animate({
            scrollTop: posX
        }, 800);
    });

    /* CAMBIA EL TEXTO AL ELEGIR UNA OPCION AL ORDENAR LOS TRABAJOS */
    $('#lista-orden li').on('click', function (e) {
        let ordenacion = $(e.target)[0].innerHTML;
        $('#categoria-seleccionada').html(ordenacion);
    });

    /* FUNCIONES DE LA FICHA */

    /* MUESTRA LOS VOTOS DE VOTACION */
    $(".votos").on("mouseenter", function (e) {
        if ($('#preg_voto')[0].innerHTML != "") {
            var puntuacion = $(e.target)[0].dataset.info;
            for (var i = 5; i >= 1; i--) {
                if (i <= puntuacion) {
                    $('#star_' + i).addClass('checked');
                } else {
                    $('#star_' + i).removeClass('checked');
                }
            }
        }
    });
    /* REALIZA UNA VOTACIÓN DEL VIDEO */
    $(".votos").on("click", function (e) {
        if ($('#preg_voto')[0].innerHTML != "") {
            var puntuacion = $(e.target)[0].dataset.info;
            for (var i = puntuacion; i >= 1; i--) {
                $('#star_' + i).addClass('checked');
            }
            $('#preg_voto').html("");
            $('#voto').html("¡Gracias por votar!");
        }
    });

    let email_suscrito = false;

    /* COMPRUEBA QUE SE HA INSERTADO UN CORREO VALIDO Y SE HA HECHO TICK EN EL CHECK */
    $("#enviarSuscri").on("click", function () {
        let check = document.getElementById("checkSuscri");
        if (!email_suscrito) {
            if (check.checked) {
                let correo = $("#correo_suscripcion")[0];
                if (correo.value.trim().length != 0) {
                    if (isValidEmail(correo.value.trim())) {
                        correo.style.border = "0";
                        $('#suscripcion_completa').css('display', 'block');
                        email_suscrito = true;
                    } else {
                        correo.style.border = "1px solid rgba(255, 0, 0, 0.8)";
                    }
                } else {
                    correo.style.border = "1px solid rgba(255, 0, 0, 0.8)";
                }
            } else {
                check.focus();
            }
        }
    });

    function isValidEmail(mail) {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(mail);
    }

    let comentario_enviado = false;

    /*  */
    $("#enviarComentario").on("click", function () {
        if (!comentario_enviado) {
            let nombre = $("#nombre_comentario")[0].value.trim();
            if (nombre.length == 0) {
                nombre = "Anónimo";
            }
            let comentario = $("#comentario")[0].value.trim();
            if (comentario.length != 0) {
                $("#comentario_enviado").css("display", "block");
                $("#comentario").css("border", "1px solid #ccc");
                comentario_enviado = true;
            } else {
                $("#comentario").css("border", "1px solid rgba(255, 0, 0, 0.8)");
            }
        }
    });

    //#region ANIMACION DE ZOOM DEL LOGO CAVIART EN LA HOME
    let logo_caviart = document.getElementById("logo_caviart");
    if (logo_caviart != null) {
        logo_caviart.addEventListener('mouseover', function () {
            logo_caviart.className = "animated zoomOut";
            logo_caviart.addEventListener("animationend", function () {
                logo_caviart.className = "animated zoomIn";
            }, false);

        });

        //evento de zoom del logo para movil (hace lo mismo que antes pero al darle con el dedo o al clicar con el raton)
        logo_caviart.addEventListener('click', function () {
            logo_caviart.className = "animated zoomOut";
            logo_caviart.addEventListener("animationend", function () {
                logo_caviart.className = "animated zoomIn"
            }, false);

        });
    }

    //#endregion



    $.ajax({
        method: 'POST',
        url: 'consultas.php',
        data: { 'hola': 'yes' },
        success: function (data) {
            console.log("fin");
        }
    });
});