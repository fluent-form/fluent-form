declare global {
  const ngDevMode: boolean;
}

// This file is removed during the build, but we have to `export default {}`
// to tell the compiler to treat this file as a module (to allow module augmentation).
export default {};
