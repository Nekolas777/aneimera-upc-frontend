export function getDisabledIds() {
  return [1, 2];
}

export function isIdDisabled(id?: number): boolean {
  const disabledIds = getDisabledIds();
  return id != null && disabledIds.includes(id);
}