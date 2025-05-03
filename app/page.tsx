import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  } else {
    redirect("/dashboard")
  }

  // This will never be rendered
  return null
}
