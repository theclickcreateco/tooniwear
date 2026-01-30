"use client";

import { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
    title: string;
    options: string[];
    selectedOptions: string[];
    onToggle: (option: string) => void;
}

const FilterSection = ({ title, options, selectedOptions, onToggle }: FilterSectionProps) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-neutral-100 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left bg-transparent"
            >
                <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-xs">{title}</h4>
                <ChevronDown className={cn("w-4 h-4 text-neutral-400 transition-transform", !isOpen && "-rotate-90")} />
            </button>

            {isOpen && (
                <div className="mt-4 space-y-2">
                    {options.map((option) => (
                        <label key={option} className="flex items-center space-x-3 group cursor-pointer">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-neutral-200 transition-all checked:bg-primary-500 checked:border-primary-500"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => onToggle(option)}
                                />
                                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-sm text-neutral-600 group-hover:text-primary-600 transition-colors uppercase font-medium">
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function FilterSystem() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: [] as string[],
        age: [] as string[],
        type: [] as string[],
    });

    const toggleFilter = (section: keyof typeof filters, option: string) => {
        setFilters(prev => ({
            ...prev,
            [section]: prev[section].includes(option)
                ? prev[section].filter(o => o !== option)
                : [...prev[section], option]
        }));
    };

    const clearFilters = () => setFilters({ category: [], age: [], type: [] });

    const Content = () => (
        <div className="space-y-2">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-primary-500" />
                    <span>Filters</span>
                </h3>
                <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-secondary-500 hover:underline uppercase tracking-widest"
                >
                    Clear All
                </button>
            </div>

            <FilterSection
                title="Gender"
                options={["Boys", "Girls"]}
                selectedOptions={filters.category}
                onToggle={(opt) => toggleFilter("category", opt)}
            />
            <FilterSection
                title="Age"
                options={["2-4Y", "4-6Y", "6-8Y"]}
                selectedOptions={filters.age}
                onToggle={(opt) => toggleFilter("age", opt)}
            />
            <FilterSection
                title="Product Type"
                options={["T-Shirts", "Dresses", "Pants", "Dungarees", "Skirts", "Tops"]}
                selectedOptions={filters.type}
                onToggle={(opt) => toggleFilter("type", opt)}
            />

            <div className="pt-8 space-y-4">
                <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-xs">Price Range</h4>
                <input type="range" className="w-full accent-primary-500" min="0" max="100" />
                <div className="flex items-center justify-between text-sm font-bold text-neutral-600">
                    <span>Rs. 0</span>
                    <span>Rs. 10000</span>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Filter */}
            <aside className="hidden lg:block w-72 shrink-0">
                <Content />
            </aside>

            {/* Mobile Filter Trigger */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden w-full py-4 px-6 bg-white border border-neutral-100 rounded-2xl flex items-center justify-center space-x-3 text-neutral-900 font-bold shadow-sm"
            >
                <Filter className="w-5 h-5 text-primary-500" />
                <span>Filter & Sort</span>
            </button>

            {/* Mobile Drawer */}
            <div className={cn(
                "fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300",
                isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
            )} onClick={() => setIsMobileOpen(false)}>
                <div
                    className={cn(
                        "fixed inset-y-0 right-0 w-full max-w-sm bg-white p-6 transform transition-transform duration-300 flex flex-col",
                        isMobileOpen ? "translate-x-0" : "translate-x-full"
                    )}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-8 border-b border-neutral-100 pb-4">
                        <h3 className="text-xl font-bold text-neutral-900">Filters</h3>
                        <button onClick={() => setIsMobileOpen(false)} className="p-2">
                            <X className="w-6 h-6 text-neutral-600" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2">
                        <Content />
                    </div>
                    <div className="pt-6 mt-6 border-t border-neutral-100">
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/20"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
