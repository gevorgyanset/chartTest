import * as Highcharts from 'highcharts';

export const CHART_CATEGORIS_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


export type ChartFormInterface = {
  type: "bar" | "line",
  color: string,
  name: "temperature" | "humidity" | "illumination",
  data?: number[]
};


export type listChart = {
    charts: ChartFormInterface[],
    selected: boolean
}
