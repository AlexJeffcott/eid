import React from 'react';
import { graphql, Link } from "gatsby"
import './ProductsPage.css'
import { Layout } from "../components"

const ProductsPage = ({
  data: {
    gcms: { products },
  },
}) => (
  <Layout title={`Product Catalogue`} description={`E Inder Design product catalogue`}>
    <h1>Products</h1>
    {products.map(({name, price, slug, images}) => (
        <Link to={`/products/${slug}`}>
          <div className="product-wrapper" key={slug}>
          <h2>{name}</h2>
          <img alt={images[0].id} src={images[0].url} />
          <p>
            {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
            }).format(price)}
          </p>
      </div>
        </Link>
    ))}
  </Layout>
);

export const pageQuery = graphql`
    query ProductsPageQuery{
        gcms {
            products {
                name
                slug
                price
                description
                images {
                    id
                    url
                }
            }
        }
    }
`;

export default ProductsPage;
