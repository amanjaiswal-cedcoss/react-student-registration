import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
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
      name: { value: "", error: false },
      age: { value: "", error: false },
      qualification: { value: "", error: false },
      image: { value: "", error: false, files: [] },
      idProof: { value: "", error: false, files: [] },
    },
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    let inputType = e.currentTarget.type;
    let value = e.currentTarget.value;
    if (inputType === "file") {
      const file = e.currentTarget.files![0];
      console.log(file.size, file.type);
    } else {
      if (key in state.formData) {
        state.formData[key].value = value;
      }
    }
    setState({ ...state });
  };

  return (
    <Card className="container" variant="outlined">
      <Typography align="center" variant="h4" gutterBottom>
        Register
      </Typography>
      <form className="registration">
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
        <FormControl size="small" error={state.formData.qualification.error}>
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
              value="10th"
              control={<Radio size="small" />}
              label="10th(Matric)"
            />
            <FormControlLabel
              value="12th"
              control={<Radio size="small" />}
              label="12th(Intermediate)"
            />
            <FormControlLabel
              value="graduation"
              control={<Radio size="small" />}
              label="Graduation"
            />
            <FormControlLabel
              value="postGraduation"
              control={<Radio size="small" />}
              label="Post Graduation"
            />
          </RadioGroup>
        </FormControl>
        <FormGroup>
          <InputLabel>Upload an image</InputLabel>
          <Input
            value={state.formData.image.value}
            type="file"
            disableUnderline
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              changeHandler(e, "image")
            }
            error={state.formData.image.error}
          />
          <FormHelperText>
            File size should be between 50kb-200kb and only png file allowed.
          </FormHelperText>
        </FormGroup>
        <FormGroup>
          <InputLabel>Upload ID Proof</InputLabel>
          <Input
            value={state.formData.idProof.value}
            type="file"
            disableUnderline
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              changeHandler(e, "idProof")
            }
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
    </Card>
  );
}

export default StudentRegistration;
