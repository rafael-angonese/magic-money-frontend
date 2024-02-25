import React from 'react'

import { Outlet } from 'react-router-dom'

import { SelectAccountPage } from '@/pages/select-account/select-account-page'
import { useAccountStore } from '@/store/use-account-store'

const SelectAccountGroup: React.FC = () => {
  const { account } = useAccountStore()

  if (!account) {
    return <SelectAccountPage />
  }

  return <Outlet />
}

export default SelectAccountGroup
