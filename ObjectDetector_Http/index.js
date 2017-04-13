var request = require('request')
var VISION_URL = 'https://api.projectoxford.ai/vision/v1.0/analyze/?visualFeatures=Description&form=BCSIMG&subscription-key=63fc8c5f390a42df93df6b7f1206bbf1'

var extractCaption = (body) => {
  if (body && body.description && body.description.captions && body.description.captions.length) {
    return body.description.captions[0].text
  }
}

module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.')

  var requestData = {
    url: VISION_URL,
    json: {'url': context.bindingData.name}
  }

  request.post(requestData, function (error, response, body) {
    if (error) {
      context.log('Error')
      context.done(error, null)
    } else if (response.statusCode !== 200) {
      context.log('Status code not success: ', response.statusCode)
      context.done(response.statusCode, null)
    } else {
      context.log('Request returned successfully')
      context.log(extractCaption(body))

      context.done(null, extractCaption(body))
    }
  })
}
