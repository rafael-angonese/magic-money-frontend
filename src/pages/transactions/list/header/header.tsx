import React from 'react'

// import { Link } from '@/components/link/link'
// import { Button } from '@/components/ui/button/button'
import { Heading } from '@/components/ui/heading/heading'

export const Header: React.FC = () => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <Heading as="h1">Transações</Heading>

        {/* <Button color="success" asChild>
          <Link to="/transactions/new">Nova Conta</Link>
        </Button> */}
      </div>
    </>
  )
}
