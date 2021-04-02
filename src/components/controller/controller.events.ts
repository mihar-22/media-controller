declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface GlobalEventHandlersEventMap extends MediaUserEvents {}
}

export class MediaUserEvent<T = void> extends CustomEvent<T> {
  constructor(typeArg: string) {
    super(typeArg, {
      bubbles: true,
      cancelable: true,
      composed: true,
    });
  }
}

export interface MediaUserEvents {
  'media-user-pause': MediaUserEvent<void>;
  'media-user-play': MediaUserEvent<void>;
}

// One concern might be that you'll need a lot of user events but you actually don't.

// To cover foundational stuff you need somewhere around 12?

// Play, Pause, MutedChange, VolumeChange, FullscreenChange, Seeking, Seeked, PictureInPictureChange,
// CaptionsChange, PlaybackRateChange, PlaybackQualityChange... ~done?

export class UserPauseEvent extends MediaUserEvent<void> {
  static TYPE = 'media-user-pause';
  constructor() {
    super(UserPauseEvent.TYPE);
  }
}

export class UserPlayEvent extends MediaUserEvent<void> {
  static TYPE = 'media-user-play';
  constructor() {
    super(UserPlayEvent.TYPE);
  }
}
