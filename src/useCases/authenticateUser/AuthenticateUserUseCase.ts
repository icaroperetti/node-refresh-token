import { client } from '../../prisma/client'

interface IRequest {
  username: string
  password: string
}
class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    const userExist = await client.user.findFirst({
      where: {
        username,
      },
    })

    if (!userExist) {
      throw new Error('User not found')
    }
  }
}
