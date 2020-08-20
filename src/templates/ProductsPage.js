import React from 'react';
import { graphql, Link } from "gatsby";

import { Layout, LocalisedPrice } from "../components";
import './ProductsPage.css';

export default function ProductsPage ({ data: { gcms } }) {
  const {products} = gcms;
  if (!products.length) return <div>not loaded</div>

  return (
    <Layout title={`Product Catalogue`} description={`E Inder Design product catalogue`}>
      <h1>Products</h1>
      {products.map(({h1, price, slug, mediaAssets}) => {
        const localisedPrice = LocalisedPrice('en-GB', price.price)
        return (
          <Link to={`/products/${slug}`}>
            <div className="product-wrapper" key={slug}>
              <h2>{h1}</h2>
              <img alt={mediaAssets[0].id} src={mediaAssets[0].url}/>
              <p>
                {localisedPrice}
              </p>
            </div>
          </Link>
        )
      })}
    </Layout>
  );
}

export const pageQuery = graphql`
    query ProductsPageQuery{
        gcms {
            products {
                code
                h1
                h2
                slug
                price {
                    price
                }
                range
                collection
                productType {
                    careInstructions {
                        careInstructions
                    }
                    shipping {
                        shipping
                    }
                    dimensions
                    prodType
                    material
                }
                shape
                tags
                mediaAssets {
                    id
                    url
                }
            }
        }
    }
`;
