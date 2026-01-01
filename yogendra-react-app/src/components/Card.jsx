import PropTypes from 'prop-types';

export function Card({ 
  children,
  header = null,
  footer = null,
  className = '',
  ...rest 
}) {
  return (
    <div 
      className={`
        bg-white
        rounded-lg
        shadow-md
        hover:shadow-lg
        transition-shadow
        overflow-hidden
        ${className}
      `}
      {...rest}
    >
      {/* Card Header */}
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          {typeof header === 'string' ? (
            <h3 className="text-lg font-semibold text-gray-800">{header}</h3>
          ) : (
            header
          )}
        </div>
      )}

      {/* Card Body - Children render here */}
      <div className="px-6 py-4">
        {children}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {typeof footer === 'string' ? (
            <p className="text-sm text-gray-600">{footer}</p>
          ) : (
            footer
          )}
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};

// Note: Children prop pattern
// Children allow parent pass content to component
// This flexible way to compose component
// Example: <Card header="Title"><p>Content</p></Card>
