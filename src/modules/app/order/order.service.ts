import { Order } from "@prisma/client";
import db from "../../../db";

export const CreateOrderDB = async (
  id: string,
  orderedBooks: { bookId: string; quantity: number }[]
) => {
  try {
    let order;
    await db.$transaction(async (asyncDB) => {
      const existOrder = await asyncDB.order.create({ data: { userId: id } });

      if (!existOrder) {
        throw new Error("Invalid User");
      } else {
        order = existOrder;
        for (let i = 0; i < orderedBooks.length; i++) {
          const element = orderedBooks[i];
          const makeOrderList = await asyncDB.orderedBook.create({
            data: {
              quantity: element.quantity,
              bookId: element.bookId,
              orderId: existOrder.id,
            },
          });
          if (!makeOrderList) {
            throw new Error(element.bookId + " book Create failed ");
          }
        }
      }
    });
    let succeed = await db.order.findUnique({
      where: { id: order!.id },
      include:{orderedBookId:{select:{quantity:true,bookId:true}}}, 
    });
    return succeed;
  } catch (error) {
    throw error;
  }
};
// export const GetOrderDB = async (id: string) => {
//   const result = await db.order.findUnique({
//     where: { id },
//     include: { orderedBook: true },
//   });
//   return result;
// };
// export const GetAOrderDB = async (id: string) => {
//   const result = await db.order.findUnique({
//     where: { id },
//     // include: { books:true },
//   });
//   return result;
// };
// export const UpdateOrderDB = async (id: string, data: Partial<Order>) => {
//   const result = await db.order.update({
//     where: { id },
//     data,
//   });
//   return result;
// };
// export const DeleteOrderDB = async (id: string) => {
//   const result = await db.order.delete({ where: { id } });
//   return result;
// };
