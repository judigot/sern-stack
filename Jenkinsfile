// Environmental variables out of the box
// localhost:8080/env-vars.html
// sh means "shell script"

//=====PLUGINS=====//
// Credentials
// Credentials Binding
//=====PLUGINS=====//

def boolean getGitChanges() {
    return currentBuild.changeSets.size() > 0
}

// Custom environmental variable
CODE_CHANGES = getGitChanges()

pipeline {
    agent any
    tools {
        nodejs "17.7.0"
    }
    // Environment variables are accessible in the stages
    environment {
        NEW_VERSION = '1.0'

        // "Credentials Binding" plugin allows you to use Jenkins credentials in Jenkinsfile

        // Only uncomment if the repository is private
        // SERVER_CREDENTIALS = credentials('<credential-ID>') // Finds the credentials that are available in Jenkins
    }
    stages {
        stage("Initialize Environment") {
            when {
                expression {
                // Build only if there are changes in the code
                    CODE_CHANGES == true
                    // currentBuild.changeSets.size() > 0
                }
            }
            steps {
                echo "There are changes in the code."
            }
        }
        stage("Build") {
            // when {
            //     expression {
            //     // Build only if there are changes in the code
            //         BRANCH_NAME == 'main' && CODE_CHANGES == true
            //     }
            // }
            steps {
                echo "Building version ${NEW_VERSION}..."

                // Actual build script
                // sh "chmod +x -R ${WORKSPACE}"
                // sh "./build.sh"

                //=====NODE.JS=====//
                sh 'npm install'
                sh 'npm run build'
                // sh 'npm start dist/index.js'
                //=====NODE.JS=====//
            }
        }

        stage("Test") {
            // when {
            //     expression {
            //         // Test only in dev branch
            //         BRANCH_NAME == 'main' || BRANCH_NAME == 'main'
            //     }
            // }
            steps {
                echo "Testing..."
                
                // Actual test script
                // sh "chmod +x -R ${WORKSPACE}"
                // sh "./test.sh"

                sh 'npm run test'
            }
        }

        stage("Deploy") {
            steps {
                echo "Deploying..."

                // Actual deploy script
                // sh "chmod +x -R ${WORKSPACE}"
                // sh "./deploy.sh"

                sh 'npm start'
            }
        }
    }

    // Executes after all the stages are executed
    post {

        // This script always executes whether the build was successful or not
        // Examples (send email to the dev team about the build condition/result)
        // always {
        // }

        success {
            echo 'Success! -judigot'
        }

        // failure {
        // }
    }
}
