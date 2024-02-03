use axum::{Router, routing::get};

fn create_router() -> Router {
    return Router::new()
        .route("/", get(|| async { "Hello World!" }));
}

#[tokio::main]
async fn main() {
    const PORT: &'static str = "127.0.0.1:8000";

    let backend_app = create_router();

    let listener = tokio::net::TcpListener::bind(PORT).await.unwrap();
    axum::serve(listener, backend_app).await.unwrap();
}
