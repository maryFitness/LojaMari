import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <main className="flex justify-center p-5 md:p-10">
      <SignUp appearance={{
        elements: {
          footerAction: ""
        }
      }} path="/sign-up" />
    </main>
  )
}
