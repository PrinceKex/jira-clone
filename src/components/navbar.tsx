'use client'
import { UserButton } from '@/features/auth/components/user-button'
import React from 'react'
import { MobileSidebar } from './mobile-sidebar'
import { usePathname } from 'next/navigation'

const pathnameMap = {
 tasks: {
  title: 'My Tasks',
  description: 'Monitor all your tasks here',
 },
 projects: {
  title: 'My Projects',
  description: 'Monitor tasks of your projects here',
 },
 members: {
  title: 'My members',
  description: 'Monitor all your members here',
 },
}

const defaultMap = {
 title: 'Home',
 description: 'Monitor all your projects and tasks here',
}

export const Navbar = () => {
 const pathname = usePathname()
 const pathnameParts = pathname.split('/')
 const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap
 const { title, description } = pathnameMap[pathnameKey] || defaultMap
 return (
  <nav className='pt-4 px-6 items-center justify-between'>
   <div className='flex-col hidden lg:flex'>
    <h1 className='text-2xl font-semibold'>{title}</h1>
    <p className='text-muted-foreground'>{description}</p>
   </div>
   <MobileSidebar />
   <UserButton />
  </nav>
 )
}
