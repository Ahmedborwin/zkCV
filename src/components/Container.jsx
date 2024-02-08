import React from "react";
import PropTypes from "prop-types";

const Container = ({ children, ...props }) => {
  return <div className="max-w-[1240px] mx-auto max-xl:mx-3" {...props}>{children}</div>;
}

Container.PropTypes = {
    children: PropTypes.any
}

export default Container;
