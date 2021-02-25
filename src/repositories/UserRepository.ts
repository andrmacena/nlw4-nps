import { EntityRepository, getRepository, Repository } from "typeorm"
import { User } from "../models/User"

@EntityRepository(User)
class UserRepository extends Repository<User> {
   public async criar(name: String, email: String) {
      const usersRepository = getRepository(User)

      const result = await this.verificaEmailJaExiste(email, usersRepository)

      if (!result) {
         const user = usersRepository.create({ name, email })

         await usersRepository.save(user)

         return user
      }
   }

   private async verificaEmailJaExiste(email: String, repository: Repository<User>) {
      const alreadyExists = await repository.findOne({ email })

      if (alreadyExists) {
         return true
      } else {
         return false
      }
   }

}

export { UserRepository }
