import md5 from 'md5'

export default class Hash {
  protected plainText: string

  constructor (plainText: string) {
    this.plainText = plainText
  }

  hash (): string {
    return md5(this.plainText)
  }

  verify (hash: string): boolean {
    return this.hash() === hash
  }
}
