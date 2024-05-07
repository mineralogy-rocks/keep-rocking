'use client';

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import cx from "clsx";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { BaseIdNameSlug } from "@/lib/interfaces";


interface Props {
    categories: BaseIdNameSlug[],
};

const defaultProps = {
    categories: [],
};


const BlogCategory: React.FC<Props> = (props) => {
  const { categories } = { ...defaultProps, ...props};
  const [hovered, setHovered] = useState<string>('');

  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const isSelected = (slug: string) => searchParams.get('category') === slug;
  const setSelectedCategory = useCallback((slug: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (isSelected(slug)) {
      current.delete("category");
    } else {
      current.set("category", slug);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  }, [searchParams]);

  return (
    <div className="sticky float-right top-20">
      <div className="flex gap-1.5">
        {categories.map(({ id, name , slug}, index) => (
          <div key={index}
               className="relative py-1 px-2 text-xs cursor-pointer inline-block"
               onMouseEnter={() => setHovered(slug)}
               onMouseLeave={() => setHovered('')}
               onClick={() => setSelectedCategory(slug)}>
            <motion.a className={cx(
                "absolute bg-sky-300/60 dark:bg-sky-600 w-full h-full -z-[1] origin-center inset-0 rounded",
                        isSelected(slug) ? "opacity-100" : "opacity-60"
                      )}
                      initial={{ scale: 1, opacity: isSelected(slug) ? 1 : 0.5 }}
                      animate={{ scale: hovered === slug ? 1.07 : 1, opacity: isSelected(slug) ? 1 : 0.5 }}
                      transition={{ type: "spring", bounce: 0.9, stiffness: 400, damping: 30 }}>
            </motion.a>
            <span className="w-full h-full text-font-blueDark dark:text-font-primary font-medium">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogCategory;
