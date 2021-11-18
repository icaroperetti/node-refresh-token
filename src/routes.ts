import { Router } from 'express'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from './useCases/createUser/CreateUserController'
import { RefreshTokenController } from './useCases/refreshTokenUser/RefreshTokenController'

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

router.post('/users', createUserController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/refresh', refreshTokenController.handle)

router.get('/courses', ensureAuthenticated, (request, response) => {
  return response.json([
    { id: 1, name: 'NodeJs' },
    { id: 2, name: 'ReactJs' },
    { id: 3, name: 'Elixir' },
    { id: 4, name: 'React Native' },
  ])
})

export { router }
