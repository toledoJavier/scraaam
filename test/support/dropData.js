import mongoose from 'mongoose'

export function dropData() {
  afterEach(() => {
    mongoose.connect("mongodb://localhost/projects", () => mongoose.connection.db.dropDatabase())
  });
}