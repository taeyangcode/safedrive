use axum::{extract::Query, http::HeaderValue, response::IntoResponse, routing::get, Router};
use polars::{frame::DataFrame, io::{csv::CsvReader, SerReader}, lazy::{dsl::col, frame::IntoLazy}};
use serde::{Deserialize, Serialize};
use tower_http::cors::CorsLayer;

const ACCIDENTS_PATH: &'static str = "./accidents_sample.csv";

#[derive(Debug, Serialize, Deserialize)]
struct Bounds {
    north: f32,
    east: f32,
    south: f32,
    west: f32,
}

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
        .route("/api/v1/data_points", get(data_points))
        .layer(
            CorsLayer::new()
                .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
        )
}

fn csv_to_dataframe(path: &str) -> DataFrame {
    return CsvReader::from_path(path).unwrap().finish().unwrap();
}

fn weighted_location_in_bounds(data_frame: DataFrame, bounds: Bounds) -> DataFrame {
    let Bounds { north, east, south, west } = bounds;

    let weighted_locations = data_frame
        .lazy()
        .select(&[col("Start_Lat"), col("Start_Lng"), col("End_Lat"), col("End_Lng"), col("Severity")])
        .filter(col("Start_Lat").gt_eq(south).and(col("End_Lat").lt_eq(north)))
        .filter(col("Start_Lng").gt_eq(west).and(col("End_Lng").lt_eq(east)))
        .collect()
        .unwrap();

    return weighted_locations;
}

async fn data_points(Query(bounds): Query<Bounds>) -> impl IntoResponse {
    let weighted_locations = weighted_location_in_bounds(csv_to_dataframe(ACCIDENTS_PATH), bounds);

    return serde_json::to_value(&weighted_locations).unwrap().to_string();
}
