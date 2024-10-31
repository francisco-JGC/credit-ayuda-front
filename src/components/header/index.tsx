import { useState } from 'react'
import { Logo } from './Logo'
import { MobileMenuButton } from './MobileMenuButton'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'
import { UserMenu } from './UserMenu'

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white w-full border-b">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex flex-1">
          <Logo />
        </div>
        <div className="flex lg:hidden">
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
        </div>
        <div className="hidden lg:flex lg:flex-grow lg:justify-center lg:gap-x-12">
          <DesktopNav />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <UserMenu />
        </div>
      </nav>
      <MobileNav
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  )
}
