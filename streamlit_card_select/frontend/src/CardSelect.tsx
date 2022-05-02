import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"

import { CardData } from "./card-data.model";
import { Grid } from "@mui/material";
import CardComponent from "./card";


/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class CardSelect extends StreamlitComponentBase {
  public state = { active: "two" }

  public render = (): ReactNode => {
    // get the options
    const options: CardData[] = this.props.args['options'];
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    return (
      <Grid container spacing={2}>
        {options.map(card => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.option}>
            <CardComponent data={card} onClick={this.setCard} active={this.state.active===card.option}  />
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
