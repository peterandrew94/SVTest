import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="" target="_blank" rel="noopener noreferrer">
          Test Sharing Vision
        </a>
        <span className="ms-1">&copy; 2021 Andrew Thejo Putranto</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
