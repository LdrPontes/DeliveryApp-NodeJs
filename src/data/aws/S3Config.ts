import AWS from 'aws-sdk'

export default (): AWS.S3 => {
    AWS.config.update({
        accessKeyId: 'AKIA4T34T4UNKT2YIUK6',
        secretAccessKey: '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'
    })

    return new AWS.S3()

}