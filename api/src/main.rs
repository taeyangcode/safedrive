use axum::{extract::Query, response::IntoResponse, routing::get, Router};
use polars::io::{csv::CsvReader, SerReader};
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
    north_east: f32,
    south_west: f32,
}

fn read_csv(path: &str) {
    let dataframe = CsvReader::from_path(path).unwrap().finish().unwrap();

    println!("{dataframe}");
}

async fn data_points(Query(bounds): Query<Bounds>) -> impl IntoResponse {
    read_csv(ACCIDENTS_PATH);

    return "data points"
}
