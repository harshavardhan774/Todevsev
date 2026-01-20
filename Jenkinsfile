pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '1'
        DOCKER_NETWORK = 'todo-net'
    }

    stages {

        stage('Checkout SCM') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Docker Pre-Cleanup') {
            steps {
                echo 'Stopping & removing old containers...'
                sh '''
                docker rm -f todo-backend todo-frontend || true
                docker network rm ${DOCKER_NETWORK} || true
                '''

                echo 'Removing old images...'
                sh '''
                docker images -q todo-backend:1.0 | xargs -r docker rmi -f
                docker images -q todo-frontend:1.0 | xargs -r docker rmi -f
                '''
            }
        }

        stage('Docker Network Setup') {
            steps {
                sh '''
                docker network create ${DOCKER_NETWORK} || true
                '''
            }
        }

        stage('Docker Info Check') {
            steps {
                sh 'docker --version'
                sh 'docker info'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                echo 'Building backend image...'
                sh 'docker build -t todo-backend:1.0 ./backend'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                echo 'Building frontend image with backend API URL...'
                sh '''
                docker build \
                  --build-arg VITE_API_URL=http://todo-backend:5000 \
                  -t todo-frontend:1.0 \
                  ./frontend
                '''
            }
        }

        stage('Run Containers') {
            steps {
                echo 'Running backend and frontend containers...'
                sh '''
                docker run -d \
                  --name todo-backend \
                  --network ${DOCKER_NETWORK} \
                  -p 5000:5000 \
                  todo-backend:1.0

                docker run -d \
                  --name todo-frontend \
                  --network ${DOCKER_NETWORK} \
                  -p 80:80 \
                  todo-frontend:1.0
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
            sh 'docker ps'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
