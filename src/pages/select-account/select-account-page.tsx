import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { LinearProgress } from '@/components/ui/linear-progress/linear-progress'
import { queryKeys } from '@/constants/react-query-keys'
import { getAccounts } from '@/repositories/accounts/get-accounts'
import { useAccountStore } from '@/store/use-account-store'

export const SelectAccountPage: React.FC = () => {
  const { setAccount } = useAccountStore()
  const { data, isPending } = useQuery({
    queryKey: [queryKeys.accounts],
    queryFn: () => getAccounts({}),
  })

  const accounts = data?.data?.data ?? []

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-12 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
        Selecione a conta:
      </h1>

      {isPending && <LinearProgress indeterminate size="xs" />}

      {data && (
        <div className="flex w-full justify-center gap-8 mt-8">
          {accounts.map((account) => {
            return (
              <button
                key={account.id}
                onClick={() => setAccount(account)}
                className="h-72 w-60 hover:scale-[101%] cursor-pointer p-4 flex flex-col justify-center items-center border border-gray-200 rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-400"
              >
                <span>{account.name}</span>
                <span>{account.description}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
