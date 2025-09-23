pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId: 'Jenkins-docker-git', url: 'https://github.com/sivams20/e-com-api.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t sivams20/e-com-api:latest .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh """
                        echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin
                        docker push $DOCKERHUB_USER/e-com-api:latest
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
            }
        }
    }
}
