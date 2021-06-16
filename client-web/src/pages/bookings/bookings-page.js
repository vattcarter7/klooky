import React from 'react';
import {
  DashboardProfileLayoutContainer,
  SidebarLayoutContainer,
  ContentLayoutContainer
} from '../../layouts';

import { ProfileSidebar, ActionSidebar } from '../../components';

const BookingsPage = () => {
  return (
    <DashboardProfileLayoutContainer>
      <SidebarLayoutContainer>
        <ProfileSidebar />
        <ActionSidebar />
      </SidebarLayoutContainer>
      <ContentLayoutContainer>Booking Page Content</ContentLayoutContainer>
    </DashboardProfileLayoutContainer>
  );
};

export default BookingsPage;
