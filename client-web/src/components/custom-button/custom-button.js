import React from 'react';

import { CustomButtonContainer } from './styles/custom-button-styles';

export const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
