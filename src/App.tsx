import 'styles/main.less'
import React from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { Layout } from 'antd'
import { css } from 'astroturf'
import Header from 'layout/app_header'

const { Content } = Layout

const App = ({ route }: RouteConfigComponentProps) => {
  return (
    <Layout className={s.app}>
      <Header />
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

export default App
