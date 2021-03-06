import React, { Component } from 'react';

import {FormGroup, FormControl} from 'react-bootstrap';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import toastr from 'toastr';

var filesData={files:[]};

export default class AddPatientDetailsComponent extends Component{

constructor(props, context) {
        super(props, context);			
				filesData = {
            files: []
        };
				this.state={selectedDropDownGender:""};
    }

showFiles() {
        const { files } = filesData;

        if (files.length>1) {
            return null;
        }

        return (
            <div>
                <h3>Dropped files: </h3>
                <ul>
                    {
                        files.map((file, idx) => {
                            return (
                                <li key={idx}>
                                    <img src={file.preview} alt='file-preview' width={100}/>
                                    <div>{file.name + ' : ' + file.size + ' bytes.'}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
		onDrop(files) {
				filesData.files=files;	
				ReactDOM.findDOMNode(this.refs.dropzoneThumbnail).src=files[0].preview
    }
openAfter() {
        new Promise((res, rej) => {
            //Simulate a Async promise
            setTimeout(() => {
                res('ok');
            }, 1000);
        }).then(() => {
            //call dropzone.open in then()
            this.refs.dropzone.open();
        });
    }

		
	setDefaultVal(fieldName){
			if(this.actionType==='edit' && this.editPatientData){
				return this.editPatientData[fieldName];
			}else{
				return "";
			}
		}
ondropdownChange(event){
	let genderVal = event.target.value;
	this.setState({
			selectedDropDownGender: genderVal
		});
}
  componentDidMount() {
		let genderVal=this.setDefaultVal('gender');
		this.setState({
			selectedDropDownGender: genderVal
		});
  }

  render(){
		this.actionType=this.props.selectedPatientDetailsRow.action;
		if( this.props.selectedPatientDetailsRow && this.actionType === 'edit'){
			if(this.props.selectedPatientDetailsRow.selectedPatientDetailsRow){
				this.editPatientData=this.props.selectedPatientDetailsRow.selectedPatientDetailsRow[0].row;
			}
		}
    var modalCalWidth = window.innerWidth/1.5;		
		//	let genderDefaultVal="";
		//	if(this.selectedDropDownGender){
		//		genderDefaultVal = this.selectedDropDownGender;
		//	}else{
			//	this.props.selectedDropDownGender = this.setDefaultVal('gender');
				//this.props.selectedDropDownGender=this.props.selectedDropDownGender==""?'Select':this.props.selectedDropDownGender;
		//}	
    return(
      <section className="dashboard-right-bg-box subs_form">				
			<div className="container-fluid" style={{width : modalCalWidth}}>
				<div className="dashboard-right-bg-shadow">
					<div className="row">
						<div className="col-md-12">
							<h4 className="db-r-form-title">Patient Details</h4>
						</div>
					</div>
					<div className="row">
						<form  onSubmit={this.handlePatientDetailsSubmit.bind(this)}>
						<div className="col-md-12">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
									  <label >Patient’s Name</label>
									  <input type="text" className="form-control" id="name" ref="name" defaultValue={this.setDefaultVal('name')}/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
									  <label >Patient Since</label>
									  <input type="text" className="form-control" id="patientSince" ref="patientSince" defaultValue={this.setDefaultVal('patientSince')}/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
									  <label >Gender</label>
									  {/*<input type="text" className="form-control" id="gender" ref="gender"/>*/}
                                      {/*<div><DropdownButton title="Dropdown" id="gender" ref="gender" defaultValue={this.setDefaultVal('gender')}>
      <MenuItem eventKey="1">Male</MenuItem>
      <MenuItem eventKey="2">Female</MenuItem>
    </DropdownButton></div>*/}

							<FormGroup controlId="formControlsSelect">
								<FormControl  
										value={this.state.selectedDropDownGender}	
										componentClass="select" 
										placeholder="select" 
										onChange={this.ondropdownChange.bind(this)} >
									<option key="select" value="select">select</option>
									<option key='male'  value='male'>Male</option>
									<option key='female'  value='female'>Female</option>
								</FormControl>
							</FormGroup>



									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
									  <label >Age</label>
									  <input type="text" className="form-control" id="age" ref="age" defaultValue={this.setDefaultVal('age')}/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
									  <label >Location</label>
									   <input type="text" className="form-control" id="location" ref="location" defaultValue={this.setDefaultVal('location')}/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
									  <label >Height</label>
									  <input type="text" className="form-control" id="height" ref="height" defaultValue={this.setDefaultVal('height')}/>
									</div>
								</div>
							</div>
                            <div className="row">
								<div className="col-md-6">
									<div className="form-group">
									  <label >Marital Status</label>
									  <input type="text" className="form-control" id="martial_status" ref="martial_status" defaultValue={this.setDefaultVal('martial_status')}/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
									  <label >Race</label>
									  <input type="text" className="form-control" id="race" ref="race" defaultValue={this.setDefaultVal('race')}/>
									</div>
								</div>
							</div>
                            <div className="row">
								<div className="col-md-6">
									<div className="form-group">
									  <label >Assigned Physician</label>
									<input type="text" className="form-control" id="assigned_physician" ref="assigned_physician" defaultValue={this.setDefaultVal('assigned_physician')}/>
									</div>
								</div>								
							</div>							
							<div className="row">
								<div className="col-md-12">
									<button type="submit" className="btn db-table-btn">
										{(this.actionType === 'edit')?"Update Patient":"Add Patient"}
										</button>
								</div>
							</div>
						</div>
						</form>
					</div>
				</div>
			</div>
		</section>
    )
  }

handlePatientDetailsSubmit(event) {
    const thisObj = this;
    event.preventDefault();

    	const name = ReactDOM.findDOMNode(thisObj.refs.name).value.trim();
		const gender = thisObj.state.selectedDropDownGender;
		const age = ReactDOM.findDOMNode(thisObj.refs.age).value.trim();
		const location = ReactDOM.findDOMNode(thisObj.refs.location).value.trim();
		const height = ReactDOM.findDOMNode(thisObj.refs.height).value.trim();
		const martial_status = ReactDOM.findDOMNode(thisObj.refs.martial_status).value.trim();
		const race = ReactDOM.findDOMNode(thisObj.refs.race).value.trim();
		const physician_name = ReactDOM.findDOMNode(thisObj.refs.assigned_physician).value.trim();		
		const physician_id = 1;
		const organisation_id = 1;    
		// create a user object
	    const patient_info = {
	      name,
	      gender,
				age,
				location,
				height,
				martial_status,
				race,
				physician_name,
				physician_id,
				organisation_id
	    };
   		// const patient_info = {name: "patient124", gender: "male", age: "30", location: "mumbai", height:"170", martial_status:"married", race:"black", physician_name: "physician1", physician_id: 1, organisation_id: 1};
		var queryData={};
		if(this.props.selectedPatientDetailsRow.action === 'edit'){
			queryData={patient_info:patient_info,patient_id:this.editPatientData.patient_id}; // works!
		}
		else{
			queryData={patient_info:patient_info};
		}
    $('#spinner').css({'display': ''});

    this.props.addPatientDetails(queryData,(err, res) => {
       $('#spinner').css({'display': 'none'});
      if (err) {
        toastr.error(err||'Request Failed');
      } else {
        toastr.success(res.message||"Requested successfully.");
			}
    });
  }
}
