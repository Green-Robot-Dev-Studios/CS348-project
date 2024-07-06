// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationBaseStrategy, AuthenticationResult, AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { oauth, OAuthStrategy } from '@feathersjs/authentication-oauth'

import type { Application } from './declarations'
import { Params } from '@feathersjs/feathers'
import { LocalStrategy } from '@feathersjs/authentication-local'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('github', new GithubStrategy())

  app.use('authentication', authentication)
  app.configure(oauth())
}

class GithubStrategy extends OAuthStrategy {
  async getEntityData(profile: any) {
    const baseData = await super.getEntityData(profile, null, {})
    const {email, avatar_url: avatar, name} = profile

    return { ...baseData, email, avatar, name}
  }
}
