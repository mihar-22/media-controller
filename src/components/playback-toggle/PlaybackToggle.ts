import { html, property, TemplateResult } from 'lit-element';

import { mediaContext, UserPauseEvent, UserPlayEvent } from '../controller';
import { Toggle } from '../toggle';

/**
 * A control for toggling the playback state (play/pause) of the current media.
 */
export class PlaybackToggle extends Toggle {
  @mediaContext.paused.consume({ transform: p => !p })
  on = false;

  @property() label = 'Play';

  protected getOnSlotName(): string {
    return 'pause';
  }

  protected getOffSlotName(): string {
    return 'play';
  }

  createRenderRoot(): ShadowRoot {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
    });
  }

  render(): TemplateResult {
    return html`
      <button part="button" type="button" @click="${this.handleControlClick}">
        ${this.renderToggle()}
      </button>
    `;
  }

  protected handleControlClick(): void {
    const Request = this.on ? UserPauseEvent : UserPlayEvent;
    this.dispatchEvent(new Request());
  }
}
