import mongoose, { Schema } from 'mongoose'

const admintaskSchema = new Schema({}, { timestamps: true })

admintaskSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Admintask', admintaskSchema)

export const schema = model.schema
export default model
