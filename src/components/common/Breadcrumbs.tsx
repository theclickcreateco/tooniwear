import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center text-sm text-neutral-500 mb-6">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-primary-600 transition-colors flex items-center">
                        <Home className="w-4 h-4" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center space-x-2 text-primary-600">
                        <ChevronRight className="w-4 h-4 text-neutral-300 px-0.5" />
                        <Link
                            href={item.href}
                            className={`hover:text-primary-600 transition-colors ${index === items.length - 1 ? "font-semibold text-neutral-900 pointer-events-none" : ""
                                }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
