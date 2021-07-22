import React from 'react';

class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  handleChange(e) {
    this.setState({ tag: e.target.value })
  }

  addTag(e) {
    const val = this.state.tag
    if (e.key === "Enter" && val) {
      this.props.addNewTag(val);
      this.setState({ tag: '' })
    }
  }

  render () {
    return (
      <div>
        <div>
          { this.props.tags && 
            this.props.tags.map((tag) => (
              <span className="tags">{tag}</span>
          ))}
        </div>

        <input 
          type="text" 
          placeholder="Add a tag"
          value={this.state.tag}
          className="tag-input"
          onChange={this.handleChange}
          onKeyDown={this.addTag}
          maxLength="30" 
        />
      </div>
    );
  }
}

export default TagInput;
