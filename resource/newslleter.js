/* ANIMACION LOTTIE */
var animacion = document.querySelector(".lottie");

function cargarAnimacion() {
  bodymovin.loadAnimation({
    container: animacion,
    renderer: "svg",
    loop: true,
    autoplay: true,
    rendererSettings: {
      progressiveLoad: false,
    },
    path: "../resource/animacion.json",
  });
}

cargarAnimacion();

/* MAILCHIMP */

(function ($) {
  window.fnames = new Array();
  window.ftypes = new Array();
  fnames[0] = "EMAIL";
  ftypes[0] = "email";

  $.extend($.validator.messages, {
    required: "Este campo es obligatorio.",
    email: "Por favor, escribe una dirección de correo válido",
  });
})(jQuery);
var $mcj = jQuery.noConflict(true);