import React from 'react';

import {
  DashboardProfileLayoutContainer,
  SidebarLayoutContainer,
  ContentLayoutContainer
} from '../../layouts';

import { ProfileSidebar, ActionSidebar } from '../../components';

const GiftCardsPage = () => {
  return (
    <DashboardProfileLayoutContainer>
      <SidebarLayoutContainer>
        <ProfileSidebar />
        <ActionSidebar />
      </SidebarLayoutContainer>
      <ContentLayoutContainer>Gift card Page Content</ContentLayoutContainer>
    </DashboardProfileLayoutContainer>
  );
};

export default GiftCardsPage;
