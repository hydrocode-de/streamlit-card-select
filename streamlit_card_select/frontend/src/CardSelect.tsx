import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"

import { CardData } from "./card-data.model";
import { createTheme, Grid } from "@mui/material";
import CardComponent from "./card";


/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class CardSelect extends StreamlitComponentBase {
  public state = { active: null }

  public render = (): ReactNode => {
    const theme = createTheme({
      palette: {
        mode: this.props.theme?.base === 'light' ? 'light' : 'dark',
        primary: {
          main: this.props.theme!.primaryColor
        },
        text: {
          primary: this.props.theme!.textColor
        }
      }
    });

    // handle default values
    const { active } = this.state;
    if (active === null && this.props.args['default'] !== undefined) {
      this.setState({ active: this.props.args['default'] });
    }

    // get the options
    const options: CardData[] = this.props.args['options'];

    // get all the other options
    const spacing = this.props.args['spacing'] || 2;
    const xs = this.props.args['xs'] || 12;
    const sm = this.props.args['sm'] || 6;
    const md = this.props.args['md'] || 4;
    const lg = this.props.args['lg'] || 3;
    const imgHeight = this.props.args['imgHeight'] || 140;

    // render the component
    return (
      <Grid container spacing={spacing}>
        {options.map(card => (
          <Grid item xs={xs} sm={sm} md={md} lg={lg} key={card.option}>
            <CardComponent data={card} onClick={this.setCard} active={this.state.active===card.option} imgHeight={imgHeight} theme={theme} />
          </Grid>
        ))}
      </Grid>
    );
  }

  setCard = (option: string) => {
    this.setState({ active: option}, () => Streamlit.setComponentValue(option));
  }
}


// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(CardSelect)
