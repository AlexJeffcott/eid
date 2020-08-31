import React from "react"

import './AboutPage.css'
import { Layout } from "../components"

export default function About({ data: { gcms } }) {
  const {aboutPage} = gcms || {}
  if (!aboutPage.title) return <div>not loaded</div>
  const __html = aboutPage.textContent.html
  return (
    <Layout title="about" description="about page">
      <h1>{aboutPage.title}</h1>
      <div dangerouslySetInnerHTML={{ __html }}/>
      <div>{aboutPage.mediaAssets.map(({url, id}) => (
        <img key={id} alt={id} src={url}/>
      ))}
      </div>
    </Layout>
)}

export const pageQuery =  graphql`
    query AboutPageQuery($id: ID!) {
        gcms {
            aboutPage(where: {id: $id}) {
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
        }
    }
`;
