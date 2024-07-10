/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as LoginImport } from './routes/login'

// Create Virtual Routes

const JoinLazyImport = createFileRoute('/join')()
const BrowseLazyImport = createFileRoute('/browse')()
const IndexLazyImport = createFileRoute('/')()
const SwipeRoomIdLazyImport = createFileRoute('/swipe/$roomId')()
const RoomRoomidLazyImport = createFileRoute('/room/$roomid')()
const ResultsRoomIdLazyImport = createFileRoute('/results/$roomId')()
const PreferencesRoomIdLazyImport = createFileRoute('/preferences/$roomId')()
const OauthProviderLazyImport = createFileRoute('/oauth/$provider')()

// Create/Update Routes

const JoinLazyRoute = JoinLazyImport.update({
  path: '/join',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/join.lazy').then((d) => d.Route))

const BrowseLazyRoute = BrowseLazyImport.update({
  path: '/browse',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/browse.lazy').then((d) => d.Route))

const SignupRoute = SignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SwipeRoomIdLazyRoute = SwipeRoomIdLazyImport.update({
  path: '/swipe/$roomId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/swipe.$roomId.lazy').then((d) => d.Route))

const RoomRoomidLazyRoute = RoomRoomidLazyImport.update({
  path: '/room/$roomid',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/room.$roomid.lazy').then((d) => d.Route))

const ResultsRoomIdLazyRoute = ResultsRoomIdLazyImport.update({
  path: '/results/$roomId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/results.$roomId.lazy').then((d) => d.Route),
)

const PreferencesRoomIdLazyRoute = PreferencesRoomIdLazyImport.update({
  path: '/preferences/$roomId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/preferences.$roomId.lazy').then((d) => d.Route),
)

const OauthProviderLazyRoute = OauthProviderLazyImport.update({
  path: '/oauth/$provider',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/oauth.$provider.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/browse': {
      id: '/browse'
      path: '/browse'
      fullPath: '/browse'
      preLoaderRoute: typeof BrowseLazyImport
      parentRoute: typeof rootRoute
    }
    '/join': {
      id: '/join'
      path: '/join'
      fullPath: '/join'
      preLoaderRoute: typeof JoinLazyImport
      parentRoute: typeof rootRoute
    }
    '/oauth/$provider': {
      id: '/oauth/$provider'
      path: '/oauth/$provider'
      fullPath: '/oauth/$provider'
      preLoaderRoute: typeof OauthProviderLazyImport
      parentRoute: typeof rootRoute
    }
    '/preferences/$roomId': {
      id: '/preferences/$roomId'
      path: '/preferences/$roomId'
      fullPath: '/preferences/$roomId'
      preLoaderRoute: typeof PreferencesRoomIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/results/$roomId': {
      id: '/results/$roomId'
      path: '/results/$roomId'
      fullPath: '/results/$roomId'
      preLoaderRoute: typeof ResultsRoomIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/room/$roomid': {
      id: '/room/$roomid'
      path: '/room/$roomid'
      fullPath: '/room/$roomid'
      preLoaderRoute: typeof RoomRoomidLazyImport
      parentRoute: typeof rootRoute
    }
    '/swipe/$roomId': {
      id: '/swipe/$roomId'
      path: '/swipe/$roomId'
      fullPath: '/swipe/$roomId'
      preLoaderRoute: typeof SwipeRoomIdLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  LoginRoute,
  SignupRoute,
  BrowseLazyRoute,
  JoinLazyRoute,
  OauthProviderLazyRoute,
  PreferencesRoomIdLazyRoute,
  ResultsRoomIdLazyRoute,
  RoomRoomidLazyRoute,
  SwipeRoomIdLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/signup",
        "/browse",
        "/join",
        "/oauth/$provider",
        "/preferences/$roomId",
        "/results/$roomId",
        "/room/$roomid",
        "/swipe/$roomId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/browse": {
      "filePath": "browse.lazy.tsx"
    },
    "/join": {
      "filePath": "join.lazy.tsx"
    },
    "/oauth/$provider": {
      "filePath": "oauth.$provider.lazy.tsx"
    },
    "/preferences/$roomId": {
      "filePath": "preferences.$roomId.lazy.tsx"
    },
    "/results/$roomId": {
      "filePath": "results.$roomId.lazy.tsx"
    },
    "/room/$roomid": {
      "filePath": "room.$roomid.lazy.tsx"
    },
    "/swipe/$roomId": {
      "filePath": "swipe.$roomId.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
