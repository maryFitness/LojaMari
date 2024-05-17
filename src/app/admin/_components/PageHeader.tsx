import { ReactNode } from "react";

export default function PageHeader({ children }: {children: ReactNode}) {
  return <h1 className="flex text-4xl mb-4 justify-center">{children}</h1>
}
