pipeline {
    agent any
    environment {
        PROJECT_ID = 'your-gcp-project-id'
        REGION = 'us-central1'
        REPO = 'ecom-repo'
        IMAGE = "us-central1-docker.pkg.dev/${PROJECT_ID}/${REPO}/e-com-api:latest"
        SERVICE = 'e-com-api'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId: 'Jenkins-docker-git', url: 'https://github.com/sivams20/e-com-api.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Push to Artifact Registry') {
            steps {
                withCredentials([file(credentialsId: 'gcp-credentials', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh '''
                        gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                        gcloud auth configure-docker us-central1-docker.pkg.dev
                        docker push $IMAGE
                    '''
                }
            }
        }

        stage('Deploy to Cloud Run') {
            steps {
                withCredentials([file(credentialsId: 'gcp-credentials', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh '''
                        gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                        gcloud config set project $PROJECT_ID
                        gcloud run deploy $SERVICE \
                            --image $IMAGE \
                            --region $REGION \
                            --platform managed \
                            --allow-unauthenticated
                    '''
                }
            }
        }
    }
}
