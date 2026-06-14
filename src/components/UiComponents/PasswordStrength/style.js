import styled from 'styled-components';

const StrengthWrapper = styled.div`
  .strength-text {
    font-size: ${({ theme }) => theme.fonts.baseFontSizeXs};
    color: ${({ theme }) => theme.colors.neutral550};
    line-height: 150%;
    white-space: nowrap;
  }
  .password-hint {
    font-size: ${({ theme }) => theme.fonts.baseFontSizeXs};
    line-height: 130%;
    text-align: left;
    p {
      color: ${({ theme }) => theme.colors.neutral500_2};
    }
    span {
      color: ${({ theme }) => theme.colors.neutral300};
    }
  }
`;

export default StrengthWrapper;
