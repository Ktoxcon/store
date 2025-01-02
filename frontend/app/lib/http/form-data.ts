export function fromFormDataToObject(formData: FormData) {
  return Object.fromEntries(formData) as Record<string, string>;
}
