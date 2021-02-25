import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

class UserController {

   async create(request: Request, response: Response) {
      const { name, email } = request.body

      const userRepository = getCustomRepository(UserRepository)

      const user = await userRepository.criar(name, email)

      if (user) {
         return response.status(201).json(user)
      } else {
         return response.status(400).json({
            error: "Usuário já existente"
         })
      }

   }
}

export { UserController }
