import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import "./nav.css"

export default function ResponsiveDrawer() {
  const [isOpen, setIsOpen] = React.useState(false)
  function handleToggle() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="nav">
      {!isOpen && <FontAwesomeIcon icon={faBars} onClick={handleToggle} />}
      {isOpen && (
        <div className="sideNav">
          <FontAwesomeIcon icon={faTimes} onClick={handleToggle} />
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to={`/products/`}>Products</Link>
        </div>
      )}
    </div>
  )
}
