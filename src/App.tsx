import React from 'react'
import 'styles/main.less'

import { css } from 'astroturf'

import { Layout } from 'antd'

import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

const { Content } = Layout

export const App = ({ route }: RouteConfigComponentProps) => {
  return (
    <Layout className={s.app}>
      <Content>{route && renderRoutes(route.routes)}</Content>
    </Layout>
  )
}

const s = css`
  .app {
    width: 100vw;
    height: 100vh;
  }
`
