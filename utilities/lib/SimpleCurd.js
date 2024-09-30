export class SimpleCurd {
  constructor(app, options) {
    this.app = app;
    this.options = options;
    this.options.entityName = this.modifyEntityName(this.options.entityName);
  }

  modifyEntityName(entityName) {
    const chars = entityName.split("");
    chars[0] = chars[0].toUpperCase();
    if (chars[chars.length - 1] === "s") {
      chars.pop();
    }
    return chars.join("");
  }

  createGetAll() {
    const { apiPath, model, entityName } = this.options;
    const endPoint = `${apiPath}/getAll${entityName}s`;
    this.app.get(endPoint, async (req, res, next) => {
      try {
        const entities = await model.find();
        res.status(200).json({ entities });
      } catch (err) {
        next(err);
      }
    });
    console.log(`Endpoint [GET (all) ${entityName}s] created at ${endPoint}`);
  }

  createGet() {
    const { apiPath, model, entityName } = this.options;
    const endPoint = `${apiPath}/get${entityName}/:id`;
    this.app.get(endPoint, async (req, res, next) => {
      try {
        const entity = await model.findById(req.params.id);
        if (!entity) {
          const message = `${entityName} not found`;
          res.status(404);
          throw new Error(message);
        }
        res.status(200).json({ entity });
      } catch (err) {
        next(err);
      }
    });
    console.log(`Endpoint [GET ${entityName}] created at ${endPoint}`);
  }

  createAdd() {
    const { apiPath, model, entityName, createValidation } = this.options;
    const endPoint = `${apiPath}/add${entityName}`;
    this.app.post(endPoint, async (req, res, next) => {
      const obj = createValidation
        ? await createValidation(req.body)
        : req.body;
      const entity = await model.create(obj);
      try {
        await entity.save();
        const message = `${entityName} created successfully`;
        res.status(201).json({ entity, message });
      } catch (err) {
        next(err);
      }
    });
    console.log(`Endpoint [POST ${entityName}] created at ${endPoint}`);
  }

  createUpdate() {
    const { apiPath, model, entityName, updateValidation } = this.options;
    const endPoint = `${apiPath}/update${entityName}/:id`;
    this.app.patch(endPoint, async (req, res, next) => {
      try {
        const obj = updateValidation
          ? await updateValidation(req.body)
          : req.body;
        const entity = await model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!entity) {
          const message = `${entityName} not found`;
          res.status(404);
          throw new Error(message);
        }
        const message = `${entityName} updated successfully`;
        res.status(200).json({ entity, message });
      } catch (err) {
        next(err);
      }
    });
    console.log(`Endpoint [PUT ${entityName}] created at ${endPoint}`);
  }

  createDelete() {
    const { apiPath, model, entityName } = this.options;
    const endPoint = `${apiPath}/delete${entityName}/:id`;
    this.app.delete(endPoint, async (req, res, next) => {
      try {
        const entity = await model.findByIdAndDelete(req.params.id);
        if (!entity) {
          const message = `${entityName} not found`;
          res.status(404);
          throw new Error(message);
        }
        const message = `${entityName} deleted successfully`;
        res.status(200).json({ entity, message });
      } catch (err) {
        next(err);
      }
    });
    console.log(`Endpoint [DELETE ${entityName}] created at ${endPoint}`);
  }
}
