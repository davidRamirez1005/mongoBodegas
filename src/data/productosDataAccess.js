export const campo_total = [
    {
      $group: {
        _id: "$id_producto",
        Total: { $sum: "$cantidad" }
      }
    },
    {
      $lookup: {
        from: "productos",
        localField: "_id",
        foreignField: "id",
        as: "producto_relacionado"
      }
    },
    {
      $unwind: "$producto_relacionado"
    },
    {
      $project: {
        _id: 0,
        "producto_relacionado._id": 0,
        created_at: 0,
        created_by: 0,
        updated_at: 0
      }
    },
    {
      $sort: { Total: -1 }
    }
]