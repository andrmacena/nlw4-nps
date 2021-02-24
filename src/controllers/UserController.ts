import { Request, Response } from 'express'
import { UserRepository } from '../repository/UserRepository'

class UserController {

   async create(request: Request, response: Response) {
      const { name, email } = request.body

      const userRepository = new UserRepository()

      const user = await userRepository.create(name, email)

      if (user) {
         return response.json(user)
      } else {
         return response.status(400).json({
            error: "User already exists"
         })
      }

   }
}

export { UserController }
