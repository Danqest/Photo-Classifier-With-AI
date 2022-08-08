const LOAD_BUTTON = document.getElementById('loadData');
const TRAIN_BUTTON = document.getElementById('trainModel');
const PREDICT_BUTTON = document.getElementById('predictUnorganized');


LOAD_BUTTON.addEventListener('click', loadData);
TRAIN_BUTTON.addEventListener('click', trainModel);
// PREDICT_BUTTON.addEventListener('click', gotResults);

let CLASS_NAMES = []

function modelLoaded() {
    console.log("Model Loaded!")
}

const options = {numLabels: 4}
const mobilenet = ml5.featureExtractor("MobileNet", options, modelLoaded)
const classifier = mobilenet.classification()


function getCategoryNamesAndPreviews() {
    CLASS_NAMES = []
    var catNames = document.querySelectorAll('.categoryName')
    for (let k=0; k<catNames.length; k++) {
        CLASS_NAMES.push(catNames[k].value)

        var filesInput = document.getElementById("files"+k);
        filesInput.addEventListener("change", function(event) {
            var files = event.target.files; //FileList object
            var output = document.getElementById("result"+k);
            for(var i = 0; i< files.length; i++) {
                var file = files[i];                
                //Only pics
                if(!file.type.match('image'))
                  continue;
                var picReader = new FileReader();
                picReader.addEventListener("load",function(event){
                    var picFile = event.target;
                    var div = document.createElement("div");
                    div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                            "id='cat"+k+"'/>";
                    output.insertBefore(div,null);            
                    }
                );
                 //Read the image
                picReader.readAsDataURL(file);
            }                               
        });
    }
    console.log(CLASS_NAMES)
}



// // can add loop to add images on category Submit button click 
// classifier.addImage(document.getElementById('mnist0'), 'zero')
// classifier.addImage(document.getElementById('mnist1'), 'zero')
// classifier.addImage(document.getElementById('mnist2'), 'one')
// classifier.addImage(document.getElementById('mnist4'), 'zero')
// classifier.addImage(document.getElementById('mnist5'), 'one')
// classifier.addImage(document.getElementById('mnist6'), 'one')
// console.log(document.getElementById('mnist2'))

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

function loadData() {
    getCategoryNamesAndPreviews()
    var img_array = document.getElementsByClassName('thumbnail')
    console.log(img_array)

    for (let i=0; i < img_array.length; i++) {
        var imgObj = img_array[i]
        var categoryId = img_array[i].id
        categoryId = Number(categoryId.slice(-1))
        // console.log(categoryId)
        classifier.addImage(imgObj, CLASS_NAMES[categoryId])
        // console.log(imgObj)
    }
}

function trainModel() {
    classifier.train(whileTraining)
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        classifier.classify(document.getElementById('mnist0'), CLASS_NAMES.length)
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
