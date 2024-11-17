const isDevelopment = import.meta.env.DEV; // true면 개발환경, false면 프로덕션

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args);
    }
  },

  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};

// import { logger } from '../../utils/logger';
// console.log() -> logger.log()
