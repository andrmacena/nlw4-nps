import { EntityRepository, getRepository, Repository } from "typeorm"
import { User } from "../models/User"

@EntityRepository(User)
class UserRepository extends Repository<User> {
   public async criar(name: string, email: string) {
      const usersRepository = getRepository(User)

      const result = await this.verificaEmailJaExiste(email, usersRepository)

      if (!result) {
         const user = usersRepository.create({ name, email })

         await usersRepository.save(user)

         return user
      }
   }

   public async verificaEmailJaExiste(email: string, repository: Repository<User>) {
      const alreadyExists = await repository.findOne({ email })

      return alreadyExists
   }

}

export { UserRepository }
