import pretty from 'pretty-exceptions/lib';

export const formatError = (e: {} | null | undefined) => {
  const options = {
    color: true,
    cwd: process.cwd(),
    native: true,
    source: true
  }

  return pretty(e, options);
}
