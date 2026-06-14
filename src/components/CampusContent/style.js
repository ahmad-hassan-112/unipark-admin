import styled from 'styled-components';

const CampusContentWrapper = styled.div`
  .campus-card {
    border: 1px solid ${({ theme }) => theme.colors.neutral100};
    border-radius: 8px;
    padding: 16px;
    p {
      color: ${({ theme }) => theme.colors.neutral450};
      line-height: 150%;
    }
    h4 {
      color: ${({ theme }) => theme.colors.neutral850};
    }
  }
  .campus-info-box {
    border: 1px solid ${({ theme }) => theme.colors.neutral100};
    border-radius: 8px;
    .info-header {
      border-bottom: 1px solid ${({ theme }) => theme.colors.neutral100};
    }
    .info-content {
      .info-label {
        color: ${({ theme }) => theme.colors.neutral450};
        line-height: 150%;
      }
      a {
        color: ${({ theme }) => theme.colors.secondaryBase};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        text-decoration: underline;
      }
      .info-value {
        color: ${({ theme }) => theme.colors.neutral850};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        line-height: 130%;
      }
      .name-servers {
        background-color: ${({ theme }) => theme.colors.neutral50};
        border: 1px solid ${({ theme }) => theme.colors.neutral100};
        color: ${({ theme }) => theme.colors.neutral850};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        border-radius: 8px;
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

export default CampusContentWrapper;
