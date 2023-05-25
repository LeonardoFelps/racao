import { Request, Response } from "express";
import { CreateAdminService } from "../../../services/user/CreateAdminService";

class CreateAdminController{
    async handle(req: Request, res: Response){
        const { name, email, password} = req.body;

        const createAdminService = new CreateAdminService;

        const user = await createAdminService.execute({
            name,
            email,
            password
        });

        return res.json(user)
    }
        
}

export { CreateAdminController }