import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { CardData } from "./card-data.model";


interface CardProps {
    data: CardData;
    maxWidth?: number;
    onClick: (id: string) => void;
    active?: boolean;
}

const CardComponent: React.FC<CardProps> = ({ data, ...props }) => {
    return (
        <Card sx={{maxWidth: props.maxWidth}} onClick={() => props.onClick(data.option)} color={props.active ? 'primary': 'dark'}>
            <CardActionArea>
                {data.image ? (
                    <CardMedia component="img" image={data.image} alt="image" height="140" />
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
    );
}

export default CardComponent;