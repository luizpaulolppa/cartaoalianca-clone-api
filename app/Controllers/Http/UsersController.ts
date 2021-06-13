import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class PostController {
  public async show({ params, response }: HttpContextContract) {
    let user = await User.find(params.id)

    if (!user) {
      return response.status(401).json({ error: 'User not found' })
    }

    user.password = undefined
    return user
  }

  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'email', 'cpf', 'phone', 'password'])

    if (!data.name) {
      return response.status(401).json({ error: 'Name is required' })
    }

    if (!data.email) {
      return response.status(401).json({ error: 'E-mail is required' })
    }

    if (!data.password) {
      return response.status(401).json({ error: 'Password is required' })
    }

    let user = await User.findBy('email', `${data.email}`.trim())

    if (user) {
      return response.status(401).json({ error: 'E-mail alread exist' })
    }

    const hashedPassword = await Hash.make(data.password)

    user = await User.create({ ...data, password: hashedPassword })

    return response.status(301).json(user)
  }
}

// if (await Hash.verify(hashedValue, plainTextValue)) {
//   // verified
// }
