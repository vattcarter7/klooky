import React from 'react';
import {
  DashboardProfileLayoutContainer,
  SidebarLayoutContainer,
  ContentLayoutContainer
} from '../../layouts';

import { ProfileSidebar } from '../../components';

const BookingsPage = () => {
  return (
    <DashboardProfileLayoutContainer>
      <SidebarLayoutContainer>
        <ProfileSidebar />
      </SidebarLayoutContainer>
      <ContentLayoutContainer>Content</ContentLayoutContainer>
    </DashboardProfileLayoutContainer>
  );
};

export default BookingsPage;
