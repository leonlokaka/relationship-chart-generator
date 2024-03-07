import { Card, CardHeader, CardContent, CardProps, useTheme } from "@mui/material";

interface SimpleCardProps {
  title?: string;
  children?: JSX.Element;
  contentCenter?: boolean;
  cardProps?: CardProps;
}

export default function SimpleCard(props: SimpleCardProps) {
    const theme = useTheme()
  return (
    <Card {...props.cardProps} >
      <CardHeader
        title={props.title}
        sx={{
          borderBottom: "solid 1px #ddd",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText
        }}
      />
      <CardContent
        sx={
          props.contentCenter
            ? {
                display: "flex",
                justifyContent: "center",
              }
            : {}
        }
      >
        {props.children}
      </CardContent>
    </Card>
  );
}
