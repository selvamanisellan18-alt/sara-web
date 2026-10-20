import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Accessible Button Component
 */
export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  ariaLabel,
  icon: Icon,
  ...props
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-midnight-950 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base sm:text-lg font-serif font-bold gap-2.5",
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-rose-600 via-crimson-600 to-amber-500 text-white shadow-lg shadow-rose-600/30 border border-amber-300/40 hover:scale-105 active:scale-95",
    secondary: "bg-white/10 hover:bg-white/15 text-rose-200 border border-rose-500/30 backdrop-blur-md hover:scale-105 active:scale-95",
    glass: "glass-panel text-slate-200 hover:text-white border-rose-500/20 hover:border-rose-400/50 hover:scale-105 active:scale-95",
    ghost: "bg-transparent text-slate-400 hover:text-rose-300 hover:bg-white/5",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
}
