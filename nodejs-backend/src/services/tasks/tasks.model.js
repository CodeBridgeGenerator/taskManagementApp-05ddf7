
    module.exports = function (app) {
        const modelName = "tasks";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            title: { type:  String , required: true, maxLength: 150, index: true, trim: true, comment: "Title, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , maxLength: 150, index: true, trim: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
priority: { type: Number, max: 10000000, comment: "Priority, p_number, false, true, true, true, true, true, true, , , , ," },
dueDate: { type: Date, required: true, comment: "Due Date, p_date, false, true, true, true, true, true, true, , , , ," },
status: { type: Boolean, required: false, comment: "Status, p_boolean, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };