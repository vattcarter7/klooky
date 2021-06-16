import React from 'react';

import {
  DashboardProfileLayoutContainer,
  SidebarLayoutContainer,
  ContentLayoutContainer
} from '../../layouts';

import { ProfileSidebar, ActionSidebar } from '../../components';

const SettingsPage = () => {
  return (
    <DashboardProfileLayoutContainer>
      <SidebarLayoutContainer>
        <ProfileSidebar />
        <ActionSidebar />
      </SidebarLayoutContainer>
      <ContentLayoutContainer>Settings Page Content</ContentLayoutContainer>
    </DashboardProfileLayoutContainer>
  );
};

export default SettingsPage;
