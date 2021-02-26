import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { SurveyRepository } from "../repositories/SurveyRepository"
import { SurveyUserRepository } from "../repositories/SurveyUserRespository"
import { UserRepository } from "../repositories/UserRepository"
import SendMailService from "../services/SendMailService"
import { resolve } from 'path'


class SendMailController {
   async send(request: Request, response: Response) {
      const { email, survey_id } = request.body

      const usersRepository = getCustomRepository(UserRepository)
      const surveyRepository = getCustomRepository(SurveyRepository)
      const surveyUserRepository = getCustomRepository(SurveyUserRepository)



      const user = await usersRepository.verificaEmailJaExiste(email, usersRepository)

      if (!user) {
         return response.status(400).json({ error: "Usuário não existe" })
      }

      const survey = await surveyRepository.buscaUma(survey_id)

      if (!survey) {
         return response.status(400).json({ error: "Pesquisa não existente" })
      }

      const variables = {
         name: user.name,
         title: survey.title,
         description: survey.description,
         user_id: user.id,
         link: process.env.URL_MAIL
      }

      const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

      const surveyUserAlreadyExists = await surveyUserRepository.findOne({
         where: [{ user_id: user.id }, { value: null }],
         relations: ["user", "survey"]
      })

      if (surveyUserAlreadyExists) {
         await SendMailService.send(email, survey.title, variables, npsPath)
         return response.json(surveyUserAlreadyExists)
      }

      const surveyUser = surveyUserRepository.create({
         user_id: user.id,
         survey_id
      })

      await surveyUserRepository.save(surveyUser)

      await SendMailService.send(email, survey.title, variables, npsPath)

      return response.json(surveyUser)



   }
}

export { SendMailController }
