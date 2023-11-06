import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { Listing, User } from "@prisma/client"

interface FavoritesClientProps {
    listings: Listing[];
    currentUser?: User | null;
}

function FavoritesClient({
    listings,
    currentUser
}: FavoritesClientProps) {
  return (
    <Container>
        <Heading 
        title="Favorites"
        subtitle="List of places you have favorited!"
        />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grids-cols-5 2xl:grids-cols-6 gap-8">
            {listings.map(listing => (
                <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default FavoritesClient