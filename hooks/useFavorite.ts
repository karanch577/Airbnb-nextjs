"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavorite {
    listingId: string;
    currentUser?: User | null;
}

const useFavorite = ({listingId, currentUser}: IUseFavorite) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavorited = useMemo(() => {
        const list =  currentUser?.favouriteIds || [];
        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        if(!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request;

            if(hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request()
            router.refresh()
            toast.success("Success")
        } catch (error) {
            
        }
    }, [currentUser, listingId, hasFavorited])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite