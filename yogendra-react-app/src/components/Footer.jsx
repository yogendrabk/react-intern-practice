import PropTypes from 'prop-types';

export function Footer({ 
  companyName = 'Tech Yatra',
  links = [],
  className = '',
  ...rest
}) {
  return (
    <footer 
      className={`
        bg-gray-800
        text-white
        mt-16
        py-12
        ${className}
      `}
      {...rest}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-2">{companyName}</h3>
            <p className="text-gray-400 text-sm">
              Empowering next generation of developers through comprehensive training.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href || '#'}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <p className="text-gray-400 text-sm mb-2">Email: info@techyatra.com</p>
            <p className="text-gray-400 text-sm mb-2">Phone: +977-1-1234567</p>
            <p className="text-gray-400 text-sm">Kathmandu, Nepal</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2026 Tech Yatra. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  companyName: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

// Footer component layout structure
// Responsive grid: 1 column mobile, 3 column desktop
// Multiple section: company info, links, contact
// Sticky bottom presentation with background color
