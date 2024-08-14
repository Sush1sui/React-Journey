import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

TextExpander.propTypes = {
    collapsedNumWords: PropTypes.number,
    expanded: PropTypes.bool,
};

export default function TextExpander({
    collapsedNumWords = 10,
    expandButtonText = "Show more",
    collapsedButtonText = "Show less",
    buttonColor = "#0000FF",
    children,
    className,
    expanded = false,
}) {
    const [isExpanded, setIsExpanded] = useState(expanded);

    const limitString = (string, limit) => {
        const words = string.split(" ");
        return words.slice(0, limit).join(" ");
    };

    return (
        <div className={className}>
            {isExpanded
                ? children
                : `${limitString(children, collapsedNumWords)}...`}{" "}
            <Button
                color={buttonColor}
                handleToggle={() => setIsExpanded((e) => !e)}
            >
                {isExpanded ? collapsedButtonText : expandButtonText}
            </Button>
        </div>
    );
}
