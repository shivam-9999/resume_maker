import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, Button, Form, FormCheck } from "react-bootstrap";

function Resume() {
  const { register, control, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });

  const [input, setinput] = useState({
    Name: "",
    Birthdate: "",
    Email: "",
    About: "",
    Skills: [],
    Languages: [],
    ProjectRole: "",
  });

  const [finalArray, setfinalArray] = useState([]);

  const [check, setcheck] = useState(false);
  //===Experience-----
  const [Experience, setExperience] = useState([]);
  const [Education, setEducation] = useState([]);
  const [Project, setProject] = useState([]);

  let newskills = [...input.Skills];
  let newLanguage = [...input.Languages];
  const handleChange = (e, multiple) => {
    if (multiple === "Skills") {
      if (!newskills.includes(e.target.value)) {
        newskills.push(e.target.value);
      }
      setinput({ ...input, Skills: newskills });
    } else if (multiple === "Languages") {
      if (!newLanguage.includes(e.target.value)) {
        newLanguage.push(e.target.value);
      }
      setinput({ ...input, Languages: newLanguage });
    } else {
      setinput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const removeField1 = (index) => {
    const removefield1 = [...Experience];
    removefield1.splice(index, 1);
    setExperience(removefield1);
  };

  const removeField2 = (index) => {
    const removefield2 = [...Education];
    removefield2.splice(index, 1);
    setEducation(removefield2);
  };
  const removeField3 = (index) => {
    const removefield3 = [...Project];
    removefield3.splice(index, 1);
    setProject(removefield3);
  };

  const AddEduObj = () => {
    const newEducationArr = [
      ...Education,
      { Name: "", Location: "", About: "", FromTo: "" },
    ];
    setEducation(newEducationArr);
  };

  const AddProObj = () => {
    const newProjectArr = [
      ...Project,
      { Name: "", Description: "", ProjRole: "" },
    ];
    setProject(newProjectArr);
  };

  const handleExperienceInput = (index, e, checked) => {
    const copyExperience = [...Experience];
    if (checked) {
      const ifCheck = check;
      ifCheck ? setcheck(false) : setcheck(true);
    }
    copyExperience[index][e.target.name] = e.target.value;
    setExperience(copyExperience);
  };

  const handleEducationInput = (index, e, distinctType) => {
    if (distinctType === "selectRange") {
      console.log("selectRange", e);
    }
    const copyEduArray = [...Education];
    copyEduArray[index][e.target.name] = e.target.value;
    setEducation(copyEduArray);
  };

  const handleProjectInput = (index, e) => {
    const newProjectArr = [...Project];
    newProjectArr[index][e.target.name] = e.target.value;
    setProject(newProjectArr);
  };

  const handleCallback = (start, end, label) => {
    console.log(start, end, label);
  };

  const onSubmit = (value) => {
    const experience = [...Experience];
    const education = [...Education];
    const project = [...Project];
    const inputArr = { ...input };
    const concateArr = [...experience, ...education, ...project, inputArr];
    setfinalArray(concateArr);
  };
  console.log("finalArray", finalArray);

  return (
    <Card className="w-100" style={{ maxWidth: "700px" }}>
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}> Resume Maker </Card.Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={input.Name}
              onChange={handleChange}
              ref={register({ required: true, minLength: 3 })}
            />
            <Form.Text className="text-muted">
              {errors.Name && <div>*Minimum 3 char required</div>}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>BirthDate</Form.Label>
            <br />
            <Controller
              control={control}
              name="Birthdate"
              defaultValue={null}
              render={({ onChange, value }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={onChange}
                  selected={value}
                  dateFormate="dd/MM/yyyy"
                />
              )}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="Email"
              value={input.Email}
              onChange={handleChange}
              ref={register({
                required: "Email is required",
              })}
            />
            <Form.Text className="text-muted">
              {errors.Email && (
                <div className="errors">*Minimum 10 numbers are required</div>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              name="About"
              value={input.About}
              onChange={handleChange}
              ref={register({
                required: "About is required",
              })}
            />
            <Form.Text className="text-muted">
              {errors.About && <div className="errors">*About is required</div>}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Skills</Form.Label>
            <br />
            <select
              name="Skills"
              multiple={true}
              value={input.Skills}
              onChange={(e) => handleChange(e, "Skills")}
            >
              <option value="C">C</option>
              <option value="C++">C++</option>
              <option value="JAVA">JAVA</option>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
            </select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Languages</Form.Label>
            <br />
            <select
              name="Languages"
              multiple={true}
              value={input.Languages}
              onChange={(e) => handleChange(e, "Languages")}
            >
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Marathi">Marathi</option>
            </select>
          </Form.Group>

          <Button
            onClick={() => {
              setExperience([
                ...Experience,
                {
                  CompanyName: "",
                  JobPost: "",
                  Location: "",
                  Description: "",
                  Check: false,
                },
              ]);
            }}
          >
            Add Experience
          </Button>
          <br />
          {Experience.map((item, index) => (
            <Card key={index}>
              <Card.Body>
                <Card.Title>Experience</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>CompanyCame</Form.Label>
                  <Form.Control
                    type="text"
                    name="CompanyName"
                    value={item.CompanyName}
                    onChange={(e) => handleExperienceInput(index, e)}
                    ref={register({ required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>JobPost</Form.Label>
                  <Form.Control
                    type="text"
                    name="JobPost"
                    value={item.JobPost}
                    onChange={(e) => handleExperienceInput(index, e)}
                    ref={register({ required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> Location </Form.Label>
                  <Form.Control
                    type="text"
                    name="Location"
                    value={item.Location}
                    onChange={(e) => handleExperienceInput(index, e)}
                    ref={register({ required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> Description </Form.Label>
                  <Form.Control
                    type="text"
                    name="Description"
                    value={item.Description}
                    onChange={(e) => handleExperienceInput(index, e)}
                    ref={register({ required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <FormCheck
                    type="switch"
                    name="Check"
                    value={!check}
                    checked={check}
                    onChange={(e) => handleExperienceInput(index, e, "check")}
                    label="currently working"
                  />
                </Form.Group>

                {/* --==--Remove====-- */}
                <Button onClick={() => removeField1(index)}> Remove</Button>
              </Card.Body>
            </Card>
          ))}
          <br />

          <Button onClick={AddEduObj}>Add Education</Button>
          <br />
          {Education.map((eduObj, index) => (
            <Card key={index}>
              <Card.Body>
                <Card.Title> Education</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name"
                    value={eduObj.Name}
                    onChange={(e) => handleEducationInput(index, e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>FromTo</Form.Label>
                  <Form.Control
                    type="text"
                    name="FromTo"
                    value={eduObj.FromTo}
                    onChange={(e) =>
                      handleEducationInput(index, e, "singleSelect")
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>About</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="About"
                    value={eduObj.About}
                    onChange={(e) => handleEducationInput(index, e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <br />
                  <select
                    name="Location"
                    value={Education.Location}
                    onChange={(e) => handleEducationInput(index, e)}
                  >
                    <option value="Gujarat">Gujarat</option>
                    <option value="Maharastra">Maharastra</option>
                    <option value="Bihar">Bihar</option>
                  </select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>DateRangePicker</Form.Label>
                </Form.Group>
                <Button onClick={() => removeField2(index)}> Remove</Button>
              </Card.Body>
            </Card>
          ))}
          <br />
          <Button onClick={AddProObj}>Add Project</Button>

          {Project.map((projectObj, index) => (
            <Card key={index}>
              <Card.Body>
                <Card.Title> Project </Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name"
                    value={projectObj.Name}
                    onChange={(e) => handleProjectInput(index, e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="Description"
                    value={projectObj.Description}
                    onChange={(e) => handleProjectInput(index, e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Project Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="ProjRole"
                    value={projectObj.ProjRole}
                    onChange={(e) => handleProjectInput(index, e)}
                  />
                </Form.Group>
                <Button onClick={() => removeField3(index)}> Remove</Button>
              </Card.Body>
            </Card>
          ))}
          <br />
          <br />
          <div>
            <Button type="submit" className="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Resume;
