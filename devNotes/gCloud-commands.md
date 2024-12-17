# GCloud commands

1. Login using your account

```zsh
    gcloud auth login
```

2. Set the project

```zsh
    gcloud config set project scalar-e-commerce
```

3. Create a bucket. Bucker name will be `scalar-e-commerce-bucket`

```zsh
    gcloud storage buckets create gs://scalar-e-commerce-bucket
```

4. Create a service account

```zsh
    gcloud iam service-accounts create cloud-run-deployer
```

5. Create secret for config yaml

```zsh
    gcloud secrets create CONFIG_YAML --data-file=config.yaml
```

6. Grant your Cloud Run service's service account access to the secret

```zsh
    gcloud secrets add-iam-policy-binding CONFIG_YAML --member=serviceAccount:cloud-run-deployer@scalar-e-commerce.iam.gserviceaccount.com --role=roles/secretmanager.secretAccessor
    gcloud secrets add-iam-policy-binding CONFIG_YAML --member=serviceAccount:676869938642-compute@developer.gserviceaccount.com --role=roles/secretmanager.secretAccessor
```

7. Set default region

```zsh
    gcloud config set run/region us-central1
```

7. Mount the secret as an environment variable in your Cloud Run service.

```zsh
    gcloud run services update sec2-ms-controlpanel --update-secrets CONFIG_YAML=CONFIG_YAML:latest
```

8. Giving permission to service account to use Google Cloud Storage

```zsh
    gcloud projects add-iam-policy-binding scalar-e-commerce --member="serviceAccount:676869938642-compute@developer.gserviceaccount.com " --role="roles/storage.admin" --role="roles/storage.objectViewer" --role="roles/storage.objectCreator"

```

9. Verify roles given to service accounts on the project

```zsh
    gcloud projects get-iam-policy scalar-e-commerce --flatten="bindings[].members" --filter="bindings.members:serviceAccount:676869938642-compute@developer.gserviceaccount.com "  --format="table(bindings.role)"
```

10. Updates are available for some Google Cloud CLI components. To install them,

```zsh
    gcloud components update
```

11. Get URL of a running service

```zsh
    gcloud run services describe  sec2-ms-file --region us-central1 --format="value(status.address.url)"
```

12. Start grpcui for a given service with no authentication deployed on Cloud Run

```zsh
    grpcui -import-path  /home/kunal/Projects/scalar-e-commerce-2/protos   -proto common.proto -proto file.proto  sec2-ms-file-o2yq6mki4q-uc.a.run.app:443
```

# User credentials

Reference: [Set up a local development environment](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment)

# Configure ADC with your Google Account

1. Install the Google Cloud CLI, then initialize it by running the following command:

```zsh
    gcloud init
```

2. If you're using a local shell, then create local authentication credentials for your user account:

```zsh
    gcloud auth application-default login
```

You don't need to do this if you're using Cloud Shell.

```
Note: To add scopes for services outside of Google Cloud, such as Google Drive, create an OAuth Client ID and provide it to the gcloud auth application-default login command by using the --client-id-file flag, specifying your scopes with the --scopes flag.
```

A sign-in screen appears. After you sign in, your credentials are stored in the local credential file used by ADC.

## Set up Application Default Credentials 
[Reference](https://cloud.google.com/docs/authentication/provide-credentials-adc)

