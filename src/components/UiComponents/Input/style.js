import styled from 'styled-components';

const sharedStyles = props => `
  position: relative;
  border: 1px solid ${props.theme.colors.inputBorder};
  color: ${props.theme.colors.neutral850};
  font-size: ${props.theme.fonts.baseFontSizeSmall};
  background-color: ${props.theme.colors.whiteColor};
  border-radius: 8px;
  width: 100%;
  max-height: 48px;

  &::placeholder {
    color: ${props.theme.colors.neutral300};
  }

  &:focus-visible {
    outline: none;
  }
  &:disabled {
    background-color: ${props.theme.colors.neutral50};
    cursor: not-allowed;
  }
`;

const StyledInput = styled.input`
  ${sharedStyles}
  padding: ${({ type }) => (type === 'search' ? '8px 44px 8px 20px' : '13px 16px 13px 20px')};
  height: ${({ type }) => (type === 'search' ? '56px' : 'auto')};
`;

const StyledTextarea = styled.textarea`
  ${sharedStyles}
  padding: 16px;
  resize: vertical;
  min-height: 120px;
`;

const InputWrapper = props => {
  if (props.type === 'textarea') {
    return <StyledTextarea {...props} />;
  }
  return <StyledInput {...props} />;
};

export default InputWrapper;
