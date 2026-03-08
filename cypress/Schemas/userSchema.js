export const userSchema = {
  type: "object",
  required: ["name", "job"],
  properties: {
    name: { type: "string" },
    job: { type: "string" }
  }
}
