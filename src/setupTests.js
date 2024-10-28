import '@testing-library/jest-dom';

// only the above import statement is needed for jest-dom to work
// the ResizeObserver code is needed for the editForm suhuai test

global.ResizeObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };