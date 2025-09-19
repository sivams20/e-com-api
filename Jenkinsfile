pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    environment {
        DOCKERHUB_USER = 'sivams20'
        DOCKERHUB_PASS = credentials('jenkins-docker-hub')
        DOCKERHUB_CREDENTIALS_ID = 'jenkins-docker-hub'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId: 'Jenkins-docker-git', url: 'https://github.com/sivams20/e-com-api.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/e-com-api:latest .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                sh 'docker push $DOCKERHUB_USER/e-com-api:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
            }
        }
    }
}
