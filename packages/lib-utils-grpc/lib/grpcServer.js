import grpc from "@grpc/grpc-js";

export function createGrpcServer(services) {
  const server = new grpc.Server();
  for (let { service, impl } of services) {
    server.addService(service, impl);
  }
  server.bindAsync(
    "0.0.0.0:8080",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("Server started on port 8080");
    }
  );
  return server;
}
