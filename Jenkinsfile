pipeline {
    agent any

    stages {
        stage('clean workspace') {
            steps {
                cleanWs(disableDeferredWipeout: true)
            }
        }

        stage('build frontend image') {
            steps {
                dir('frontend') {
                    bat 'docker build -t vote-frontend:latest -f frontend\Dockerfile frontend'
                }
            }
        }

        stage('build backend image') {
            steps {
                dir('backend') {
                    bat 'docker build -t vote-backend:latest -f backend\Dockerfile backend'
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