import GrpcError, { sendError } from "lib-error/GrpcError";
import errorStatus from "lib-error/errorStatus";

export default class SimpleMongoGrpcServiceBuilder {
  constructor(options) {
    this.model = options.model;
    this.entityName = options.entityName;
  }

  createGetAll(options = {}) {
    const expandOn = options.expandOn || [];
    return async (call, callback) => {
      try {
        const entities = await this.getPromiseWithExpand(
          this.model.find(),
          expandOn
        );
        const data = entities.map((entity) =>
          entity.toObject({ virtuals: true })
        );
        callback(null, {
          success: true,
          message: `${this.entityName}(s/es) fetched successfully`,
          data,
        });
      } catch (err) {
        this.sendInternalServerError(callback, err);
      }
    };
  }

  createGet(options = {}) {
    const expandOn = options.expandOn || [];
    return async (call, callback) => {
      try {
        const entity = await this.getPromiseWithExpand(
          this.model.findById(call.request.id),
          expandOn
        );
        if (!entity) {
          this.sendEntityNotFound(callback);
        } else {
          const savedObject = entity.toObject({ virtuals: true });
          callback(null, {
            success: true,
            message: `${this.entityName} found`,
            data: savedObject,
          });
        }
      } catch (err) {
        this.sendInternalServerError(callback, err);
      }
    };
  }

  createAdd() {
    return async (call, callback) => {
      try {
        const entity = await this.model.create(call.request);
        const savedEntity = await entity.save();
        const savedObject = savedEntity.toObject({ virtuals: true });
        callback(null, {
          success: true,
          message: `${this.entityName} created successfully`,
          data: savedObject,
        });
      } catch (err) {
        this.sendInternalServerError(callback, err);
      }
    };
  }

  createPatch() {
    return async (call, callback) => {
      try {
        const entity = await this.model.findByIdAndUpdate(
          call.request.id,
          call.request.data,
          {
            new: true,
          }
        );
        if (!entity) {
          this.sendEntityNotFound(callback);
        } else {
          const updatedObject = entity.toObject({ virtuals: true });
          callback(null, {
            success: true,
            message: `${this.entityName} updated successfully`,
            data: updatedObject,
          });
        }
      } catch (err) {
        this.sendInternalServerError(callback, err);
      }
    };
  }

  createDelete() {
    return async (call, callback) => {
      try {
        const entity = await this.model.findByIdAndDelete(call.request.id);
        if (!entity) {
          this.sendEntityNotFound(callback);
        } else {
          const deletedObject = entity.toObject({ virtuals: true });
          callback(null, {
            success: true,
            message: `${this.entityName} deleted successfully`,
            data: deletedObject,
          });
        }
      } catch (err) {
        this.sendInternalServerError(callback, err);
      }
    };
  }

  sendEntityNotFound(callback) {
    sendError(
      callback,
      new GrpcError(errorStatus.NOT_FOUND, `${this.entityName} not found`)
    );
  }

  sendInternalServerError(callback, err) {
    sendError(
      callback,
      new GrpcError(err.message, errorStatus.INTERNAL_SERVER_ERROR)
    );
  }

  getPromiseWithExpand(origPromise, expandOn) {
    let promise = origPromise;
    for (let field of expandOn) {
      promise = promise.populate(field);
    }
    return promise;
  }
}
