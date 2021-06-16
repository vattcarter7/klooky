import React from 'react';
import {
  DashboardProfileLayoutContainer,
  SidebarLayoutContainer,
  ContentLayoutContainer
} from '../../layouts';

import { ProfileSidebar, ActionSidebar } from '../../components';

const MyProfilePage = () => {
  return (
    <DashboardProfileLayoutContainer>
      <SidebarLayoutContainer>
        <ProfileSidebar />
        <ActionSidebar />
      </SidebarLayoutContainer>
      <ContentLayoutContainer>Account Information</ContentLayoutContainer>
    </DashboardProfileLayoutContainer>
  );
};

export default MyProfilePage;
