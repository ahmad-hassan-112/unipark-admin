import styled from 'styled-components';

const AuthBoxWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral100};
  border-radius: 16px;
  box-shadow: 0px 3px 4px 0px #0000001a;
  padding: 56px;
  width: 100%;
  max-width: 721px;
  text-align: center;

  h3 {
    color: ${({ theme }) => theme.colors.neutral700};
  }
  .auth-desc {
    line-height: 150%;
    color: ${({ theme }) => theme.colors.neutral400};
  }
  .have-account {
    font-size: ${({ theme }) => theme.fonts.baseFontSizeSmall};
    color: ${({ theme }) => theme.colors.neutral550};
    line-height: 150%;
  }
`;

export default AuthBoxWrapper;
