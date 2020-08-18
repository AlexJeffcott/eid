import React from 'react';
import { graphql } from 'gatsby';
import './ProductPage.css'
import { Layout } from "../components"

const ProductPage = ({
  data: {
    gcms: { product },
  },
}) => (
  <Layout title={`product | ${product.name}`} description={`${product.name} | ${product.description}`}>
    <h1>{product.name}</h1>
    <div>{product.images.map(({url, id}) => (
      <img key={id} alt={id} src={url}/>
        ))}
    </div>
    <p>{product.description}</p>
    <p>
      {new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
      }).format(product.price)}
    </p>
  </Layout>
);

export const pageQuery = graphql`
    query ProductPageQuery($id: ID!) {
        gcms {
            product(where: { id: $id }) {
                name
                description
                price
                images {
                    id
                    url
                }
            }
        }
    }
`;

export default ProductPage;
