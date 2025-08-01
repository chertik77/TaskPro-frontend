/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './../../../app/routes/__root'
import { Route as DashboardLayoutRouteImport } from './../../../app/routes/dashboard/layout'
import { Route as AuthLayoutRouteImport } from './../../../app/routes/auth/layout'
import { Route as IndexRouteImport } from './../../../app/routes/index'
import { Route as DashboardIndexRouteImport } from './../../../app/routes/dashboard/index'
import { Route as DashboardBoardIdRouteImport } from './../../../app/routes/dashboard/$boardId'
import { Route as AuthSignupRouteImport } from './../../../app/routes/auth/signup'
import { Route as AuthSigninRouteImport } from './../../../app/routes/auth/signin'
import { Route as AuthGoogleCallbackRouteImport } from './../../../app/routes/auth/google.callback'

const DashboardLayoutRoute = DashboardLayoutRouteImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthLayoutRoute = AuthLayoutRouteImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const DashboardIndexRoute = DashboardIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)
const DashboardBoardIdRoute = DashboardBoardIdRouteImport.update({
  id: '/$boardId',
  path: '/$boardId',
  getParentRoute: () => DashboardLayoutRoute,
} as any)
const AuthSignupRoute = AuthSignupRouteImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => AuthLayoutRoute,
} as any)
const AuthSigninRoute = AuthSigninRouteImport.update({
  id: '/signin',
  path: '/signin',
  getParentRoute: () => AuthLayoutRoute,
} as any)
const AuthGoogleCallbackRoute = AuthGoogleCallbackRouteImport.update({
  id: '/google/callback',
  path: '/google/callback',
  getParentRoute: () => AuthLayoutRoute,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthLayoutRouteWithChildren
  '/dashboard': typeof DashboardLayoutRouteWithChildren
  '/auth/signin': typeof AuthSigninRoute
  '/auth/signup': typeof AuthSignupRoute
  '/dashboard/$boardId': typeof DashboardBoardIdRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/auth/google/callback': typeof AuthGoogleCallbackRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth': typeof AuthLayoutRouteWithChildren
  '/auth/signin': typeof AuthSigninRoute
  '/auth/signup': typeof AuthSignupRoute
  '/dashboard/$boardId': typeof DashboardBoardIdRoute
  '/dashboard': typeof DashboardIndexRoute
  '/auth/google/callback': typeof AuthGoogleCallbackRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/auth': typeof AuthLayoutRouteWithChildren
  '/dashboard': typeof DashboardLayoutRouteWithChildren
  '/auth/signin': typeof AuthSigninRoute
  '/auth/signup': typeof AuthSignupRoute
  '/dashboard/$boardId': typeof DashboardBoardIdRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/auth/google/callback': typeof AuthGoogleCallbackRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/auth/signin'
    | '/auth/signup'
    | '/dashboard/$boardId'
    | '/dashboard/'
    | '/auth/google/callback'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth'
    | '/auth/signin'
    | '/auth/signup'
    | '/dashboard/$boardId'
    | '/dashboard'
    | '/auth/google/callback'
  id:
    | '__root__'
    | '/'
    | '/auth'
    | '/dashboard'
    | '/auth/signin'
    | '/auth/signup'
    | '/dashboard/$boardId'
    | '/dashboard/'
    | '/auth/google/callback'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
  DashboardLayoutRoute: typeof DashboardLayoutRouteWithChildren
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardLayoutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthLayoutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexRouteImport
      parentRoute: typeof DashboardLayoutRoute
    }
    '/dashboard/$boardId': {
      id: '/dashboard/$boardId'
      path: '/$boardId'
      fullPath: '/dashboard/$boardId'
      preLoaderRoute: typeof DashboardBoardIdRouteImport
      parentRoute: typeof DashboardLayoutRoute
    }
    '/auth/signup': {
      id: '/auth/signup'
      path: '/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupRouteImport
      parentRoute: typeof AuthLayoutRoute
    }
    '/auth/signin': {
      id: '/auth/signin'
      path: '/signin'
      fullPath: '/auth/signin'
      preLoaderRoute: typeof AuthSigninRouteImport
      parentRoute: typeof AuthLayoutRoute
    }
    '/auth/google/callback': {
      id: '/auth/google/callback'
      path: '/google/callback'
      fullPath: '/auth/google/callback'
      preLoaderRoute: typeof AuthGoogleCallbackRouteImport
      parentRoute: typeof AuthLayoutRoute
    }
  }
}

interface AuthLayoutRouteChildren {
  AuthSigninRoute: typeof AuthSigninRoute
  AuthSignupRoute: typeof AuthSignupRoute
  AuthGoogleCallbackRoute: typeof AuthGoogleCallbackRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthSigninRoute: AuthSigninRoute,
  AuthSignupRoute: AuthSignupRoute,
  AuthGoogleCallbackRoute: AuthGoogleCallbackRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

interface DashboardLayoutRouteChildren {
  DashboardBoardIdRoute: typeof DashboardBoardIdRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
}

const DashboardLayoutRouteChildren: DashboardLayoutRouteChildren = {
  DashboardBoardIdRoute: DashboardBoardIdRoute,
  DashboardIndexRoute: DashboardIndexRoute,
}

const DashboardLayoutRouteWithChildren = DashboardLayoutRoute._addFileChildren(
  DashboardLayoutRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
  DashboardLayoutRoute: DashboardLayoutRouteWithChildren,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
