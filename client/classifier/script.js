const RESET_BUTTON = document.getElementById('reset');
const TRAIN_BUTTON = document.getElementById('train');

TRAIN_BUTTON.addEventListener('click', trainAndPredict);
// RESET_BUTTON.addEventListener('click', reset);



let CLASS_NAMES = []
var PATH = './images/MNIST/0/img_1.jpg'


function modelLoaded() {
    console.log("Model Loaded!")
}


const mobilenet = ml5.featureExtractor("MobileNet", modelLoaded)
const classifier = mobilenet.classification()

// can add loop to add images on category Submit button click 
classifier.addImage(document.getElementById('mnist0'), 'zero')
classifier.addImage(document.getElementById('mnist1'), 'zero')
classifier.addImage(document.getElementById('mnist2'), 'one')
classifier.addImage(document.getElementById('mnist4'), 'zero')
classifier.addImage(document.getElementById('mnist5'), 'one')
classifier.addImage(document.getElementById('mnist6'), 'one')


// optional callback for addImage
function addedImage() {
    console.log("added image!")
}

function whileTraining(loss) {
    if (loss == null) {
        console.log("Training Complete")
        gotResults()
    } else {
        console.log(loss)
    }
}

function trainAndPredict() {
    classifier.train(whileTraining)
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        classifier.classify(document.getElementById('mnist3'))
        .then((result) => {
            console.log(result);
           // do whatever you want to do with result
           var label = result[0].label
           var accuracy = result[0].confidence
           console.log("Predicted Classification Label: " + label)
           console.log("Predicted Confidence: " + (accuracy*100).toFixed(2) + "%")
       }).catch(err=>console.log(err))
    }
}
