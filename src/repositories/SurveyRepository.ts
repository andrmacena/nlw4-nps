import { EntityRepository, getRepository, Repository } from "typeorm"
import { Survey } from "../models/Survey"

@EntityRepository(Survey)
class SurveyRepository extends Repository<Survey> {
   public async criar(title: string, description: string) {

      const surveyRepository = getRepository(Survey)

      const survey = surveyRepository.create({ title, description })

      await surveyRepository.save(survey)

      return survey

   }

   public async listarTodos() {

      const surveyRepository = getRepository(Survey)

      const all = surveyRepository.find()

      return all

   }

   public async buscaUma(id: string) {
      const surveyRepository = getRepository(Survey)

      const surveyExists = surveyRepository.findOne({ id })

      return surveyExists

   }

}

export { SurveyRepository }
