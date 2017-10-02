import React, { Component } from 'react';
import {Form, Field} from 'simple-react-forms';
import Geosuggest from 'react-geosuggest';
import axios from 'axios';

class Profile extends Component {

  constructor (props) {
    super(props);
    this.state = {
      user: this.props.user,
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleProfileSubmission = this.handleProfileSubmission.bind(this);
    this.toggleLocal = this.toggleLocal.bind(this);
  };

  componentWillMount() {
    if (this.state.user.username) {
      this.state.user.username = this.state.user.username.replace('_', ' ');
    }
    if (!this.state.user.username) {
      this.props.history.push('/')
    }
  }

  handleLocationChange(value) {
    this.state.user.location = value.label;
    this.forceUpdate();
  };

  toggleLocal () {
    this.state.user.isLocal = !this.state.user.isLocal;
    this.forceUpdate();
  };

  handleProfileSubmission (event) {
    const data = this.refs['updateProfile'].getFormValues();
    this.state.user.biography = data.biography;
    axios({
      method: 'put',
      url: `/api/profiles/${this.state.user.username}`,
      data: this.state.user,
    }).then(res => console.log(res)).catch(err => console.log(err));
  };

  render() {

    return (
      <div>
        <div className="container">
          <div className="row">
        <div className="col align-self-center">
        <div className="card w-50">
          <div className="crop">
          <img className="card-img-top" src={this.state.user.imageUrl} alt="Card image cap" />
          </div>
          <div className="card-body">
            <h4 className="card-title">{this.state.user.username}</h4>
            <p className="card-text">{this.state.user.biography}</p>
          </div>
          <hr />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Your City:<Geosuggest onSuggestSelect={this.handleLocationChange}/></li>
            <li className="list-group-item"> Bio:
            <Form ref='updateProfile' className='updateProfile'>
              <Field
                id='bio'
                name='biography'
                type='text'
                placeholder="say something about yourself!"
              />
            </Form>
            </li>
            <li className="list-group-item">
              Are you a local? {this.state.user.isLocal ? (<i onClick={this.toggleLocal} className="fa fa-3x fa-toggle-on toggle-switch" aria-hidden="true"></i>) : (<i onClick={this.toggleLocal} className="fa fa-3x fa-toggle-off toggle-switch" aria-hidden="true"></i>)}
            </li>
            <li className="list-group-item"><button className="saveProfile btn btn-primary btn-lg btn-block" onClick={this.handleProfileSubmission.bind(this)}>Save Profile</button></li>
          </ul>
        </div>
      </div>
      </div>
      </div>
      </div>
    )
  };
  
};

export default Profile;

 