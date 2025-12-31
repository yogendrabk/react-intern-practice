import PropTypes from 'prop-types';

export function Badge({ 
  children, 
  color = 'blue',
  className = '',
  ...rest 
}) {
  // Badge color scheme
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border border-blue-300',
    red: 'bg-red-100 text-red-800 border border-red-300',
    green: 'bg-green-100 text-green-800 border border-green-300',
    yellow: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    purple: 'bg-purple-100 text-purple-800 border border-purple-300',
    pink: 'bg-pink-100 text-pink-800 border border-pink-300',
    gray: 'bg-gray-100 text-gray-800 border border-gray-300',
  };

  const badgeClasses = `
    inline-flex
    items-center
    gap-2
    px-3
    py-1
    rounded-full
    text-sm
    font-semibold
    ${colorClasses[color] || colorClasses.blue}
    ${className}
  `;

  return (
    <span className={badgeClasses} {...rest}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['blue', 'red', 'green', 'yellow', 'purple', 'pink', 'gray']),
  className: PropTypes.string,
};
