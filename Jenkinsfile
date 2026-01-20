pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend Image') {
      steps {
        sh 'docker build -t todo-backend:1.0 backend'
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh 'docker build -t todo-frontend:1.0 frontend'
      }
    }
  }
}
