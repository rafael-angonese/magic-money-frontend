import React from 'react'

import Button from '@mui/joy/Button'

import { PageContentLayout } from '@/layouts/page-content-layout/page-content-layout'

const HomePage: React.FC = () => {
  return (
    <>
      <PageContentLayout>
        Home page
        <Button variant="solid">Hello world</Button>
      </PageContentLayout>
    </>
  )
}

export default HomePage
