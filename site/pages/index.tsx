import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import SubHero from '../public/assets/1.png'
import LocationPin from '@components/icons/LocationPin'
import Phone from '@components/icons/Phone'
import Mail from '@components/icons/Mail'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid variant="filled">
        {products.slice(0, 5).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: 500,
              height: 500,
              priority: true,
              objectFit: 'contain',
            }}
          />
        ))}
      </Grid>
      {/* <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      <Hero
        headline="TRANG HOÀNG KHÔNG GIAN SỐNG HIỆN ĐẠI"
        description="Trúc Vàng là đại lý chuyên phân phối sỉ và lẻ sơn nước: Mykolor Touch, Spec Hello, Expo, Jotun, Kova, Maxilite chính hãng, tư vấn màu sơn, và pha màu theo yêu cầu của Quý Khách."
      />
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-0">
        <div className="col-span-1">
          <Image
            src={SubHero}
            layout="responsive"
            width="1"
            height="1"
            alt="mau son"
          />
        </div>
        <div className="col-span-1">
          <div className="h-full p-14 flex justify-center flex-col max-w-xl ml-auto	mr-auto	">
            <h3 className="text-3xl font-bold mb-6">Liên hệ</h3>
            <div className="grid grid-cols-12 mb-3">
              <div className="col-span-2">
                <LocationPin />
              </div>
              <div className="col-span-10">
                23 Số 20, P. Bình An, Quận 2, Thành phố Hồ Chí Minh, Vietnam
              </div>
            </div>

            <div className="grid grid-cols-12 mb-3">
              <div className="col-span-2">
                <Phone />
              </div>
              <div className="col-span-10">
                <a href="tel:02873005525" className="hover:text-yellow">
                  028 7300 5525
                </a>
              </div>
            </div>

            <div className="grid grid-cols-12 mb-3">
              <div className="col-span-2">
                <Mail />
              </div>
              <div className="col-span-10">
                <a href="mailto:info@trucvang.vn" className="hover:text-yellow">
                  info@trucvang.vn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Grid layout="A" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid> */}
      {/* <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      {/* <HomeAllProductsGrid
        products={products}
        // categories={categories}
        // brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
