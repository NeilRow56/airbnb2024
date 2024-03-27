import SigninButton from '@/components/auth/SignInButton'

export default async function LandingPage() {
  return (
    <section className="flex  h-full  ">
      <div className=" flex w-full flex-grow flex-col items-center justify-center ">
        <h2 className=" mb-5 bg-green-300 p-3 text-primary">Landing page</h2>
        <SigninButton />
      </div>
    </section>
  )
}
