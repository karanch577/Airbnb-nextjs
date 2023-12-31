"use client";

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useState, useCallback, useEffect, useRef } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: User | null
}

function UserMenu({ currentUser }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()

    const router = useRouter()

    const userMenuRef = useRef<HTMLDivElement>(null)

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])
    

    const onRent = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen()
        }

        // open rent modal
        rentModal.onOpen()
        
    }, [currentUser, loginModal])

    // hiding the usermenu when clicked on different area other than the usermenu

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if(userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)

        // cleanup function
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [])

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
            onClick={onRent}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
                Airbnb your home
            </div>
            <div
            onClick={toggleOpen}
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar imageSrc={currentUser?.image} />
                </div>
            </div>
        </div>

        {isOpen && (
            <div
            ref={userMenuRef}
            className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
            >
                <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                        <>
                        <MenuItem
                        onClick={() => router.push("/trips")}
                        label="My trips"
                        />
                        <MenuItem
                        onClick={() => router.push("/favorites")}
                        label="My favorites"
                        />
                        <MenuItem
                        onClick={() => router.push("/reservations")}
                        label="My reservations"
                        />
                        <MenuItem
                        onClick={() => router.push("/properties")}
                        label="My properties"
                        />
                        <MenuItem
                        onClick={rentModal.onOpen}
                        label="Airbnb my home"
                        />
                        <hr />
                        <MenuItem
                        onClick={() => signOut()}
                        label="Logout"
                        />
                    </>
                    ): (
                        <>
                        <MenuItem
                        onClick={loginModal.onOpen}
                        label="Login"
                        />
                        <MenuItem
                        onClick={registerModal.onOpen}
                        label="Sign Up"
                        />
                    </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu