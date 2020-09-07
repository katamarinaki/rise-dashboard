import { RouteConfig } from 'react-router-config'
import * as paths from './util/paths'

import App from 'app'

import CausesRoute from 'routes/causes_route'

export const routes: RouteConfig[] = [
  {
    component: App,
    routes: [
      {
        component: CausesRoute,
        path: paths.causesPath,
      },
    ],
  },
]
