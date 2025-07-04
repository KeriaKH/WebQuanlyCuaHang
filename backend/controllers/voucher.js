const Voucher=require("../models/voucher");

const getVoucher=async(req,res)=>{
    const {id}=req.params;
    try{
        const voucher=await Voucher.find({ usedBy: { $ne: id } })
        return res.status(200).json({voucher})
    } catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
}

module.exports={getVoucher};