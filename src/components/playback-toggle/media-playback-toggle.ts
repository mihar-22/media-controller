import { safelyDefineCustomElement } from '../../utils';
import { PlaybackToggle } from './PlaybackToggle';

safelyDefineCustomElement('media-playback-toggle', PlaybackToggle);

declare global {
  interface HTMLElementTagNameMap {
    'media-playback-toggle': PlaybackToggle;
  }
}
