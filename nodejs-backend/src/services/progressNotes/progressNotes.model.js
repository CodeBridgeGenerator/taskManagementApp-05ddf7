
    module.exports = function (app) {
        const modelName = "progress_notes";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            task: { type: Schema.Types.ObjectId, ref: "tasks", comment: "Task, dropdown, false, true, true, true, true, true, true, tasks, tasks, one-to-one, title," },
note: { type:  String , maxLength: 150, index: true, trim: true, comment: "Note, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };