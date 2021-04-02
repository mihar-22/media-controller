export const IS_CLIENT = typeof window !== 'undefined';

/**
 * Checks if `value` is `null`.
 *
 * @param value - The value to check.
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 * Checks if `value` is `undefined`.
 *
 * @param value - The value to check.
 */
export const isUndefined = (value: unknown): value is undefined =>
  typeof value === 'undefined';

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param value - The value to check.
 */
export const isNil = (value: unknown): value is null | undefined =>
  isNull(value) || isUndefined(value);

/**
 * Registers a custom element in the CustomElementRegistry. By "safely" we mean:
 *
 * - Called only client-side (`window` is defined).
 * - The element is only registered if it hasn't been registered before under the given `name`.
 *
 * @param name - A string representing the name you are giving the element.
 * @param constructor - A class object that defines the behaviour of the element.
 */
export const safelyDefineCustomElement = (
  name: string,
  constructor: CustomElementConstructor,
  isClient = IS_CLIENT,
): void => {
  const isElementRegistered = isClient && window.customElements.get(name);
  if (!isClient || isElementRegistered) return;
  window.customElements.define(name, constructor);
};

/**
 * Returns elements assigned to the default slot in the shadow root. Filters out all nodes
 * which are not of type `Node.ELEMENT_NODE`.
 *
 * @param el - The element containing the slot.
 * @param name - The name of the slot (optional).
 */
export function getSlottedChildren(el: HTMLElement, name?: string): Element[] {
  const selector = name ? `slot[name="${name}"]` : 'slot';
  const slot = el.shadowRoot?.querySelector(selector) as HTMLSlotElement | null;
  const childNodes = slot?.assignedNodes({ flatten: true }) ?? [];

  return Array.prototype.filter.call(
    childNodes,
    node => node.nodeType == Node.ELEMENT_NODE,
  );
}

/**
 * Sets an attribute on the given `el`. If the `attrValue` is `undefined` the attribute will
 * be removed.
 *
 * @param el - The element to set the attribute on.
 * @param attrName - The name of the attribute.
 * @param attrValue - The value of the attribute.
 */
export function setAttribute(
  el: HTMLElement,
  attrName: string,
  attrValue?: string,
): void {
  if (isUndefined(attrValue)) {
    el.removeAttribute(attrName);
  } else {
    el.setAttribute(attrName, attrValue);
  }
}
