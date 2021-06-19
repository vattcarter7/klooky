import styled from 'styled-components/macro';

import { GREY_LIGHT_EXTRA } from '../constants/colors';

export const DashboardProfileLayoutContainer = styled.div`
  display: flex;
  background: ${GREY_LIGHT_EXTRA};
  padding: 40px;
`;

export const SidebarLayoutContainer = styled.div`
  min-width: 280px;
  height: 600px;
`;

export const ContentLayoutContainer = styled.div`
  width: 100%;
  min-width: 300px;
  background: white;
  height: 800px;
  margin-left: 20px;
`;
