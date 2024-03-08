import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { NodeLabelPosition, NodeShape } from "../const";
import { MuiColorInput } from "mui-color-input";

interface INodeFormInput {
  label: string;
  nodeShape?: string;
  labelPosition?: string;
  labelColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  // TODO: add fontSize, nodeSize
}

interface INodeFormProps {
  customButton: JSX.Element;
  formSubmit: (data: INodeFormInput) => void;
  initValues?: Partial<INodeFormInput>;
}

const defaultValues: INodeFormInput = {
  label: "",
  nodeShape: "",
  labelPosition: "",
  labelColor: "",
  backgroundColor: "",
  borderColor: "",
};

export default function NodeForm({
  customButton,
  formSubmit,
  initValues,
}: INodeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<INodeFormInput>({
    defaultValues: { ...defaultValues, ...initValues },
  });

  const onSubmit: SubmitHandler<INodeFormInput> = (data) => {
    console.log(data);
    reset();
    formSubmit(data);
  };

  const formRegisterItem = {
    label: { required: "required", maxLength: 20 },
    // image: { required: false,}
    labelPosition: { required: false },
    nodeShape: { required: false },
    labelColor: { required: false },
    backgroundColor: { required: false },
    borderColor: { required: false },
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

          <FormControl sx={{ my: 2, minWidth: "100%" }}>
            <InputLabel id="labelPosition-label">Label Position</InputLabel>
            <Select
              id="labelPosition"
              label="Label Position"
              variant="standard"
              value={watch("labelPosition")}
              {...register("labelPosition", formRegisterItem.labelPosition)}
            >
              <MenuItem value="">Default</MenuItem>
              {(
                Object.keys(NodeLabelPosition) as Array<
                  keyof typeof NodeLabelPosition
                >
              ).map((key) => (
                <MenuItem value={key} key={key}>
                  {NodeLabelPosition[key]}
                </MenuItem>
              ))}
            </Select>
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
            <InputLabel id="nodeShape-label">Shape</InputLabel>
            <Select
              id="nodeShape"
              label="Shape"
              variant="standard"
              value={watch("nodeShape") || ""}
              {...register("nodeShape", formRegisterItem.nodeShape)}
            >
              <MenuItem value="">Default</MenuItem>
              {(Object.keys(NodeShape) as Array<keyof typeof NodeShape>).map(
                (key) => (
                  <MenuItem value={key} key={key}>
                    {NodeShape[key]}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl sx={{ my: 1 }}>
            <MuiColorInput
              label="Background Color"
              variant="standard"
              format="hex"
              {...register("backgroundColor", formRegisterItem.backgroundColor)}
              value={watch("backgroundColor") || ""}
              onChange={(newValue) => {
                setValue("backgroundColor", newValue);
              }}
            />
          </FormControl>

          <FormControl sx={{ my: 1 }}>
            <MuiColorInput
              label="Border Color"
              variant="standard"
              format="hex"
              {...register("borderColor", formRegisterItem.backgroundColor)}
              value={watch("borderColor") || ""}
              onChange={(newValue) => {
                setValue("borderColor", newValue);
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

export type { INodeFormInput };
