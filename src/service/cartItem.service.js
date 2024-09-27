const CartItem =require('../model/cartItem.model.js')
const { findUserById } = require('./user.service.js')

const findCartItemById = async (id)=>{
   const cartItem=  await CartItem.findById(id)

    return cartItem
}

const update_cartItem= async (userId,reqData)=>{
    const cartItem = await findCartItemById(reqData._id)

    const user = await findUserById(cartItem.userId)

    if(user._id.toString()===userId.toString()){
        cartItem.quantity=reqData.quantity
    }
    return await cartItem.save()
}

const remove_cartItem = async(userId,reqData)=>{
    const cartItem = await findCartItemById(reqData._id)

    const user = await findUserById(cartItem.userId)

    if(user._id.toString()===userId.toString()){
        await CartItem.findByIdAndDelete(cartItem._id)
    }
}

module.exports={update_cartItem,remove_cartItem}