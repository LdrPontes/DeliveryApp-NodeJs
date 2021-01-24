import AWS from 'aws-sdk'

export default (): AWS.S3 => {
    AWS.config.update({
        accessKeyId: '',
        secretAccessKey: ''
    })

    return new AWS.S3()

}
