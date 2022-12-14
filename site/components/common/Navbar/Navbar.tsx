import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar } from '@components/common'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <NavbarRoot>
    <Container clean className="mx-auto max-w-8xl px-6">
      <div className={s.nav}>
        <div className="flex items-center lg:justify-start flex-1 basis-2/3">
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <Logo />
            </a>
          </Link>
          <nav className={s.navMenu}>
            <Link href="/">
              <a className={s.link}>Trang Chủ</a>
            </Link>
            <Link href="/son">
              <a className={s.link}>Sản Phẩm Sơn</a>
            </Link>
            {/* <Link href="/son">
              <a className={s.link}>Thương Hiệu Sơn</a>
            </Link> */}
            {/* <Link href="/about-us">
              <a className={s.link}>Về Chúng Tôi</a>
            </Link> */}
            {/* {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link}>{l.label}</a>
              </Link>
            ))} */}
          </nav>
        </div>
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="justify-center flex-1 hidden lg:flex basis-1/3">
            <Searchbar />
          </div>
        )}
        {/* <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav />
        </div> */}
      </div>
      {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
      )}
    </Container>
  </NavbarRoot>
)

export default Navbar
