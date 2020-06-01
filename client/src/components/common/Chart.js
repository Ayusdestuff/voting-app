import React, { Component } from "react";
import { Doughnut as PieChart } from "react-chartjs";
import _ from "lodash";

const chartOptions = { animateScale: true };

class Chart extends Component {
  shouldComponentUpdate(nextProps) {
    /* 
    in the component where this chart is rendered, the state changes successively as a result
    of user interaction, this component lifecycle method `shouldComponentUpdate`, will help
    us verify whether the previous props is similar to the next one, and will prevent any unnecessary
    rerenders to this Chart component
    */

    //compare the previousProps to the nextProps
    //if they are the same, component should not update

    const isEqual =
      this.props.chartData.length === nextProps.chartData.length &&
      this.props.chartData.every((val, index) =>
        _.isEqual(val.value, nextProps.chartData[index].value)
      );

    // the variable `isEqual` returns a boolean (true || false).
    // if true, we return false
    // if false, we return true

    return !isEqual;
  }
  render() {
    const { chartData } = this.props;
    return (
      <div className="row">
        <div className="col s12">
          <PieChart
            data={chartData}
            options={chartOptions}
            width="600"
            height="350"
            redraw
          />
        </div>
        <div className="col s12">
          <ul className="collection">
            {chartData.map(d => {
              return (
                <li key={d.label} className="collection-item valign-wrapper">
                  <div
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 10,
                      backgroundColor: d.color,
                      marginRight: 10
                    }}
                  />
                  {"  "}
                  <div>
                    {d.label} - {d.value} Votes
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export { Chart };
