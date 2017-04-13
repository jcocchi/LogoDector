var request = require('request')

var VISION_URL = 'https://api.projectoxford.ai/vision/v1.0/analyze/?visualFeatures=Description&form=BCSIMG&subscription-key=63fc8c5f390a42df93df6b7f1206bbf1'
var IMGBASE_URL = 'https://function44dd69dd9db8.blob.core.windows.net/input/'

var extractCaption = (body) => {
  if (body && body.description && body.description.captions && body.description.captions.length) {
    return body.description.captions[0].text
  }
}

module.exports = function (context, myBlob) {
  var url = IMGBASE_URL + context.bindingData.name
  context.log('Function processed a request for: ' + url)

    // Set up request for cog services
  var requestData = {
    url: VISION_URL,
    json: {'url': url}
  }

    // Make api call
  request.post(requestData, function (error, response, body) {
        // We got an error
    if (error) {
      context.log('Error')
      context.done()
    } else if (response.statusCode !== 200) { // Something other than success was returned
      context.log('Status code not success: ', response.statusCode)
      context.done()
    } else { // The call worked, write the caption to a table
      context.log('Request returned successfully')
      context.log(extractCaption(body))

      context.bindings.outputTable = {
        'partitionKey': 'successful_pictures',
        'rowKey': context.bindingData.name,
        'description': extractCaption(body)
      }

      context.done()
    }
  })
}
