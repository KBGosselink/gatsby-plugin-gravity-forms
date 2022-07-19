import classnames from "classnames";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import InputWrapper from "../../components/InputWrapper";
import { valueToLowerCase } from "../../utils/helpers";

const Html = ({ fieldData, name, wrapClassName, ...wrapProps }) => {
  const { label, cssClass, type } = fieldData;

  return (
    <InputWrapper
      {...wrapProps}
      inputData={fieldData}
      labelFor={name}
      wrapClassName={classnames(
        wrapClassName,
        "gsection",
        cssClass
      )}
    >
      <h2 dangerouslySetInnerHTML={{ __html: label }} />
    </InputWrapper>
  );
};

export default Section;

Section.propTypes = {
  fieldData: PropTypes.shape({
    cssClass: PropTypes.string,
    content: PropTypes.string,
    type: PropTypes.string,
  }),
  name: PropTypes.string,
  wrapClassName: PropTypes.string,
  wrapProps: PropTypes.object,
};

export const SectionField = graphql`
  fragment SectionField on WpSectionField {
    conditionalLogic {
      ...ConditionalLogic
    }
    cssClass
    label
  }
`;
