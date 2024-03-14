'use client';

import { useState, useCallback, useEffect } from "react";
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
  const [selected, setSelected] = useState<string>('');

  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();

  useEffect(() => {
    let chosenCategory = searchParams.get('category');
    if (!!chosenCategory) setSelected(chosenCategory);
    else setSelected('');
  }, [searchParams]);

  const setSelectedCategory = useCallback((slug: string) => {
    if (slug === selected) {
      setSelected('');
      router.push(pathname);
    } else {
      setSelected(slug);
      router.push(pathname + '?category=' + slug);
    }
  }, [selected]);

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
                "absolute bg-blue-200 w-full h-full -z-[1] origin-center inset-0 rounded",
                        selected === slug ? "opacity-100" : "opacity-60"
                      )}
                      initial={{ scale: 1, opacity: selected === slug ? 1 : 0.5 }}
                      animate={{ scale: hovered === slug ? 1.07 : 1, opacity: selected === slug ? 1 : 0.5 }}
                      transition={{ type: "spring", bounce: 0.9, stiffness: 400, damping: 30 }}>
            </motion.a>
            <span className="w-full h-full text-font-blueDark font-medium">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogCategory;
