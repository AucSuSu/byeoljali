import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import './ChatComponent.css';

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.close = this.close.bind(this);
  }

  componentDidMount() {}
  close() {
    this.props.close(undefined);
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          <div id="chatToolbar">
            <IconButton id="closeButton" onClick={this.close}>
              <HighlightOff color="secondary" />
            </IconButton>
          </div>
          <p>TEST MESSAGE</p>
        </div>
      </div>
    );
  }
}
