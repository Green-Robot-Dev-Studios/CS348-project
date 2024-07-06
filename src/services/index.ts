import { closeFood } from './close-food/close-food'
import { votes } from './votes/votes'
import { connections } from './connections/connections'
import { rooms } from './rooms/rooms'
import { food } from './food/food'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(closeFood)
  app.configure(votes)
  app.configure(connections)
  app.configure(rooms)
  app.configure(food)
  app.configure(user)
  // All services will be registered here
}
