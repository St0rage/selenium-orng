export type CreateReport = {
  project: string;
  scenario: string;
  test_case: string;
  tool: string;
  activity: string;
  author: string;
};

export enum Status {
  Done = "1",
  Passed = "2",
  Failed = "3",
}
