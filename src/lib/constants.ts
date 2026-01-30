export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
    { label: "New Arrivals", href: "/shop?sort=newest" },
    {
        label: "Boys",
        href: "/shop?category=boys",
        children: [
            { label: "T-Shirts", href: "/shop?category=boys&type=t-shirts" },
            { label: "Shirts", href: "/shop?category=boys&type=shirts" },
            { label: "Pants", href: "/shop?category=boys&type=pants" },
        ],
    },
    {
        label: "Girls",
        href: "/shop?category=girls",
        children: [
            { label: "Dresses", href: "/shop?category=girls&type=dresses" },
            { label: "Tops", href: "/shop?category=girls&type=tops" },
            { label: "Skirts", href: "/shop?category=girls&type=skirts" },
        ],
    },
    { label: "Toddlers (2-4Y)", href: "/shop?age=2-4y" },
    { label: "Sale", href: "/shop?on_sale=true" },
];
