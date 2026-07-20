pipeline {
    agent any

    stages {
        stage('clean workspace') {
            steps {
                cleanup(disableDeferredWipeout: true, errorBehavior: 'DELETE_FAILED_BUILD_WARNING')
                checkout scm
            }
        }

        stage('build frontend image') {
            steps {
                dir('frontend') {
                    bat 'docker build -t vote-frontend:latest .'
                }
            }
        }

        stage('build backend image') {
            steps {
                dir('backend') {
                    bat 'docker build -t vote-backend:latest .'
                }
                
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