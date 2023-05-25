import { Request, Response } from "express";
import { DetailAdminService } from "../../../services/user/DetailAdminService";

class DetailAdminController{
    async handle(req: Request, res: Response){

        const user_id = req.user_id;

        const detailAdminService = new DetailAdminService();

        const user = await detailAdminService.execute(user_id);

        return res.json(user);
    }
}

export { DetailAdminController }