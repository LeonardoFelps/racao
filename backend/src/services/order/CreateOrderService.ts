import prismaClient from "../../prisma";

interface OrderRequest{
    purchase_order: string;
    name: string;
}

class CreateOrderService{
    async execute({ purchase_order, name }: OrderRequest){

        const order = await prismaClient.order.create({
            data:{
                purchase_order: purchase_order,
                name: name
            }
        })

        return order;
    }
}

export { CreateOrderService }