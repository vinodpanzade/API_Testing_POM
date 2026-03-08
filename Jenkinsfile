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

        stage('Clean Reports') {
            steps {
                bat 'if exist cypress\\reports del /Q cypress\\reports\\*.json'
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
    }

    post {
        always {
            publishHTML([
                reportDir: 'cypress/reports',
                reportFiles: 'index.html',
                reportName: 'Cypress Test Report'
            ])
        }
    }
}