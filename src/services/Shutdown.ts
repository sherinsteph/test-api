import database from '../database'

export default class Shutdown {
  initGracefull () {
    process.on('SIGINT', async () => {
      try {
        await database.close()
        process.exit(0)
      } catch (error) {
        process.exit(1)
      }
    })
  }
}
