1. gcloud auth activate-service-account --key-file=./scalar-e-commerce-c36cac9d1912-cloud-run-deployer.json
2. gcloud auth configure-docker --quiet
3. gcloud config set project scalar-e-commerce --quiet
4. apt install docker.io -y
5. docker run --privileged --name my-dind-container -d -v ${PWD}:/workspace docker:dind
6. docker run --privileged --name my-dind-container -d -v ${PWD}:/workspace deployer

## Build dockerfile

1. wget https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-linux-x86_64.tar.gz
2. tar -xf google-cloud-cli-linux-x86_64.tar.gz
3. apk add --no-cache python3 py3-pip
4. ./google-cloud-sdk/install.sh -q

## Running the docker
docker run --privileged --name my-dind-container -d -v ${PWD}:/workspace deployer

## GCloud service to be emabled

1. Google cloud
2. Cloud Run API
3. Cloud Resource Manager API
4. gcloud projects add-iam-policy-binding scalar-e-commerce --member=serviceAccount:cloud-run-deployer@scalar-e-commerce.iam.gserviceaccount.com --role=roles/artifactregistry.writer
