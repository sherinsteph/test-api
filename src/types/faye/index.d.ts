declare module 'faye' {
import { Server } from '@types/node/http.d.ts'

  interface Config {
    mount: string
  }

  export class NodeAdapter {
    constructor (config: Config) {
      return this.attach()
    }

    attach (server: Server): void {}
  }
}
