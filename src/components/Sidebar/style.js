import styled from 'styled-components';

const SidebarWrapper = styled.aside`
  border-right: 1px solid ${({ theme }) => theme.colors.neutral100};
  .active-menu {
    background-color: ${({ theme }) => theme.colors.secondaryBase};
  }
`;

export default SidebarWrapper;
