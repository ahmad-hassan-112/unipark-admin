import { css } from 'styled-components';

const breakpoints = {
  xxs: '390px',
  xs: '575px',
  sm: '768px',
  md: '991px',
  lg: '1199px',
  xl: '1366px',
  xxl: '1536px',
};

export const media = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
