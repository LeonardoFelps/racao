import prismaClient from "../../prisma";

interface ItemRequest{
    amount: number;
    order_id: string;
    product_id: string;
}

class AddItemService{
    async execeute({amount, order_id, product_id}: ItemRequest){

        const order = await prismaClient.item.create({
            data:{
                amount: amount,
                order_id: order_id,
                product_id: product_id
            }
        })

        return order;
    }
}

export { AddItemService }