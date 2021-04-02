import {
  CSSResultArray,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import { getSlottedChildren, isNil, setAttribute } from '../../utils';
import { toggleStyles } from './toggle.styles';

/**
 * A toggle component to render different state depending on whether it's `on` or `off`. This
 * component will always render both the `on` and `off` slots regardless of the current
 * state so you can perform CSS animations. A `hidden` attribute will be applied to the slot
 * that's currently `off`.
 */
export class Toggle extends LitElement {
  static get styles(): CSSResultArray {
    return [toggleStyles];
  }

  protected currentOnSlotElement?: HTMLElement;

  protected currentOffSlotElement?: HTMLElement;

  @property({ type: Boolean, reflect: true })
  on = false;

  disconnectedCallback(): void {
    this.currentOnSlotElement = undefined;
    this.currentOffSlotElement = undefined;
  }

  render(): TemplateResult {
    return this.renderToggle();
  }

  protected renderToggle(): TemplateResult {
    this.toggle();
    return html`${this.renderOnSlot()} ${this.renderOffSlot()}`;
  }

  // -------------------------------------------------------------------------------------------
  // On
  // -------------------------------------------------------------------------------------------

  protected getOnSlotName(): string {
    return 'on';
  }

  protected renderOnSlot(): TemplateResult {
    return html`
      <slot
        name=${this.getOnSlotName()}
        @slotchange="${this.handleOnSlotChange}"
      ></slot>
    `;
  }

  protected handleOnSlotChange(): void {
    this.currentOnSlotElement = getSlottedChildren(
      this,
      this.getOnSlotName(),
    )[0] as HTMLElement;

    this.toggle();
  }

  // -------------------------------------------------------------------------------------------
  // Off
  // -------------------------------------------------------------------------------------------

  protected getOffSlotName(): string {
    return 'off';
  }

  protected renderOffSlot(): TemplateResult {
    return html`<slot
      name=${this.getOffSlotName()}
      @slotchange="${this.handleOffSlotChange}"
    ></slot>`;
  }

  protected handleOffSlotChange(): void {
    this.currentOffSlotElement = getSlottedChildren(
      this,
      this.getOffSlotName(),
    )[0] as HTMLElement;

    this.toggle();
  }

  // -------------------------------------------------------------------------------------------
  // Toggle
  // -------------------------------------------------------------------------------------------

  protected toggle(): void {
    this.toggleHiddenAttr(this.currentOnSlotElement, !this.on);
    this.toggleHiddenAttr(this.currentOffSlotElement, this.on);
  }

  protected toggleHiddenAttr(el?: HTMLElement, isHidden?: boolean): void {
    if (!isNil(el)) {
      setAttribute(el, 'hidden', isHidden ? '' : undefined);
    }
  }
}
