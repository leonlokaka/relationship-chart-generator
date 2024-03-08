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

interface IEdgeFormInput {
  label: string;
}

interface IEdgeFormProps {
  children: JSX.Element;
  formSubmit: (data: IEdgeFormInput) => void;
  initValues?: IEdgeFormInput;
}

export default function EdgeForm({
  children,
  formSubmit,
  initValues,
}: IEdgeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEdgeFormInput>();

  // useEffect(function init() {
  // }, []);

  const onSubmit: SubmitHandler<IEdgeFormInput> = (data) => {
    console.log(data);
    reset();
    formSubmit(data);
  };

  const formRegisterItem = {
    label: { maxLength: 20 },
    // lineStyle: { required: false, },
    // arrowType: { required: false, },
    // labelColor: { required: false, },
    // lineColor: { required: false, },
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
