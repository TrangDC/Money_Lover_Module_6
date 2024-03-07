import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog,
    HiOutlineLogout
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'home',
        label: 'Home',
        path: '/auth/home',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'wallets',
        label: 'Wallets',
        path: '/auth/wallets',
        icon: <HiOutlineCube />
    },
    {
        key: 'categories',
        label: 'Categories',
        path: '/auth/categories',
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
        path: '/auth/transactions',
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
    },
    {
        key: 'logout',
        label: 'Log Out',
        icon: <HiOutlineLogout />
    }

]