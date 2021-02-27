import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import * as yup from 'yup'
import { AppError } from '../erros/AppError'

class UserController {

   async create(request: Request, response: Response) {
      const { name, email } = request.body

      const schema = yup.object().shape({
         name: yup.string().required('Nome é obrigatório'),
         email: yup.string().email().required('Email inválido')
      })

      try {
         await schema.validate(request.body, { abortEarly: false })

      } catch (error) {
         throw new AppError(error)
      }

      const userRepository = getCustomRepository(UserRepository)

      const user = await userRepository.criar(name, email)

      if (user) {
         return response.status(201).json(user)
      } else {
         throw new AppError('Usuário já existente')
      }

   }
}

export { UserController }
