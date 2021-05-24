import React from 'react';

import { SocialNetworkButtonContainer } from './styles/social-network-button-styles';

export const SocialNetworkButton = ({ children, ...props }) => (
  <SocialNetworkButtonContainer {...props}>
    {children}
  </SocialNetworkButtonContainer>
);

export default SocialNetworkButton;
