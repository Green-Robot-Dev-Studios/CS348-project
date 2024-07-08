/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const SignupLazyImport = createFileRoute('/signup')()
const LoginLazyImport = createFileRoute('/login')()
const JoinLazyImport = createFileRoute('/join')()
const BrowseLazyImport = createFileRoute('/browse')()
const IndexLazyImport = createFileRoute('/')()
const SwipeRoomIdLazyImport = createFileRoute('/swipe/$roomId')()
const ScoresheetRoomIdLazyImport = createFileRoute('/scoresheet/$roomId')()
const RoomRoomIdLazyImport = createFileRoute('/room/$roomId')()
const ResultsRoomIdLazyImport = createFileRoute('/results/$roomId')()
const PreferencesRoomIdLazyImport = createFileRoute('/preferences/$roomId')()
const OauthProviderLazyImport = createFileRoute('/oauth/$provider')()

// Create/Update Routes

const SignupLazyRoute = SignupLazyImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signup.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const JoinLazyRoute = JoinLazyImport.update({
  path: '/join',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/join.lazy').then((d) => d.Route))

const BrowseLazyRoute = BrowseLazyImport.update({
  path: '/browse',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/browse.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const SwipeRoomIdLazyRoute = SwipeRoomIdLazyImport.update({
  path: '/swipe/$roomId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/swipe.$roomId.lazy').then((d) => d.Route))

const ScoresheetRoomIdLazyRoute = ScoresheetRoomIdLazyImport.update({
  path: '/scoresheet/$roomId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/scoresheet.$roomId.lazy').then((d) => d.Route),
)

const RoomRoomIdLazyRoute = RoomRoomIdLazyImport.update({
  path: '/room/$roomId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/room.$roomId.lazy').then((d) => d.Route))

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
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupLazyImport
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
    '/room/$roomId': {
      id: '/room/$roomId'
      path: '/room/$roomId'
      fullPath: '/room/$roomId'
      preLoaderRoute: typeof RoomRoomIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/scoresheet/$roomId': {
      id: '/scoresheet/$roomId'
      path: '/scoresheet/$roomId'
      fullPath: '/scoresheet/$roomId'
      preLoaderRoute: typeof ScoresheetRoomIdLazyImport
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
  BrowseLazyRoute,
  JoinLazyRoute,
  LoginLazyRoute,
  SignupLazyRoute,
  OauthProviderLazyRoute,
  PreferencesRoomIdLazyRoute,
  ResultsRoomIdLazyRoute,
  RoomRoomIdLazyRoute,
  ScoresheetRoomIdLazyRoute,
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
        "/browse",
        "/join",
        "/login",
        "/signup",
        "/oauth/$provider",
        "/preferences/$roomId",
        "/results/$roomId",
        "/room/$roomId",
        "/scoresheet/$roomId",
        "/swipe/$roomId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/browse": {
      "filePath": "browse.lazy.tsx"
    },
    "/join": {
      "filePath": "join.lazy.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/signup": {
      "filePath": "signup.lazy.tsx"
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
    "/room/$roomId": {
      "filePath": "room.$roomId.lazy.tsx"
    },
    "/scoresheet/$roomId": {
      "filePath": "scoresheet.$roomId.lazy.tsx"
    },
    "/swipe/$roomId": {
      "filePath": "swipe.$roomId.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
