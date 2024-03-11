'use client';

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import cx from "clsx";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { BaseIdName } from "@/lib/interfaces";


interface Props {
    categories: BaseIdName[],
};

const defaultProps = {
    categories: [],
};


const BlogCategory: React.FC<Props> = (props) => {
  const { categories } = { ...defaultProps, ...props};
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();

  useEffect(() => {
    let chosenCategory = searchParams.get('category');
    if (chosenCategory) setSelectedId(parseInt(chosenCategory));
    else setSelectedId(null);
  }, [searchParams]);

  const setSelectedCategory = useCallback((id: string | number) => {
    setSelectedId(id);
    router.push(pathname + '?category=' + id);
  }, [setSelectedId]);

  return (
    <div className="sticky float-right top-20">
      <div className="flex gap-1.5">
        {categories.map(({ id, name }, index) => (
          <div key={index}
               className="relative py-1 px-2 text-xs cursor-pointer inline-block"
               onMouseEnter={() => setHoveredId(id)}
               onMouseLeave={() => setHoveredId(null)}
               onClick={() => setSelectedCategory(id)}>
            <motion.a className={cx(
                "absolute bg-blue-200 w-full h-full -z-[1] origin-center inset-0 rounded",
                        selectedId === id ? "opacity-100" : "opacity-60"
                      )}
                      initial={{ scale: 1, opacity: selectedId === id ? 1 : 0.5 }}
                      animate={{ scale: hoveredId === id ? 1.07 : 1, opacity: selectedId === id ? 1 : 0.5 }}
                      transition={{ type: "spring", bounce: 0.5, stiffness: 600, damping: 60 }}>
            </motion.a>
            <span className="w-full h-full text-font-blueDark font-medium">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogCategory;
