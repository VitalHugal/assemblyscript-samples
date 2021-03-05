import Big from './big';

export function stringToString(n: string): string {
  return Big.of(n).toString();
}

export function floatToString(n: f64): string {
  return Big.of(n).toString();
}

export function stringToNumber(n: string): f64 {
  return Big.of(n).toNumber();
}

export function floatToNumber(n: f64): f64 {
  return Big.of(n).toNumber();
}

export function abs(n: string): string {
  return Big.of(n).abs().toString();
}

export function cmp(a: string, b: string): i32 {
  return Big.of(a).cmp(b);
}

export function round(n: string, dp: i32, rm: u8): string {
  return Big.of(n).round(dp, rm).toString();
}

export function plus(a: string, b: string): string {
  return (Big.of(a) + Big.of(b)).toString();
}

export function minus(a: string, b: string): string {
  return (Big.of(a) - Big.of(b)).toString();
}

export function times(a: string, b: string): string {
  return (Big.of(a) * Big.of(b)).toString();
}

export function div(a: string, b: string): string {
  return (Big.of(a) / Big.of(b)).toString();
}

export function divRM(a: string, b: string, rm: i32 = Big.RM): string {
  const rm_ = Big.RM;
  const res = (Big.of(a) / Big.of(b)).toString();
  Big.RM = rm_;
  return res;
}

export function mod(a: string, b: string): string {
  return (Big.of(a) % Big.of(b)).toString();
}
