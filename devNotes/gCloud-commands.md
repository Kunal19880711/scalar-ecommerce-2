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
