import { client } from '../../prisma/client'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider'

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
      throw new Error('User or password incorrect')
    }

    console.log(userExist)

    const passwordMatch = compare(password, userExist.password)

    if (!passwordMatch) {
      throw new Error('User or password incorrect')
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(userExist.id)

    const generateRefreshToken = new GenerateRefreshToken()
    console.log(userExist.id)
    const refreshToken = await generateRefreshToken.execute(userExist.id)

    return { token, refreshToken }
  }
}

export { AuthenticateUserUseCase }
