import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['container'];

  connect() {
    this.toggleClass = this.data.get('class') || 'hidden';
    this.backgroundId = this.data.get('backgroundId') || 'modal-background';
    this.backgroundHtml = this.data.get('backgroundHtml') || this._backgroundHTML();
    this.allowBackgroundClose = (this.data.get('allowBackgroundClose') || 'true') === 'true';
    this.preventDefaultActionOpening = (this.data.get('preventDefaultActionOpening') || 'true') === 'true';
    this.preventDefaultActionClosing = (this.data.get('preventDefaultActionClosing') || 'true') === 'true';
  }

  disconnect() {
    this.close();
  }

  open(e) {
    if (this.preventDefaultActionOpening) {
      e.preventDefault();
    }

    e.target.blur();

    this.lockScroll();

    this.containerTarget.classList.remove(this.toggleClass);

    if (!this.data.get('disable-backdrop')) {
      document.body.insertAdjacentHTML('beforeend', this.backgroundHtml);
      this.background = document.querySelector(`#${this.backgroundId}`);
    }
  }

  close(e) {
    if (e && this.preventDefaultActionClosing) {
      e.preventDefault();
    }

    this.unlockScroll();
    this.containerTarget.classList.add(this.toggleClass);

    if (this.background) {
      this.background.remove();
    }
  }

  closeBackground(e) {
    if (this.allowBackgroundClose && e.target === this.containerTarget) {
      this.close(e);
    }
  }

  closeWithKeyboard(e) {
    if (
      e.keyCode === 27 &&
      !this.containerTarget.classList.contains(this.toggleClass)
    ) {
      this.close(e);
    }
  }

  _backgroundHTML() {
    return `<div id="${this.backgroundId}" class="fixed top-0 left-0 w-full h-full" style="background-color: rgba(0, 0, 0, 0.8); z-index: 9998;"></div>`;
  }

  lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    this.saveScrollPosition();
    document.body.classList.add('fixed', 'inset-x-0', 'overflow-hidden');
    document.body.style.top = `-${this.scrollPosition}px`;
  }

  unlockScroll() {
    document.body.style.paddingRight = null;
    document.body.classList.remove('fixed', 'inset-x-0', 'overflow-hidden');
    this.restoreScrollPosition();
    document.body.style.top = null;
  }

  saveScrollPosition() {
    this.scrollPosition = window.pageYOffset || document.body.scrollTop;
  }

  restoreScrollPosition() {
    document.documentElement.scrollTop = this.scrollPosition;
  }
}
