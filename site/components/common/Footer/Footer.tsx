import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Trang chủ',
    url: '/',
  },
  {
    name: 'Sản phẩm sơn',
    url: '/son',
  },
  // {
  //   name: 'Về chúng tôi',
  //   url: '/about-us',
  // },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-8 py-12 text-primary bg-primary transition-colors duration-150 ut">
          <div className="col-span-12 lg:col-span-2">
            <Link href="/">
              <a className="flex flex-initial items-center justify-center font-bold">
                <span>
                  <Logo />
                </span>
              </a>
            </Link>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="grid md:grid-cols-1">
              <div className="mb-4 border-b pb-4">
                CÔNG TY TNHH THƯƠNG MẠI VẬT LIỆU TRANG TRÍ
                <br /> NỘI & NGOẠI THẤT -{' '}
                <strong className="text-yellow">TRÚC VÀNG</strong>
              </div>
              <div>
                MST: <strong>0317141680</strong>
              </div>
              <div>
                Ngày cấp: <strong>27/01/2022</strong>
              </div>
              <div>
                Nơi cấp:{' '}
                <strong>Sở kế hoạch và đầu tư thành phố Hồ Chí Minh</strong>
              </div>
            </div>
          </div>
          <div className="hidden lg:block col-span-1 lg:col-span-4">
            <div className="grid md:grid-rows-4 md:grid-cols-2 md:grid-flow-col">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm border-t">
          <div>
            <span>&copy; 2022 Truc Vang, Inc. All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
