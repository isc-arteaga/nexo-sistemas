/* ===================== CARRUSEL ===================== */
const carrusel = document.querySelector(".carrusel");

if (carrusel) {
  const slides = carrusel.querySelectorAll(".slide");
  const botonAnterior = carrusel.querySelector(".anterior");
  const botonSiguiente = carrusel.querySelector(".siguiente");
  const contenedorPuntos = carrusel.querySelector(".puntos");
  const TIEMPO = 5000; // milisegundos entre cada imagen (5000 = 5 segundos)

  let actual = 0;
  let temporizador = null;

  // Crear un punto por cada imagen
  const puntos = [];
  slides.forEach((slide, i) => {
    const punto = document.createElement("button");
    punto.setAttribute("aria-label", "Ir a la imagen " + (i + 1));
    punto.addEventListener("click", () => {
      mostrar(i);
      reiniciar();
    });
    contenedorPuntos.appendChild(punto);
    puntos.push(punto);
  });

  function mostrar(indice) {
    slides[actual].classList.remove("activo");
    puntos[actual].classList.remove("activo");

    actual = (indice + slides.length) % slides.length;

    slides[actual].classList.add("activo");
    puntos[actual].classList.add("activo");
  }

  function siguiente() {
    mostrar(actual + 1);
  }

  function anterior() {
    mostrar(actual - 1);
  }

  function iniciar() {
    detener();
    temporizador = setInterval(siguiente, TIEMPO);
  }

  function detener() {
    if (temporizador) {
      clearInterval(temporizador);
      temporizador = null;
    }
  }

  function reiniciar() {
    iniciar();
  }

  botonSiguiente.addEventListener("click", () => {
    siguiente();
    reiniciar();
  });

  botonAnterior.addEventListener("click", () => {
    anterior();
    reiniciar();
  });

  // Pausar cuando el mouse está encima del carrusel
  carrusel.addEventListener("mouseenter", detener);
  carrusel.addEventListener("mouseleave", iniciar);

  // Deslizar con el dedo en el teléfono
  let inicioX = 0;

  carrusel.addEventListener(
    "touchstart",
    (e) => {
      inicioX = e.touches[0].clientX;
      detener();
    },
    { passive: true }
  );

  carrusel.addEventListener("touchend", (e) => {
    const diferencia = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(diferencia) > 50) {
      diferencia < 0 ? siguiente() : anterior();
    }
    iniciar();
  });

  // Flechas del teclado, solo cuando el carrusel está enfocado
  carrusel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      siguiente();
      reiniciar();
    }
    if (e.key === "ArrowLeft") {
      anterior();
      reiniciar();
    }
  });

  // Respetar a quienes desactivan las animaciones en su dispositivo
  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Estado inicial
  slides[0].classList.add("activo");
  puntos[0].classList.add("activo");

  if (!sinMovimiento) {
    iniciar();
  }
}

/* ===================== MENÚ EN TELÉFONO ===================== */
const botonMenu = document.querySelector(".menu-boton");
const menu = document.querySelector(".menu");

if (botonMenu && menu) {
  botonMenu.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
    botonMenu.innerHTML = abierto ? "&times;" : "&#9776;";
  });

  // Cerrar el menú al elegir un apartado
  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      menu.classList.remove("abierto");
      botonMenu.setAttribute("aria-expanded", "false");
      botonMenu.innerHTML = "&#9776;";
    });
  });
}