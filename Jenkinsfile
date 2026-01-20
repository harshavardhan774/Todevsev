pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '1'
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
                docker ps -aq --filter "name=todo-backend" | xargs -r docker rm -f
                docker ps -aq --filter "name=todo-frontend" | xargs -r docker rm -f
                '''

                echo 'Removing old images...'
                sh '''
                docker images -q todo-backend:1.0 | xargs -r docker rmi -f
                docker images -q todo-frontend:1.0 | xargs -r docker rmi -f
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
                echo 'Building frontend image...'
                sh 'docker build -t todo-frontend:1.0 ./frontend'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
            sh 'docker images | grep todo || true'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
