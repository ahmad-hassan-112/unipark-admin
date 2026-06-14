import styled from 'styled-components';
import * as SelectPrimitive from '@radix-ui/react-select';

const StyledTrigger = styled(SelectPrimitive.Trigger)`
  border-color: ${({ theme }) => theme.colors.inputBorder};
  color: ${({ theme }) => theme.colors.neutral800};
  height: 48px;
`;

const StyledContent = styled(SelectPrimitive.Content)`
  box-shadow: 0px 6px 10px 0px #0000000f;
  color: ${({ theme }) => theme.colors.neutral800};
`;

export { StyledTrigger, StyledContent };
