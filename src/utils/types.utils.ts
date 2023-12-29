import { GetOptions, TrackingType } from '@legendapp/state';

export type Nullable<T> = T extends object
  ? { [K in keyof T]: Nullable<T[K]> | undefined } | undefined
  : T | undefined;

declare module '@legendapp/state' {
  interface ObservableBaseFns<T> {
    get(
      options?:
        | TrackingType
        | (GetOptions & {
            suspense?: boolean;
          }),
    ): Nullable<T>;
  }
}
