import { createGlobalStyle } from 'styled-components';
import { media } from './media-mixins';

const GlobalStyles = createGlobalStyle`
h1 {
    font-size: ${({ theme }) => theme.fonts.baseFontSizeH1};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    line-height: 120%;
    letter-spacing: -2px;
  }
  h2 {
    font-size: ${({ theme }) => theme.fonts.baseFontSizeH2};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    line-height: 120%;
    letter-spacing: -1.3px;
  }
  h3 {
    font-size: ${({ theme }) => theme.fonts.baseFontSizeH3};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    line-height: 120%;
    letter-spacing: -1px;
  }
  h4 {
    font-size: ${({ theme }) => theme.fonts.baseFontSizeH4};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    line-height: 120%;
    letter-spacing: -0.5px;
  }
  h5 {
    font-size: ${({ theme }) => theme.fonts.baseFontSizeH5};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    line-height: 28px;
    letter-spacing: -0.2px;
  }
  h6 {
    font-size: ${({ theme }) => theme.fonts.baseFontSizeH6};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    line-height: 130%;
  }
  label {
    font-size: ${({ theme }) => theme.fonts.baseFontSizeSmall};
    color: ${({ theme }) => theme.colors.neutral950};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    line-height: 130%;
    margin-bottom: 4px;
    display: block;
    text-align: left;
  }
  .error-message {
    color: ${({ theme }) => theme.colors.errorColor};
    font-size: ${({ theme }) => theme.fonts.baseFontSizeSmall};
  }
  .auth-side-img {
    ${media.xxl`
      right: -90px;
    `}
    ${media.xl`
      display: none;
    `}
  }

  .table-border {
    border: 1px solid ${({ theme }) => theme.colors.neutral100};
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
  }
  .live {
    color: ${({ theme }) => theme.colors.success500};
    .circle {
      background-color: ${({ theme }) => theme.colors.success500};
    }
  }
  .broken {
    color: ${({ theme }) => theme.colors.error600};
    .circle {
      background-color: ${({ theme }) => theme.colors.error600};
    }
  }
  .status {
    &.pending {
      color: ${({ theme }) => theme.colors.warning500};
    }
    &.sold,
    &.open {
      color: ${({ theme }) => theme.colors.success500};
    }
    &.incomplete,
    &.closed {
      color: ${({ theme }) => theme.colors.error500};
    }
  }
`;

export default GlobalStyles;
