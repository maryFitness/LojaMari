import Cart from "@/components/Cart";
import { Nav, NavLink } from "@/components/Nav";
import { UserButton } from "@clerk/nextjs";
import { CartProvider } from "@/lib/CartContext";
import  SlideCart  from "@/components/SlideCart"
import { OrganizationSwitcher } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <CartProvider>
            <Nav>
                <div className="flex flex-1 justify-center space-x-4">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/products">Products</NavLink>
                    <NavLink href="/orders">My Orders</NavLink>
                </div>
                <div className="grid grid-cols-2 ml-auto items-center gap-7">
                    <Cart />
                    <OrganizationSwitcher />
                    <SlideCart />          
                </div>
            </Nav>
            <div className="container my-6">{children}</div>
        </CartProvider>
        </>
    );
}
