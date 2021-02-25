import { EntityRepository, getRepository, Repository } from "typeorm"
import { Survey } from "../models/Survey"

@EntityRepository(Survey)
class SurveyRepository extends Repository<Survey> {
   public async criar(title: String, description: String) {

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

}

export { SurveyRepository }
