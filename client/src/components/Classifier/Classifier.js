import React from "react";
import './Classifier.css';


const Classifier = () => {
  return (
    <div className="container">
      <div>
        <h1>Customize Your Photo Classifier</h1>
      
        <p id="status">STATUS: Awaiting MobileNet Model Load...</p>
        <p id="subStatus"></p>
      </div>
      <div className="row">
        <button id="loadData">Load Data</button>
        <button id="trainModel">Train & Predict</button>
      </div>

      <div className="categoryContainer">
        <div className="field_wrapper" id="field_wrapper">
          <p>- - -</p>
          <h2>Classifier Categories</h2>
          <p>Name Up To 10 Unqiue Categories Below (At Least Two Required) - Use More Sample Images For Better Accuracy!</p>
          <div>
            <input type="text" className="categoryName" name="category_name[]" value="cat0"/>
            <a href="javascript:void(0);" className="locked_button" title="Locked field"><img src="images/lock.png" alt=""></img></a>
            <label for="files">Select sample images for this category: </label>
            <input id="files0" className="trainData" type="file" multiple accept="image/jpeg, image/png, image/jpg"/>
            <div className="row" id="result0"></div>
          </div>
          <div>
            <input type="text" className="categoryName" name="category_name[]" value="cat1"/>
            <a href="javascript:void(0);" className="add_button" id="add_button" title="Add field"><img src="images/add.png" alt=""></img></a>
            <label for="files">Select sample images for this category: </label>
            <input id="files1" class="trainData" type="file" multiple accept="image/jpeg, image/png, image/jpg"/>
            <div className="row" id="result1"></div>
          </div>
        </div>
        <div>
          <p>- - -</p>
          <label for="files">Select all other images you want organized: </label>
          <input id="files-unorganized" className="testData" type="file" multiple/>
          <output id="result-unorganized"></output>
        </div>
      </div>
    </div>
  )
}

export default Classifier;