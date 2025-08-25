import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='text-center p-8 bg-gray-200'>
      <p>@ 2025 Uvaish Raza. All right reserved.</p>
      <p>Powered by <a href="https://github.com/uvaish7651">Uvaish raza</a></p>
      <p>
        <Link to={"/PrivacyPolicy"}>Privacy Policy </Link> |
        <Link to={"/TermsofServices"}> Term of Service</Link>
      </p>
    </div>
  )
}

export default Footer
