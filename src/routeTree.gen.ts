/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignUpImport } from './routes/sign-up'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardUserImport } from './routes/dashboard/$user'
import { Route as DashboardPatientEmailImport } from './routes/dashboard/patient/$email'

// Create/Update Routes

const SignUpRoute = SignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardUserRoute = DashboardUserImport.update({
  id: '/dashboard/$user',
  path: '/dashboard/$user',
  getParentRoute: () => rootRoute,
} as any)

const DashboardPatientEmailRoute = DashboardPatientEmailImport.update({
  id: '/dashboard/patient/$email',
  path: '/dashboard/patient/$email',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/sign-up': {
      id: '/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/$user': {
      id: '/dashboard/$user'
      path: '/dashboard/$user'
      fullPath: '/dashboard/$user'
      preLoaderRoute: typeof DashboardUserImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/patient/$email': {
      id: '/dashboard/patient/$email'
      path: '/dashboard/patient/$email'
      fullPath: '/dashboard/patient/$email'
      preLoaderRoute: typeof DashboardPatientEmailImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/sign-up': typeof SignUpRoute
  '/dashboard/$user': typeof DashboardUserRoute
  '/dashboard/patient/$email': typeof DashboardPatientEmailRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/sign-up': typeof SignUpRoute
  '/dashboard/$user': typeof DashboardUserRoute
  '/dashboard/patient/$email': typeof DashboardPatientEmailRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/sign-up': typeof SignUpRoute
  '/dashboard/$user': typeof DashboardUserRoute
  '/dashboard/patient/$email': typeof DashboardPatientEmailRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/sign-up'
    | '/dashboard/$user'
    | '/dashboard/patient/$email'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/sign-up'
    | '/dashboard/$user'
    | '/dashboard/patient/$email'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/sign-up'
    | '/dashboard/$user'
    | '/dashboard/patient/$email'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  SignUpRoute: typeof SignUpRoute
  DashboardUserRoute: typeof DashboardUserRoute
  DashboardPatientEmailRoute: typeof DashboardPatientEmailRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  SignUpRoute: SignUpRoute,
  DashboardUserRoute: DashboardUserRoute,
  DashboardPatientEmailRoute: DashboardPatientEmailRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/sign-up",
        "/dashboard/$user",
        "/dashboard/patient/$email"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up.tsx"
    },
    "/dashboard/$user": {
      "filePath": "dashboard/$user.tsx"
    },
    "/dashboard/patient/$email": {
      "filePath": "dashboard/patient/$email.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
