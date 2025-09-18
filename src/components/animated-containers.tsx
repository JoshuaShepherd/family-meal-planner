'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardGridProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
}

export function AnimatedCardGrid({ children, className = '', itemClassName = '' }: AnimatedCardGridProps) {
  return (
    <motion.div
      layout
      className={`grid gap-4 ${className}`}
    >
      <AnimatePresence mode="popLayout">
        {children.map((child, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className={itemClassName}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

interface AnimatedListProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  direction?: 'row' | 'column';
}

export function AnimatedList({ 
  children, 
  className = '', 
  itemClassName = '',
  direction = 'column' 
}: AnimatedListProps) {
  return (
    <motion.div
      layout
      className={`flex ${direction === 'column' ? 'flex-col' : 'flex-row flex-wrap'} gap-3 ${className}`}
    >
      <AnimatePresence mode="popLayout">
        {children.map((child, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, x: direction === 'row' ? -20 : 0, y: direction === 'column' ? -20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: direction === 'row' ? 20 : 0, y: direction === 'column' ? 20 : 0 }}
            transition={{
              duration: 0.25,
              delay: index * 0.03,
              type: "spring",
              stiffness: 400,
              damping: 30
            }}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.15 }
            }}
            className={itemClassName}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      {icon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="mb-4 text-gray-400"
        >
          {icon}
        </motion.div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 max-w-md">{description}</p>
      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}