import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: ["number", "checkbox"],
      selectedValue: "checkbox",
      minNumVal: "",
      numLimiterGenerated: false,
      abcd: [],
      numberChecked: true
    };

    this.onSelect = this.onSelect.bind(this);
    this.onNumLimiterValChange = this.onNumLimiterValChange.bind(this);
    this.generateNumLimiter = this.generateNumLimiter.bind(this);
    this.checkNumber = this.checkNumber.bind(this);
  }

  //bad code ahead

  renderOptions(option) {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  }

  onSelect(event) {
    this.setState({ selectedValue: event.target.value });
    console.log(this.state.selectedValue);
  }

  generateNumLimiter(event) {
    event.preventDefault();
    this.setState({ numLimiterGenerated: true });
    console.log("kuch to hua hai");
  }

  onNumLimiterValChange(event) {
    console.log(event);
    this.setState({ minNumVal: event.target.value });
  }

  checkNumber(event) {
    this.setState({
      numberChecked: Number(event.target.value) > Number(this.state.minNumVal)
    });
    // if (event.target.value < this.state.minNumVal) {
    //   this.setState(() => ({ numberChecked: false }));
    // } else {
    //   this.setState(() => ({ numberChecked: true }));
    // }
  }

  handleCheckboxChange = e => {
    // const val = e.target.value.split(",");
    // this.setState({ abcd: val });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.listCheckbox.value);
    this.setState({ abcd: this.listCheckbox.value.split(",").filter(Boolean) });
  };

  render() {
    const { abcd } = this.state;
    return (
      <div>
        <select onChange={this.onSelect} value={this.state.selectedValue}>
          {this.state.options.map(this.renderOptions)}
        </select>
        {this.state.selectedValue === "number" ? (
          <form onSubmit={this.generateNumLimiter}>
            <input
              type="number"
              placeholder="number"
              value={this.state.minNumVal}
              onChange={this.onNumLimiterValChange}
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="aise likh aise a,b,c,d"
              // value={this.state.abcd}
              ref={el => (this.listCheckbox = el)}
              // onChange={this.handleCheckboxChange}
            />
            <button type="submit">Submit</button>
          </form>
        )}
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <hr />

        <div>
          {this.state.numLimiterGenerated ? (
            <input
              type="number"
              placeholder="numLimiter would work . . ."
              onChange={this.checkNumber}
            />
          ) : (
            <div>
              {abcd.length !== 0 &&
                abcd.filter(Boolean).map((i, index) => (
                  <div>
                    <input key={index} type="checkbox" name={i} value={i} />
                    {i}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div>
          {this.state.numberChecked === false ? (
            <p>Error! Number should be greater {this.state.minNumVal}</p>
          ) : (
            <p>No Error!</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
