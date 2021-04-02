import { contextRecordProvider, provideContextRecord } from '@wcom/context';
import { listen } from '@wcom/events';
import { CSSResultArray, html, LitElement, TemplateResult } from 'lit-element';

import { getSlottedChildren, isNil, isUndefined } from '../../utils';
import { mediaContext, MediaContextProvider } from './controller.context';
import { controllerStyles } from './controller.css';
import { UserPauseEvent, UserPlayEvent } from './controller.events';

@provideContextRecord(mediaContext)
export class MediaController extends LitElement {
  static get styles(): CSSResultArray {
    return [controllerStyles];
  }

  protected mediaEl?: HTMLMediaElement;

  // -------------------------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------------------------

  render(): TemplateResult {
    return html`
      <div id="root">${this.renderMediaSlot()}${this.renderDefaultSlot()}</div>
    `;
  }

  protected renderDefaultSlot(): TemplateResult {
    return html`<slot></slot>`;
  }

  protected renderMediaSlot(): TemplateResult {
    return html`
      <slot name="media" @slotchange="${this.handleMediaSlotChange}"></slot>
    `;
  }

  protected handleMediaSlotChange(): void {
    const mediaEl = getSlottedChildren(this)[0] as HTMLMediaElement;

    if (!isNil(this.mediaEl) && isUndefined(mediaEl?.play)) {
      throw Error('Invalid media element given to `media` slot.');
    }

    this.mediaEl = mediaEl;
    this.addMediaEventListeners();
  }

  // -------------------------------------------------------------------------------------------
  // Media Events
  // -------------------------------------------------------------------------------------------

  @contextRecordProvider(mediaContext)
  readonly context!: MediaContextProvider;

  protected addMediaEventListeners(): void {
    if (isNil(this.mediaEl)) return;

    const mediaEventHandlerMap: Record<string, () => void> = {
      play: this.handleMediaPlayEvent,
      pause: this.handleMediaPauseEvent,
    };

    Object.keys(mediaEventHandlerMap).forEach(mediaEventType => {
      this.mediaEl?.addEventListener(
        mediaEventType,
        mediaEventHandlerMap[mediaEventType].bind(this),
      );
    });
  }

  protected handleMediaPlayEvent(): void {
    this.context.paused = false;
  }

  protected handleMediaPauseEvent(): void {
    this.context.paused = true;
  }

  // -------------------------------------------------------------------------------------------
  // User Events
  // -------------------------------------------------------------------------------------------

  // !-- We'd normally have error handling here and potentially a request queue. --!

  @listen(UserPlayEvent.TYPE)
  protected handleUserPlayEvent(e: UserPlayEvent): void {
    e.stopImmediatePropagation();
    this.mediaEl?.play();
  }

  @listen(UserPauseEvent.TYPE)
  protected handleUserPauseEvent(e: UserPauseEvent): void {
    e.stopImmediatePropagation();
    this.mediaEl?.pause();
  }
}
