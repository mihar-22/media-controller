import createContext, {
  ContextRecord,
  ContextRecordProvider,
} from '@wcom/context';

export interface MediaProps extends Record<string, unknown> {
  paused: boolean;
}

export type MediaContext = ContextRecord<MediaProps>;
export type MediaContextProvider = ContextRecordProvider<MediaProps>;

export const mediaContext = {
  paused: createContext<boolean>(true),
};
