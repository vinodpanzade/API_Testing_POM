pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/vinodpanzade/API_Testing_POM.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Install Cypress Binary') {
             steps {
                   bat 'npx cypress install'
             }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run'
            }
        }

        stage('Generate Report') {
            steps {
                bat 'npm run report:merge'
                bat 'npm run report:generate'
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/**', fingerprint: true
            }
        }

    }
    post {
        success {
            echo 'Testing is done'
        }
        failure{
            echo 'Testing is not done'
        }
    }
}