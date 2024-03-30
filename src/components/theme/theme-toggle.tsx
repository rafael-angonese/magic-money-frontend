import { Moon, Sun } from 'lucide-react'

import { Dropdown } from '@/components/ui/dropdown/dropdown'
import { Menu } from '@/components/ui/menu/menu'
import { MenuButton } from '@/components/ui/menu/menu-button'
import { MenuItem } from '@/components/ui/menu/menu-item'

import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <Dropdown>
      <MenuButton variant="outlined" className="!rounded-xl">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </MenuButton>
      <Menu>
        <MenuItem onClick={() => setTheme('light')}>Light</MenuItem>
        <MenuItem onClick={() => setTheme('dark')}>Dark</MenuItem>
        <MenuItem onClick={() => setTheme('system')}>System</MenuItem>
      </Menu>
    </Dropdown>
  )
}
