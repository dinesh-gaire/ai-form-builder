"use client"
import {Button} from '../../components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const {user, isSignedIn}=useUser();
    const path = usePathname();
  return !path.includes('aiform')&&(
    <div className='p-5 border-b shadow-sm'>
        <div className='flex items-center justify-between'>
            <Image src={'/logo.svg'}
                width={100}
                height={50}
                alt='logo'
            />
            {isSignedIn?
                <div className='flex items-center gap-5'>
                    <Link href={'/dashboard'}>
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                    <UserButton/>
                </div>
                :
                <SignInButton>
                    <Button>Get Started</Button>
                </SignInButton>
            }
        </div>
    </div>
  )
}

export default Header