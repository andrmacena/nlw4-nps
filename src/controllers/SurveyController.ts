import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { SurveyRepository } from "../repositories/SurveyRepository"


class SurveyController {
   async create(request: Request, response: Response) {
      const { title, description } = request.body

      const surveyRepository = getCustomRepository(SurveyRepository)

      const survey = await surveyRepository.criar(title, description)

      if (survey) {
         return response.status(201).json(survey)
      } else {
         return response.status(400).json({ error: "Não foi possível criar uma pesquisa" })
      }

   }

   async getAll(request: Request, response: Response) {

      const surveyRepository = getCustomRepository(SurveyRepository)

      const all = await surveyRepository.listarTodos()

      if (all) {
         return response.status(200).json(all)
      } else {
         return response.status(400).json({ error: "Erro ao pesquisar" })
      }

   }
}

export { SurveyController }
