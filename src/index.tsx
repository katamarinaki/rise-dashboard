import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import { renderRoutes } from 'react-router-config'
import { routes } from 'routes'
import { StoreContext } from 'storeon/react'
import { store } from 'store'

const Root = hot(() => renderRoutes(routes))

render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById('app'),
)
