export type MakeCompulsory<O extends object, K extends keyof O> = O & {
  [P in K]-?: NonNullable<O[P]>;
};
