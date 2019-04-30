import React, { useState, useEffect} from "react"
import { geoOrthographic, geoPath } from "d3-geo"
import { range } from "d3-array"
import { polygonContains } from "d3-polygon"

function Countries(data, path) {

   return( data.map((d,i) => <path
      key = {"path" + i}
      d = {path(d)}
      className = "countries"
      style = {{ fill: "#ffba2e", stroke: "#e19600"}}
      />
      )
   )
}

const generate_points = (data, projection, radius) => {

    if (data.length > 0) {
      const world_points = [].concat.apply([], [0, 2].map( _ => data[_][0].map(projection)))
      const points = []

      range(90).forEach(row => {
        range(140).forEach(col => {
          const x = radius*col*1.7
          const y = radius*row*1.5
          if (polygonContains(world_points, [x, y])) {
            points.push({x: +x, y: +y})
          }
        });
      });

      return points
    }
  }

function Globe(props) {

  const [rotate, setRotate] = useState(0) ;

  useEffect(() => {
      setRotate(rotate + 0.5)
  }, [rotate])

  const margin = {
        right: 40,
        left: 40,
        top: 40,
        bottom: 40
      }

    const width = 500 - margin.right - margin.left;
    const height = 400 - margin.top - margin.bottom;

     const projection = geoOrthographic()
    .translate([width / 2, height / 2])
    .scale(200)
    .rotate([rotate])

    const path = geoPath()
    .projection(projection)

   // const points = generate_points(props.data, projection, radius)
   const world_globe = Countries(props.data, path)


  return (
      <svg id = "svg" width = "500" height = "400">
        <g transform={"translate(" + margin.left + "," + margin.top + ")"}>
          {world_globe}
        </g>
      </svg>
  )

}

export default Globe