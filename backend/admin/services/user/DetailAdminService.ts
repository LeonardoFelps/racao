import prismaClient from "../../../src/prisma";

class DetailAdminService{
    async execute(user_id: string){

        const user = await prismaClient.admin.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return user;

    }

}

export { DetailAdminService }