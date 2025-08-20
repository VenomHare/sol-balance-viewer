
## Solana Wallet Balance viewer
<hr/>  
<br/>

Just a Project to start learning about Solana and Rust

### Setup 

- Clone Repo 
```bash 
    git clone https://github.com/VenomHare/sol-balance-viewer
```

- Install Frontend Dependencies
```bash
    cd frontend
    pnpm install
```

- Add Environment Variables
Adjust RPC_URL accordingly
```bash
    cd backend
    cp .env.example .env
```

- Build Server
```bash
    cd backend
    cargo build 
```

- Run Both Servers 

Frontend: 
```bash 
    npm run dev 
```  

Backend: 
```bash 
    cargo run 
```
