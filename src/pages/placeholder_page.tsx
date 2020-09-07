import React from 'react'
import { Empty } from 'antd'
import { Link } from 'react-router-dom'
import { homePath } from 'util/paths'
import { css } from 'astroturf'
export const PlaceholderPage = () => {
  return (
    <div className={s.empty}>
      <Empty
        description={
          <span>
            Страница в разработке.
            <br />
            <Link to={homePath}>Вернуться на главную</Link>
          </span>
        }
      />
    </div>
  )
}
const s = css`
  .empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
