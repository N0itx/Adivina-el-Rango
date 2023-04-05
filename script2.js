$(document).ready(function() {
  // Lista de videos con sus rangos correspondientes
  var videos = [
    {
      // src: "videos/video1.mp4",
      src: "2ANl3JLzaSI",
      rango: "Hierro",
      peak: "Diamante",
      user: "PepitoGamer12",
      kdratio: 1.2,
      headshot: 50,
      winrate: 10,
      main: "Reyna",
      visto: false,
    },
    {
      // src: "videos/video2.mp4",
      src: "_r7ojW54YsY",
      rango: "Bronce",
      peak: "Ascendente",
      user: "BenitoKamela48",
      kdratio: 0.1,
      headshot: 10,
      winrate: 50,
      main: "Skye",
      visto: false,
    },
    {
      // src: "videos/video3.mp4",
      src: "WfnKYCMMsgc",
      rango: "Radiante",
      peak: "Radiante",
      user: "Elmasteton83",
      kdratio: 3,
      headshot: 80,
      winrate: 100,
      main: "Viper",
      visto: false,
    }
  ];

  // Variables para llevar el registro de los puntos y el video actual
  var puntos = 0;
  var videoActual = null;
  var checkcolor = '';

  // Función para mostrar un video aleatorio y sus opciones de rango
  function mostrarVideo() {
    // Seleccionar un video aleatorio de la lista
    var videosNoVistos = videos.filter(function(video) {
      return !video.visto;
    });
    if (videosNoVistos.length === 0) {
      // alert("Felicidades! Has visto todos los videos.");
      // $('.container').fadeOut('slow', function() {
      //   $(this).remove();
      // });
      $('body').append(`<div class="final-box"><h1>ESOS FUERON TODOS LOS CLIPS <p>TOTAL: ${puntos}/${videos.length}</p> </h1><img src="sources/baile.webp"></div>`)
      return;
    }
    var videoIndex = Math.floor(Math.random() * videosNoVistos.length);
    var video = videosNoVistos[videoIndex];

    // Mostrar el video en el contenedor correspondiente
    var videoContainer = $("#video-container");
    // videoContainer.html(
    //   '<video width="640" height="360" controls><source src="' + video.src + '"></video>'
    // );
    videoContainer.html(
      `<iframe width=640 height="360" src="https://www.youtube.com/embed/${video.src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share" allowfullscreen></iframe>`
    );

    // Crear las opciones de rango
    var optionsContainer = $("#ranks-container");
    optionsContainer.empty();
    var rangos = ["Hierro", "Bronce", "Plata", "Oro", "Platino", "Diamante", "Ascendente", "Inmortal", "Radiante"];
    for (var i = 0; i < rangos.length; i++) {
      var option = $("<div>").addClass("option-rank").attr("data-rango", rangos[i]);
      // var optionImg = $("<img>").attr("src", "rangos/rank_" + (i+1) + ".png");
      var optionImg = $("<img>").attr("src", `rangos/${rangos[i]}.png`);
      option.append(optionImg);
      optionsContainer.append(option);
    }

    // Actualizar la variable de video actual
    videoActual = video;

    // Quitar la clase "selected" de las opciones al hacer clic en ellas
    optionsContainer.children().click(function() {
      optionsContainer.children().removeClass("selected");
      $(this).addClass("selected");
    });

    $('#check-answer-btn').show('slow');
    $('#check-container-next').hide('fast');
  }

  // Función para comprobar si la opción seleccionada es la correcta
  function comprobarPuntuacion() {
    var selectedOption = $("#ranks-container").find(".selected");
    if (selectedOption.length > 0) {
      var rangoSeleccionado = selectedOption.attr("data-rango");
      if (rangoSeleccionado === videoActual.rango) {
        puntos++;
        checkcolor = 'acierto';
      } else {
        checkcolor = 'fallo';
      }
      generarResultado(videoActual, rangoSeleccionado, checkcolor, puntos);
      videoActual.visto = true;
      // mostrarVideo();
    } else {
      alert("Por favor selecciona un rango antes de puntuar.");
    }
  }

  // Al hacer clic en el botón de puntuar, comprobar la puntuación
  $("#check-answer-btn").click(function() {
    comprobarPuntuacion();
  });
  $("#check-container-next").click(function() {
    mostrarVideo();
  });

  // Mostrar el primer video al cargar la página
  mostrarVideo();

  // Muestra la pantalla de resultado
  function generarResultado (info, rngslec, check, puntos) {
    $('body').append(`
      <div class="result-box"></div>
      <div class="result-container">
        <button class="result-close">X</button>
        <div class="result-title"><h2>RESULTADO</h2></div>
        <div class="result-ranks">
          <p>Rango Correcto</p>
          <p class="${check}">Tu Respuesta</p>
          <p>Puntuacion</p>
          <img src="rangos/${info.rango}.png">
          <img src="rangos/${rngslec}.png">
          <h1>${puntos}/${videos.length}</h1>
        </div>
        <div class="result-info">
          <div class="result-info-peak">
            <b>Rango Peak</b>
            <img src="rangos/${info.peak}.png">
          </div>
          <div class="result-info-user">
            <b>Username</b>
            <div>${info.user}</div>
          </div>
          <div class="result-info-kdratio">
            <b>K/D Ratio</b>
            <div>${info.kdratio}</div>
          </div>
          <div class="result-info-headshot">
            <b>HeadShot %</b>
            <div>${info.headshot}%</div>
          </div>
          <div class="result-info-wins">
            <b>Win Rate %</b>
            <div>${info.winrate}%</div>
          </div>
          <div class="result-info-main">
            <b>MAIN</b>
            <img src="personajes/${info.main}.png">
          </div>
        </div>
        <div class="result-next">
          <button>SIGUIENTE</button>
        </div>
      </div>
    `)
    $('.result-next > button').click(function() {
      mostrarVideo();
      $('.result-container, .result-box').fadeOut('slow', function() {
        $(this).remove();
      });
    });
    $('.result-close').click(function() {
      $('.result-container, .result-box').fadeOut('slow', function() {
        $(this).remove();
        $('#check-answer-btn').hide('fast');
        $('#check-container-next').show('fast');
      });
    });
  }
});

