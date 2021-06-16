import React from 'react';

import {
  DashboardProfileLayoutContainer,
  SidebarLayoutContainer,
  ContentLayoutContainer
} from '../../layouts';

import { ProfileSidebar, ActionSidebar } from '../../components';

const RewardsPage = () => {
  return (
    <DashboardProfileLayoutContainer>
      <SidebarLayoutContainer>
        <ProfileSidebar />
        <ActionSidebar />
      </SidebarLayoutContainer>
      <ContentLayoutContainer>Reward Page Content</ContentLayoutContainer>
    </DashboardProfileLayoutContainer>
  );
};

export default RewardsPage;
