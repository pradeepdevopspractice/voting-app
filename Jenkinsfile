pipeline {
    agent any

    stages {
        stage('clean workspace') {
            steps {
                cleanWs()
            }
        }

        stage('build frontend image') {
            steps {
                bat 'docker build -t vote-frontend:latest ./frontend'
            }
        }

        stage('build backend image') {
            steps {
                bat 'docker build -t vote-backend:latest ./backend'
            }
        }

        stage('deploy to minikube') {
            steps {
                bat 'kubectl apply -f k8s'
            }
        }

        stage('verify Rollout') {
            steps {
                bat 'kubectl rollout status deployment/frontend'
                bat 'kubectl rollout status deployment/backend-worker'
            }
        }
    }
}