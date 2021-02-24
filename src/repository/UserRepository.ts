import { getRepository } from "typeorm"
import { User } from "../models/User"

class UserRepository {
   public async create(name: String, email: String) {
      const usersRepository = getRepository(User)

      const result = await this.verifyEmail(email)

      if (!result) {
         const user = usersRepository.create({ name, email })

         await usersRepository.save(user)

         return user
      } else {
         return false
      }

   }

   private async verifyEmail(email: String) {
      const usersRepository = getRepository(User)

      const alreadyExists = await usersRepository.findOne({ email })

      if (alreadyExists) {
         return true
      } else {
         return false
      }


   }

}

export { UserRepository }
