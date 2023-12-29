function encodeErrors(errors?: string | string[]) {
  return typeof errors === 'undefined'
    ? undefined
    : typeof errors === 'string'
    ? errors
    : errors.join(',');
}

function decodeErrors(errors: string | string[]) {
  return typeof errors === 'string'
    ? errors.split(',')
    : errors.flatMap((e) => e.split(','));
}

export const errorsUtils = {
  encodeErrors,
  decodeErrors,
};
