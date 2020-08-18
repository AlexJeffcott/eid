import React from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faReact } from "@fortawesome/free-brands-svg-icons"
// <FontAwesomeIcon icon={faReact} />
import { Link } from "gatsby"

import './HomePage.css'
import { Layout } from "../components"

export default function Home() {
  return (
    <Layout title="home" description="home page">
      <h1>E Inder Designs</h1>
      <div>
        <p><Link to="/about/">About</Link></p>
        <p><Link to={`/products/`}>products</Link></p>
      </div>
    </Layout>
)}
