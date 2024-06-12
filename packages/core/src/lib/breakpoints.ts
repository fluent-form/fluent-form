export const Breakpoints = {
  xs: '(max-width:575px)',
  sm: '(min-width:576px)',
  md: '(min-width:768px)',
  lg: '(min-width:992px)',
  xl: '(min-width:1200px)',
  xxl: '(min-width:1400px)'
} as const;

export type Breakpoints = typeof Breakpoints;

export function createBreakpointInfix(breakpoint?: keyof Breakpoints) {
  return breakpoint !== 'xs' ? `-${breakpoint}` : '';
}
