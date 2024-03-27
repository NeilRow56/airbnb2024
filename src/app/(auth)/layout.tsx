const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-12 flex h-screen w-full justify-center text-center  sm:mt-24 lg:mt-36">
      {children}
    </div>
  )
}

export default AuthLayout
