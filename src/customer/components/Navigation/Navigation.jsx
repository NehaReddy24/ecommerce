'use client'

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
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext'; // Import useWishlist

const navigation = {
    categories: [
        {
            id: 'home',
            name: 'Home',
            href: '/',
        },
        {
            id: 'new-arrivals',
            name: 'New Arrivals',
            href: '/products/new-arrivals',
        },
        {
            id: 'best-sellers',
            name: 'Best Sellers',
            href: '/products/best-sellers',
        },
        {
            id: 'offers-deals',
            name: 'Offers & Deals',
            href: '/products/offers-deals',
        },
        {
            id: 'all-products',
            name: 'All Products',
            href: '/products',
        },
    ],
    pages: [],
};

export default function Navigation() {
    const [open, setOpen] = useState(false);
    const { cart } = useContext(CartContext);
    const { wishlistItems } = useWishlist(); // Get wishlistItems from context
    const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
    const wishlistItemCount = wishlistItems ? wishlistItems.length : 0; // Get the count of wishlist items

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop className="fixed inset-0 bg-black/25" />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                        <div className="flex px-4 pt-5 pb-2">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            {navigation.categories.map((category) => (
                                <div key={category.name} className="flow-root">
                                    <Link to={category.href} className="-m-2 block p-2 font-medium text-gray-900">
                                        {category.name}
                                    </Link>
                                </div>
                            ))}
                            <div className="flow-root">
                                <Link to="/wishlist" className="-m-2 block p-2 font-medium text-gray-900">
                                    Wishlist ({wishlistItemCount}) {/* Show wishlist item count */}
                                </Link>
                            </div>
                            <div className="flow-root">
                                <Link to="/cart" className="-m-2 block p-2 font-medium text-gray-900">
                                    Cart ({cartItemCount})
                                </Link>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <header className="relative bg-white">
                <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white">
                    Get free delivery on orders over ₹1000
                </p>
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                            >
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>
                            <div className="ml-4 flex lg:ml-0">
                                <Link to="/">
                                    <img
                                        alt="Logo"
                                        src="/assets/logo.jpg"
                                        className="h-8 w-auto"
                                    />
                                </Link>
                            </div>
                            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Link
                                            key={category.name}
                                            to={category.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </PopoverGroup>
                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link to="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Sign in
                                    </Link>
                                    <span className="h-6 w-px bg-gray-200" />
                                    <Link to="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Create account
                                    </Link>
                                </div>
                                <div className="flex lg:ml-6">
                                    <Link to="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                                    </Link>
                                </div>
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link to="/wishlist" className="group -m-2 flex items-center p-2">
                                        <HeartIcon aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{wishlistItemCount}</span> {/* Show wishlist item count */}
                                    </Link>
                                </div>
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link to="/cart" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
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