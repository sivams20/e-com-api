pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId: 'Jenkins-docker-git', url: 'https://github.com/sivams20/e-com-api.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t us-central1-docker.pkg.dev/nodejs-ci-demo/ecom-repo/e-com-api:latest .'
            }
        }

        stage('Push to Artifact Registry') {
            steps {
                withCredentials([file(credentialsId: 'gcp-service-account', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh '''
                        gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                        gcloud auth configure-docker us-central1-docker.pkg.dev -q
                        docker push us-central1-docker.pkg.dev/nodejs-ci-demo/ecom-repo/e-com-api:latest
                    '''
                }
            }
        }

        stage('Deploy to Cloud Run') {
            steps {
                sh '''
                    gcloud run deploy e-com-api \
                        --image us-central1-docker.pkg.dev/nodejs-ci-demo/ecom-repo/e-com-api:latest \
                        --platform managed \
                        --region us-central1 \
                        --allow-unauthenticated
                '''
            }
        }
    }
}
