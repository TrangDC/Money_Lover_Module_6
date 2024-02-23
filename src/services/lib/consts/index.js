import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'home',
        label: 'Home',
        path: '/home',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'wallets',
        label: 'Wallets',
        path: '/wallets',
        icon: <HiOutlineCube />
    },
    {
        key: 'categories',
        label: 'Categories',
        path: '/categories',
        icon: <HiOutlineShoppingCart />
    },
    {
        key: 'budgets',
        label: 'Budgets',
        path: '/budgets',
        icon: <HiOutlineUsers />
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path: '/transactions',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'messages',
        label: 'Messages',
        path: '/messages',
        icon: <HiOutlineAnnotation />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]