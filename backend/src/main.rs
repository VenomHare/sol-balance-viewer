use std::{env, str::FromStr};

use axum::{
    http::{header, Method, StatusCode}, response::IntoResponse, routing::{get, post}, Json, Router
};
use dotenv::dotenv;
use serde_json::{Value, json};
use solana_client::nonblocking::rpc_client::RpcClient;
use solana_pubkey::Pubkey;
use tower_http::cors::{AllowOrigin, CorsLayer};

#[derive(serde::Serialize, serde::Deserialize)]
struct GetDataRequest {
    pub_id: String,
}

#[tokio::main]
async fn main() {

    dotenv().ok();

    let cors = CorsLayer::new()
    .allow_origin(AllowOrigin::list([
        "http://localhost:5173".parse().unwrap(), // Replace with your frontend origin
    ]))
    .allow_methods([Method::GET, Method::POST])
    .allow_headers([header::CONTENT_TYPE]);

    let app = Router::new()
        .route("/", get(|| async { "Hello, World" }))
        .route("/balance", post(json_handler))
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("Server Running at port 3000");
    axum::serve(listener, app).await.unwrap();
}

async fn json_handler(Json(payload): Json<Value>) -> impl IntoResponse {
    let data: GetDataRequest = serde_json::from_value(payload).unwrap();

    let rpc_url = env::var("RPC_URL").expect("RPC_URL Not Found");

    let client = RpcClient::new(rpc_url);
    let pubkey = Pubkey::from_str(&data.pub_id).unwrap();
    let balance_in_lamports = client.get_balance(&pubkey).await.unwrap();
    let balance_in_sol = balance_in_lamports as f64 / 1_000_000_000.0;
    
    return (
        StatusCode::OK,
        Json(json!({
            "wallet_id" : data.pub_id,
            "lamports" : balance_in_lamports,
            "sol": balance_in_sol
        })),
    )
        .into_response()
}
