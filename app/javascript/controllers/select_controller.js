import { Controller } from '@hotwired/stimulus';
import TomSelect from 'tom-select';

// Connects to data-controller="select"
export default class extends Controller {
  connect() {
    const config = {};
    new TomSelect(this.element, config);
  }
}
