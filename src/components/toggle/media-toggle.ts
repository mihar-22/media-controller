import { safelyDefineCustomElement } from '../../utils';
import { Toggle } from './Toggle';

safelyDefineCustomElement('media-toggle', Toggle);

declare global {
  interface HTMLElementTagNameMap {
    'media-toggle': Toggle;
  }
}
