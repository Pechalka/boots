import React, { Component } from 'react';
import './App.css';

import ImagesSelector from './ImagesSelector';

const BootItem = ({ id, image, onRemove, onAddStep, steps, onChangeImage }) => (
  <div>
    <div>
      <img 
        src={image} 
        onClick={() => onChangeImage(id)}
      />
    </div>
    <div>
      <button onClick={() => onAddStep(id)}>добавить уход</button>
      <div>
        {steps.map((step, index) => (
            <img 
              key={index}
              src={step}
              width={100}
            />
          )
        )}
      </div>
    </div>
    <button onClick={() => onRemove(id)}>-</button>
  </div>
)

const bootImages = [
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg'
];

const stepImages = [
  'images/4.jpg',
  'images/5.jpg',
  'images/6.jpg'
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boots: [],
      openBoots: false,
      openSteps: false,
      selectedId: null,
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.addStep = this.addStep.bind(this);
    this.addStepSelect = this.addStepSelect.bind(this);
  }
  
  add() {
    const newBoot = {
      id: (new Date().getTime()),
      image: 'images/no-image.jpg',
      steps: []
    };
    this.setState({
      boots: this.state.boots.concat(newBoot)
    })
  }

  remove(id) {
    this.setState({
      boots: this.state.boots.filter(boot => boot.id !== id)
    })
  }

  selectImage(image) {
    const id = this.state.selectedId;
    const mutate = boot => boot.id === id ? ({...boot, image }) : boot;
    const newBoots = this.state.boots.map(mutate);
    this.setState({
      openBoots: false,
      boots: newBoots,      
    })
  }

  addStep(id) {
    this.setState({
      openSteps: true,
      selectedId: id,
    })
  }

  addStepSelect(image) {
    const id = this.state.selectedId;
    const mutate = boot => boot.id === id 
      ? ({...boot, steps: boot.steps.concat(image) })
      : boot;
    const newBoots = this.state.boots.map(mutate);
    console.log(newBoots)
    this.setState({
      openSteps: false,
      boots: newBoots,     
    })
  }

  changeImage(id) {
    this.setState({
      openBoots: true,
      selectedId: id,
    })
  }

  render() {
    const {
      openBoots,
      boots,
      images,
      openSteps
    } = this.state;
    const items = boots.map(boot => (
      <BootItem 
        key={boot.id} 
        {...boot} 
        onRemove={this.remove}
        onAddStep={this.addStep}
        onChangeImage={this.changeImage}
      />
      )
    );

    return (
      <div className="App">
        <button onClick={this.add}>+</button>
        <div>
          {items}
        </div>
        <ImagesSelector
          open={openBoots}
          images={bootImages}
          onSelect={this.selectImage}
        />
        <ImagesSelector
          open={openSteps}
          images={stepImages}
          onSelect={this.addStepSelect}
        />
      </div>
    );
  }
}

export default App;
