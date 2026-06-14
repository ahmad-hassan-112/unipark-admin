import styled from 'styled-components';

const NavbarWrapper = styled.header`
  .navbar-main {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral100};
    max-height: 72px;
  }

  .popover-menu {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral250};
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral250};
    font-size: ${({ theme }) => theme.fonts.baseFontSizeSmall};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.neutral550};
  }
  .logout-menu {
    color: ${({ theme }) => theme.colors.primary600};
  }
`;

export default NavbarWrapper;
