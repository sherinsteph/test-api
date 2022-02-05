import { capitalize, first } from 'lodash'
import { ObjectSchema } from 'joi'

export default class Validation {
  protected schema: ObjectSchema
  protected data: any

  constructor (schema: ObjectSchema, data: any) {
    this.schema = schema
    this.data = data
  }

  validate () {
    const { value, error: validationError } = this.schema.validate(this.data)
    const errorDetails = validationError ? first(validationError.details) : undefined
    const errorMessage = errorDetails
      ? capitalize(
        errorDetails.message
          .split('"').join('')
          .split(/(?=[A-Z])/).join(' ')
          .split('[ref:').join('')
          .split(']').join('')
      )
      : undefined
    const error = errorMessage ? { message: errorMessage } : undefined
    return { value, error }
  }
}
