import React from 'react'
export const metadata = {
    title: "Reels | Admin | El-Beshara Studio",
    description: "Creating amazing musical experiences for the world.",
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>{children}</div>
  )
}

export default Layout