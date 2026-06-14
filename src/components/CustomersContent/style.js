import styled from 'styled-components';

const CustomersWrapper = styled.div`
  .more-campus {
    width: 32px;
    height: 28px;
    border: 1px solid ${({ theme }) => theme.colors.primary200};
    background-color: ${({ theme }) => theme.colors.primary50};
    color: ${({ theme }) => theme.colors.secondaryBase};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .customer-info {
    border: 1px solid ${({ theme }) => theme.colors.neutral100};
    border-radius: 8px;
    .info-content {
      .info-label {
        color: ${({ theme }) => theme.colors.neutral450};
        line-height: 150%;
      }
      .info-value {
        color: ${({ theme }) => theme.colors.neutral850};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        line-height: 130%;
      }
    }
  }
  .bottom-btns {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral250};
    padding-top: 16px;
    padding-right: 24px;
    margin: 32px -32px 0;
  }
`;

export default CustomersWrapper;
