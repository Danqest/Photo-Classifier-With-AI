const SCRIPT_BUTTON = document.getElementById('loadScript');
const LOAD_BUTTON = document.getElementById('loadData');
const TRAIN_BUTTON = document.getElementById('trainModel');


SCRIPT_BUTTON.addEventListener('click', getCategoryNamesAndPreviews);
LOAD_BUTTON.addEventListener('click', loadData);
// TRAIN_BUTTON.addEventListener('click', trainModel);


let CLASS_NAMES = []

window.onload = function() {
    // load unorganized file thumbnails to browser
    var unorganizedFiles = document.getElementById('files-unorganized');
    unorganizedFiles.addEventListener("change", function(event) {
            var files = event.target.files; //FileList object
            var output = document.getElementById("result-unorganized");
            while (output.firstChild) {
                output.removeChild(output.firstChild)
            }
            for(let i = 0; i< files.length; i++) {
                var file = files[i];                
                //Only pics
                if(!file.type.match('image'))
                  continue;
                var picReader = new FileReader();
                picReader.addEventListener("load",function(event){
                    var picFile = event.target;
                    var div = document.createElement("div");
                    div.innerHTML = "<img class='unorgThumbnail' src='" + picFile.result + "'" + 
                    "'/><p id='unorgFile"+i+"'>";
                    output.insertBefore(div,null);            
                    }
                );
                 //Read the image
                picReader.readAsDataURL(file);
            }
    })
}

// const options = {numLabels: 10}
// const mobilenet = ml5.featureExtractor("MobileNet", options, modelLoaded)
// const classifier = mobilenet.classification()


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

function modelLoaded() {
    console.log("Model Loaded! Loading Images...")
    var img_array = document.getElementsByClassName('thumbnail')
    console.log(img_array)

    // console.log(CLASS_NAMES)


    for (let i=0; i < img_array.length; i++) {
        var imgObj = img_array[i]
        var categoryId = img_array[i].id
        categoryId = Number(categoryId.slice(-1))
        // console.log(categoryId)
        classifier.addImage(imgObj, CLASS_NAMES[categoryId])
        // console.log(imgObj)
    }
}

function loadData() {
    getCategoryNamesAndPreviews()
    // console.log(CLASS_NAMES.length)
    const options = {numLabels: CLASS_NAMES.length}
    const mobilenet = ml5.featureExtractor("MobileNet", options, modelLoaded)
    const classifier = mobilenet.classification()
    
    classifier.train(whileTraining)
}

function trainModel() {
    classifier.train(whileTraining)
}

function whileTraining(loss) {
    if (loss == null) {
        console.log("Training Complete")
        gotResults()
    } else {
        console.log(loss)
    }
}

function gotResults(error, result) {
    var toPredict = document.getElementsByClassName('unorgThumbnail')
    for (let j=0; j<toPredict.length; j++) {
        if (error) {
            console.error(error)
        } else {
            classifier.classify(toPredict[j], CLASS_NAMES.length)
            .then((result) => {
                console.log(result);
               // do whatever you want to do with result
               var label = result[0].label
               var accuracy = result[0].confidence
               console.log("Predicted Classification Label: " + label)
               console.log("Predicted Confidence: " + (accuracy*100).toFixed(2) + "%")
               var predictElement = document.getElementById('unorgFile'+j)
               predictElement.innerText = ('Label: ' + label + ', Confidence: ' + (accuracy*100).toFixed(2) + "%")
           }).catch(err=>console.log(err))
        }
    } 
}
