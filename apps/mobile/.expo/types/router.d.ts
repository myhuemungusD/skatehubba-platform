/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)/challenge/new` | `/(tabs)/map` | `/_sitemap` | `/challenge/new` | `/closet` | `/heshur` | `/map` | `/sign-in` | `/skate/leaderboard` | `/skate/new`;
      DynamicRoutes: `/profile/${Router.SingleRoutePart<T>}` | `/skate/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/profile/[handle]` | `/skate/[id]`;
    }
  }
}
