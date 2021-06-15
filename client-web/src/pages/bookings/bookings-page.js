import React from 'react';
import {
  DashboardProfileLayoutContainer,
  ProfileSidebarLayoutContainer,
  ContentLayoutContainer
} from '../../layouts';

const BookingsPage = () => {
  return (
    <DashboardProfileLayoutContainer>
      <ProfileSidebarLayoutContainer>Sidebar</ProfileSidebarLayoutContainer>
      <ContentLayoutContainer>Content</ContentLayoutContainer>
    </DashboardProfileLayoutContainer>
  );
};

export default BookingsPage;
