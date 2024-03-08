import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";

interface INodeFormInput {
  label: string;
}

interface INodeFormProps {
  children: JSX.Element;
  formSubmit: (data: INodeFormInput) => void;
  initValues?: INodeFormInput;
}

export default function NodeForm({
  children,
  formSubmit,
  initValues,
}: INodeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INodeFormInput>();

  // useEffect(function init() {
  // }, []);

  const onSubmit: SubmitHandler<INodeFormInput> = (data) => {
    console.log(data);
    reset();
    formSubmit(data);
  };

  const formRegisterItem = {
    label: { required: "required", maxLength: 20 },
    // image: { required: false,}
    // nodeShape: { required: false,}
    // labelPosition: { required: false,}
    // labelColor: { required: false,}
    // backgroundColor: { required: false,}
    // borderColor: { required: false,}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexWrap: "wrap", my: "20px" }}>
        <FormControl>
          <TextField
            id="label"
            label="Label"
            variant="standard"
            {...register("label", formRegisterItem.label)}
            defaultValue={initValues?.label ?? ""}
            error={!!errors.label}
            helperText={errors.label?.message}
          />
        </FormControl>
      </Box>
      <Button type="submit">Submit</Button>
      {children}
    </form>
  );
}
