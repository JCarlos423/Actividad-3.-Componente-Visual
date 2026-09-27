// --- COMPONENTE 1: MODAL ---
class Modal {
  constructor(modalElement) {
    this.modal = typeof modalElement === 'string' ? document.querySelector(modalElement) : modalElement;
    this.closeBtn = this.modal.querySelector('.modal-close');
    this._init();
  }

  _init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
  }

  open() {
    this.modal.classList.add('active');
  }

  close() {
    this.modal.classList.remove('active');
  }
}

// --- COMPONENTE 2: CARRUSEL ---
class Carousel {
  constructor(containerElement) {
    this.container = typeof containerElement === 'string' ? document.querySelector(containerElement) : containerElement;
    this.track = this.container.querySelector('.carousel-track');
    this.slides = Array.from(this.track.children);
    this.nextBtn = this.container.querySelector('.carousel-btn.next');
    this.prevBtn = this.container.querySelector('.carousel-btn.prev');
    this.currentIndex = 0;

    this._init();
  }

  _init() {
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
  }

  _updatePosition() {
    this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this._updatePosition();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this._updatePosition();
  }
}

// --- COMPONENTE 3: BARRA DE VOLUMEN ---
class VolumeBar {
  constructor(containerElement, options = {}) {
    this.container = typeof containerElement === 'string' ? document.querySelector(containerElement) : containerElement;
    this.icon = this.container.querySelector('.volume-icon');
    this.wrapper = this.container.querySelector('.volume-slider-wrapper');
    this.fill = this.container.querySelector('.volume-fill');
    this.text = this.container.querySelector('.volume-text');

    this.volume = options.initialVolume ?? 50;
    this.isMuted = false;
    this.lastVolume = this.volume;
    this.onChange = options.onChange || null;

    this._init();
  }

  _init() {
    this.setVolume(this.volume);

    this.wrapper.addEventListener('click', (e) => {
      const rect = this.wrapper.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
      this.setVolume(percentage);
    });

    if (this.icon) {
      this.icon.addEventListener('click', () => this.toggleMute());
    }
  }

  setVolume(value) {
    this.volume = value;
    this.fill.style.width = `${this.volume}%`;
    if (this.text) this.text.textContent = `${this.volume}%`;
    this._updateIcon();
    
    if (this.onChange) this.onChange(this.volume);
  }

  toggleMute() {
    if (this.isMuted) {
      this.isMuted = false;
      this.setVolume(this.lastVolume || 50);
    } else {
      this.lastVolume = this.volume;
      this.isMuted = true;
      this.setVolume(0);
    }
  }

  _updateIcon() {
    if (!this.icon) return;
    if (this.volume === 0) {
      this.icon.textContent = '🔇';
    } else if (this.volume < 50) {
      this.icon.textContent = '🔉';
    } else {
      this.icon.textContent = '🔊';
    }
  }
}