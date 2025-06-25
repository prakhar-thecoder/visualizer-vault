import React from 'react';
import PropTypes from 'prop-types';

const Pill = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variants = {
    default: 'bg-orange-100 text-orange-800',
    muted: 'bg-orange-50 text-orange-600 border border-orange-200',
  };
  
  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

Pill.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'muted']),
  className: PropTypes.string,
};

export default Pill;
