import classnames from "classnames";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";
import InputWrapper from "../InputWrapper";
import { valueToLowerCase } from "../../utils/helpers";

const standardType = (type) => {
  switch (type) {
    default:
      return "text";
  }
};

const Name = ({ defaultValue, fieldData, name, ...wrapProps }) => {
  const {
    inputs,
    id,
    cssClass,
    inputMaskValue,
    isRequired,
    maxLength,
    placeholder,
    size,
    type,
  } = fieldData;

  const regex = inputMaskValue ? new RegExp(inputMaskValue) : false;
  let inputType = standardType(type);

  const {
    register,
    formState: { errors },
  } = useFormContext();


  return (
    <InputWrapper
      errors={errors?.[name] || {}}
      inputData={fieldData}
      labelFor={name}
      {...wrapProps}
    >
    { inputs.map((input) => {
      return !input.isHidden ?
      <label key={`label_${input.id}`}>{input.label} :
      <input
        key={`input_${input.id}`}
        aria-invalid={Boolean(errors?.[name])}
        aria-required={isRequired}
        className={classnames(
          "gravityform__field__input",
          `gravityform__field__input__${valueToLowerCase(type)}`,
          cssClass,
          valueToLowerCase(size)
        )}
        defaultValue={defaultValue}
        id={`input_${input.id}`}
        maxLength={maxLength || 524288} // 524288 = 512kb, avoids invalid prop type error if maxLength is undefined.
        name={`input_${input.id}`}
        placeholder={input.placeholder}
        {...register(`input_${input.id}`, {
          required: isRequired && strings.errors.required,
          maxlength: {
            value: maxLength > 0 && maxLength,
            message:
              maxLength > 0 &&
              `${strings.errors.maxChar.front}  ${maxLength} ${strings.errors.maxChar.back}`,
          },
          pattern: {
            value: regex,
            message: regex && strings.errors.pattern,
          },
        })}
        type={valueToLowerCase(inputType)}
      /></label>
      : null
     })
    }
  </InputWrapper>
  
  )
};

export default Name;

Name.propTypes = {
  fieldData: PropTypes.shape({
    cssClass: PropTypes.string,
    description: PropTypes.string,
    inputMaskValue: PropTypes.string,
    label: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    inputs: PropTypes.arrayOf(PropTypes.object),
  }),
  name: PropTypes.string,
  wrapClassName: PropTypes.string,
  wrapId: PropTypes.string,
};

export const NameField = graphql`
  fragment NameField on WpNameField {
    id
    adminLabel
    canPrepopulate
    conditionalLogic {
      ...ConditionalLogic
    }
    cssClass
    description
    descriptionPlacement
    displayOnly
    errorMessage
    hasAutocomplete
    inputName
    inputType
    isRequired
    label
    labelPlacement
    layoutGridColumnSpan
    layoutSpacerGridColumnSpan
    pageNumber
    personalData {
      shouldExport
      shouldErase
      isIdentificationField
    }
    subLabelPlacement
    type
    value
    visibility
    inputs {
      autocompleteAttribute
      customLabel
      defaultValue
      id
      hasChoiceValue
      isHidden
      label
      key
      name
      placeholder
      choices {
        isSelected
        text
        value
      }
    }
  }
`;

