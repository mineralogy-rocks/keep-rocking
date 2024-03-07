'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  return (
    <div className="sticky float-right top-20">
      <div className="flex gap-1.5">
        {categories.map(({ id, name }, index) => (
          <div key={index}
               className="relative py-1 px-2 text-xs cursor-pointer inline-block"
               onMouseEnter={() => setHoveredId(index)}
               onMouseLeave={() => setHoveredId(null)}>
            <motion.div className="absolute bg-blue-200 w-full h-full -z-[1] origin-center inset-0 rounded"
                        initial={{ scale: 1 }}
                        animate={{ scale: hoveredId === index ? 1.06 : 1 }}
                        transition={{ type: "spring", bounce: 0.1,  stiffness: 400, damping: 10 }}>
            </motion.div>
            <span className="text-font-blueDark font-medium">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogCategory;
