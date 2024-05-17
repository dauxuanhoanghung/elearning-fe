pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Copy Secret Files') {
            steps {
                sh """
                    # Copy tokens folder
                    sudo cp -rf /home/ubuntu/private-scp/fe-secret/.env ${WORKSPACE}/.env
                """
            }
        }

        stage('Build Docker Compose') {
            steps {
                sh "sudo docker compose -f compose.yml build"
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh "sudo docker compose -f compose.yml down"
            }
        }

        stage('Run Docker Compose') {
            steps {
                sh "sudo docker compose -f compose.yml up -d"
            }
        }

        stage('Clean up old images') {
            steps {
                script {
                    sh 'sudo docker image prune --filter "until=24h"'
                }
            }
        }

    }
}
