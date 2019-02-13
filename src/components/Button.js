import React from "react";

import "./Button.scss";

const defaultClasses = "button";

export const Button = ({ className, text, href, ...rest }) => {
    const classList = className ? `${defaultClasses} ${className}` : defaultClasses;
    if (href) {
        return (
            <a target="_blank" rel="noopener noreferrer" {...rest} className={classList}>
                {text}
            </a>
        );
    } else {
        return (
            <button {...rest} className={classList}>
                {text}
            </button>
        );
    }
};
