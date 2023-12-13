const { mongoConfig } = require("../config");
const MongoDB = require("../services/mongodb");

const getAllNhaHang = async () => {
    try {
        let nhahang = await MongoDB.db
            .collection(mongoConfig.collections.RESTAURANT).find().toArray();

        if (nhahang && nhahang?.length > 0) {
            return {
                status: true,
                message:'Tìm thấy tất cả nhà hàng thành công',
                data: nhahang
            }
        } else {
            return {
                status: false,
                message: 'Không tìm thấy nhà hàng nào cả'
            }
        }
    } catch (error) {
        return {
            status: false,
            message: 'Lỗi khi tìm kiếm nhà hàng',
            error: `Lỗi khi tìm kiếm nhà hàng: ${error?.message}`
        }
    }
}

const getNhaHangTheo1Id =  async (IdNhaHang) => {
    try {
        let nhahang = await MongoDB.db
            .collection(mongoConfig.collections.RESTAURANT)
            .aggregate([
                {
                    $match: {
                        id: IdNhaHang,
                    }
                }, {
                    $lookup: {
                        from: 'foods', 
                        localField: 'id', 
                        foreignField: 'restaurantId', 
                        as: 'foods'
                    }
                }
            ])
            .toArray();

        if (nhahang && nhahang?.length > 0) {
            return {
                status: true,
                message:'Tìm thấy tất cả nhà hàng thành công',
                data: nhahang[0]
            }
        } else {
            return {
                status: false,
                message: 'Không tìm thấy nhà hàng nào cả'
            }
        }
    } catch (error) {
        return {
            status: false,
            message: 'Lỗi khi tìm kiếm nhà hàng',
            error: `Lỗi khi tìm kiếm nhà hàng: ${error?.message}`
        }
    }
}

module.exports = {getAllNhaHang, getNhaHangTheo1Id}
