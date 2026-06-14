import styled from 'styled-components';

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.whiteColor};
  background-color: ${({ theme }) => theme.colors.secondaryBase};
  font-size: ${({ theme }) => theme.fonts.baseFontSizeSmall};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  line-height: 130%;
  padding: 13px 24px;
  border-radius: 8px;
  white-space: nowrap;
  border: none;
  height: 40px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
  &.outlined {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.neutral200};
    color: ${({ theme }) => theme.colors.secondaryBase};
    &:focus-visible {
      outline: none;
    }
  }
  &.no-border {
    border: 0;
  }
  &.text {
    background-color: transparent;
    border: none;
    padding: 0;
    color: ${({ theme }) => theme.colors.secondaryBase};
  }
  &.danger {
    background-color: ${({ theme }) => theme.colors.alertColor};
  }
`;

export default ButtonWrapper;
