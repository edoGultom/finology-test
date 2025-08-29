import { motion, useInView } from "motion/react";
import React, { useRef, type MouseEventHandler, type ReactNode } from "react";
import type { IUser } from "../../types/user";
import { UserCard } from "../UserCard";

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  delay = 0,
  index,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ marginBottom: "1rem", cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedListProps {
  items?: IUser[];
  onItemSelect?: (item: IUser, index: number) => void;
  displayScrollbar?: boolean;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  items = [],
  onItemSelect,
  displayScrollbar = true,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={listRef}
      className={`scroll-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${
        !displayScrollbar ? "no-scrollbar" : ""
      }`}
    >
      {items.map((item, index) => (
        <AnimatedItem
          key={index}
          delay={0.1}
          index={index}
          onClick={() => {
            if (onItemSelect) {
              onItemSelect(item, index);
            }
          }}
        >
          <UserCard key={item.id} user={item} />
        </AnimatedItem>
      ))}
    </div>
  );
};

export default AnimatedList;
