import { useContext } from 'react'
import { AppContext } from 'context'
import { useRouter } from 'next/router'
import { useUser } from 'hooks'
import Link from 'next/link'

export default () => {
  const { setShowSidebar } = useContext(AppContext)
  const { route } = useRouter()

  return (
    <div className="div-block-780 ewgew-copy hdaf">
      <a href="#" className="lohd w-inline-block">
        <img
          src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eaf5cd658f15e071b10a974_icons8-sail-60.png"
          width={32}
          alt=""
        />
      </a>
      <div className="avtars hvxd">
        <div className="div-block-872" />
      </div>
      <Link
        href={route === '/pages' ? '/' : '/pages'}
        className="kerou w-inline-block"
      >
        <a className="kerou w-inline-block">
          {route === '/pages' ? (
            <img
              src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb42e3c726ea04428c2ca2d_x%20(1).svg"
              width="32"
              alt=""
              className="image-284"
            />
          ) : (
            <img
              src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb7fb04ccd7e722bd596471_menu.svg"
              width={36}
              alt=""
              className="image-288"
            />
          )}
        </a>
      </Link>
      <div
        onClick={() => setShowSidebar(true)}
        className="kerou"
        data-ix="new-interaction-17"
      >
        <img
          src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb5e565ccd7e731c14c646c_layout-6.svg"
          width={36}
          alt=""
          className="image-288"
        />
      </div>
    </div>
  )
}