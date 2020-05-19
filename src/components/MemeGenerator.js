import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Create a method that, when the "Gen" button is clicked, chooses one of the
   * memes from our `allMemeImgs` array at random and makes it so that is the
   * meme image that shows up in the bottom portion of our meme generator site (`.url`)
   */

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({
          allMemeImgs: memes,
        });
      })
      .catch((err) => console.log(err));
  }

  handleSubmit(event) {
    event.preventDefault();
    const randomNum = Math.round(Math.random() * this.state.allMemeImgs.length);

    this.setState({
      randomImg: this.state.allMemeImgs[randomNum].url,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            name="topText"
            value={this.state.topText}
            type="text"
            placeholder="top text"
            onChange={this.handleChange}
          />

          <input
            name="bottomText"
            value={this.state.bottomText}
            type="text"
            placeholder="bottom text"
            onChange={this.handleChange}
          />

          <button>Gen</button>
        </form>
        <div className="meme">
          <img id="meme-img" src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
