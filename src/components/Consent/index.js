import classnames from "classnames";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import InputWrapper from "../InputWrapper";
import { useFormContext } from "react-hook-form";

const standardType = (type) => {
    switch (type) {
      default:
        return "checkbox";
    }
  };

const Consent = ({ defaultValue, fieldData, name, ...wrapProps }) => {
    const {
      id,
      cssClass,
      consentValue,
      isRequired,
      description,
      label,
      type,
      checkboxLabel
    } = fieldData;

    const {
        register,
        formState: { errors },
      } = useFormContext();
    
      // Due to checkboxes and radios are seen in GraphQL each choice is given an
      // error parameter. However in practice only one error matters.
      // So we check to see if one error exists across all choices.
      const error = errors[name]?.filter(({ message }) => {
        if (message) {
          return true;
        }
      })?.[0];
  
    return (
      <InputWrapper
        errors={error}
        inputData={fieldData}
        labelFor={name}
        {...wrapProps}
      >
            <label key={`label_${id}`}>{label} :
            <input
                className={classnames(
                  `gravityform__field__input__${standardType(type)}`,
                  `gravityform__field__input__${standardType(type)}--` + id,
                  cssClass
                )}
                id={`${name}_${id}`}
                name={`${name}${type === "checkbox" ? `.${id}` : ""}`}
                {...register(
                  `${name}${type === "checkbox" ? `.${id}` : ""}`,
                  {
                    required: isRequired && strings.errors.required,
                  }
                )}
                type={standardType(type)}
                value=""
              />
                <p  id={`description_${id}`}>{ checkboxLabel }</p>
            </label>
      </InputWrapper>
  
    )
  };

  export default Consent;

  export const ConsentField = graphql`
    fragment ConsentField on WpConsentField {
        id
        adminLabel
        checkboxLabel
        conditionalLogic {
            ...ConditionalLogic
          }
        consentValue
        cssClass
        description
        descriptionPlacement
        displayOnly
        errorMessage
        inputType
        isRequired
        label
        labelPlacement
        layoutGridColumnSpan
        layoutSpacerGridColumnSpan
        pageNumber
        type
        value
        visibility
    }
  `;