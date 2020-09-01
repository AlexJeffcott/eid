import React from 'react';
import { graphql } from "gatsby";

import { Layout, LocalisedPrice } from "../components";
import './ProductPage.css';

export default function ProductPage ({ data: { gcms } }) {
  const {product} = gcms || {}
  if (!product.h1) return <div>not loaded</div>

  const localisedPrice = LocalisedPrice('en-GB', product.price.price)
  return (
    <Layout title={`product | ${product.h1}`} description={`${product.h1} | ${product.h2}`}>
      <h1>{product.h1}</h1>
      <div>{product.mediaAssets.map(({url, id}) => (
        <img key={id} alt={id} src={url}/>
      ))}
      </div>
      <p>{product.h2}</p>
      <p><b>Care Instructions: </b>{product.productType.careInstructions.careInstructions}</p>
      <p><b>Shipping: </b>{product.productType.shipping.shipping}</p>
      <p>
        {localisedPrice}
      </p>
    </Layout>
  );
}

export const pageQuery =  graphql`
    query ProductPageQuery($id: ID!) {
        gcms {
            product(where: { id: $id }) {
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
