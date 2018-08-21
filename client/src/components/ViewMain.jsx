import React from 'react'

import Navbar from './Navbar'

const ViewMain = ({ page: Page }) => (
  <div>
    <Navbar />
    <Page />
  </div>
)

export default ViewMain
