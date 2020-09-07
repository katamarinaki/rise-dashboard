import { RouteConfig } from 'react-router-config'
import React from 'react'
import * as paths from './util/paths'

// core App view
import { App } from 'App'
// pages in App

import { PlaceholderPage } from 'pages/placeholder_page'

export const routes: RouteConfig[] = [
  {
    component: App,
    routes: [
      {
        component: PlaceholderPage,
      },
    ],
  },
]
