import constants from "lib-constants-system";
import MicroService from "../../models/MicroServices.js";
import HttpError from "lib-utils-webserver/HttpError.js";

const { microserviceNames } = constants;
const microserviceNameKeys = new Set(microserviceNames.map((ms) => ms.key));

export const createMicroService = async (req, res, next) => {
  const msData = req.body || {};

  try {
    // Step 1. check microservice name and microservice url are present
    if (!msData.serviceName || !msData.serviceUrl) {
      throw new HttpError(
        400,
        "Invalid request: serviceName and serviceUrl are required."
      );
    }
    // Step 2: check microservice name is valid
    if (!microserviceNameKeys.has(msData.serviceName)) {
      throw new HttpError(
        400,
        `Invalid microservice name: ${msData.serviceName}.`
      );
    }
    // Step 3: Check microservice doesn't exist
    const existingMicroService = await MicroService.findOne({
      serviceName: msData.serviceName,
    });
    if (existingMicroService) {
      throw new HttpError(
        400,
        `Microservice ${msData.serviceName} already exists.`
      );
    }

    // Step 4: save the new microservice
    const newMicroService = new MicroService(msData);
    const savedMicroService = await newMicroService.save();
    res.status(201).json({
      data: savedMicroService,
      message: "Microservice created successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMicroServices = async (req, res, next) => {
  try {
    const microServices = await MicroService.find();
    res.status(200).json({
      data: microServices,
      message: "Microservices fetched successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMicroService = async (req, res, next) => {
  const update = req.body;
  try {
    // Step 1: check microservice name is valid
    if (!microserviceNameKeys.has(msData.serviceName)) {
      throw new HttpError(
        400,
        `Invalid microservice name: ${msData.serviceName}.`
      );
    }

    // Step 2: Update the microservice
    const microService = await MicroService.findByIdAndUpdate(
      req.params.id,
      update,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!microService) {
      return next(new HttpError("Microservice not found", 404));
    }
    res.status(200).json({
      data: microService,
      message: "Microservice updated successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMicroService = async (req, res, next) => {
  try {
    const microService = await MicroService.findByIdAndDelete(req.params.id);
    if (!microService) {
      return next(new HttpError("Microservice not found", 404));
    }
    res.status(200).json({
      data: microService,
      message: "Microservice deleted successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
