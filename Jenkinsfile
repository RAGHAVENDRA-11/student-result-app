pipeline {

    agent any

    environment {
        IMAGE_NAME = "student-result-app"
        IMAGE_TAG = "latest"
        CONTAINER_NAME = "student-result-container"
        HOST_PORT = "8081"
        CONTAINER_PORT = "80"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'

                bat '''
                    docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
                '''
            }
        }

        stage('Stop Old Docker Container') {
            steps {
                echo 'Stopping old Docker container if it exists...'

                bat '''
                    docker stop %CONTAINER_NAME% 2>nul || exit /b 0
                    docker rm %CONTAINER_NAME% 2>nul || exit /b 0
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                echo 'Running Student Result application in Docker...'

                bat '''
                    docker run -d ^
                    --name %CONTAINER_NAME% ^
                    -p %HOST_PORT%:%CONTAINER_PORT% ^
                    %IMAGE_NAME%:%IMAGE_TAG%
                '''
            }
        }

        stage('Load Image into Minikube') {
            steps {
                echo 'Loading Docker image into Minikube...'

                bat '''
                    minikube image load %IMAGE_NAME%:%IMAGE_TAG%
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying application to Kubernetes...'

                bat '''
                    kubectl apply -f k8s.yaml
                '''
            }
        }

        stage('Check Kubernetes Deployment') {
            steps {
                echo 'Checking Kubernetes deployment...'

                bat '''
                    kubectl rollout status deployment/student-result-app --timeout=120s
                '''

                bat '''
                    kubectl get pods
                    kubectl get services
                '''
            }
        }

    }

    post {

        success {
            echo '=========================================='
            echo ' Student Result CI/CD Pipeline SUCCESS '
            echo '=========================================='
        }

        failure {
            echo '=========================================='
            echo ' Student Result CI/CD Pipeline FAILED '
            echo '=========================================='
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}