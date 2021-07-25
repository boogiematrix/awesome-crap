const { Schema, model } = require('mongoose');

const saleSchema = new Schema(
    {
        location: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            required: false
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

const Sale = model('Sale', saleSchema);

module.exports = Sale;