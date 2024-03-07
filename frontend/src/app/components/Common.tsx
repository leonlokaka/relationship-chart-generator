import {
  Box,
  BoxProps,
  Chip,
  ChipProps,
  ImageListItemBar,
  ImageListItemBarProps,
  Paper,
  PaperProps,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moment from "moment";
import styled from "@emotion/styled";
import { forwardRef } from "react";

type IDecorationRectangle = BoxProps & {
  width: string;
  height: string;
  color?: any;
  sx?: any;
  theme?: Theme;
};

const DecorationRectangle = styled(Box)((props: IDecorationRectangle) => ({
  width: props.width,
  height: props.height,
  backgroundColor: props.color ?? props.theme?.palette.primary.main ?? "none",

}));


// Params:
// dateStr: string in YYYY-MM-DD format
function dateStringToYearMonth(dateStr: string) {
  const dateInMoment = moment(dateStr, "YYYY-MM-DD");
  if (dateInMoment.isValid()) return dateInMoment.format("YYYY MMM");
  return dateStr;
}

interface IDevice {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  valueInDevice: (
    desktopValue: any,
    tabletValue: any,
    mobileValue?: any
  ) => any;
}

function useDevice(): IDevice {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const valueInDevice = (
    desktopValue: any,
    tabletValue: any,
    mobileValue?: any
  ) => {
    if (isMobile) return mobileValue ?? tabletValue;
    if (isTablet) return tabletValue;
    return desktopValue;
  };
  return { isDesktop, isTablet, isMobile, valueInDevice };
}


function SectionTitle({
  children,
  color,
  decorationColor,
}: {
  children: any;
  color?: any;
  decorationColor?: any;
}) {
  const theme = useTheme();
  const device = useDevice();
  const Title = styled(Typography)((props: TypographyProps) => ({
    color: color ?? theme.palette.primary.main,
    fontFamily: "monospace",
    fontWeight: "bold",
  }));

  return (
    <>
      <Title variant="h4">{children}</Title>
      <DecorationRectangle
        width="40px"
        height="5px"
        color={decorationColor}
        sx={{
          margin: device.valueInDevice("10px 0 30px 0", "10px 0", "10px 0"),
        }}
      />
    </>
  );
}

const FlexCenterBox = styled(Box)((props: BoxProps) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: (props.flexDirection as any) ?? "column",
  flexWrap: "wrap",
  ...props.style,
}));

const ImageListItemHover = styled(ImageListItemBar)(
  (props: ImageListItemBarProps & { device: IDevice }) => ({
    height: props.device.valueInDevice("100%", "30%"),
    cursor: "pointer",
    opacity: props.device.valueInDevice(0, 1),
    "&:hover": {
      transition: "opacity 1s",
      opacity: 1,
    },
    ...props.style,
  })
);

const SwiperBackground = styled(Box)(
  (props: BoxProps & { gradientsx?: SxProps }) => ({
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "block",
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,

    "&::before": props.gradientsx
      ? {
          content: "''",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
          ...props.gradientsx,
        }
      : {},
  })
);

export {
  DecorationRectangle,
  dateStringToYearMonth,
  SwiperBackground,
  SectionTitle,
  SkillChip,
  FlexCenterBox,
  ImageListItemHover,
  useDevice,
};
export type { IDevice };
