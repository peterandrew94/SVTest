import React, { useState, useEffect } from 'react'
import { CCol, CRow, CCallout } from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'

const AddNew = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`http://192.168.1.6:1234/articlestatus/Publish`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((response) => {
        setPosts(response)
      })
      .catch((error) => console.log(error))
  }, [page])

  return (
    <CRow>
      <CCol xs={12}>
        {posts.map((data, i) => {
          return (
            <CCallout key={data.id} className="bg-white">
              <h3>{data.title}</h3>
              <h5>{data.category}</h5>
              <div>{data.content}</div>
            </CCallout>
          )
        })}
      </CCol>
    </CRow>
  )
}

export default AddNew
