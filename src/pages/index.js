import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact } from "@fortawesome/free-brands-svg-icons"
import { Link } from "gatsby"

import { Layout } from "../components"

export default function Home() {
  return (
    <Layout title="home" description="home page">
      <h1>Hello world</h1>
      <Link to="/about/">About</Link>
      <FontAwesomeIcon icon={faReact} />
    </Layout>
)}
