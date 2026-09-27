    // Inicialización del Modal
    const modal = new Modal('#myModal');
    document.getElementById('openModalBtn').addEventListener('click', () => modal.open());


    // Inicialización del Carrusel
    const carousel = new Carousel('#myCarousel');

    const miVideo = document.getElementById('miVideo');

    // Inicialización de la Barra de Volumen
    const volumeBar = new VolumeBar('#myVolume', {
      initialVolume: 50,
      onChange: (nuevoVolumen) => {
      // Convertimos de 0-100 a 0.0-1.0
      miVideo.volume = nuevoVolumen / 100;
    }
  });