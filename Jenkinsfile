_BUILD_NUMBER = env.BUILD_NUMBER
_BRANCH_NAME = scm.branches[0].name

TIMEZONE = "GMT+7"
// SLACK_CHANNEL_NAME = "C0179LQ5N82"

HOST_SSH_PORT= 22

node{
    env.NODEJS_HOME = "${tool 'node18'}"
    // on linux / mac
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    // sh 'npm --version'
    try {
            stage ("Checkout source") {
                checkout scm
            }

            stage ("Install dependency") {
                sh "yarn"
            }

            stage ("Build source") {
                configFileProvider([configFile(fileId: ENV_FILE_ID, targetLocation : './.env')]) {
                    sh "yarn build"
                    ARCHIVE_COMMAND = """
                        tar --exclude='./.next/cache' -zcvf build.tar.gz ./.next ./public package.json yarn.lock ecosystem.config.js next.config.js .env deploy.sh
                    """
                    sh """
                        ${ARCHIVE_COMMAND}
                    """
                }
            }

            stage("Deploy build to ${_BRANCH_NAME}") {
                def remote = [:]
                remote.allowAnyHosts = true
                remote.port = HOST_SSH_PORT
                remote.name = HOST_SSH_NAME
                remote.host = HOST_SSH_NAME

                withCredentials([usernamePassword(credentialsId: HOST_SSH_USER, usernameVariable: 'userName', passwordVariable: 'password')]) {
                    remote.user = userName
                    remote.password = password
                    // sshCommand remote: remote, sudo: true, command: "rm -rf ${TARGET_FOLDER}/*"
                    sshPut remote: remote, from: './build.tar.gz', into: "${TARGET_FOLDER}/build"
                    sshCommand remote: remote, command: "mkdir -p ${TARGET_FOLDER}/deploy && \
                    tar -zxvf ${TARGET_FOLDER}/build/build.tar.gz -C ${TARGET_FOLDER}/deploy && \
                    cd ${TARGET_FOLDER}/deploy && \
                    chmod +x deploy.sh && ./deploy.sh"
                }
            }

        currentBuild.result = "SUCCESS"
    } catch (e) {
        currentBuild.result = "FAILURE"
        throw e
    } finally {
        def time = formatMilisecondTime(currentBuild.timeInMillis, TIMEZONE)
        def duration = durationFormat(currentBuild.duration)
        def buildDetail = "\n————————————————————" +
                            "\n*Build Time:* ${time}" +
                            "\n*Duration:* ${duration}" +
                            "\n*Change Log (DESC):*\n${getChangeLog()}"

        echo buildDetail
    }
}


def getChangeLog() {
    def changeLogSets = currentBuild.changeSets
    if (changeLogSets.isEmpty()) {
        return "    (No changes)"
    }

    def text = ""
    for (int i = changeLogSets.size() - 1; i >= 0; i--) {
        for (def entry in changeLogSets[i].items) {
            text += ":white_small_square: ${entry.author} - ${entry.msg}\n"
        }
    }
    return text
}

def formatMilisecondTime(timeInMillis, timeZone) {
    return new Date(timeInMillis).format("MMM dd, yyyy HH:mm:ss", TimeZone.getTimeZone(timeZone))
}

def durationFormat(long milisecond) {
    def min = milisecond.intdiv(1000).intdiv(60)
    def sec = milisecond.intdiv(1000) % 60
    def result = (min > 0 ? "${min}m " : "") + (sec > 0 ? "${sec}s" : "")
    return result
}
