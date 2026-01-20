import PropTypes from 'prop-types';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  onClick = () => {},
  ...rest 
}) {
  // Button size class
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Button variant class (color scheme - using custom primary theme)
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white border-0 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-0 shadow-md hover:shadow-lg',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-0 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 hover:border-gray-400',
    outline: 'bg-transparent hover:bg-primary-50 text-primary-600 border-2 border-primary-600 hover:border-primary-700',
  };

  // Combine all classes
  const buttonClasses = `
    ${sizeClasses[size] || sizeClasses.md}
    ${variantClasses[variant] || variantClasses.primary}
    rounded-lg
    font-semibold
    transition-all
    duration-200
    transform
    hover:scale-105
    disabled:opacity-50
    disabled:cursor-not-allowed
    flex
    items-center
    gap-2
  `;

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
