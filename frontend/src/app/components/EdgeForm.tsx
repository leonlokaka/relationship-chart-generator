import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { EdgeArrow, EdgeStyle, NodeLabelPosition } from "../const";

interface IEdgeFormInput {
  label: string;
  lineStyle?: string;
  arrowType?: string;
  labelColor?: string;
  lineColor?: string;
  // TODO: add fontSize, width, flip, arrow horrow
}

interface IEdgeFormProps {
  customButton: JSX.Element;
  formSubmit: (data: IEdgeFormInput) => void;
  initValues?: IEdgeFormInput;
}

const defaultValues: IEdgeFormInput = {
  label: "",
  labelColor: "",
  arrowType: "",
  lineStyle: "",
  lineColor: "",
};

export default function EdgeForm({
  customButton,
  formSubmit,
  initValues,
}: IEdgeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<IEdgeFormInput>({
    defaultValues: { ...defaultValues, ...initValues },
  });

  // useEffect(function init() {
  // }, []);

  const onSubmit: SubmitHandler<IEdgeFormInput> = (data) => {
    console.log(data);
    reset();
    formSubmit(data);
  };

  const formRegisterItem = {
    label: { maxLength: 20 },
    labelColor: { required: false },
    arrowType: { required: false },
    lineStyle: { required: false },
    lineColor: { required: false },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        my: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          px: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: "10px",
          }}
        >
          <FormControl sx={{ my: 1 }}>
            <TextField
              id="label"
              label="Label"
              variant="standard"
              {...register("label", formRegisterItem.label)}
              error={!!errors.label}
              helperText={errors.label?.message}
            />
          </FormControl>

          <FormControl sx={{ my: 1 }}>
            <MuiColorInput
              label="Label Color"
              variant="standard"
              format="hex"
              {...register("labelColor", formRegisterItem.labelColor)}
              value={watch("labelColor") || ""}
              onChange={(newValue) => {
                setValue("labelColor", newValue);
              }}
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: "10px",
          }}
        >
          <FormControl sx={{ my: 2, minWidth: "100%" }}>
            <InputLabel id="arrowType-label">Arrow</InputLabel>
            <Select
              id="arrowType"
              label="Shape"
              variant="standard"
              value={watch("arrowType") || ""}
              {...register("arrowType", formRegisterItem.arrowType)}
            >
              <MenuItem value="">Default</MenuItem>
              {(Object.keys(EdgeArrow) as Array<keyof typeof EdgeArrow>).map(
                (key) => (
                  <MenuItem value={key} key={key}>
                    {EdgeArrow[key]}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl sx={{ my: 2, minWidth: "100%" }}>
            <InputLabel id="lineStyle-label">Line Style</InputLabel>
            <Select
              id="lineStyle"
              label="Line Style"
              variant="standard"
              value={watch("lineStyle")}
              {...register("lineStyle", formRegisterItem.lineStyle)}
            >
              <MenuItem value="">Default</MenuItem>
              {(Object.keys(EdgeStyle) as Array<keyof typeof EdgeStyle>).map(
                (key) => (
                  <MenuItem value={key} key={key}>
                    {EdgeStyle[key]}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl sx={{ my: 1 }}>
            <MuiColorInput
              label="Line Color"
              variant="standard"
              format="hex"
              {...register("lineColor", formRegisterItem.lineColor)}
              value={watch("lineColor") || ""}
              onChange={(newValue) => {
                setValue("lineColor", newValue);
              }}
            />
          </FormControl>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          px: "10px",
        }}
      >
        <Button type="submit">Submit</Button>
        <Button
          onClick={() => {
            reset();
          }}
        >
          Reset
        </Button>
        {customButton}
      </Box>
    </Box>
  );
}
export type { IEdgeFormInput };
