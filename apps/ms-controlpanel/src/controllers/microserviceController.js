import constants from "lib-constants-system";
import Microservice from "models/Microservices";
import HttpError from "lib-utils-webserver/HttpError";

const { microserviceNames } = constants;
const microserviceNameKeys = new Set(microserviceNames.map((ms) => ms.key));

export const createMicroservice = async (req, res, next) => {
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
    const existingMicroservice = await Microservice.findOne({
      serviceName: msData.serviceName,
    });
    if (existingMicroservice) {
      throw new HttpError(
        400,
        `Microservice ${msData.serviceName} already exists.`
      );
    }

    // Step 4: save the new microservice
    const newMicroservice = new Microservice(msData);
    const savedMicroservice = await newMicroservice.save();
    res.status(201).json({
      data: savedMicroservice,
      message: "Microservice created successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMicroservices = async (req, res, next) => {
  try {
    const microservices = await Microservice.find();
    res.status(200).json({
      data: microservices,
      message: "Microservices fetched successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMicroservice = async (req, res, next) => {
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
    const microservice = await Microservice.findByIdAndUpdate(
      req.params.id,
      update,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!microservice) {
      return next(new HttpError("Microservice not found", 404));
    }
    res.status(200).json({
      data: microservice,
      message: "Microservice updated successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMicroservice = async (req, res, next) => {
  try {
    const microservice = await Microservice.findByIdAndDelete(req.params.id);
    if (!microservice) {
      return next(new HttpError("Microservice not found", 404));
    }
    res.status(200).json({
      data: microservice,
      message: "Microservice deleted successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
