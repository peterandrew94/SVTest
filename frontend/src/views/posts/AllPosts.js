import React, { useState, useEffect, props } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
//import { useSearchParams } from "react-router-dom";

//state = { people: [], isLoading: true, error: null };

const AllPosts = () => {
  var [posts, setPosts] = useState([])
  var [page, setPage] = useState(1)
  var [activeKey, setActiveKey] = useState(1)

  //var [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    //const query = new URLSearchParams(props.location.search)
    //var status = query.get('status')
    //if (!status) status = 'Publish'
    //fetch(`http://192.168.1.6:1234/articlestatus/${status}`, {
    getData()
  }, [page])

  const deletePost = (value) => {
    fetch(`http://192.168.1.6:1234/articledelete/${value}`, {
      method: 'POST',
    })
      .then(getData())
      .catch((err) => console.log(err))
  }

  const getData = (value) => {
    if (value == 'Draft') {
      setActiveKey(2)
    } else if (value == 'Trash') {
      setActiveKey(3)
    } else {
      value = 'Publish'
      setActiveKey(1)
    }

    //let params = new URLSearchParams(search)
    //let status = params.get('status')
    fetch(`http://192.168.1.6:1234/articlestatus/${value}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((response) => {
        setPosts(response)
      })
      .catch((error) => console.log(error))
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Posts</strong>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink
                  href="#"
                  onClick={() => {
                    getData('Publish')
                  }}
                  active={activeKey === 1}
                >
                  Published
                  {/* Published ({posts.length}) */}
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="#"
                  onClick={() => {
                    getData('Draft')
                  }}
                  active={activeKey === 2}
                >
                  Draft
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="#"
                  onClick={() => {
                    getData('Trash')
                  }}
                  active={activeKey === 3}
                >
                  Trashed
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent className="rounded-bottom">
              <CTabPane className="p-3 preview" visible={!!posts && posts.length != 0}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {posts &&
                      posts.map((data, i) => {
                        return (
                          <CTableRow key={data.id}>
                            <CTableDataCell>{data.title}</CTableDataCell>
                            <CTableDataCell>{data.category}</CTableDataCell>
                            <CTableDataCell>
                              <CIcon style={{ cursor: 'pointer' }} content={freeSet.cilPencil} />{' '}
                              <CIcon
                                onClick={() => deletePost(data.id)}
                                style={{ cursor: 'pointer' }}
                                content={freeSet.cilTrash}
                              />
                            </CTableDataCell>
                          </CTableRow>
                        )
                      })}
                  </CTableBody>
                </CTable>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllPosts
