'use client' // Keep this if you are using Next.js App Router, otherwise you can remove it

import { Fragment, useState, useContext } from 'react';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { CartContext } from '../../context/CartContext'; // Import CartContext
import { useWishlist } from '../../context/WishlistContext'; // Import useWishlist hook

// You might keep or modify this navigation data structure
const navigation = {
    categories: [
        {
            id: 'home',
            name: 'Home',
            href: '/', // Link to Home page
        },
        {
            id: 'new-arrivals',
            name: 'New Arrivals',
            href: '/products/new-arrivals', // Link to New Arrivals category
        },
        {
            id: 'best-sellers',
            name: 'Best Sellers',
            href: '/products/best-sellers', // Link to Best Sellers category
        },
        {
            id: 'offers-deals',
            name: 'Offers & Deals',
            href: '/products/offers-deals', // Link to Offers & Deals category
        },
        {
            id: 'all-products',
            name: 'All Products',
            href: '/products', // Link to All Products page
        },
    ],
    // You might add more pages or links here if needed
    pages: [
        // { name: 'About Us', href: '/about' },
        // { name: 'Contact', href: '/contact' },
    ],
};


export default function Navigation() {
    const [open, setOpen] = useState(false); // State for mobile menu open/close

    // Get cart items and count from CartContext
    const { cart } = useContext(CartContext);
    const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

    // Get wishlist items and count from WishlistContext using the custom hook
    const { wishlistItems } = useWishlist();
    const wishlistItemCount = wishlistItems ? wishlistItems.length : 0;

    return (
        <div className="bg-white">
            {/* Free delivery banner */}
            <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white">
                Get free delivery on orders over ₹1000
            </p>

            {/* Mobile menu dialog */}
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop className="fixed inset-0 bg-black/25" />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                        <div className="flex px-4 pt-5 pb-2">
                            {/* Close mobile menu button */}
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                {/* Heroicons XMark icon */}
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        {/* Mobile navigation links */}
                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            {/* Category links */}
                            {navigation.categories.map((category) => (
                                <div key={category.name} className="flow-root">
                                    <Link
                                        to={category.href}
                                        className="-m-2 block p-2 font-medium text-gray-900"
                                        onClick={() => setOpen(false)} // Close menu on link click
                                    >
                                        {category.name}
                                    </Link>
                                </div>
                            ))}
                             {/* Other pages links */}
                            {navigation.pages.map((page) => (
                                <div key={page.name} className="flow-root">
                                    <Link
                                        to={page.href}
                                        className="-m-2 block p-2 font-medium text-gray-900"
                                        onClick={() => setOpen(false)} // Close menu on link click
                                    >
                                        {page.name}
                                    </Link>
                                </div>
                            ))}
                            {/* Wishlist link */}
                            <div className="flow-root">
                                <Link
                                    to="/wishlist"
                                    className="-m-2 block p-2 font-medium text-gray-900"
                                    onClick={() => setOpen(false)} // Close menu on link click
                                >
                                    Wishlist ({wishlistItemCount}) {/* Show wishlist item count */}
                                </Link>
                            </div>
                            {/* Cart link */}
                            <div className="flow-root">
                                <Link
                                    to="/cart"
                                    className="-m-2 block p-2 font-medium text-gray-900"
                                    onClick={() => setOpen(false)} // Close menu on link click
                                >
                                    Cart ({cartItemCount}) {/* Show cart item count */}
                                </Link>
                            </div>
                        </div>

                         {/* Mobile Sign In / Create Account links */}
                         <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                             <div className="flow-root">
                                 <Link
                                     to="/signin" // Link to Sign In page
                                     className="-m-2 block p-2 font-medium text-gray-900"
                                     onClick={() => setOpen(false)} // Close menu on link click
                                 >
                                     Sign in
                                 </Link>
                             </div>
                             <div className="flow-root">
                                  <Link
                                     to="/create-account" // Link to Create Account page
                                     className="-m-2 block p-2 font-medium text-gray-900"
                                     onClick={() => setOpen(false)} // Close menu on link click
                                 >
                                     Create account
                                 </Link>
                             </div>
                         </div>


                    </DialogPanel>
                </div>
            </Dialog>

            {/* Desktop navigation */}
            <header className="relative bg-white">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            {/* Mobile menu button */}
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                            >
                                {/* Heroicons Bars3 icon */}
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link to="/"> {/* Link back to Home */}
                                    <img
                                        alt="Logo" // Add alt text for accessibility
                                        src="/assets/logo.jpg" // Make sure this path is correct
                                        className="h-8 w-auto"
                                    />
                                </Link>
                            </div>

                            {/* Desktop navigation links */}
                            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {/* Category links */}
                                    {navigation.categories.map((category) => (
                                        <Link
                                            key={category.name}
                                            to={category.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                    {/* Other pages links */}
                                    {navigation.pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            to={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </PopoverGroup>

                            <div className="ml-auto flex items-center">
                                {/* Sign In / Create Account links - *** CORRECTED to="/signin" and to="/create-account" *** */}
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link to="/signin" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Sign in
                                    </Link>
                                    <span className="h-6 w-px bg-gray-200" />
                                    <Link to="/create-account" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Create account
                                    </Link>
                                </div>

                                {/* Search icon */}
                                <div className="flex lg:ml-6">
                                    {/* Link to a search page if you have one, otherwise="#" is acceptable here */}
                                    <Link to="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                                    </Link>
                                </div>

                                {/* Wishlist icon with count */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link to="/wishlist" className="group -m-2 flex items-center p-2">
                                        {/* Heroicons HeartIcon */}
                                        <HeartIcon aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
                                        {/* Wishlist item count */}
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{wishlistItemCount}</span>
                                    </Link>
                                </div>

                                {/* Cart icon with count */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link to="/cart" className="group -m-2 flex items-center p-2">
                                        {/* Heroicons ShoppingBagIcon */}
                                        <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
                                        {/* Cart item count */}
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItemCount}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}