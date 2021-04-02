import { safelyDefineCustomElement } from '../../utils';
import { MediaController } from './MediaController';

safelyDefineCustomElement('media-controller', MediaController);

declare global {
  interface HTMLElementTagNameMap {
    'media-controller': MediaController;
  }
}
