const { Schema, model } = require('mongoose');

const saleSchema = new Schema(
    {
        location: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
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
        }
    }
);

const Sale = model('Sale', saleSchema);

module.exports = Sale;