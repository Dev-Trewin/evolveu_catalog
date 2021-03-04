import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import StyledForm from './StyleForm/StyledForm'
import { connect } from "react-redux";
import { register } from "../../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      studentRol:'',
      adminRol:'',
      roles:[],
      showAdmin: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  getCheckboxValueAdmin(e) {
    let valcheck=e.target.checked
    console.log(valcheck)
   
    if(valcheck)
   
    this.setState({ adminRol:"admin" })
    
   
  }
  getChckeboxValueStudent(e) {
    let valcheck=e.target.checked
    console.log(valcheck)
    if(valcheck===true){
    
      this.setState({ studentRol:"student" })
    }
   
  }

  componentDidMount(e) {
    
    const currentuser= JSON.parse(localStorage.getItem('user'));

  if(currentuser.roles[0]==="ROLE_ADMIN" || currentuser.roles[1]==="ROLE_ADMIN" ){
         this.setState({ showAdmin:true })
         console.log("***currrent user" + this.state.showAdmin)
    }
  
  }

  handleRegister(e) {
    e.preventDefault();
   
  if(this.state.adminRol && this.state.studentRol){
    console.log("value of admin t" + this.state.adminRol)
    console.log("value of student" + this.state.studentRol)
    this.setState.roles=["admin","student"]
  }else{
    if(this.state.adminRol){
     this.setState.roles=["admin"]
     console.log("value of admin " + this.state.adminRol)
    }else{
      if(this.state.studentRol)
      this.setState.roles=["student"]
      console.log("value of student" + this.state.studentRol)
    }
   }
  
    this.setState({
      successful: false,
    });

    this.form.validateAll();


    if (this.checkBtn.context._errors.length === 0) {
       this.props
        .dispatch(
           register(this.state.username, this.state.email, this.state.password,this.state.roles)

        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;
   const{showAdmin}=this.state;
    return (
     
    
      
      <div className="col-md-12">
        <div className="card card-container">
          <StyledForm>
          <h1 className="font-italic w-25 p-3">Create Account</h1>
          <Form className="shadow-lg p-3 mb-5 bg-white rounded"
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
              
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                {showAdmin && (   
                    <div className="formregister">
                          <span>Admin</span><input onClick ={this.getCheckboxValueAdmin.bind(this)} type="checkbox" value="Text" />
                          <span>Student</span><input onClick={this.getChckeboxValueStudent.bind(this)} type="checkbox" value="Text" />
                    </div>
                    
                )}
       
              
          
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
          </StyledForm>
        </div>
      </div>
     
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
