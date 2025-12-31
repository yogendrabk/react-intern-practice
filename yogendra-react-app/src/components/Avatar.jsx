import PropTypes from 'prop-types';

export function Avatar({ 
  src = null, 
  initials = 'YB', 
  size = 'md',
  className = '',
  ...rest 
}) {
  // Avatar size class
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
  };

  const avatarClasses = `
    ${sizeClasses[size] || sizeClasses.md}
    rounded-full
    bg-gradient-to-br
    from-purple-400
    to-blue-500
    flex
    items-center
    justify-center
    font-bold
    text-white
    overflow-hidden
    ${className}
  `;

  return (
    <div className={avatarClasses} {...rest}>
      {src ? (
        <img 
          src={src} 
          alt={`Avatar of ${initials}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  initials: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};
