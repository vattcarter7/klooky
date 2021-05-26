import React from 'react';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './styles/form-input-styles';

const FormInput = ({ label, ...props }) => (
  <GroupContainer>
    <FormInputContainer {...props} />
    {label && (
      <FormInputLabel className={props.value.length ? 'shrink' : ''}>
        {label}
      </FormInputLabel>
    )}
  </GroupContainer>
);

export default FormInput;
