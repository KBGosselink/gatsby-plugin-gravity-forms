import classnames from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React, {useState} from "react";
import { useFormContext } from "react-hook-form";
import InputWrapper from "../InputWrapper";
import { valueToLowerCase } from "../../utils/helpers";

const standardType = (type) => {
  switch (type) {
    default:
      return "text";
  }
};

const parseCountry = (country) => {
  return country.substring(0, country.indexOf('.') - 1);
};

const Address = ({ defaultValue, fieldData, name, ...wrapProps }) => {
  const {
    inputs,
    defaultCountry,
    id,
    cssClass,
    inputMaskValue,
    isRequired,
    maxLength,
    placeholder,
    size,
    type,
  } = fieldData;

  const addressFieldCountryEnum = useStaticQuery(graphql`
  query MyQuery {
    __type(name: "hwgraphql_AddressFieldCountryEnum")
      {
        enumValues{
          name
          description
        }
      }
    }
  `);

  const { __type: {
    enumValues
  } } = addressFieldCountryEnum;

  enumValues.sort(function (a, b) {
    a = a.description.toLowerCase();
    b = b.description.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  });

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
      {inputs.map((input) => {
        return !input.isHidden ? input.key !== "country" ?
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
          : <label key={`label_${input.id}`}>{input.label} :
            <select
              key={`input_${input.id}`}
              aria-invalid={errors}
              aria-required={isRequired}
              className={classnames(
                "gravityform__field__input",
                "gravityform__field__input__select",
                "gfield_select",
                cssClass,
                valueToLowerCase(size)
              )}
              id={`input_${input.id}`}
              name={`input_${input.id}`}
              value={defaultCountry}

              {...register(name, {
                required: isRequired && "This field is required",
                
              })}
            >
              {enumValues.map(({ name, description }, index) => {
                return (
                  <option
                    key={`${name}-${index}`}
                    value={name}
                  >
                    {parseCountry(description)}
                  </option>

                )
              })}
            </select>
          </label>
          : null
      })
      }
    </InputWrapper>

  )
};

export default Address;

Address.propTypes = {
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
  }),
  name: PropTypes.string,
  wrapClassName: PropTypes.string,
  wrapId: PropTypes.string,
};

export const AddressField = graphql`
  fragment AddressField on WpAddressField {
    adminLabel
    canPrepopulate
    conditionalLogic {
      ...ConditionalLogic
    }
    id
    addressType
    addressValues {
      city
      country
      lineTwo
      state
      street
      zip
    }
    copyValuesOptionFieldId
    copyValuesOptionLabel
    cssClass
    defaultCountry
    defaultProvince
    defaultState
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
    shouldCopyValuesOption
    subLabelPlacement
    value
    type
    visibility
    inputs {
      autocompleteAttribute
      customLabel
      defaultValue
      id
      isHidden
      key
      label
      name
      placeholder
    }
    personalData {
      isIdentificationField
      shouldErase
      shouldExport
    }
  }
`;