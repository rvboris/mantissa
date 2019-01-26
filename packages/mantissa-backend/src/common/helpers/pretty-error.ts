import pretty from 'pretty-exceptions/lib';

export const formatError = (e: Error) => {
  const options = {
    color: true,
    cwd: process.cwd(),
    native: true,
    source: true
  }

  return pretty(e, options);
}
