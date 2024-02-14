import React, { ReactNode } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      <main
        className={
          'fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
          (isOpen
            ? ' transition-opacity opacity-100 duration-500 -translate-x-0  '
            : ' transition-all delay-500 opacity-0 -translate-x-full  ')
        }
      >
        <section
          className={
            ' left-0 absolute h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
            (isOpen ? ' -translate-x-0 ' : ' -translate-x-full ')
          }
        >
          <article className="relative flex flex-col space-y-6 overflow-y-scroll h-full">
            {children}
          </article>
        </section>
        <section
          role="presentation"
          className=" w-screen h-full cursor-pointer "
          onClick={onClose}
        />
      </main>
    </>
  )
}
