require("ts-node").register({
  files: true,
})

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      gcms: { homePage, aboutPage, products },
    },
  } = await graphql(`
    {
      gcms {
        homePage(where: { id: "ckeemt44808pl0152x9zb02ii" }) {
          id
          title
          subHeading
          slug
          mediaAssets {
            id
            url
          }
        }
        aboutPage(where: { id: "ckeg1zg6w0rwz01522h0hgiyg" }) {
          id
          title
          subHeading
          textContent {
            html
          }
          slug
          mediaAssets {
            id
            url
          }
        }
        products(stage: PUBLISHED) {
          id
          slug
        }
      }
    }
  `)

  createPage({
    path: `/`,
    component: require.resolve(`./src/templates/HomePage.tsx`),
    context: {
      id: homePage.id,
    },
  })
  console.log(`!! aboutPage`, aboutPage)
  createPage({
    path: `/${aboutPage.slug}`,
    component: require.resolve(`./src/templates/AboutPage.tsx`),
    context: {
      id: aboutPage.id,
    },
  })

  createPage({
    path: `/products`,
    component: require.resolve(`./src/templates/ProductsPage.tsx`),
  })

  products.forEach(({ id, slug }) =>
    createPage({
      path: `/products/${slug}`,
      component: require.resolve(`./src/templates/ProductPage.tsx`),
      context: {
        id,
      },
    })
  )
}
