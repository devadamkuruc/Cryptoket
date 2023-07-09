'use client'

import {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

import images from '../assets';

const Navbar = () => {
  const {theme, setTheme} = useTheme();


  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1 ">Navbar</nav>
  )
}

export default Navbar