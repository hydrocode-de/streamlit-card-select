import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, createTheme, Theme, ThemeProvider, Typography } from "@mui/material";
import { CardData } from "./card-data.model";


interface CardProps {
    data: CardData;
    maxWidth?: number;
    onClick: (id: string) => void;
    active?: boolean;
    imgHeight?: number;
    theme: Theme;
}

const CardComponent: React.FC<CardProps> = ({ data, ...props }) => {
    // get the image height or default to 140px
    const height = props.imgHeight || 140;

    let theme: Theme;
    if (props.active) {
        theme = createTheme(props.theme, {
            palette: {
                background: {
                    paper: props.theme.palette.primary.dark
                }
            }
        })
    } else {
        theme = props.theme;
    }

    // render
    return (
        <ThemeProvider theme={theme}>
        <Card sx={{maxWidth: props.maxWidth}} onClick={() => props.onClick(data.option)} elevation={props.active ? 8 : 3}>
            <CardActionArea>
                {data.image ? (
                    <CardMedia component="img" image={data.image} alt="image" height={height} />
                ) : null }
                <CardContent>
                    {data.title ? (
                        <Typography gutterBottom variant="h5" component="div">{data.title}</Typography>
                    ) : null}
                    { data.description ? (
                        <Typography variant="body2" color="textSecondary">{data.description}</Typography>
                    ) : null }
                </CardContent>
            </CardActionArea>
        </Card>
        </ThemeProvider>
    );
}

export default CardComponent;