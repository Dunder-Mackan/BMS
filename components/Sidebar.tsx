'use client'

import Image from 'next/image'
import { Home, Users, Package, ShoppingCart, FileText, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from 'next/navigation'

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}

function SidebarItem({ href, icon, label, isActive }: SidebarItemProps) {
  return (
    <Link href={href} className={`flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-gray-200 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    // TODO: Implement logout logic
    console.log('Logout clicked')
    router.push('/')
  }

  return (
    <div className="w-64 bg-white border-r flex flex-col h-full">
      <div className="p-3 border-b flex justify-center items-center h-24">
        <Image
          src="/logo.png"
          alt="BMS - Systems Logo"
          width={220}
          height={80}
          priority
          className="w-1080 h-auto"
          style={{ maxWidth: '60%', maxHeight: '200%' }}
        />
      </div>
      <div className="flex flex-col flex-grow p-4 space-y-4">
        <SidebarItem href="/" icon={<Home size={24} />} label="Startsida" isActive={pathname === '/'} />
        <SidebarItem href="/customers" icon={<Users size={24} />} label="Kunder" isActive={pathname === '/customers'} />
        <SidebarItem href="/inventory" icon={<Package size={24} />} label="Inventering" isActive={pathname === '/inventory'} />
        <SidebarItem href="/purchases" icon={<ShoppingCart size={24} />} label="Inköp" isActive={pathname === '/purchases'} />
        <SidebarItem href="/accounting" icon={<FileText size={24} />} label="Bokföring" isActive={pathname === '/accounting'} />
      </div>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start mb-2"
          onClick={() => router.push('/settings')}
        >
          <Settings size={24} className="mr-2" />
          Inställningar
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut size={24} className="mr-2" />
          Logga ut
        </Button>
      </div>
    </div>
  )
}

