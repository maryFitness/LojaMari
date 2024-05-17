import { Nav, NavLink } from "@/components/Nav";
import { UserButton } from "@clerk/nextjs";

export const dynamic = "force-dynamic"

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <>
        <Nav>
        <div className="flex flex-1 justify-center space-x-4">
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/products">Products</NavLink>
            <NavLink href="/admin/custumers">Custumers</NavLink>
            <NavLink href="/admin/orders">Sales</NavLink>
        </div>
        <div className="ml-auto">
             <UserButton />
        </div>
        </Nav>
        <div className="container my-6">{children}</div>
    </>
}