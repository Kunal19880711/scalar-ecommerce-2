import grpc from "@grpc/grpc-js";

export default class SimpleCurdServiceBuilder {
  constructor(options) {
    this.model = options.model;
    this.entityName = options.entityName;
  }

  createGetAll() {
    return async (call, callback) => {
      try {
        const entities = await this.model.find();
        const data = entities.map((entity) => entity.toObject({virtuals: true}));
        callback(null, {data});
      } catch (err) {
        callback({
          status: grpc.status.INTERNAL,
          message: err.message,
        });
      }
    };
  }

  createGet() {
    return async (call, callback) => {
      try {
        const entity = await this.model.findById(call.request.id);
        if (!entity) {
          callback({
            status: grpc.status.NOT_FOUND,
            message: `${entityName} not found`,
          });
        } else {
          callback(null, entity.toObject({virtuals: true}));
        }
      } catch (err) {
        callback({
          status: grpc.status.INTERNAL,
          message: err.message,
        });
      }
    };
  }

  createAdd() {
    return async (call, callback) => {
      try {
        const entity = await this.model.create(call.request);
        const savedEntity = await entity.save();
        const savedObject = savedEntity.toObject({virtuals: true});
        callback(null, savedObject);
      } catch (err) {
        callback({
          status: grpc.status.INTERNAL,
          message: err.message,
        });
      }
    };
  }

  createUpdate() {
    return async (call, callback) => {
      try {
        const entity = await this.model.findByIdAndUpdate(
          call.request.id,
          call.request,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!entity) {
          callback({
            status: grpc.status.NOT_FOUND,
            message: `${entityName} not found`,
          });
        } else {
          const updatedObject = entity.toObject({virtuals: true});
          callback(null, updatedObject);
        }
      } catch (err) {
        callback({
          status: grpc.status.INTERNAL,
          message: err.message,
        });
      }
    };
  }

  createDelete() {
    return async (call, callback) => {
      try {
        const entity = await this.model.findByIdAndDelete(call.request.id);
        if (!entity) {
          callback({
            status: grpc.status.NOT_FOUND,
            message: `${entityName} not found`,
          });
        } else {
          const deletedObject = entity.toObject({virtuals: true});
          callback(null, deletedObject);
        }
      } catch (err) {
        callback({
          status: grpc.status.INTERNAL,
          message: err.message,
        });
      }
    };
  }
}
