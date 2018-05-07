import React, {Component} from 'react';
import {
  Card, Content, Heading
} from 'react-bulma-components';

export default class Contract extends Component {
  constructor(props) {
    super(props);
  }

  render () {
      return (
        <Card>
          <Card.Header>
            <Card.Header.Title>Contract</Card.Header.Title>
          </Card.Header>

          <Card.Content>
            <Content>
              <div className="field">
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input className="file-input" type="file" id="contractFile" />
                    <span className="file-cta">
                      <span className="file-icon"><i className="fas fa-upload"></i></span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                    <span className="file-name">...</span>
                  </label>
                </div>
              </div>

              <div className="field">
                <div className="select is-fullwidth">
                  <select id="contractListFunctions"></select>
                </div>
              </div>
            </Content>
          </Card.Content>

          <Card.Footer>
            <Card.Footer.Item>
              <a href="#">Run</a>
            </Card.Footer.Item>
          </Card.Footer>
        </Card>
      )
  }
}
