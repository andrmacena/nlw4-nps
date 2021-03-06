import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { SurveyRepository } from "../repositories/SurveyRepository"
import { SurveyUserRepository } from "../repositories/SurveyUserRespository"
import { UserRepository } from "../repositories/UserRepository"
import SendMailService from "../services/SendMailService"
import { resolve } from 'path'
import { AppError } from "../erros/AppError"


class SendMailController {
   async send(request: Request, response: Response) {
      const { email, survey_id } = request.body

      const usersRepository = getCustomRepository(UserRepository)
      const surveyRepository = getCustomRepository(SurveyRepository)
      const surveyUserRepository = getCustomRepository(SurveyUserRepository)

      const user = await usersRepository.verificaEmailJaExiste(email, usersRepository)

      if (!user) {
         throw new AppError('Usuário não existe')
      }

      const survey = await surveyRepository.buscaUma(survey_id)

      if (!survey) {
         throw new AppError('Pesquisa não existente')
      }

      
      const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')
      
      const surveyUserAlreadyExists = await surveyUserRepository.findOne({
         where: { user_id: user.id, value: null },
         relations: ["user", "survey"]
      })
      
      const variables = {
         name: user.name,
         title: survey.title,
         description: survey.description,
         id: '',
         link: process.env.URL_MAIL
      }
      if (surveyUserAlreadyExists) {
         variables.id = surveyUserAlreadyExists.id
         await SendMailService.send(email, survey.title, variables, npsPath)
         return response.json(surveyUserAlreadyExists)
      }

      const surveyUser = surveyUserRepository.create({
         user_id: user.id,
         survey_id
      })

      await surveyUserRepository.save(surveyUser)

      variables.id = surveyUser.id

      await SendMailService.send(email, survey.title, variables, npsPath)

      return response.json(surveyUser)



   }
}

export { SendMailController }
