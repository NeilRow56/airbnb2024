import SigninButton from '@/components/auth/SignInButton'
import MapFilterItems from '@/components/MapFilterItems'

export default async function LandingPage() {
  return (
    <section className="container mx-auto px-5  pt-2 lg:px-10 ">
      <MapFilterItems />
    </section>
  )
}
