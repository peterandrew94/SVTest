import React, { useState, useEffect } from 'react'
import { CFormTextarea, CFormInput, CButton } from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'

const AddNew = () => {
  var [formData, setFormData] = useState({})

  const eventHandler = (event) => {
    fetch('http://192.168.1.6:1234/article/', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((result) => {
        setFormData('')
      })
      .catch((err) => console.log(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    formData = {
      ...formData,
      status: 'Publish',
    }
    eventHandler()
  }

  const handleSaveDraft = (event) => {
    event.preventDefault()

    formData = {
      ...formData,
      status: 'Draft',
    }
    eventHandler()
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <CFormInput
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        value={formData.title || ''}
        onChange={handleChange}
      />
      <CFormInput
        type="text"
        id="category"
        name="category"
        value={formData.category || ''}
        placeholder="Category"
        style={{ marginTop: '15px' }}
        onChange={handleChange}
      />
      <CFormTextarea
        name="content"
        style={{ marginTop: '15px' }}
        id="content"
        value={formData.content || ''}
        placeholder="Content"
        rows="15"
        onChange={handleChange}
      ></CFormTextarea>
      <center style={{ marginTop: '15px' }}>
        <CButton color="primary" name="status" onClick={handleSubmit}>
          Publish
        </CButton>
        <CButton
          style={{ marginLeft: '15px' }}
          name="status"
          color="primary"
          onClick={handleSaveDraft}
        >
          Draft
        </CButton>
      </center>
    </div>
  )
}

export default AddNew
