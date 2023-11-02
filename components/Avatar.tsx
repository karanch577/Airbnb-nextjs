import Image from "next/image"

interface AvatarProps {
  imageSrc: string | null | undefined;
}

function Avatar({imageSrc}: AvatarProps) {
  return (
    <Image 
    className="rounded-full"
    height={30}
    width={30}
    alt="Avatar"
    src={imageSrc || "/images/placeholder.jpg"}
    />
  )
}

export default Avatar