import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { stateType } from "../../types";

function StudentRegistration() {
  const [state, setState] = useState<stateType>({
    formData: {
      name: { value: "", error: false, required: true, type: "text" },
      age: { value: "", error: false, required: true, type: "number" },
      qualification: { value: "", error: false, required: true, type: "text" },
      image: {
        value: "",
        error: false,
        required: true,
        type: "file",
        files: null,
        fileType: "png",
        fileSizeLimits: { upper: 200, lower: 50 },
        url: "",
      },
      idProof: {
        value: "",
        error: false,
        required: true,
        type: "file",
        files: null,
        fileType: "pdf",
        fileSizeLimits: { upper: 500, lower: 100 },
        url: "",
      },
    },
    details: {
      name: "",
      age: "",
      qualification: "",
      image: "",
      idProof: "",
    },
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    let inputType = state.formData[key].type;
    let value = e.currentTarget.value;
    if (key in state.formData) {
      if (
        inputType === "file" &&
        e.currentTarget.files &&
        e.currentTarget.files[0]
      ) {
        const file = e.currentTarget.files![0];
        state.formData[key].files = e.currentTarget.files!;
        state.formData[key].value = value;
        state.formData[key].url = URL.createObjectURL(file);
      } else if (inputType === "number") {
        if (value.match(/^\d+$/)) {
          state.formData[key].value = value;
        }
      } else {
        state.formData[key].value = value;
      }
      setState({ ...state });
    }
  };

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formObj = state.formData;
    Object.values(formObj).forEach((ele) => {
      if (ele.required && ele.value === "") {
        ele.error = true;
      } else {
        ele.error = false;
      }
      if (ele.type === "file" && ele.files && ele.files[0]) {
        let convertedSize = convertFileSize(ele.files![0].size);
        console.log(convertedSize);
        if (
          convertedSize < ele.fileSizeLimits!.lower ||
          convertedSize > ele.fileSizeLimits!.upper ||
          ele.files[0].type.endsWith(ele.fileType!) === false
        ) {
          ele.error = true;
        } else {
          ele.error = false;
        }
      }
    });
    let errorExists = Object.values(formObj).every(
      (ele) => ele.error === false
    );
    if (errorExists) {
      state.details = {
        name: formObj.name.value,
        age: formObj.age.value,
        qualification: formObj.qualification.value,
        image: formObj.image.url!,
        idProof: formObj.idProof.files![0].name,
      };
    }

    setState({ ...state, formData: formObj });
  };

  const convertFileSize = (size: number) => {
    if (size > 1024) {
      return size / 1024;
    }
    return size;
  };

  return (
    <Card className="container" variant="outlined">
      <Typography align="center" variant="h4" gutterBottom>
        Register
      </Typography>
      <Card className="details">
        {Object.values(state.details).every((ele) => ele !== "") ? (
          <>
            <Typography>Name:{state.details.name}</Typography>
            <Typography>Age:{state.details.age}</Typography>
            <Typography>Qualification:{state.details.qualification}</Typography>
            <Box>
              <Typography>Photo:</Typography>
              <img
                src={state.details.image}
                className="avatar"
                alt="avatar pic"
              />
            </Box>
            <Typography>IdProof:{state.details.idProof}</Typography>
          </>
        ) : (
          <form
            className="registration"
            onSubmit={(e) => {
              register(e);
            }}
          >
            <TextField
              size="small"
              label="Name"
              value={state.formData.name.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeHandler(e, "name")
              }
              error={state.formData.name.error}
            />
            <TextField
              size="small"
              label="Age"
              value={state.formData.age.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeHandler(e, "age")
              }
              error={state.formData.age.error}
            />
            <FormControl
              size="small"
              error={state.formData.qualification.error}
            >
              <FormLabel id="qualification">Qualification</FormLabel>
              <RadioGroup
                row
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  changeHandler(e, "qualification")
                }
                value={state.formData.qualification.value}
                aria-labelledby="qualification"
                name="qualification"
              >
                <FormControlLabel
                  value="10th(Matric)"
                  control={<Radio size="small" />}
                  label="10th(Matric)"
                />
                <FormControlLabel
                  value="12th(Intermediate)"
                  control={<Radio size="small" />}
                  label="12th(Intermediate)"
                />
                <FormControlLabel
                  value="Graduation"
                  control={<Radio size="small" />}
                  label="Graduation"
                />
                <FormControlLabel
                  value="Post Graduation"
                  control={<Radio size="small" />}
                  label="Post Graduation"
                />
              </RadioGroup>
            </FormControl>
            <FormGroup color="warning">
              <InputLabel color="warning">Upload a photo</InputLabel>
              <OutlinedInput
                value={state.formData.image.value}
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  changeHandler(e, "image")
                }
                size="small"
                inputProps={{ accept: ".png" }}
                error={state.formData.image.error}
              />
              <FormHelperText>
                File size should be between 50kb-200kb and only png file
                allowed.
              </FormHelperText>
              {state.formData.image.url !== "" ? (
                <img
                  className="avatar"
                  src={state.formData.image.url}
                  alt="preview pic"
                />
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup>
              <InputLabel>Upload ID Proof</InputLabel>
              <OutlinedInput
                value={state.formData.idProof.value}
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  changeHandler(e, "idProof")
                }
                inputProps={{ accept: ".pdf" }}
                error={state.formData.idProof.error}
              />
              <FormHelperText>
                File size should be between 100kb-500kb
              </FormHelperText>
            </FormGroup>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </form>
        )}
      </Card>
    </Card>
  );
}

export default StudentRegistration;
