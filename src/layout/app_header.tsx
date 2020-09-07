import React from 'react'
import { css } from 'astroturf'
import { Layout } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import * as paths from 'util/paths'
import cns from 'classnames'

const Header = () => {
  const { location } = useHistory()
  return (
    <Layout.Header className={s.root}>
      <div className={s.title}>RISE</div>
      <Link
        className={cns(s.navLink, {
          [s.active]: location.pathname === paths.causesPath,
        })}
        to={paths.causesPath}
      >
        Causes
      </Link>
    </Layout.Header>
  )
}

const s = css`
  .root {
    display: flex;
  }
  .title {
    color: #fff !important;
    font-size: 24px;
    margin-right: 30px;
  }
  .navLink {
    font-size: 16px;
    padding: 0 15px;
    color: #fff;
    margin: 0 15px;

    &:hover,
    &.active {
      color: #000;
      background-color: rgb(240, 242, 245);
    }
  }
`

export default Header
