use axum::{extract::Query, response::IntoResponse, routing::get, Router};
use polars::{frame::DataFrame, io::{csv::CsvReader, SerReader}, lazy::{dsl::col, frame::IntoLazy}};
use serde::{Deserialize, Serialize};

const ACCIDENTS_PATH: &'static str = "./accidents_sample.csv";

#[tokio::main]
async fn main() {
    const PORT: &'static str = "127.0.0.1:8000";

    let backend_app = create_router();

    let listener = tokio::net::TcpListener::bind(PORT).await.unwrap();
    axum::serve(listener, backend_app).await.unwrap();
}

fn create_router() -> Router {
    return Router::new()
        .route("/", get(|| async { "Hello World!" }))
        .route("/api/v1/data_points", get(data_points));
}

#[derive(Debug, Serialize, Deserialize)]
struct Coordinates {
    latitude: f32,
    longitude: f32,
}

#[derive(Debug, Serialize, Deserialize)]
struct Bounds {
    north_east: Coordinates,
    south_west: Coordinates,
}

fn csv_to_dataframe(path: &str) -> DataFrame {
    return CsvReader::from_path(path).unwrap().finish().unwrap();
}

#[derive(Debug, Serialize, Deserialize)]
struct WeightedLocation {
    coordinates: Coordinates,
    weight: i32,
}

fn weighted_location_in_bounds(data_frame: DataFrame, bounds: Bounds) {
    let Bounds { north_east, south_west } = bounds;

    let weighted_locations = data_frame
        .lazy()
        .select(&[col("Start_Lat"), col("Start_Lng"), col("End_Lat"), col("End_Lng"), col("Severity")])
        .filter(col("Start_Lat").gt_eq(south_west.latitude).and(col("End_Lat").lt_eq(north_east.latitude)))
        .filter(col("Start_Lng").gt_eq(south_west.longitude).and(col("End_Lng").lt_eq(north_east.longitude)))
        .collect()
        .unwrap();

    println!("{weighted_locations}");
}

async fn data_points(Query(bounds): Query<Bounds>) -> impl IntoResponse {
    weighted_location_in_bounds(csv_to_dataframe(ACCIDENTS_PATH), bounds);

    return "data points"
}
