import React from 'react'

const AllPosts = React.lazy(() => import('./views/posts/AllPosts'))
const AddNewPosts = React.lazy(() => import('./views/posts/AddNew'))
const PreviewPosts = React.lazy(() => import('./views/posts/Preview'))

const routes = [
  { path: '/', exact: true, name: 'AllPosts', component: AllPosts },
  { path: '/posts/all', name: 'AllPosts', component: AllPosts },
  { path: '/posts/add', name: 'AddNewPosts', component: AddNewPosts },
  { path: '/posts/edit/:id', name: 'AddNewPosts', component: AddNewPosts },
  { path: '/posts/preview', name: 'PreviewPosts', component: PreviewPosts },
]

export default routes
