import { css } from 'lit-element';

export const controllerStyles = css`
  :host {
    display: inline-block;
    contain: content;
  }

  #root {
    position: relative;
    display: inline-block;
  }

  video {
    border-radius: inherit;
    border: 0;
    display: inline-block;
    max-height: 100vh;
    outline: 0;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
    z-index: 0;
  }
`;
